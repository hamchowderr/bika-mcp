# Selection Fields

Fields that allow selection from predefined options or binary states.

## CheckBox

Represents binary states using boolean values.

### Use Cases
- Yes/No decisions
- Completed/Uncompleted status
- True/False flags
- Enable/Disable settings
- Confirmation states

### Characteristics
- Simple binary state
- Intuitive operation
- Suitable for binary judgment
- Clear checked/unchecked visualization

### Write

**Type:** `boolean`

**Example:**
```json
true   // checked
false  // unchecked
```

### Read

#### cellFormat: json
**Type:** `boolean`

**Example:**
```json
true
```

#### cellFormat: string
**Type:** `string`

**Example:**
```json
"true"
"false"
```

---

## Single Select

Allows selection of one option from a preset list.

### Use Cases
- Gender selection
- Education background
- Status selection
- Category assignment
- Priority levels

### Characteristics
- Only one option can be selected
- Options from fixed range
- Ensures uniqueness of selection
- Clear and defined choices
- Facilitates data statistics

### Write

**Type:** `string` (unique identifier or name of the option)

**Example:**
```json
"In Progress"
```

**Note:** The value must match an existing option in the field configuration

### Read

#### cellFormat: json
**Type:** `string`

**Example:**
```json
"In Progress"
```

#### cellFormat: string
**Type:** `string`

**Example:**
```json
"In Progress"
```

---

## Multi Select

Allows selection of multiple options from a preset list.

### Use Cases
- Hobbies
- Skill tags
- Feature flags
- Multiple categories
- Team assignments

### Characteristics
- Multiple options can be selected
- Meets multi-dimensional selection needs
- Facilitates management of multiple options
- Supports analysis across multiple categories

### Write

**Type:** `array of string`

**Example:**
```json
["Friday", "SatDay"]
```

**Notes:**
- Must be an array, even for single selection
- Values must match existing options in field configuration
- Order may be preserved

### Read

#### cellFormat: json
**Type:** `array of string`

**Example:**
```json
["Friday", "SatDay"]
```

#### cellFormat: string
**Type:** `string`

**Example:**
```json
"Friday, SatDay"
```

**Note:** Multiple options are comma-separated in string format

---

## Summary Table

| Field Type | Write Type | Write Example | Read (JSON) | Read (String) |
|------------|-----------|---------------|-------------|---------------|
| CheckBox | boolean | `true` | `true` | `"true"` |
| Single Select | string | `"In Progress"` | `"In Progress"` | `"In Progress"` |
| Multi Select | array of string | `["Friday", "SatDay"]` | `["Friday", "SatDay"]` | `"Friday, SatDay"` |

## Important Notes

### CheckBox Values
- Only accepts `true` or `false`
- No string representations ("true" as string will fail)
- Typically defaults to `false` when unchecked

### Single Select Options
- Option value must exist in field configuration
- Case-sensitive matching
- Will error if option doesn't exist
- Returns the option name/label

### Multi Select Options
- Always write as array, even for single item: `["Option1"]`
- All option values must exist in field configuration
- Empty array `[]` represents no selection
- String format joins with comma and space

## Validation

### Invalid CheckBox Value
```json
// ❌ Wrong - string instead of boolean
{
  "checkbox_field": "true"
}

// ✅ Correct
{
  "checkbox_field": true
}
```

### Invalid Single Select
```json
// ❌ Wrong - option doesn't exist
{
  "status_field": "NonExistentStatus"
}

// ✅ Correct - using existing option
{
  "status_field": "In Progress"
}
```

### Invalid Multi Select
```json
// ❌ Wrong - not an array
{
  "tags_field": "Friday"
}

// ✅ Correct - array format
{
  "tags_field": ["Friday"]
}

// ✅ Also correct - multiple selections
{
  "tags_field": ["Friday", "SatDay"]
}

// ✅ Also correct - no selection
{
  "tags_field": []
}
```

## Best Practices

1. **CheckBox**: Use for simple yes/no, on/off states
2. **Single Select**: Use when exactly one choice is required from a list
3. **Multi Select**: Use when multiple choices are allowed
4. **Option Names**: Keep option names consistent and meaningful
5. **Validation**: Always validate option values exist before writing
