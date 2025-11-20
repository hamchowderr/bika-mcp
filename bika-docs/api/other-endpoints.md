# Other Endpoints

Additional API endpoints for attachments, automation, and webhooks.

## Upload Attachments

Upload files to be used in database records.

### Important Note

This interface needs to be used in conjunction with the "Create Record" or "Update Record" interface:

1. Upload the attachment using this endpoint
2. Get the return value from the `data` attribute in the response
3. Use this value as the field value for the attachment field
4. Write it into the database using "Create Record" or "Update Record"

### Endpoint

```
POST /spaces/{SPACE_ID}/attachments
```

### Request

```bash
curl -X POST "https://bika.ai/api/openapi/bika/v1/spaces/{SPACE_ID}/attachments" \
  -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}" \
  -F 'file=@./example.png'
```

### Parameters

- `{SPACE_ID}` - The ID of the space where the attachment will be stored
- `file` - The file to upload (using multipart/form-data)

### Response

Returns attachment data that can be used in record creation/update operations.

### Workflow Example

```bash
# Step 1: Upload attachment
curl -X POST "https://bika.ai/api/openapi/bika/v1/spaces/{SPACE_ID}/attachments" \
  -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}" \
  -F 'file=@./document.pdf'

# Step 2: Use the returned data value in record creation
curl -X POST "https://bika.ai/api/openapi/bika/v1/spaces/{SPACE_ID}/resources/databases/{NODE_ID}/records" \
  -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "cells": {
      "Name": "Document Record",
      "Attachment": "[DATA_FROM_UPLOAD_RESPONSE]"
    }
  }'
```

## List Automation Triggers

Retrieves a list of automation triggers for a specific automation node.

### Endpoint

```
GET /spaces/{SPACE_ID}/resources/automation/{NODE_ID}/triggers
```

### Request

```bash
curl -X GET "https://bika.ai/api/openapi/bika/v1/spaces/{SPACE_ID}/resources/automation/{NODE_ID}/triggers" \
  -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}"
```

### Parameters

- `{SPACE_ID}` - The ID of the space
- `{NODE_ID}` - The ID of the automation node

### Response

Returns a list of triggers configured for the automation.

## Register Outbound Webhook

Creates a webhook that listens for specific events in Bika.ai.

### Endpoint

```
POST /spaces/{SPACE_ID}/outgoing-webhooks
```

### Request

```bash
curl -X POST "https://bika.ai/api/openapi/bika/v1/spaces/{SPACE_ID}/outgoing-webhooks" \
  -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "eventType": "ON_RECORD_CREATED",
    "name": "Create webhook",
    "description": "Example trigger when a new record is created",
    "callbackURL": "https://your-custom-callback-url.com"
  }'
```

### Request Body

```json
{
  "eventType": "ON_RECORD_CREATED",
  "name": "Webhook Name",
  "description": "Description of the webhook",
  "callbackURL": "https://your-callback-url.com"
}
```

### Fields

- `eventType` - The type of event to trigger the webhook (e.g., `ON_RECORD_CREATED`)
- `name` - Name of the webhook
- `description` - Description of what the webhook does
- `callbackURL` - The URL that will receive webhook POST requests

### Event Types

Available event types include:
- `ON_RECORD_CREATED` - Triggered when a new record is created
- (Additional event types may be available - check API documentation)

### Use Cases

Webhooks can be used to:
- Sync data to external systems when records are created/updated
- Trigger external workflows based on Bika.ai events
- Send notifications to other services
- Build integrations with third-party platforms
