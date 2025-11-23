# Authentication

All Bika.ai API requests require authentication using a Bearer token.

## Access Token

You need to obtain an API access token from Bika.ai before making any API requests.

## Using the Token

Include your access token in the `Authorization` header of every API request:

```
Authorization: Bearer {YOUR_ACCESS_TOKEN}
```

## Example

```bash
curl -X GET "https://bika.ai/api/openapi/bika/v1/spaces" \
  -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}"
```

Replace `{YOUR_ACCESS_TOKEN}` with your actual API token.

## Security Best Practices

- Keep your access token secure and never share it publicly
- Do not commit tokens to version control
- Use environment variables to store tokens in your applications
- Rotate tokens regularly if possible

## Token Format

Bika.ai access tokens typically follow this format:

```
bkteXXXXXXXXXXXXXXXXXXXXXXXX
```

Where `XXXX...` represents the unique token identifier.
