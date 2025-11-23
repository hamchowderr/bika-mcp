# Field Types Quick Reference

Quick lookup table for all Bika field types and their data formats.

## All Field Types Overview

| Field Type | Category | Writable | Write Type | Read JSON Type | Read String Type |
|------------|----------|----------|-----------|----------------|------------------|
| Single Line Text | Text | ✅ | string | string | string |
| Multi Line Text | Text | ✅ | string | string | string (with `<br>`) |
| URL | Text | ✅ | string | string | string |
| Email | Text | ✅ | string | string | string |
| Phone | Text | ✅ | string | string | string |
| Number | Numeric | ✅ | number | number | string |
| Currency | Numeric | ✅ | number | number | string (with symbol) |
| Percent | Numeric | ✅ | number | number | string (with %) |
| Rating | Numeric | ✅ | number (int) | number | string |
| AutoNumber | System | ❌ | - | number | string |
| CheckBox | Selection | ✅ | boolean | boolean | string |
| Single Select | Selection | ✅ | string | string | string |
| Multi Select | Selection | ✅ | array of string | array of string | string (comma-sep) |
| Member | Relationship | ✅ | array of string | array of object | string (names) |
| DateTime | Date/Time | ✅ | string (ISO 8601) | string (ISO 8601) | string (local time) |
| Date Range | Date/Time | ✅ | string (start/end) | string (formatted) | string (formatted) |
| Attachment | File | ✅ | array of object | array of object | string (name+url) |
| Created Time | System | ❌ | - | string (ISO 8601) | string (local time) |
| Modified Time | System | ❌ | - | string (ISO 8601) | string (local time) |
| Created By | System | ❌ | - | object | string (name) |
| Modified By | System | ❌ | - | object | string (name) |
| Link | Relationship | ✅ | array of string | array of string | string (comma-sep) |
| Lookup | Relationship | ❌ | - | varies | array of any |
| Formula | Computed | ❌ | - | varies | varies |

## Write Examples by Category

### Text Fields

```json
{
  "Single Line Text": "example text",
  "Multi Line Text": "Line 1\nLine 2",
  "URL": "https://example.com",
  "Email": "user@example.com",
  "Phone": "+8613800138000"
}
```

### Numeric Fields

```json
{
  "Number": 123.45,
  "Currency": 199.99,
  "Percent": 75.5,
  "Rating": 4
}
```

### Selection Fields

```json
{
  "CheckBox": true,
  "Single Select": "In Progress",
  "Multi Select": ["Option1", "Option2"]
}
```

### Date/Time Fields

```json
{
  "DateTime": "2023-10-01T12:00:00Z",
  "Date Range": "2023-10-01T00:00:00Z/2023-10-07T23:59:59Z"
}
```

### File Fields

```json
{
  "Attachment": [
    {"id": "attach123"},
    {"id": "attach456", "name": "document.pdf"}
  ]
}
```

### Relationship Fields

```json
{
  "Member": ["mem123", "mem456"],
  "Link": ["rec123", "rec456"]
}
```

### System & Computed Fields

```json
// These cannot be written - read-only
// AutoNumber, Created Time, Modified Time, Created By, Modified By, Lookup, Formula
```

## Read Examples (JSON Format)

### Text Fields

```json
{
  "Single Line Text": "example text",
  "Multi Line Text": "Line 1\nLine 2",
  "URL": "https://example.com",
  "Email": "user@example.com",
  "Phone": "+8613800138000"
}
```

### Numeric Fields

```json
{
  "Number": 123.45,
  "Currency": 199.99,
  "Percent": 75.5,
  "Rating": 4,
  "AutoNumber": 1
}
```

### Selection Fields

```json
{
  "CheckBox": true,
  "Single Select": "In Progress",
  "Multi Select": ["Option1", "Option2"]
}
```

### Date/Time Fields

```json
{
  "DateTime": "2023-10-01T12:00:00Z",
  "Date Range": "2023-10-01 -> 2023-10-07"
}
```

### File Fields

```json
{
  "Attachment": [
    {
      "id": "att1",
      "name": "file.pdf",
      "mimeType": "application/pdf",
      "size": 102400,
      "url": "https://example.com/file.pdf",
      "thumbnailUrl": ""
    }
  ]
}
```

### Relationship Fields

```json
{
  "Member": [
    {
      "id": "mem123",
      "type": "Member",
      "name": "John Doe"
    }
  ],
  "Link": ["rec123", "rec456"],
  "Lookup": "Looked up value"
}
```

### System Fields

```json
{
  "Created Time": "2023-09-01T08:00:00Z",
  "Modified Time": "2023-09-02T09:30:00Z",
  "Created By": {
    "id": "mem456",
    "name": "John Doe"
  },
  "Modified By": {
    "id": "mem789",
    "name": "Jane Smith"
  }
}
```

### Computed Fields

```json
{
  "Formula": "Calculated Value"  // Type varies
}
```

## Read Examples (String Format)

### Text Fields

```json
{
  "Single Line Text": "example text",
  "Multi Line Text": "Line 1 <br> Line 2",
  "URL": "https://example.com",
  "Email": "user@example.com",
  "Phone": "+8613800138000"
}
```

### Numeric Fields

```json
{
  "Number": "123.4500",
  "Currency": "$199.99",
  "Percent": "75.50%",
  "Rating": "4",
  "AutoNumber": "1"
}
```

### Selection Fields

```json
{
  "CheckBox": "true",
  "Single Select": "In Progress",
  "Multi Select": "Option1, Option2"
}
```

### Date/Time Fields

```json
{
  "DateTime": "2023-10-01 20:00:00",
  "Date Range": "2023-10-01 -> 2023-10-07"
}
```

### File Fields

```json
{
  "Attachment": "file.pdf(https://example.com/file.pdf)"
}
```

### Relationship Fields

```json
{
  "Member": "John Doe",
  "Link": "rec123, rec456",
  "Lookup": ["value1", "value2"]
}
```

### System Fields

```json
{
  "Created Time": "2023-09-01 16:00:00",
  "Modified Time": "2023-09-02 17:30:00",
  "Created By": "John Doe",
  "Modified By": "Jane Smith"
}
```

## Field Categories

### ✅ Writable Fields

Can be set via API:
- Single Line Text
- Multi Line Text
- URL
- Email
- Phone
- Number
- Currency
- Percent
- Rating
- CheckBox
- Single Select
- Multi Select
- Member
- DateTime
- Date Range
- Attachment
- Link

### ❌ Read-Only Fields

Cannot be set via API (auto-calculated or system-managed):
- AutoNumber
- Created Time
- Modified Time
- Created By
- Modified By
- Lookup
- Formula

## Common Data Type Patterns

### String Types

```json
"text value"
```

Fields: Single/Multi Line Text, URL, Email, Phone, Single Select

### Number Types

```json
123.45
```

Fields: Number, Currency, Percent, Rating, AutoNumber

### Boolean Types

```json
true
```

Fields: CheckBox

### Array of Strings

```json
["value1", "value2"]
```

Fields: Multi Select, Link

### Array of Objects

```json
[{"id": "id1", "name": "name1"}]
```

Fields: Member (read), Attachment (read)

### ISO 8601 DateTime

```json
"2023-10-01T12:00:00Z"
```

Fields: DateTime, Created Time, Modified Time

### Date Range Format

```json
"2023-10-01T00:00:00Z/2023-10-07T23:59:59Z"
```

Fields: Date Range

## Validation Quick Check

### ✅ Valid Write Operations

```json
{
  "Text Field": "string",
  "Number Field": 123,
  "CheckBox": true,
  "Select": "Option",
  "Multi Select": ["A", "B"],
  "DateTime": "2023-10-01T12:00:00Z",
  "Member": ["mem123"],
  "Link": ["rec123"],
  "Attachment": [{"id": "att123"}]
}
```

### ❌ Common Mistakes

```json
{
  "Number Field": "123",           // ❌ String instead of number
  "CheckBox": "true",              // ❌ String instead of boolean
  "Multi Select": "Option",        // ❌ String instead of array
  "Member": "mem123",              // ❌ String instead of array
  "DateTime": "10/01/2023",        // ❌ Wrong date format
  "AutoNumber": 5,                 // ❌ Trying to write read-only
  "Formula": "value"               // ❌ Trying to write read-only
}
```

## Quick Decision Tree

**Need to store text?**
- Short, one line → Single Line Text
- Multiple lines → Multi Line Text
- Web link → URL
- Email → Email
- Phone → Phone

**Need to store numbers?**
- Regular number → Number
- Money → Currency
- Percentage → Percent
- Star rating → Rating

**Need user selection?**
- Yes/No → CheckBox
- One from list → Single Select
- Multiple from list → Multi Select

**Need dates/times?**
- Specific moment → DateTime
- Time period → Date Range

**Need files?**
- Use → Attachment

**Need relationships?**
- To users/teams → Member
- To other records → Link
- Display linked data → Lookup

**Need calculations?**
- Use → Formula

**Need system tracking?**
- Auto numbering → AutoNumber
- Track creation → Created Time, Created By
- Track changes → Modified Time, Modified By

## TypeScript Type Definitions

```typescript
// Write types
type WritableFields = {
  // Text
  'Single Line Text'?: string;
  'Multi Line Text'?: string;
  'URL'?: string;
  'Email'?: string;
  'Phone'?: string;

  // Numeric
  'Number'?: number;
  'Currency'?: number;
  'Percent'?: number;
  'Rating'?: number;

  // Selection
  'CheckBox'?: boolean;
  'Single Select'?: string;
  'Multi Select'?: string[];

  // Date/Time
  'DateTime'?: string;  // ISO 8601
  'Date Range'?: string;  // "start/end"

  // File
  'Attachment'?: Array<{id: string; name?: string}>;

  // Relationship
  'Member'?: string[];
  'Link'?: string[];
};

// Read types (JSON format)
type ReadableFields = WritableFields & {
  // System (read-only)
  'AutoNumber'?: number;
  'Created Time'?: string;
  'Modified Time'?: string;
  'Created By'?: {id: string; name: string};
  'Modified By'?: {id: string; name: string};

  // Computed (read-only)
  'Lookup'?: any;
  'Formula'?: string | number | boolean | any[];

  // Enhanced read types
  'Member'?: Array<{id: string; type: string; name: string}>;
  'Attachment'?: Array<{
    id: string;
    name: string;
    mimeType: string;
    size: number;
    url: string;
    thumbnailUrl: string;
  }>;
};
```

## See Also

- [Overview](./overview.md) - Field models and error handling
- [Text Fields](./text-fields.md)
- [Numeric Fields](./numeric-fields.md)
- [Selection Fields](./selection-fields.md)
- [Date & Time Fields](./date-time-fields.md)
- [File Fields](./file-fields.md)
- [System Fields](./system-fields.md)
- [Relationship Fields](./relationship-fields.md)
- [Computed Fields](./computed-fields.md)
