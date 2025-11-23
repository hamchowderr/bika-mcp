# Date & Time Fields

Fields for storing date and time information in various formats.

## DateTime

Records specific dates and times with precision.

### Use Cases
- Event occurrence time
- Deadlines
- Timestamps
- Appointment scheduling
- Log entries

### Characteristics
- Stored in ISO 8601 format
- Accurate to seconds
- Facilitates time sorting and filtering
- Supports time calculations
- Timezone aware

### Write

**Type:** `string` (ISO 8601 Format)

**Supported Formats:**
- Date only: `"2023-10-01"`
- Full datetime: `"2023-10-01T12:00:00.000Z"`
- With timezone: `"2023-10-01T12:00:00Z"`

**Example:**
```json
"2023-10-01T12:00:00Z"
```

### Read

#### cellFormat: json
**Type:** `string`

**Example:**
```json
"2023-10-01T12:00:00Z"
```

**Note:** Returns in ISO 8601 UTC format

#### cellFormat: string
**Type:** `string`

**Example:**
```json
"2023-10-01 20:00:00"
```

**Note:** Displayed in local time format

---

## Date Range

Records a time period with start and end dates.

### Use Cases
- Event holding time
- Vacation periods
- Project duration
- Rental periods
- Booking timeframes

### Characteristics
- Consists of start and end dates
- Clearly indicates time range
- Facilitates time period comparison
- Enables duration calculations
- Useful for scheduling

### Write

**Type:** `string` (format: `start/end`)

**Format:**
```
"<START_ISO_8601>/<END_ISO_8601>"
```

**Example:**
```json
"2021-03-29T10:05:00.000Z/2021-04-05T10:05:00.000Z"
```

**Properties:**
- `start` - Start date in ISO 8601 format
- `end` - End date in ISO 8601 format
- Separator: `/`

### Read

#### cellFormat: json
**Type:** `string`

**Example:**
```json
"2021-03-29 -> 2021-04-05"
```

**Note:** Formatted with arrow separator

#### cellFormat: string
**Type:** `string`

**Example:**
```json
"2021-03-29 -> 2021-04-05"
```

**Note:** Same format as JSON, uses `->` to separate dates

---

## Summary Table

| Field Type | Write Format | Write Example | Read (JSON) | Read (String) |
|------------|-------------|---------------|-------------|---------------|
| DateTime | ISO 8601 string | `"2023-10-01T12:00:00Z"` | `"2023-10-01T12:00:00Z"` | `"2023-10-01 20:00:00"` |
| Date Range | `start/end` string | `"2021-03-29T10:05:00.000Z/2021-04-05T10:05:00.000Z"` | `"2021-03-29 -> 2021-04-05"` | `"2021-03-29 -> 2021-04-05"` |

## ISO 8601 Format Details

### Components

```
YYYY-MM-DDTHH:mm:ss.sssZ
```

- `YYYY` - Four-digit year
- `MM` - Two-digit month (01-12)
- `DD` - Two-digit day (01-31)
- `T` - Separator between date and time
- `HH` - Two-digit hour (00-23)
- `mm` - Two-digit minute (00-59)
- `ss` - Two-digit second (00-59)
- `.sss` - Milliseconds (optional)
- `Z` - UTC timezone indicator

### Examples

```json
// Date only
"2023-10-01"

// Date with time (UTC)
"2023-10-01T12:00:00Z"

// Date with time and milliseconds
"2023-10-01T12:00:00.000Z"

// With timezone offset (not recommended, use UTC)
"2023-10-01T12:00:00+08:00"
```

## Time Zone Handling

### Writing
- Recommend using UTC timezone (Z suffix)
- ISO 8601 format with timezone indicator
- System will convert to UTC for storage

### Reading
- JSON format: Returns in UTC
- String format: Displays in local timezone
- Time zone conversion handled automatically

## Date Range Format

### Writing Date Range

```json
// Format: "START/END"
"2021-03-29T10:05:00.000Z/2021-04-05T10:05:00.000Z"
```

**Components:**
1. Start date in ISO 8601
2. Forward slash `/` separator
3. End date in ISO 8601

### Reading Date Range

```json
// Both formats return same result
"2021-03-29 -> 2021-04-05"
```

**Display:**
- Uses `->` arrow separator
- Simplified date format (no time)
- Easy to read range

## Validation

### Valid DateTime Examples

```json
// ✅ Date only
"2023-10-01"

// ✅ Full datetime with UTC
"2023-10-01T12:00:00Z"

// ✅ With milliseconds
"2023-10-01T12:00:00.000Z"
```

### Invalid DateTime Examples

```json
// ❌ Wrong format
"10/01/2023"

// ❌ Missing timezone
"2023-10-01T12:00:00"

// ❌ Invalid date
"2023-13-45T12:00:00Z"
```

### Valid Date Range Examples

```json
// ✅ Correct format
"2021-03-29T10:05:00.000Z/2021-04-05T10:05:00.000Z"

// ✅ Date only (if supported)
"2021-03-29/2021-04-05"
```

### Invalid Date Range Examples

```json
// ❌ Missing separator
"2021-03-29T10:05:00.000Z 2021-04-05T10:05:00.000Z"

// ❌ Wrong separator
"2021-03-29T10:05:00.000Z-2021-04-05T10:05:00.000Z"

// ❌ Start after end
"2021-04-05T10:05:00.000Z/2021-03-29T10:05:00.000Z"
```

## Best Practices

1. **Always use UTC** when writing datetime values
2. **ISO 8601 format** is required for consistency
3. **Include timezone** indicator (Z for UTC)
4. **Validate date ranges** to ensure start is before end
5. **Handle timezone conversions** in your application layer
6. **Use appropriate precision** (date vs datetime)
7. **Consider user timezone** when displaying to users

## Common Patterns

### Current Timestamp
```javascript
// JavaScript
const now = new Date().toISOString();
// "2023-10-01T12:00:00.000Z"
```

### Date Range for Full Day
```json
"2023-10-01T00:00:00.000Z/2023-10-01T23:59:59.999Z"
```

### Week Range
```json
"2023-10-01T00:00:00.000Z/2023-10-07T23:59:59.999Z"
```
