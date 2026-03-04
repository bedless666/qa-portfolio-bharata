const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const http = require('http');
const fs = require('fs');
const https = require('https');
const url = require('url');

let mainWindow;
let server;
const PORT = 3847; // Random port to avoid conflicts

// Create a simple HTTP server to serve the HTML and handle API proxy
function createServer() {
  server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    
    // Handle API proxy requests
    if (parsedUrl.pathname === '/api/proxy') {
      handleApiProxy(req, res);
      return;
    }

    // Serve static files
    let filePath = path.join(__dirname, parsedUrl.pathname === '/' ? 'Index-with-api.html' : parsedUrl.pathname);
    
    // Security: prevent directory traversal
    if (!filePath.startsWith(__dirname)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    const extname = path.extname(filePath).toLowerCase();
    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon'
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
      if (error) {
        if (error.code === 'ENOENT') {
          res.writeHead(404);
          res.end('File not found');
        } else {
          res.writeHead(500);
          res.end('Server error: ' + error.code);
        }
      } else {
        res.writeHead(200, { 
          'Content-Type': contentType,
          'Access-Control-Allow-Origin': '*'
        });
        res.end(content, 'utf-8');
      }
    });
  });

  server.listen(PORT, '127.0.0.1', () => {
    console.log(`✅ Server running at http://127.0.0.1:${PORT}/`);
    console.log(`📱 Loading Index-with-api.html...`);
  });
}

// Handle API proxy to bypass CORS
function handleApiProxy(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const requestData = JSON.parse(body);
      const targetUrl = requestData.targetUrl;
      const requestBody = JSON.stringify(requestData.body);

      console.log('🚀 Proxying API request to:', targetUrl);
      console.log('📦 Request body:', requestBody);

      const parsedTarget = url.parse(targetUrl);
      
      const options = {
        hostname: parsedTarget.hostname,
        port: parsedTarget.port || 443,
        path: parsedTarget.path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(requestBody)
        }
      };

      const proxyReq = https.request(options, (proxyRes) => {
        let responseBody = '';
        
        console.log('📥 API Response Status:', proxyRes.statusCode);
        
        proxyRes.on('data', chunk => {
          responseBody += chunk;
        });

        proxyRes.on('end', () => {
          console.log('✅ API Response received');
          res.writeHead(proxyRes.statusCode, { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          });
          res.end(responseBody);
        });
      });

      proxyReq.on('error', (error) => {
        console.error('❌ Proxy error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          error: error.message,
          details: 'Failed to reach target API. Check your network connection and ensure you are on Shopee WiFi.'
        }));
      });

      proxyReq.write(requestBody);
      proxyReq.end();
    } catch (error) {
      console.error('❌ Parse error:', error);
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid request body' }));
    }
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'icon.png'),
    title: 'QAoD Regression Chat Generator',
    backgroundColor: '#667eea',
    show: false
  });

  // Load from local server
  mainWindow.loadURL(`http://127.0.0.1:${PORT}/`);

  // Open DevTools for debugging (optional - comment out in production)
  // mainWindow.webContents.openDevTools();

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    console.log('🎉 Window ready!');
  });

  // Open external links in browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// App lifecycle
app.whenReady().then(() => {
  console.log('🚀 Starting QAoD Regression Chat Generator...');
  createServer();
  
  // Wait a bit for server to start before opening window
  setTimeout(() => {
    createWindow();
  }, 500);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (server) {
    server.close();
    console.log('🛑 Server stopped');
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  if (server) {
    server.close();
  }
});
