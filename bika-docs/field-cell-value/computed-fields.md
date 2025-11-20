# Computed Fields

Fields that automatically calculate values based on formulas or other field values.

## Formula

Automatically calculates and displays results through preset calculation formulas.

### Use Cases
- Calculate total price from quantity × unit price
- Calculate duration from start time and end time
- Compute age from birth date
- Concatenate text from multiple fields
- Complex business logic calculations
- Conditional value determination

### Characteristics
- Set by user-defined formula
- Automatically calculated
- Updates with related field changes
- Cannot be manually edited
- Supports various data types
- Enables complex computations

### Write

**Status:** `read_only`

**Not supported for writing** - values are automatically calculated based on the formula

### Read

**Type:** Varies based on formula result

Possible return types:
- `string` - Text results
- `number` - Numeric calculations
- `boolean` - True/false evaluations
- `array of strings` - Multiple text values
- `array of numbers` - Multiple numeric values

#### Example: String Result

```json
"5"
```

#### Example: Number Result

```json
5
```

#### Example: Boolean Result

```json
true
```

#### Example: Array Result

```json
["Value 1", "Value 2", "Value 3"]
```

---

## Formula Field Details

### Return Type Depends On Formula

The formula field's return type is determined by:
1. The formula expression used
2. The operations performed
3. The source field types
4. The formula functions used

### Common Formula Types

#### Numeric Calculations

**Formula:** `{Quantity} * {Unit Price}`

**Result Type:** `number`

**Example:**
```json
599.85
```

#### Text Concatenation

**Formula:** `{First Name} & " " & {Last Name}`

**Result Type:** `string`

**Example:**
```json
"John Doe"
```

#### Date Calculations

**Formula:** `DATEADD({Start Date}, {Duration}, 'days')`

**Result Type:** `string` (ISO 8601 date)

**Example:**
```json
"2023-10-15T00:00:00Z"
```

#### Conditional Logic

**Formula:** `IF({Quantity} > 10, "Bulk Order", "Regular Order")`

**Result Type:** `string`

**Example:**
```json
"Bulk Order"
```

#### Boolean Evaluation

**Formula:** `{Total} > 1000`

**Result Type:** `boolean`

**Example:**
```json
true
```

---

## Summary Table

| Field Type | Writable | Read Type | Calculation | Updates |
|------------|----------|-----------|-------------|---------|
| Formula | ❌ No | string \| number \| boolean \| array | Based on formula | Automatic when dependencies change |

## Important Notes

### Read-Only Nature

Formula fields **cannot be written to**. Any attempt to set a formula field value will:
- Be ignored
- Return an error
- Have no effect on the field

```json
// ❌ This will fail or be ignored
{
  "cells": {
    "Total Price": 999.99
  }
}
```

### Automatic Updates

Formula fields automatically recalculate when:
- Referenced fields change
- Related records update
- Dependencies are modified

### Formula Configuration

Formulas are configured in the field settings, not through the API. To:
- Create a formula field
- Modify the formula
- Change formula logic

You must use the Bika.ai web interface.

## Data Type Handling

### String Results

```json
// Simple text
"Result"

// Concatenated values
"John Doe"

// Formatted numbers
"$1,234.56"

// Formatted dates
"October 1, 2023"
```

### Number Results

```json
// Integer
42

// Decimal
3.14159

// Negative
-99.99

// Large numbers
1000000
```

### Boolean Results

```json
// True
true

// False
false
```

### Array Results

```json
// Array of strings
["Item 1", "Item 2", "Item 3"]

// Array of numbers
[1, 2, 3, 4, 5]

// Mixed (if formula allows)
["Text", "123", "true"]
```

## Common Formula Patterns

### Simple Math

```
{Field1} + {Field2}
{Quantity} * {Price}
{Total} - {Discount}
{Amount} / {Count}
```

### Text Operations

```
{First Name} & " " & {Last Name}
UPPER({Text Field})
LOWER({Text Field})
CONCATENATE({Field1}, " - ", {Field2})
```

### Conditional Logic

```
IF({Status} = "Complete", "Done", "In Progress")
IF({Total} > 1000, "High Value", "Normal")
IF(AND({Field1} > 10, {Field2} < 20), "Valid", "Invalid")
```

### Date Operations

```
DATEADD({Start Date}, 7, 'days')
DATEDIFF({End Date}, {Start Date}, 'days')
NOW()
TODAY()
```

### Aggregations (from linked records)

```
SUM({Linked Records.Amount})
AVERAGE({Linked Records.Score})
COUNT({Linked Records})
MAX({Linked Records.Value})
MIN({Linked Records.Value})
```

## Reading Formula Values

### Type Detection

Since formula return types vary, implement type checking:

```typescript
function handleFormulaValue(value: any) {
  if (typeof value === 'string') {
    console.log('Text result:', value);
  } else if (typeof value === 'number') {
    console.log('Numeric result:', value);
  } else if (typeof value === 'boolean') {
    console.log('Boolean result:', value);
  } else if (Array.isArray(value)) {
    console.log('Array result:', value);
  }
}
```

### Safe Access

Always check for existence before using:

```typescript
const record = await getRecord(spaceId, nodeId, recordId);
const formulaValue = record.cells['Formula Field'];

if (formulaValue !== undefined && formulaValue !== null) {
  // Use the value
  console.log('Formula result:', formulaValue);
} else {
  // Handle missing/null value
  console.log('Formula has no result');
}
```

## Best Practices

1. **Don't Write**: Never attempt to write to formula fields
2. **Type Checking**: Always check the type of formula results
3. **Null Handling**: Formula may return null if dependencies are missing
4. **Performance**: Complex formulas may have calculation delay
5. **Dependencies**: Understand which fields the formula depends on
6. **Documentation**: Document what each formula field calculates
7. **Testing**: Test formula behavior with edge cases

## Limitations

### Cannot Set Values

Formula values are always calculated, never set:

```typescript
// ❌ Wrong - attempting to set formula field
await updateRecord(spaceId, nodeId, recordId, {
  cells: {
    'Total Price': 999.99  // This will be ignored
  }
});

// ✅ Correct - update the source fields instead
await updateRecord(spaceId, nodeId, recordId, {
  cells: {
    'Quantity': 10,
    'Unit Price': 99.99
    // 'Total Price' will auto-calculate to 999.90
  }
});
```

### Update Timing

- Formula recalculation may not be instant
- May require a read after write to get new value
- Depends on formula complexity

### Error States

If formula has errors (missing dependencies, invalid calculations):
- May return null
- May return error indicator
- Check field status in UI if unexpected results

## Integration Example

### TypeScript

```typescript
interface FormulaRecord {
  'Quantity': number;
  'Unit Price': number;
  'Total Price': number;  // Formula: Quantity * Unit Price
  'Status': string;
  'Is High Value': boolean;  // Formula: Total Price > 1000
}

// Update source fields
await updateRecord(spaceId, nodeId, recordId, {
  cells: {
    'Quantity': 5,
    'Unit Price': 199.99
  }
});

// Read calculated values
const record = await getRecord(spaceId, nodeId, recordId);

console.log('Quantity:', record.cells['Quantity']);
console.log('Unit Price:', record.cells['Unit Price']);
console.log('Total Price:', record.cells['Total Price']);  // 999.95
console.log('High Value?:', record.cells['Is High Value']);  // false

// Type-safe handling
const totalPrice = record.cells['Total Price'];
if (typeof totalPrice === 'number') {
  const tax = totalPrice * 0.1;
  console.log('Tax:', tax);
}
```

## Formula vs Lookup

| Aspect | Formula | Lookup |
|--------|---------|--------|
| Source | Can use any fields in same record | Only from linked records |
| Complexity | Supports complex calculations | Simple field value retrieval |
| Dependencies | Multiple fields in same record | Linked records |
| Return Type | Various types | Depends on source field |
| Use Case | Calculations, logic | Display related data |

Both are read-only and automatically calculated.

## Common Issues

### Issue: Formula shows null

**Cause:** Dependencies are missing or null

**Solution:** Ensure all referenced fields have values

### Issue: Formula not updating

**Cause:** Calculation delay or caching

**Solution:** Re-fetch the record after updating dependencies

### Issue: Unexpected type

**Cause:** Formula modified in UI

**Solution:** Check formula definition in Bika.ai interface

### Issue: Can't set value

**Cause:** Attempting to write to read-only field

**Solution:** Update the source fields instead
