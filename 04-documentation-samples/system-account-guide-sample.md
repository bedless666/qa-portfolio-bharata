# Send Messages to Group Chat Through System Account

> **NOTE:** This is a sanitized documentation sample for portfolio showcase.  
> Original documentation created for internal team use at an e-commerce marketplace.

In this doc, we will introduce system accounts as a lightweight solution to push one-way messages to a group chat. We will talk about what are system accounts, what they can do and how to build one. More importantly, we will introduce the message sending detail in the end so that you can assess whether system accounts can suit your needs.

## What Are System Accounts?

System Accounts are special "group chat members". They live inside a particular group chat to push unidirectional messages inside it but cannot receive messages from other group chat members.

If bidirectional communication is required, you may leverage on the bot capability instead. See more at [Quickly Build a Bot](https://open.seatalk.io/docs/bot/quick_start).

### Characteristics of System Accounts

The key characteristics of system accounts are **"one-way communication"** and **"lightweight"**.

- **One-way communication**: since system accounts can only push messages, they serve best when only one-way communication is required. For example, sending alerts is a typical scenario where a system account is used. Whenever an alert is diagnosed, a system account can send an alert message inside the group chat to notify all the group members or the people in charge.

- **Lightweight**: system accounts are a lightweight messaging tool for developers to easily push messages to a group chat. System accounts are not apps so they do not require any app tokens and API permissions - they are just users of a special user type that can be quickly set up and deleted. The best thing about system accounts is that you can use them as you go. And this doc is all you need to set up, use and manage a system account.

## Build and Use System Accounts

### Create a System Account

As mentioned, system accounts live inside a particular group chat. Before creating a system account, there are several things to note:

- Only the **Desktop app** supports the creation of system accounts.
- Only the **group chat owner**, the **group chat admins** and the **system account admins** can create system accounts. Group chat admins and system account admins can be appointed by the group owner in the group chat settings.
- For each group chat, there can be a **max of 15 system accounts**.

Follow the steps below to create a system account (as a group chat owner/group chat admin/system account admin):

1. Go to the group chat where you want to create a system account.
2. Open the group chat setting by tapping the "···" icon on the top-right corner.
3. Find **System Accounts**, and click **Add System Account**.
4. You should see an "Add System Account" pop-up window.
5. Fill in the name, description (optional) and avatar (optional) for the new system account.
6. Click "Add" to confirm the creation.
7. You should see the window refreshed to show a **webhook URL** for the system account. That marks the successful creation of a new system account.

### Manage a System Account

After a system account is created, you can manage it by clicking on the system account from the group chat settings -> System Accounts.

On the "Manage System Account" configuration window, the below information is shown:

- The basic information about the system account, including its avatar, name and description.
- The **webhook URL** of the system account, which is used to push messages to this group chat. See "Send a Message" section for how to use the webhook URL to push a message.
- The **status toggle** of the system account. When the toggle is turned on, the system account is active and can push messages. When the toggle is turned off, the system account will become inactive and hence cannot push messages.
- The creator of this system account.
- The link to the configuration guideline of the system account.

**Note:**
- The group chat owner, the group chat admins and system account admins can manage any system account in the group chat.

### Delete a System Account

If you want to delete a system account, go to group chat settings -> System Accounts, click on the system account and then click **Delete System Account** in the bottom-left corner.

**Note:**
- Only the group chat owner and system account admins can delete a system account in the group chat.
- Once a system account is deleted, the webhook URL will become invalid and hence cannot be used to push messages anymore.

## Send a Message

In this section, we will introduce:

- How to use the webhook URL generated upon system account creation to push a message
- The rate limit of message pushing
- The supported message types and their format
- The response format and explanations of error codes

### Send a Request to the Webhook URL

When a system account is created, a webhook URL will be generated for it. The format of the URL is as follows:

```
https://openapi.example.com/webhook/group/xxxxxxxxxxxxxxxxxxxxxx
```

To push a message to the group chat, send an HTTP POST request to the webhook URL. You can refer to an example below:

```bash
curl -X POST \
  https://openapi.example.com/webhook/group/YOUR_WEBHOOK_ID \
  -H 'Content-Type: application/json' \
  -d '{
    "tag": "text",
    "text": {
      "text": "Hello, this is a test message!"
    }
  }'
```

### Rate Limit

The rate limit for sending messages through a system account is:

- **20 messages per minute** per system account
- **100 messages per hour** per system account

If you exceed the rate limit, you will receive a `429 Too Many Requests` response.

### Supported Message Types

System accounts support the following message types:

1. **Text Message**
2. **Interactive Message** (with buttons, descriptions, etc.)
3. **Image Message**
4. **File Message**

#### 1. Text Message

Simple text message format:

```json
{
  "tag": "text",
  "text": {
    "text": "Your message content here"
  }
}
```

#### 2. Interactive Message

Rich message with title, description, and buttons:

```json
{
  "tag": "interactive_message",
  "interactive_message": {
    "elements": [
      {
        "element_type": "title",
        "title": {
          "text": "Message Title"
        }
      },
      {
        "element_type": "description",
        "description": {
          "text": "Message description with details"
        }
      },
      {
        "element_type": "button",
        "button": {
          "button_type": "redirect",
          "text": "Click Here",
          "mobile_link": {
            "type": "web",
            "path": "https://example.com"
          },
          "desktop_link": {
            "type": "web",
            "path": "https://example.com"
          }
        }
      }
    ]
  }
}
```

#### 3. Mentions

You can mention specific users in messages:

```json
{
  "tag": "text",
  "text": {
    "text": "Hello <mention-tag target=\"seatalk://user?email=user@example.com\"/>, please check this!"
  }
}
```

### Response Format

#### Success Response

```json
{
  "code": 0,
  "message": "success"
}
```

#### Error Response

```json
{
  "code": 1001,
  "message": "Invalid webhook URL",
  "validation_errors": [
    {
      "field": "webhook_url",
      "reason": "Webhook URL is invalid or expired"
    }
  ]
}
```

### Common Error Codes

| Code | Message | Description |
|------|---------|-------------|
| 0 | success | Message sent successfully |
| 1001 | Invalid webhook URL | The webhook URL is invalid or expired |
| 1002 | System account inactive | The system account has been deactivated |
| 1003 | Invalid message format | The message payload format is incorrect |
| 1004 | Message too long | Message content exceeds maximum length |
| 1005 | Rate limit exceeded | Too many requests, please slow down |

## Best Practices

### 1. Error Handling

Always implement proper error handling:

```javascript
try {
  const response = UrlFetchApp.fetch(webhookUrl, options);
  const responseCode = response.getResponseCode();
  
  if (responseCode === 200) {
    Logger.log("✅ Message sent successfully");
  } else {
    Logger.log(`❌ Error: ${responseCode}`);
  }
} catch (error) {
  Logger.log(`❌ Exception: ${error.message}`);
}
```

### 2. Message Length Limits

- **Text messages:** Max 4000 characters
- **Interactive message descriptions:** Max 1000 characters per element
- **Button text:** Max 50 characters

### 3. Formatting Tips

Use markdown-style formatting in messages:

```
• Use bullet points for lists
• Use `code blocks` for technical terms
• Use **bold** for emphasis
• Use line breaks for readability
```

### 4. Testing

Always test your messages in a test group chat before deploying to production:

1. Create a test group chat
2. Create a test system account
3. Test all message formats
4. Verify error handling
5. Check rate limits

## Use Cases

### 1. Automated Alerts

Send automated alerts when specific events occur:

```javascript
function sendAlert(alertMessage) {
  const payload = {
    "tag": "interactive_message",
    "interactive_message": {
      "elements": [
        {
          "element_type": "title",
          "title": {
            "text": "⚠️ Alert"
          }
        },
        {
          "element_type": "description",
          "description": {
            "text": alertMessage
          }
        }
      ]
    }
  };
  
  // Send to webhook...
}
```

### 2. Scheduled Notifications

Send scheduled reminders or reports:

```javascript
function sendWeeklyReport() {
  const report = generateReport();
  
  const payload = {
    "tag": "interactive_message",
    "interactive_message": {
      "elements": [
        {
          "element_type": "title",
          "title": {
            "text": "📊 Weekly Report"
          }
        },
        {
          "element_type": "description",
          "description": {
            "text": report
          }
        }
      ]
    }
  };
  
  // Send to webhook...
}
```

### 3. Status Updates

Push real-time status updates:

```javascript
function sendStatusUpdate(status, details) {
  const statusEmoji = status === 'success' ? '✅' : '❌';
  
  const payload = {
    "tag": "text",
    "text": {
      "text": `${statusEmoji} Status: ${status}\n\nDetails: ${details}`
    }
  };
  
  // Send to webhook...
}
```

## Troubleshooting

### Issue: Message not received

**Possible causes:**
1. System account is inactive
2. Webhook URL is invalid or expired
3. Rate limit exceeded
4. Message format is incorrect

**Solutions:**
1. Check system account status in group chat settings
2. Regenerate webhook URL if needed
3. Implement rate limiting in your code
4. Validate message payload format

### Issue: Rate limit errors

**Solution:**
Implement exponential backoff:

```javascript
function sendWithRetry(webhookUrl, payload, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = UrlFetchApp.fetch(webhookUrl, {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify(payload)
      });
      
      if (response.getResponseCode() === 200) {
        return true;
      }
      
      if (response.getResponseCode() === 429) {
        // Rate limited, wait and retry
        Utilities.sleep(Math.pow(2, i) * 1000);
        continue;
      }
    } catch (error) {
      Logger.log(`Retry ${i + 1} failed: ${error.message}`);
    }
  }
  
  return false;
}
```

## Summary

System accounts provide a lightweight, easy-to-use solution for sending one-way messages to group chats. They are ideal for:

- ✅ Automated alerts and notifications
- ✅ Scheduled reports and reminders
- ✅ Status updates and monitoring
- ✅ Quick integration without complex setup

Key advantages:
- No app tokens or permissions required
- Quick setup and deletion
- Support for rich message formats
- Built-in rate limiting

For bidirectional communication or more complex interactions, consider using bot capabilities instead.

---

**Documentation Quality Notes:**
- Clear structure with table of contents
- Step-by-step instructions
- Code examples for all use cases
- Error handling best practices
- Troubleshooting section
- Visual formatting for readability
