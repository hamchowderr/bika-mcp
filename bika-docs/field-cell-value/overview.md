# Field Cell Value Overview

This document explains the fundamental concepts of field cell values in Bika.ai.

## Field Models

For cell values of different field types, some fields will present different data formats when read and edited. These are divided into two scenarios:

### Read

Refers to the data format of the field cell when the interface response is returned.

- The presentation form of the field when data is obtained from the interface
- Can be in different formats depending on `cellFormat` parameter

### Write

Refers to the data format that must be followed when editing field cells.

- The standard format when submitting data to the interface to modify field values
- Must match the expected type for each field

## Cell Formats

When reading data, Bika supports different cell formats:

### `cellFormat: json`

Returns structured data in JSON format:

```json
{
  "id": "mem123",
  "type": "Member",
  "name": "John Doe"
}
```

### `cellFormat: string`

Returns formatted string representations:

```
"John Doe"
```

## Cell Value Write Errors

When writing values to field cells, if the data format does not meet the requirements, the interface will return a format error prompt.

### Example: Type Mismatch Error

Writing a string to a number field:

**Request:**
```json
{
  "fields": {
    "number_field": "example text"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "code": 4031,
  "message": "The input value of field number_field is invalid: example text"
}
```

## Common Error Scenarios

1. **Type Mismatch** - Providing wrong data type (e.g., string instead of number)
2. **Format Violation** - Data doesn't match expected format (e.g., invalid email format)
3. **Read-Only Fields** - Attempting to write to read-only fields (e.g., AutoNumber, Created Time)
4. **Array Type Errors** - Providing single value instead of array or vice versa

## Best Practices

1. **Validate data types** before sending to API
2. **Check field definitions** to understand read/write requirements
3. **Handle errors gracefully** with proper error messages
4. **Use appropriate cellFormat** when reading based on your needs
5. **Respect read-only fields** - don't attempt to write to them

## Field Categories

Bika fields can be categorized as:

- **Editable Fields** - Can be written and read (most field types)
- **Read-Only Fields** - Can only be read, automatically managed by system
  - AutoNumber
  - Created Time
  - Modified Time
  - Created By
  - Modified By
  - Lookup (calculated from linked records)
  - Formula (calculated from formula)

## Next Steps

Explore specific field type documentation:
- [Text Fields](./text-fields.md)
- [Numeric Fields](./numeric-fields.md)
- [Selection Fields](./selection-fields.md)
- [Date & Time Fields](./date-time-fields.md)
- [File Fields](./file-fields.md)
- [System Fields](./system-fields.md)
- [Relationship Fields](./relationship-fields.md)
- [Computed Fields](./computed-fields.md)
