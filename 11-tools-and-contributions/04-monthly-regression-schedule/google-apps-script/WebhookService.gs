/**
 * Webhook communication functions
 */

function sendToWebhook(messageChunks) {
  // Build elements array
  const elements = [
    {
      "element_type": "title",
      "title": {
        "text": "🗓️ RN Live Regression Schedule"
      }
    }
  ];
  
  // Add all description chunks
  messageChunks.forEach(chunk => {
    elements.push({
      "element_type": "description",
      "description": {
        "text": chunk
      }
    });
  });
  
  // Add button
  elements.push({
    "element_type": "button",
    "button": {
      "button_type": "redirect",
      "text": "📊 View Full Schedule",
      "mobile_link": {
        "type": "web",
        "path": CONFIG.BUTTON_LINK
      },
      "desktop_link": {
        "type": "web",
        "path": CONFIG.BUTTON_LINK
      }
    }
  });
  
  const payload = {
    "tag": "interactive_message",
    "interactive_message": {
      "elements": elements
    }
  };
  
  const options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(payload)
  };
  
  try {
    Logger.log("\n=== SENDING TO WEBHOOK ===");
    Logger.log("Sending message to webhook...");
    Logger.log("Payload being sent:");
    Logger.log(JSON.stringify(payload, null, 2));
    
    const response = UrlFetchApp.fetch(CONFIG.WEBHOOK_URL, options);
    const responseCode = response.getResponseCode();
    const responseContent = response.getContentText();
    
    Logger.log("\nWebhook Response Details:");
    Logger.log(`Status Code: ${responseCode}`);
    Logger.log("Response Headers:");
    Logger.log(JSON.stringify(response.getAllHeaders(), null, 2));
    Logger.log("Response Content:");
    Logger.log(responseContent);
    
    if (responseCode === 200) {
      Logger.log("\n✅ Message sent successfully!");
      
      try {
        const parsedResponse = JSON.parse(responseContent);
        Logger.log("Parsed Response:");
        Logger.log(JSON.stringify(parsedResponse, null, 2));
      } catch (parseError) {
        Logger.log("Response is not in JSON format");
      }
    } else {
      Logger.log(`\n❌ Unexpected response code: ${responseCode}`);
    }
  } catch (error) {
    Logger.log("\n❌ Error sending message:");
    Logger.log(`Error name: ${error.name}`);
    Logger.log(`Error message: ${error.message}`);
    if (error.stack) {
      Logger.log(`Stack trace: ${error.stack}`);
    }
  }
}

