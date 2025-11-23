# Database Operations

CRUD (Create, Read, Update, Delete) operations for database records.

## Prerequisites

Before performing database operations, you need:
- `{SPACE_ID}` - The ID of the space containing the database
- `{NODE_ID}` - The ID of the database node (Note: Node ID = Database ID)
- `{YOUR_ACCESS_TOKEN}` - Your API authentication token

## Get Records

Retrieves a list of records from the specified database.

### Endpoint

```
GET /spaces/{SPACE_ID}/resources/databases/{NODE_ID}/records
```

### Request

```bash
curl -X GET 'https://bika.ai/api/openapi/bika/v1/spaces/{SPACE_ID}/resources/databases/{NODE_ID}/records' \
  -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}"
```

### Response

Returns a list of records with their field values.

## Create Record

Creates a new record in the specified database.

### Endpoint

```
POST /spaces/{SPACE_ID}/resources/databases/{NODE_ID}/records
```

### Request

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

### Request Body

```json
{
  "cells": {
    "FieldName1": "Value1",
    "FieldName2": "Value2"
  }
}
```

- `cells` - Object containing field names as keys and their values

## Update Record

Updates an existing record in the database.

### Endpoint

```
PATCH /spaces/{SPACE_ID}/resources/databases/{NODE_ID}/records
```

### Request

```bash
curl -X PATCH "https://bika.ai/api/openapi/bika/v1/spaces/{SPACE_ID}/resources/databases/{NODE_ID}/records" \
  -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "{RECORD_ID}",
    "cells": {
      "Task": "Updated description field column"
    }
  }'
```

### Request Body

```json
{
  "id": "{RECORD_ID}",
  "cells": {
    "FieldName": "Updated Value"
  }
}
```

- `id` - The ID of the record to update
- `cells` - Object containing field names to update and their new values

### Example

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

## Delete Record

Deletes a record from the database.

### Endpoint

```
DELETE /spaces/{SPACE_ID}/resources/databases/{NODE_ID}/records/{RECORD_ID}
```

### Request

```bash
curl -X DELETE "https://bika.ai/api/openapi/bika/v1/spaces/{SPACE_ID}/resources/databases/{NODE_ID}/records/{RECORD_ID}" \
  -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}"
```

### Parameters

- `{SPACE_ID}` - The space containing the database
- `{NODE_ID}` - The database ID
- `{RECORD_ID}` - The ID of the record to delete

## Notes

- All database operations require proper authentication
- Field names in `cells` must match the exact field names in your database
- Record IDs are returned when creating or listing records
