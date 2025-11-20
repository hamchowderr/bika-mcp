# Comparison Operators

Comparison operators are used to compare field values against specified values in filter queries.

## All Comparison Operators

| Operator | Description | Example | Applicable To |
|----------|-------------|---------|---------------|
| `==` | Equal to | `status=="Active"` | All field types |
| `!=` | Not equal to | `status!="Inactive"` | All field types |
| `>` | Greater than | `age>18` | Numbers, Dates |
| `<` | Less than | `price<100` | Numbers, Dates |
| `>=` | Greater than or equal to | `rating>=4` | Numbers, Dates |
| `<=` | Less than or equal to | `quantity<=10` | Numbers, Dates |
| `=c=` | Contains | `description=c="urgent"` | Text, Arrays |
| `=nc=` | Does not contain | `tags=nc="archived"` | Text, Arrays |

---

## Equal To (`==`)

Matches records where the field value exactly equals the specified value.

### Syntax

```
field==value
```

### Applicable Field Types

- Text fields
- Number fields
- Checkbox (boolean)
- Single Select
- Multi Select (array)
- Date fields
- Link fields (array)
- Member fields (array)

### Examples

```
// Text
name=="John"
status=="Active"

// Number
age==25
price==99

// Boolean
is_active==true
completed==1

// Single Select
priority=="High"

// Multi Select (exact match)
tags==("urgent", "important")

// Date
date=="2023-10-01"

// Null check
description==null
```

---

## Not Equal To (`!=`)

Matches records where the field value does not equal the specified value.

### Syntax

```
field!=value
```

### Applicable Field Types

Same as Equal To (`==`)

### Examples

```
// Text
status!="Inactive"
name!="Unknown"

// Number
age!=0
price!=0

// Boolean
is_deleted!=true
active!=0

// Single Select
priority!="Low"

// Multi Select
tags!=("archived", "deleted")

// Date
date!="2023-01-01"

// Not null check
description!=null
```

---

## Greater Than (`>`)

Matches records where the field value is greater than the specified value.

### Syntax

```
field>value
```

### Applicable Field Types

- Number fields
- Date fields

### Examples

```
// Numbers
age>18
price>100
rating>3
quantity>0

// Dates
date>"2023-01-01"
{Created Time}>"2023-06-01"
```

### Important Notes

- For numbers: Standard numeric comparison
- For dates: Must use format `YYYY-MM-DD`
- Date precision: Year-month-day only (no time)

---

## Less Than (`<`)

Matches records where the field value is less than the specified value.

### Syntax

```
field<value
```

### Applicable Field Types

- Number fields
- Date fields

### Examples

```
// Numbers
age<65
price<1000
rating<5
stock_level<10

// Dates
date<"2023-12-31"
{End Date}<"2024-01-01"
```

---

## Greater Than or Equal To (`>=`)

Matches records where the field value is greater than or equal to the specified value.

### Syntax

```
field>=value
```

### Applicable Field Types

- Number fields
- Date fields

### Examples

```
// Numbers
age>=18
rating>=4
price>=50

// Dates
date>="2023-01-01"
{Start Date}>="2023-10-01"
```

---

## Less Than or Equal To (`<=`)

Matches records where the field value is less than or equal to the specified value.

### Syntax

```
field<=value
```

### Applicable Field Types

- Number fields
- Date fields

### Examples

```
// Numbers
age<=65
rating<=5
price<=100
quantity<=1000

// Dates
date<="2023-12-31"
{Due Date}<="2023-10-31"
```

---

## Contains (`=c=`)

Matches records where the field value contains the specified value.

### Syntax

```
field=c=value
```

For arrays:
```
field=c=(value1, value2)
```

### Applicable Field Types

- Text fields (substring match)
- Single Select (with array of options)
- Multi Select (with array of options)
- Link fields (with array of record IDs)

### Examples

#### Text Fields

```
// Contains substring
description=c="urgent"
name=c="John"
notes=c="important"
```

**Note:** Value must be a string for text fields.

#### Single Select

```
// Check if option is in array
single_select=c=("Option 1", "Option 2")
```

Matches if the field value is either "Option 1" OR "Option 2".

#### Multi Select

```
// Check if any of the options are selected
multi_select=c=("Tag1", "Tag2", "Tag3")
```

Matches if ANY of the specified tags are selected.

#### Link Fields

```
// Check if linked to any of the records
link=c=("rec123", "rec456")
```

Matches if linked to record "rec123" OR "rec456".

---

## Does Not Contain (`=nc=`)

Matches records where the field value does not contain the specified value.

### Syntax

```
field=nc=value
```

For arrays:
```
field=nc=(value1, value2)
```

### Applicable Field Types

Same as Contains (`=c=`)

### Examples

#### Text Fields

```
// Does not contain substring
description=nc="archived"
name=nc="test"
status=nc="deleted"
```

#### Single Select

```
// Option is not in array
single_select=nc=("Archived", "Deleted")
```

Matches if the field value is NOT "Archived" AND NOT "Deleted".

#### Multi Select

```
// None of the options are selected
multi_select=nc=("Archived", "Deleted", "Hidden")
```

Matches if NONE of the specified tags are selected.

#### Link Fields

```
// Not linked to any of the records
link=nc=("rec_archived1", "rec_archived2")
```

Matches if NOT linked to the specified records.

---

## Operator Compatibility by Field Type

### Text Fields

| Operator | Support | Example |
|----------|---------|---------|
| `==` | ✅ Yes | `name=="John"` |
| `!=` | ✅ Yes | `name!="Unknown"` |
| `>` | ❌ No | - |
| `<` | ❌ No | - |
| `>=` | ❌ No | - |
| `<=` | ❌ No | - |
| `=c=` | ✅ Yes | `name=c="John"` |
| `=nc=` | ✅ Yes | `name=nc="test"` |

### Number Fields

| Operator | Support | Example |
|----------|---------|---------|
| `==` | ✅ Yes | `age==25` |
| `!=` | ✅ Yes | `age!=0` |
| `>` | ✅ Yes | `age>18` |
| `<` | ✅ Yes | `age<65` |
| `>=` | ✅ Yes | `age>=18` |
| `<=` | ✅ Yes | `age<=65` |
| `=c=` | ❌ No | - |
| `=nc=` | ❌ No | - |

### Boolean (Checkbox)

| Operator | Support | Example |
|----------|---------|---------|
| `==` | ✅ Yes | `active==true` |
| `!=` | ❌ No | - |
| `>` | ❌ No | - |
| `<` | ❌ No | - |
| `>=` | ❌ No | - |
| `<=` | ❌ No | - |
| `=c=` | ❌ No | - |
| `=nc=` | ❌ No | - |

### Selection Fields (Single/Multi Select)

| Operator | Support | Example |
|----------|---------|---------|
| `==` | ✅ Yes | `status=="Active"` |
| `!=` | ✅ Yes | `status!="Inactive"` |
| `>` | ❌ No | - |
| `<` | ❌ No | - |
| `>=` | ❌ No | - |
| `<=` | ❌ No | - |
| `=c=` | ✅ Yes | `tags=c=("tag1")` |
| `=nc=` | ✅ Yes | `tags=nc=("archived")` |

### Date Fields

| Operator | Support | Example |
|----------|---------|---------|
| `==` | ✅ Yes | `date=="2023-10-01"` |
| `!=` | ✅ Yes | `date!="2023-01-01"` |
| `>` | ✅ Yes | `date>"2023-01-01"` |
| `<` | ✅ Yes | `date<"2023-12-31"` |
| `>=` | ✅ Yes | `date>="2023-01-01"` |
| `<=` | ✅ Yes | `date<="2023-12-31"` |
| `=c=` | ❌ No | - |
| `=nc=` | ❌ No | - |

### Link Fields

| Operator | Support | Example |
|----------|---------|---------|
| `==` | ✅ Yes | `link==("rec123")` |
| `!=` | ✅ Yes | `link!=("rec123")` |
| `>` | ❌ No | - |
| `<` | ❌ No | - |
| `>=` | ❌ No | - |
| `<=` | ❌ No | - |
| `=c=` | ✅ Yes | `link=c=("rec123", "rec456")` |
| `=nc=` | ✅ Yes | `link=nc=("rec789")` |

---

## Special Cases

### Null/Empty Checks

Use `==null` or `!=null` to check for empty values:

```
// Field is empty
description==null
notes==NULL

// Field is not empty
description!=null
notes!=NULL
```

**Compatible with:** All field types

### Array Exact Match

For multi-value fields, `==` requires exact match:

```
// Exact match - must have exactly these tags, in any order
tags==("urgent", "important")

// Will NOT match:
// - tags with only "urgent"
// - tags with "urgent", "important", and "extra"
// - tags in different order (depends on implementation)
```

### Array Partial Match

Use `=c=` for partial match:

```
// Contains ANY of these tags
tags=c=("urgent", "important")

// Will match:
// - tags with "urgent"
// - tags with "important"
// - tags with both
// - tags with either plus other tags
```

---

## Common Patterns

### Range Queries

Combine operators to create ranges:

```
// Age between 18 and 65
age>=18;age<=65

// Price between $50 and $500
price>=50;price<=500

// Dates in 2023
date>="2023-01-01";date<="2023-12-31"
```

### Text Search

```
// Contains keyword
description=c="urgent"

// Doesn't contain unwanted terms
description=nc="archived"

// Combine both
description=c="important";description=nc="old"
```

### Multiple Value Matching

```
// Any of these statuses (OR)
status=="New",status=="Pending",status=="Active"

// Or using contains
status=c=("New", "Pending", "Active")
```

### Boolean Logic

```
// Is true
is_active==true
is_public==1

// Is false
is_archived==false
is_hidden==0
```

---

## Best Practices

### 1. Use Appropriate Operators

```
// ✅ Good: Text search
description=c="keyword"

// ❌ Bad: Unnecessary exact match
description=="This is the exact description keyword appears in"
```

### 2. Date Format Consistency

```
// ✅ Good: Proper date format
date>"2023-01-01"

// ❌ Bad: Wrong format
date>"01/01/2023"
date>"2023-01-01 12:00:00"
```

### 3. Null Checks

```
// ✅ Good: Check for empty
field==null

// ❌ Bad: Don't compare to empty string
field==""
```

### 4. Array Operations

```
// ✅ Good: Check if contains any
tags=c=("urgent", "important")

// ❌ Bad: Multiple separate queries
// (use single contains instead)
tags=="urgent",tags=="important"
```

---

## Summary

| Use Case | Operator | Example |
|----------|----------|---------|
| Exact match | `==` | `status=="Active"` |
| Exclude value | `!=` | `status!="Deleted"` |
| Greater than | `>` | `age>18` |
| Less than | `<` | `price<100` |
| At least | `>=` | `rating>=4` |
| At most | `<=` | `quantity<=10` |
| Text contains | `=c=` | `description=c="urgent"` |
| Text excludes | `=nc=` | `notes=nc="archived"` |
| Has any of | `=c=` | `tags=c=("a", "b")` |
| Has none of | `=nc=` | `tags=nc=("x", "y")` |
| Is empty | `==null` | `field==null` |
| Is not empty | `!=null` | `field!=null` |

---

## Next Steps

- [Field Queries](./field-queries.md) - Field-specific query examples
- [Examples](./examples.md) - Practical query patterns
- [Best Practices](./best-practices.md) - Query optimization tips
