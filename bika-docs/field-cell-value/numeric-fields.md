# Numeric Fields

Number-based field types for storing and displaying numerical data in various formats.

## Number

Stores numerical information with decimal precision.

### Use Cases
- Quantity
- Amount
- Age
- Measurements
- Counts

### Characteristics
- Only accepts number types
- Ensures accuracy and consistency
- Supports decimal values
- Facilitates calculations and analysis

### Write

**Type:** `number`

**Example:**
```json
123.45
```

### Read

#### cellFormat: json
**Type:** `number`

**Example:**
```json
123.45
```

#### cellFormat: string
**Type:** `string`

**Example:**
```json
"123.4500"
```

**Note:** String format includes trailing zeros for decimal precision

---

## Currency

Handles currency-related values with automatic formatting.

### Use Cases
- Prices
- Expenses
- Revenue
- Costs
- Financial amounts

### Characteristics
- Stores amount value
- Associated with currency type
- Formatted according to currency when displayed
- Clear presentation of currency information

### Write

**Type:** `number`

**Example:**
```json
199.99
```

### Read

#### cellFormat: json
**Type:** `number`

**Example:**
```json
199.99
```

#### cellFormat: string
**Type:** `string`

**Example:**
```json
"$199.99"
```

**Note:** String format includes currency symbol (e.g., $, €, ¥)

---

## Percent

Represents proportional relationships as percentages.

### Use Cases
- Completion rate
- Growth rate
- Discount percentage
- Success rate
- Performance metrics

### Characteristics
- Written in decimal form
- Converted to percentage for display
- Intuitive proportion information
- Facilitates proportion analysis

### Write

**Type:** `number`

**Example:**
```json
75.33
```

**Note:** Write as the actual percentage value (75.33 = 75.33%)

### Read

#### cellFormat: json
**Type:** `number`

**Example:**
```json
75.33
```

#### cellFormat: string
**Type:** `string`

**Example:**
```json
"75.33%"
```

**Note:** String format includes the % symbol

---

## Rating

Evaluates the level or quality of items using integer values.

### Use Cases
- Product satisfaction
- Service quality
- Star ratings
- Priority levels
- Importance scores

### Characteristics
- Represented by integers
- Intuitive visual representation
- Facilitates evaluation statistics
- Simple to understand and use

### Write

**Type:** `number` (integer)

**Example:**
```json
4
```

**Note:** Must be an integer representing the rating value

### Read

#### cellFormat: json
**Type:** `number`

**Example:**
```json
4
```

#### cellFormat: string
**Type:** `string`

**Example:**
```json
"4"
```

---

## Summary Table

| Field Type | Write Type | Write Example | Read (JSON) | Read (String) | Notes |
|------------|-----------|---------------|-------------|---------------|-------|
| Number | number | `123.45` | `123.45` | `"123.4500"` | Supports decimals |
| Currency | number | `199.99` | `199.99` | `"$199.99"` | Adds currency symbol |
| Percent | number | `75.33` | `75.33` | `"75.33%"` | Adds % symbol |
| Rating | number | `4` | `4` | `"4"` | Integer only |

## Important Notes

### Number Precision
- Number fields maintain decimal precision
- String format may show trailing zeros

### Currency Symbol
- Currency symbol is added automatically in string format
- The symbol depends on currency type setting
- JSON format returns raw number without symbol

### Percentage Values
- Write the actual percentage number (not decimal)
- For 75.33%, write `75.33` (not `0.7533`)
- String format automatically adds % symbol

### Rating Values
- Must be integers
- Typically ranges from 1-5 or 1-10
- Check your field configuration for valid range

## Validation

All numeric fields will reject:
- String values
- Boolean values
- Arrays or objects
- Null values (unless field allows empty)

Example error when writing string to number field:
```json
{
  "success": false,
  "code": 4031,
  "message": "The input value of field number_field is invalid: example text"
}
```
