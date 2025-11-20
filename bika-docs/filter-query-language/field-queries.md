# Field-Specific Queries

Query examples and patterns for each field type in Bika.

## Single Line Text

Supported operators: `==`, `!=`, `=c=`, `=nc=`

### Examples

| Operation | Query | Description |
|-----------|-------|-------------|
| Exact match | `single_text=="simple text"` | Cells with exact content |
| Not equal | `single_text!="simple text"` | Cells without exact content |
| Contains | `single_text=c="simple text"` | Cells containing specified text |
| Does not contain | `single_text=nc="simple text"` | Cells not containing text |
| Is empty | `single_text==null` | Empty cells |
| Is not empty | `single_text!=null` | Non-empty cells |

### Use Cases

```
// Find by name
name=="John Doe"

// Search in title
title=c="Project"

// Exclude test data
name=nc="test"

// Find records with descriptions
description!=null
```

---

## Number

Supported operators: `==`, `!=`, `>`, `<`, `>=`, `<=`

### Examples

| Operation | Query | Description |
|-----------|-------|-------------|
| Equal to | `number_field==123` | Exact number match |
| Not equal | `number_field!=123` | Not this number |
| Greater than | `number_field>123` | Numbers greater than value |
| Less than | `number_field<123` | Numbers less than value |
| Greater or equal | `number_field>=123` | At least this value |
| Less or equal | `number_field<=123` | At most this value |
| Is empty | `number_field==null` | Empty cells |
| Is not empty | `number_field!=null` | Non-empty cells |

### Use Cases

```
// Age filter
age>=18;age<=65

// Price range
price>100;price<1000

// Find items in stock
quantity>0

// High ratings only
rating>=4
```

---

## Checkbox

Supported operator: `==`

Supported values: `true`, `false`, `1`, `0`

### Examples

| Operation | Query | Description |
|-----------|-------|-------------|
| Checked | `checkbox==true` or `checkbox==1` | Checked boxes |
| Unchecked | `checkbox==false` or `checkbox==0` | Unchecked boxes |

### Use Cases

```
// Active records only
is_active==true

// Completed tasks
completed==1

// Not archived
is_archived==false

// Public items
is_public==1
```

---

## Single Select

Supported operators: `==`, `!=`, `=c=`, `=nc=`

### Examples

| Operation | Query | Description |
|-----------|-------|-------------|
| Exact match | `single_select=="Option 1"` | Specific option selected |
| Not equal | `single_select!="Option 1"` | Not this option |
| Contains (any of) | `single_select=c=("Option 1", "Option 2")` | Any of these options |
| Does not contain | `single_select=nc=("Option 1", "Option 2")` | None of these options |
| Is empty | `single_select==null` | No option selected |
| Is not empty | `single_select!=null` | Has selection |

### Use Cases

```
// Specific status
status=="Active"

// Not deleted
status!="Deleted"

// Any high priority
priority=c=("High", "Urgent", "Critical")

// Has status assigned
status!=null
```

---

## Multi Select

Supported operators: `==`, `!=`, `=c=`, `=nc=`

Value type: Array `("Option 1", "Option 2")`

### Examples

| Operation | Query | Description |
|-----------|-------|-------------|
| Exact match | `multi_select==("Option 1", "Option 2")` | Exactly these options |
| Not equal | `multi_select!=("Option 1", "Option 2")` | Not exactly these |
| Contains | `multi_select=c=("Option 1", "Option 2")` | Has any of these |
| Does not contain | `multi_select=nc=("Option 1", "Option 2")` | Has none of these |
| Is empty | `multi_select==null` | No options selected |
| Is not empty | `multi_select!=null` | Has selections |

### Use Cases

```
// Has urgent or important tag
tags=c=("Urgent", "Important")

// Doesn't have archived tags
tags=nc=("Archived", "Deleted")

// Exactly these features
features==("Feature A", "Feature B")

// Has tags assigned
tags!=null
```

---

## Date

Supported operators: `==`, `!=`, `>`, `<`, `>=`, `<=`

**Important:** Date values must be in `YYYY-MM-DD` format (year-month-day precision only).

### Examples

| Operation | Query | Description |
|-----------|-------|-------------|
| Exact date | `date=="2023-10-01"` | Specific date |
| Not this date | `date!="2023-10-01"` | Exclude date |
| After date | `date>"2023-10-01"` | Dates after |
| Before date | `date<"2023-10-01"` | Dates before |
| On or after | `date>="2023-10-01"` | From date onward |
| On or before | `date<="2023-10-01"` | Up to date |
| Is empty | `date==null` | No date set |
| Is not empty | `date!=null` | Has date |

### Valid Format

```
✅ date>"2023-10-01"
❌ date>"2023-10-01 12:00:00"  // Cannot include time
❌ date>"10/01/2023"            // Wrong format
```

### Use Cases

```
// Date range (2023)
date>="2023-01-01";date<="2023-12-31"

// Future dates
date>"2023-10-01"

// Past dates
date<"2023-01-01"

// This month
date>="2023-10-01";date<="2023-10-31"

// Has due date
{Due Date}!=null
```

---

## Link

Supported operators: `==`, `!=`, `=c=`, `=nc=`

Value type: Array `("record1", "record2")`

### Examples

| Operation | Query | Description |
|-----------|-------|-------------|
| Exact match | `link==("record1", "record2")` | Exactly these links |
| Not equal | `link!=("record1", "record2")` | Not exactly these |
| Contains | `link=c=("record1", "record2")` | Linked to any of these |
| Does not contain | `link=nc=("record1", "record2")` | Not linked to these |
| Is empty | `link==null` | No links |
| Is not empty | `link!=null` | Has links |

### Use Cases

```
// Linked to specific records
{Related Orders}=c=("rec_order1", "rec_order2")

// Not linked to archived
{Parent Task}=nc=("rec_archived1")

// Has related items
{Related Items}!=null

// No parent task
{Parent Task}==null
```

---

## Query Patterns by Use Case

### Text Search

```
// Search in multiple text fields (OR)
name=c="search term",description=c="search term",notes=c="search term"

// Exclude keywords
description=nc="archived";notes=nc="deleted"
```

### Numeric Ranges

```
// Age range
age>=18;age<65

// Price range
price>=50;price<=500

// Positive numbers only
quantity>0
```

### Status Filtering

```
// Active statuses (OR)
status=="Active",status=="In Progress",status=="Pending"

// Not inactive
status!="Inactive"

// Any priority status
priority=c=("High", "Urgent", "Critical")
```

### Date Ranges

```
// Year 2023
date>="2023-01-01";date<="2023-12-31"

// Last quarter of 2023
date>="2023-10-01";date<="2023-12-31"

// Future events
{Start Date}>"2023-10-01"
```

### Boolean Filters

```
// Active and not archived
is_active==true;is_archived==false

// Published items
is_published==1

// Incomplete tasks
is_complete==0
```

### Multi-Value Fields

```
// Has any required tag
tags=c=("urgent", "important", "critical")

// Doesn't have exclusion tags
tags=nc=("archived", "deleted", "spam")

// Linked to specific records
{Related}=c=("rec1", "rec2", "rec3")
```

### Empty/Non-Empty Checks

```
// Has description
description!=null

// Missing email
email==null

// Has tags
tags!=null

// No attachments
attachments==null
```

---

## Complex Queries

### Multi-Field AND Conditions

```
// Active, high-priority, assigned tasks
status=="Active";priority=="High";assignee!=null

// In-stock, affordable electronics
category=="Electronics";in_stock==true;price<500

// Recent, incomplete tasks
{Created Time}>="2023-10-01";is_complete==false
```

### Multi-Value OR Conditions

```
// Any of these statuses
status=="New",status=="Pending",status=="In Progress"

// Multiple categories
category=="A",category=="B",category=="C"

// Various priority levels
priority=="High",priority=="Urgent",priority=="Critical"
```

---

## Field Type Quick Reference

| Field Type | Operators | Value Format | Example |
|------------|-----------|--------------|---------|
| Single Line Text | `==`, `!=`, `=c=`, `=nc=` | String | `name=="John"` |
| Number | `==`, `!=`, `>`, `<`, `>=`, `<=` | Number | `age>18` |
| Checkbox | `==` | `true`/`false`/`1`/`0` | `active==true` |
| Single Select | `==`, `!=`, `=c=`, `=nc=` | String or Array | `status=="Active"` |
| Multi Select | `==`, `!=`, `=c=`, `=nc=` | Array | `tags==("a", "b")` |
| Date | `==`, `!=`, `>`, `<`, `>=`, `<=` | `YYYY-MM-DD` | `date>"2023-01-01"` |
| Link | `==`, `!=`, `=c=`, `=nc=` | Array | `link=c=("rec1")` |

---

## Tips

1. **Text fields**: Use `=c=` for substring search, `==` for exact match
2. **Numbers**: Use comparison operators (`>`, `<`, etc.) for ranges
3. **Checkboxes**: Only `==` operator, use `true`/`false` or `1`/`0`
4. **Select fields**: Use `=c=` with arrays to match multiple options
5. **Dates**: Must use `YYYY-MM-DD` format, no time component
6. **Links**: Use arrays even for single record: `("rec123")`
7. **Null checks**: Use `==null` or `!=null` for empty/non-empty

---

## Next Steps

- [Examples](./examples.md) - Practical query patterns
- [Best Practices](./best-practices.md) - Query optimization
- [Syntax](./syntax.md) - Expression structure
- [Comparison Operators](./comparison-operators.md) - Operator details
