# Text Fields

Text-based field types in Bika for storing various forms of textual information.

## Single Line Text

Suitable for storing short text information that does not require line breaks.

### Use Cases
- Names
- Titles
- Labels
- Short descriptions

### Characteristics
- Does not support line breaks or indents
- Content restricted to single line
- Ensures conciseness and standardization

### Write

**Type:** `string`

**Example:**
```json
"example text"
```

### Read

#### cellFormat: json
**Type:** `string`

**Example:**
```json
"example text"
```

#### cellFormat: string
**Type:** `string`

**Example:**
```json
"example text"
```

---

## Multi Line Text

Stores longer text content that requires line breaks.

### Use Cases
- Remarks
- Descriptions
- Detailed explanations
- Long-form content

### Characteristics
- Supports line breaks through line break characters
- Better for structured long text
- Makes text structure clearer and easier to read

### Write

**Type:** `string`

**Example:**
```json
"This is a paragraph \n of multi-line text"
```

**Note:** Supports line breaks represented by `\n` character

### Read

#### cellFormat: json
**Type:** `string`

**Example:**
```json
"This is a paragraph \n of multi-line text"
```

#### cellFormat: string
**Type:** `string`

**Example:**
```json
"This is a paragraph <br> of multi-line text"
```

**Note:** Line breaks are presented with `<br>` tags in string format

---

## URL

Stores network links and web addresses.

### Use Cases
- Web addresses
- Resource links
- External references
- API endpoints

### Characteristics
- Identifies and processes URLs
- Displays in standardized form
- Facilitates direct access

### Write

**Type:** `string`

**Example:**
```json
"https://example.com"
```

### Read

#### cellFormat: json
**Type:** `string`

**Example:**
```json
"https://example.com"
```

#### cellFormat: string
**Type:** `string`

**Example:**
```json
"https://example.com"
```

---

## Email

Stores email addresses with format validation.

### Use Cases
- Contact information
- Notification addresses
- User accounts
- Communication channels

### Characteristics
- Ensures email format compliance
- Enables email verification
- Facilitates email operations

### Write

**Type:** `string`

**Example:**
```json
"example@mail.com"
```

### Read

#### cellFormat: json
**Type:** `string`

**Example:**
```json
"example@mail.com"
```

#### cellFormat: string
**Type:** `string`

**Example:**
```json
"example@mail.com"
```

---

## Phone

Records phone number information with international format support.

### Use Cases
- Contact numbers
- Customer phone numbers
- Emergency contacts
- Support hotlines

### Characteristics
- Supports international formats
- Formatted for readability
- Facilitates dialing operations

### Write

**Type:** `string`

**Example:**
```json
"+8613800138000"
```

### Read

#### cellFormat: json
**Type:** `string`

**Example:**
```json
"+8613800138000"
```

#### cellFormat: string
**Type:** `string`

**Example:**
```json
"+8613800138000"
```

---

## Summary Table

| Field Type | Write Type | Read Type (JSON) | Read Type (String) | Line Breaks |
|------------|-----------|------------------|-------------------|-------------|
| Single Line Text | string | string | string | Not supported |
| Multi Line Text | string | string | string with `<br>` | Supported (`\n`) |
| URL | string | string | string | - |
| Email | string | string | string | - |
| Phone | string | string | string | - |

## Notes

- All text fields accept string values when writing
- Format validation applies to Email and Phone fields
- URL field should contain valid web addresses
- Multi-line text uses `\n` for line breaks when writing, `<br>` when reading as string
