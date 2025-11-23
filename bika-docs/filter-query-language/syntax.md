# Filter Query Syntax

Understanding the structure and components of filter query expressions.

## Expression Structure

A query expression consists of three parts: **field**, **operator**, and **value**.

### Basic Structure

```
field_name operator value
```

### Example

```
name=="text"
```

| Component | Description | Example |
|-----------|-------------|---------|
| `name` | Field ID or field name | `name`, `status`, `age` |
| `==` | Comparison operator | `==`, `!=`, `>`, `<`, `=c=` |
| `"text"` | Value to compare against | `"text"`, `123`, `true` |

---

## Field Names

### Simple Field Names

Field names without spaces can be used directly:

```
name=="John"
status=="Active"
age>18
```

### Field Names with Spaces

Field names containing spaces must be wrapped in braces `{}`:

```
{single text}=="value"
{First Name}=="John"
{Task Status}=="Complete"
```

### Field Name Rules

**Allowed:**
- Alphanumeric characters
- Underscores
- Field names in braces

**Not Allowed:**
- System reserved characters (unless wrapped in braces)
- Spaces (unless wrapped in braces)

---

## System Reserved Characters

The following characters are reserved and cannot be used in unbraced field names:

```
" ' ( ) ; , = ! ~ < >   \n \t \r
```

### Examples

```
// ❌ Invalid - space without braces
single text=="value"

// ✅ Valid - space with braces
{single text}=="value"

// ❌ Invalid - reserved character
field-name=="value"

// ✅ Valid - wrapped in braces
{field-name}=="value"
```

---

## Values

Different value types are supported based on the field being queried.

### String Values

**Without Spaces:**
```
name==text
status==active
```

**With Spaces (must use double quotes):**
```
name=="text 1"
description=="This is a description"
{Full Name}=="John Doe"
```

### Numeric Values

**Integers:**
```
age==25
count==100
rating==5
```

**Decimals (must use double quotes):**
```
price=="123.45"
percentage=="99.99"
```

**Note:** Float values must be wrapped in double quotes for precision matching.

### Boolean Values

For checkbox fields:

**True values:**
```
checkbox==true
checkbox==1
```

**False values:**
```
checkbox==false
checkbox==0
```

### Null Values

Check for empty/null values:

```
field==null
field==NULL
field!=null
field!=NULL
```

**Note:** Both `null` and `NULL` are accepted (case-insensitive).

### Array Values

For fields that support multiple values (multi-select, links):

```
multi_select==("option 1", "option 2")
link=c=("rec123", "rec456")
```

**Format:** Wrap values in parentheses, separate with commas.

---

## Value Type Summary

| Type | Format | Example | Used For |
|------|--------|---------|----------|
| String (no spaces) | `text` | `name==active` | Simple text |
| String (with spaces) | `"text"` | `name=="John Doe"` | Text with spaces |
| Integer | `123` | `age==25` | Whole numbers |
| Float | `"123.45"` | `price=="99.99"` | Decimal numbers |
| Boolean (true) | `true` or `1` | `checkbox==true` | Checkbox checked |
| Boolean (false) | `false` or `0` | `checkbox==false` | Checkbox unchecked |
| Null | `null` or `NULL` | `field==null` | Empty values |
| Array | `("val1", "val2")` | `tags==("tag1", "tag2")` | Multiple values |

---

## Quoting Rules

### When to Use Quotes

**Double Quotes Required:**
- Values with spaces: `"text with spaces"`
- Decimal numbers: `"123.45"`
- Dates: `"2023-10-01"`

**Double Quotes Optional:**
- Single word strings: `text` or `"text"`
- Integers: `123`

**No Quotes:**
- Boolean values: `true`, `false`, `1`, `0`
- Null values: `null`, `NULL`

### Examples

```
// ✅ Valid - no quotes needed
name==john
age==25
status==active

// ✅ Valid - with quotes
name=="john"
age==25
status=="active"

// ✅ Required - has spaces
name=="John Doe"
description=="This is text"

// ✅ Required - decimal
price=="99.99"

// ✅ Required - date
date=="2023-10-01"

// ✅ Boolean - no quotes
checkbox==true
active==1

// ✅ Null - no quotes
field==null
value==NULL
```

---

## Field Reference Formats

### Direct Field Name

```
status=="Active"
age>18
price<100
```

### Field Name with Spaces

```
{First Name}=="John"
{Task Status}=="Complete"
{Total Price}>1000
```

### Field ID

You can also use field IDs instead of names:

```
fld123=="value"
fldXYZ>100
```

---

## Complete Expression Examples

### Simple Expressions

```
name=="John"
age>18
status=="Active"
price<100
{First Name}=="Jane"
```

### With Different Value Types

```
// String
title=="Project Manager"

// Number (integer)
quantity==50

// Number (float)
price=="99.99"

// Boolean
is_active==true
completed==1

// Null check
description==null
notes!=NULL

// Array
tags==("urgent", "important")
```

### Field Names with Special Characters

```
// With spaces
{Full Name}=="John Smith"
{Email Address}=="user@example.com"

// With other characters (wrapped)
{field-name}=="value"
{field.name}=="value"
```

---

## Common Mistakes

### ❌ Invalid Syntax

```
// Missing quotes for value with spaces
name==John Doe

// Using single quotes
name=='John'

// Space in field name without braces
First Name=="John"

// Decimal without quotes
price==99.99
```

### ✅ Correct Syntax

```
// Quotes for value with spaces
name=="John Doe"

// Double quotes only
name=="John"

// Braces for field name with spaces
{First Name}=="John"

// Quotes for decimal
price=="99.99"
```

---

## Syntax Validation

### Valid Expressions

```
✅ name=="text"
✅ age>18
✅ {Full Name}=="John Doe"
✅ price=="99.99"
✅ status==active
✅ checkbox==true
✅ field==null
✅ tags==("tag1", "tag2")
```

### Invalid Expressions

```
❌ name==text with spaces       // Missing quotes
❌ name=='text'                  // Single quotes not supported
❌ Full Name=="John"             // Spaces not wrapped in braces
❌ price==99.99                  // Decimal not quoted
❌ field=null                    // Wrong operator (should be ==)
```

---

## Next Steps

- [Logical Operators](./logical-operators.md) - Combine expressions with AND/OR
- [Comparison Operators](./comparison-operators.md) - All available operators
- [Field Queries](./field-queries.md) - Field-specific query examples
- [Examples](./examples.md) - Practical query patterns
