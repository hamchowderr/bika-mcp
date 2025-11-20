# API Examples

Complete cURL examples for all Bika.ai API operations.

## Prerequisites

Replace these placeholders in all examples:
- `{YOUR_ACCESS_TOKEN}` - Your Bika.ai API token
- `{SPACE_ID}` - Your space ID
- `{NODE_ID}` - Your database/automation node ID
- `{RECORD_ID}` - The record ID

## System Operations

### Get System Meta Info

```bash
curl -X GET "https://bika.ai/api/openapi/bika/v1/system/meta" \
  -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}"
```

**Example Response:**
```json
{
  "success": true,
  "code": 200,
  "message": "SUCCESS",
  "data": {
    "version": "1.0.0-release.0",
    "appEnv": "PRODUCTION",
    "hostname": "https://bika.ai",
    "headers": {
      "X-Forwarded-For": "35.96.5.64",
      "User-Agent": "curl/8.4.0"
    }
  }
}
```

### Get Space List

```bash
curl -X GET "https://bika.ai/api/openapi/bika/v1/spaces" \
  -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}"
```

## Database Operations

### Get Records from Database

```bash
curl -X GET 'https://bika.ai/api/openapi/bika/v1/spaces/{SPACE_ID}/resources/databases/{NODE_ID}/records' \
  -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}"
```

### Create a New Record

```bash
curl -X POST "https://bika.ai/api/openapi/bika/v1/spaces/{SPACE_ID}/resources/databases/{NODE_ID}/records" \
  -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "cells": {
      "Name": "New record",
      "Description": "This is a new database record"
    }
  }'
```

### Update a Record

**Full Example with Real IDs:**
```bash
curl -X PATCH "https://bika.ai/api/openapi/bika/v1/spaces/spcpPuRJJC4CZOwzB9Vlwmja/resources/databases/datkW11Rxx6hFJO924ECNxLk/records" \
  -H "Authorization: Bearer bkteM550dHdXyTKN4Wkp59pYX8JD5cDU7rB" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "recpx8ZUBHmRFuD0fGTObHxL",
    "cells": {
      "Task": "Updated description field column"
    }
  }'
```

**Template:**
```bash
curl -X PATCH "https://bika.ai/api/openapi/bika/v1/spaces/{SPACE_ID}/resources/databases/{NODE_ID}/records" \
  -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "{RECORD_ID}",
    "cells": {
      "FieldName": "Updated Value"
    }
  }'
```

### Delete a Record

```bash
curl -X DELETE "https://bika.ai/api/openapi/bika/v1/spaces/{SPACE_ID}/resources/databases/{NODE_ID}/records/{RECORD_ID}" \
  -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}"
```

## Attachment Operations

### Upload an Attachment

```bash
curl -X POST "https://bika.ai/api/openapi/bika/v1/spaces/{SPACE_ID}/attachments" \
  -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}" \
  -F 'file=@./example.png'
```

**Different File Types:**
```bash
# Upload a PDF
curl -X POST "https://bika.ai/api/openapi/bika/v1/spaces/{SPACE_ID}/attachments" \
  -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}" \
  -F 'file=@./document.pdf'

# Upload an image
curl -X POST "https://bika.ai/api/openapi/bika/v1/spaces/{SPACE_ID}/attachments" \
  -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}" \
  -F 'file=@./photo.jpg'
```

### Create Record with Attachment

```bash
# Step 1: Upload the file
ATTACHMENT_DATA=$(curl -X POST "https://bika.ai/api/openapi/bika/v1/spaces/{SPACE_ID}/attachments" \
  -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}" \
  -F 'file=@./example.png')

# Step 2: Use the attachment data in record creation
curl -X POST "https://bika.ai/api/openapi/bika/v1/spaces/{SPACE_ID}/resources/databases/{NODE_ID}/records" \
  -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "cells": {
      "Name": "Record with attachment",
      "AttachmentField": "'"$ATTACHMENT_DATA"'"
    }
  }'
```

## Automation Operations

### List Automation Triggers

```bash
curl -X GET "https://bika.ai/api/openapi/bika/v1/spaces/{SPACE_ID}/resources/automation/{NODE_ID}/triggers" \
  -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}"
```

## Webhook Operations

### Register an Outbound Webhook

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

## Complete Workflow Example

Here's a complete workflow that demonstrates multiple operations:

```bash
# 1. Get system info
curl -X GET "https://bika.ai/api/openapi/bika/v1/system/meta" \
  -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}"

# 2. List available spaces
curl -X GET "https://bika.ai/api/openapi/bika/v1/spaces" \
  -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}"

# 3. Get existing records
curl -X GET "https://bika.ai/api/openapi/bika/v1/spaces/{SPACE_ID}/resources/databases/{NODE_ID}/records" \
  -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}"

# 4. Create a new record
curl -X POST "https://bika.ai/api/openapi/bika/v1/spaces/{SPACE_ID}/resources/databases/{NODE_ID}/records" \
  -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "cells": {
      "Name": "New Task",
      "Status": "In Progress",
      "Priority": "High"
    }
  }'

# 5. Update the record
curl -X PATCH "https://bika.ai/api/openapi/bika/v1/spaces/{SPACE_ID}/resources/databases/{NODE_ID}/records" \
  -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "{RECORD_ID}",
    "cells": {
      "Status": "Completed"
    }
  }'
```

## Tips

- Always replace placeholder values with your actual IDs and tokens
- Use `Content-Type: application/json` header for POST/PATCH requests with JSON data
- Use `-F` flag for file uploads (multipart/form-data)
- Store your access token securely, never in source code
- Check response codes to ensure operations succeeded
