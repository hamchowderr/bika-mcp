# System Endpoints

System-level endpoints for retrieving meta information and space lists.

## Get System Meta Info

Retrieves system metadata including version, environment, and hostname.

### Endpoint

```
GET /system/meta
```

### Request

```bash
curl -X GET "https://bika.ai/api/openapi/bika/v1/system/meta" \
  -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}"
```

### Response

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

### Response Fields

- `version` - Current API version
- `appEnv` - Application environment (PRODUCTION, STAGING, etc.)
- `hostname` - Base hostname for the API
- `headers` - Request headers information

## Get Space List

Retrieves a list of all spaces accessible to the authenticated user.

### Endpoint

```
GET /spaces
```

### Request

```bash
curl -X GET "https://bika.ai/api/openapi/bika/v1/spaces" \
  -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}"
```

### Response

Returns a list of spaces with their IDs, names, and other metadata.

### Use Case

This endpoint is typically used to:
- Discover available spaces for the authenticated user
- Get space IDs needed for subsequent API calls
- List all workspaces in an application
