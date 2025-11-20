# File Fields

Fields for handling file attachments and uploads.

## Attachment

Stores various file types including documents, images, audio, and more.

### Use Cases
- Document storage
- Image galleries
- File uploads
- Media files
- Supporting documents
- Proof of work
- Design assets

### Characteristics
- Supports multiple file uploads
- Records file metadata (name, size, URL)
- Provides access URLs
- Thumbnail support for images
- MIME type information
- Facilitates file management

### Write

**Type:** `array`

**Items:** `object`

**Object Properties:**
- `id` (required) - Attachment ID
- `name` (optional) - Attachment name

**Example:**
```json
[
  {"id": "attach123"},
  {"id": "attach456"}
]
```

**With Names:**
```json
[
  {"id": "attach123", "name": "document.pdf"},
  {"id": "attach456", "name": "image.png"}
]
```

**Notes:**
- Must upload attachment first using the upload endpoint
- Use the returned attachment ID in this field
- Multiple attachments supported as array items

### Read

#### cellFormat: json
**Type:** `array`

**Items:** `object`

**Object Properties:**
- `id` - Attachment ID (string)
- `name` - File name (string)
- `mimeType` - MIME type (string)
- `size` - File size in bytes (number)
- `url` - Access URL (string)
- `thumbnailUrl` - Thumbnail URL for images (string)

**Example:**
```json
[
  {
    "id": "att1",
    "name": "file1.pdf",
    "mimeType": "application/pdf",
    "size": 102400,
    "url": "https://example.com/file1.pdf",
    "thumbnailUrl": ""
  },
  {
    "id": "att2",
    "name": "photo.jpg",
    "mimeType": "image/jpeg",
    "size": 524288,
    "url": "https://example.com/photo.jpg",
    "thumbnailUrl": "https://example.com/photo_thumb.jpg"
  }
]
```

#### cellFormat: string
**Type:** `string`

**Format:** `filename(url)`

**Example:**
```json
"file1.pdf(https://example.com/file1.pdf)"
```

**Multiple Attachments:**
```json
"file1.pdf(https://example.com/file1.pdf), photo.jpg(https://example.com/photo.jpg)"
```

**Note:** Multiple attachments are separated by commas

---

## Attachment Workflow

### Complete Upload and Attach Process

#### Step 1: Upload File

```bash
curl -X POST "https://bika.ai/api/openapi/bika/v1/spaces/{SPACE_ID}/attachments" \
  -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}" \
  -F 'file=@./document.pdf'
```

**Response:**
```json
{
  "success": true,
  "code": 200,
  "data": {
    "id": "attach123",
    "name": "document.pdf",
    "size": 102400,
    "url": "https://example.com/attach123"
  }
}
```

#### Step 2: Create/Update Record with Attachment

```bash
curl -X POST "https://bika.ai/api/openapi/bika/v1/spaces/{SPACE_ID}/resources/databases/{NODE_ID}/records" \
  -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "cells": {
      "Name": "Document Record",
      "Attachments": [{"id": "attach123"}]
    }
  }'
```

---

## Summary Table

| Field Type | Write Type | Required Properties | Read Properties |
|------------|-----------|---------------------|-----------------|
| Attachment | array of objects | `id` | `id`, `name`, `mimeType`, `size`, `url`, `thumbnailUrl` |

## File Metadata

### MIME Types

Common MIME types you might encounter:

| File Type | MIME Type |
|-----------|-----------|
| PDF | `application/pdf` |
| Word Doc | `application/msword` |
| Word (DOCX) | `application/vnd.openxmlformats-officedocument.wordprocessingml.document` |
| Excel | `application/vnd.ms-excel` |
| Excel (XLSX) | `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` |
| JPEG Image | `image/jpeg` |
| PNG Image | `image/png` |
| GIF Image | `image/gif` |
| MP3 Audio | `audio/mpeg` |
| MP4 Video | `video/mp4` |
| ZIP Archive | `application/zip` |
| Plain Text | `text/plain` |

### File Size

- Returned in bytes
- Example: `102400` bytes = 100 KB
- Convert for display: `size / 1024` for KB, `size / 1024 / 1024` for MB

### Thumbnail URL

- Available for image files
- Empty string for non-image files
- Useful for image galleries and previews

## Validation

### Valid Write Examples

```json
// ✅ Single attachment
[{"id": "attach123"}]

// ✅ Multiple attachments
[
  {"id": "attach123"},
  {"id": "attach456"}
]

// ✅ With optional names
[
  {"id": "attach123", "name": "document.pdf"}
]

// ✅ Empty array (no attachments)
[]
```

### Invalid Write Examples

```json
// ❌ Not an array
{"id": "attach123"}

// ❌ Missing id
[{"name": "document.pdf"}]

// ❌ String instead of object
["attach123"]

// ❌ Invalid attachment ID
[{"id": "nonexistent123"}]
```

## Important Notes

1. **Upload First**: Always upload the file before attaching to a record
2. **Use Attachment ID**: The ID returned from upload endpoint is required
3. **Array Format**: Even single attachments must be in array format
4. **Multiple Files**: Support for multiple files in single field
5. **File Access**: Use the `url` property to download/access files
6. **Thumbnails**: Available for image files, useful for UI display

## Best Practices

1. **Upload Error Handling**: Check upload response before creating record
2. **File Validation**: Validate file type and size before upload
3. **Naming**: Provide meaningful names for better organization
4. **Cleanup**: Consider removing unused attachments to save space
5. **Security**: Validate file types on upload to prevent malicious files
6. **URL Expiration**: Note that attachment URLs may have expiration times

## Integration Example

### JavaScript/TypeScript

```typescript
// Upload file
async function uploadAndAttach(spaceId: string, nodeId: string, file: File) {
  // Step 1: Upload file
  const formData = new FormData();
  formData.append('file', file);

  const uploadResponse = await fetch(
    `https://bika.ai/api/openapi/bika/v1/spaces/${spaceId}/attachments`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    }
  );

  const uploadData = await uploadResponse.json();
  const attachmentId = uploadData.data.id;

  // Step 2: Create record with attachment
  const recordResponse = await fetch(
    `https://bika.ai/api/openapi/bika/v1/spaces/${spaceId}/resources/databases/${nodeId}/records`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cells: {
          Name: 'My Document',
          Attachments: [{ id: attachmentId }]
        }
      })
    }
  );

  return recordResponse.json();
}
```

## Reference

For upload endpoint details, see [Other Endpoints - Upload Attachments](../api/other-endpoints.md#upload-attachments)
