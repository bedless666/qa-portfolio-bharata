// Preload script for Electron
// This runs in the renderer process but has access to Node.js APIs

const { contextBridge } = require('electron');

// Expose protected methods to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  isElectron: true,
  platform: process.platform,
  version: process.versions.electron
});

// Log that we're running in Electron
console.log('⚡ Running in Electron environment');
console.log('📱 Platform:', process.platform);
console.log('🔢 Electron version:', process.versions.electron);
