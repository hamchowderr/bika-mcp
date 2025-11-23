# User Endpoints

API endpoints for user profile and account management.

## Get User Profile

Retrieve the authenticated user's profile information.

### Endpoint

```
GET /v1/user/profile
```

### Authentication

Requires Bearer token in Authorization header.

### Request

No parameters required. Returns profile for the currently authenticated user.

```bash
curl -X GET "https://bika.ai/api/openapi/bika/v1/user/profile" \
  -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}"
```

### Response

**Status:** 200 OK

**Content-Type:** `application/json`

#### Response Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | User ID |
| `name` | string | Yes | User's display name |
| `email` | string \| null | Yes | User's email address |
| `phone` | string \| null | No | User's phone number |
| `settings` | object | No | User preferences and settings |
| `timeZone` | string | No | User's timezone |
| `avatar` | object | Yes | User's avatar information |
| `metadata` | object | No | Additional user metadata |
| `createdAt` | string | No | Account creation timestamp |

#### Settings Object

| Field | Type | Description |
|-------|------|-------------|
| `themeMode` | string | Theme mode: "light" or "dark" |
| `themeStyle` | string | Theme style (e.g., "dracula") |
| `customColors` | string | Custom color scheme |
| `locale` | string | User's preferred language (e.g., "en") |
| `notification` | object | Notification preferences |
| `questionaire` | boolean | Questionnaire completion status |

#### Notification Object

| Field | Type | Description |
|-------|------|-------------|
| `email` | boolean | Email notifications enabled |
| `push` | boolean | Push notifications enabled |
| `SMS` | boolean | SMS notifications enabled |

#### Avatar Object

| Field | Type | Description |
|-------|------|-------------|
| `type` | string | Avatar type (e.g., "PRESET") |
| `url` | string | Avatar image URL |

#### Metadata Object

| Field | Type | Description |
|-------|------|-------------|
| `referralCode` | string | User's referral code |
| `referralUserId` | string | ID of user who referred this user |
| `referralAwarded` | boolean | Referral reward status |
| `mobileAppInstallAward` | boolean | Mobile app install reward status |
| `isChinaUser` | boolean | Whether user is from China |
| `isPremiumPlanNotified` | boolean | Premium plan notification status |
| `nodeTypeFirstVisits` | object | First visit flags for different node types |

### Example Response

```json
{
  "id": "usr_abc123",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "settings": {
    "themeMode": "light",
    "themeStyle": "dracula",
    "customColors": "DEFAULT",
    "locale": "en",
    "notification": {
      "email": true,
      "push": true,
      "SMS": false
    },
    "questionaire": true
  },
  "timeZone": "America/New_York",
  "avatar": {
    "type": "PRESET",
    "url": "https://bika.ai/avatars/preset/1.png"
  },
  "metadata": {
    "referralCode": "JOHN2023",
    "referralUserId": "usr_xyz789",
    "referralAwarded": true,
    "mobileAppInstallAward": false,
    "isChinaUser": false,
    "isPremiumPlanNotified": true,
    "nodeTypeFirstVisits": {
      "database": true,
      "automation": false
    }
  },
  "createdAt": "2023-01-15T10:30:00Z"
}
```

### Use Cases

- Get current user information
- Display user profile in UI
- Check user preferences and settings
- Verify user account details
- Access referral information

### Notes

- Email can be null if not provided
- Phone is optional
- Settings and metadata objects may have additional properties not listed
- Avatar URL should be used directly for display
- createdAt is in ISO 8601 format

### Error Responses

**401 Unauthorized**
```json
{
  "success": false,
  "code": 401,
  "message": "Unauthorized - Invalid or missing API token"
}
```

**403 Forbidden**
```json
{
  "success": false,
  "code": 403,
  "message": "Forbidden - Insufficient permissions"
}
```

### Integration Example

#### JavaScript/TypeScript

```typescript
async function getUserProfile(apiToken: string) {
  const response = await fetch('https://bika.ai/api/openapi/bika/v1/user/profile', {
    headers: {
      'Authorization': `Bearer ${apiToken}`
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to get user profile: ${response.statusText}`);
  }

  const profile = await response.json();
  return profile;
}

// Usage
const profile = await getUserProfile('your-token-here');
console.log(`Welcome, ${profile.name}!`);
console.log(`Email: ${profile.email}`);
console.log(`Theme: ${profile.settings.themeMode}`);
```

#### Python

```python
import requests

def get_user_profile(api_token: str):
    url = 'https://bika.ai/api/openapi/bika/v1/user/profile'
    headers = {
        'Authorization': f'Bearer {api_token}'
    }

    response = requests.get(url, headers=headers)
    response.raise_for_status()

    return response.json()

# Usage
profile = get_user_profile('your-token-here')
print(f"Welcome, {profile['name']}!")
```

---

## See Also

- [Authentication](./authentication.md) - How to obtain and use API tokens
- [API Overview](./README.md) - General API information
