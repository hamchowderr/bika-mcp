# Logical Operators

Logical operators allow you to combine multiple expressions to create complex filter queries.

## Available Logical Operators

| Operator | Alternative | Meaning | Example |
|----------|-------------|---------|---------|
| `;` | `and` | Logical AND | `status=="Active";age>18` |
| `,` | `or` | Logical OR | `priority=="High",priority=="Urgent"` |

---

## AND Operator (`;` or `and`)

Use the AND operator to match records that satisfy **all** conditions.

### Syntax

```
condition1;condition2;condition3
```

or

```
condition1 and condition2 and condition3
```

### Examples

#### Using Semicolon (`;`)

```
status=="Active";age>18
```
**Matches:** Records where status is "Active" **AND** age is greater than 18

```
category=="Electronics";price<1000;in_stock==true
```
**Matches:** Records that are electronics **AND** price less than 1000 **AND** in stock

#### Using `and` Keyword

```
status=="Active" and age>18
```
**Matches:** Same as above - status "Active" AND age > 18

### Multiple AND Conditions

```
name=="John";age>25;city=="New York";status=="Active"
```
**Matches:** Records matching **all four** conditions

---

## OR Operator (`,` or `or`)

Use the OR operator to match records that satisfy **any** condition.

### Syntax

```
condition1,condition2,condition3
```

or

```
condition1 or condition2 or condition3
```

### Examples

#### Using Comma (`,`)

```
status=="Urgent",status=="High Priority"
```
**Matches:** Records where status is "Urgent" **OR** "High Priority"

```
category=="Electronics",category=="Computers",category=="Phones"
```
**Matches:** Records in any of the three categories

#### Using `or` Keyword

```
priority=="High" or priority=="Urgent"
```
**Matches:** Records with priority "High" OR "Urgent"

### Multiple OR Conditions

```
status=="New",status=="Pending",status=="In Review",status=="Active"
```
**Matches:** Records with **any** of these statuses

---

## Important Restrictions

### Cannot Mix AND and OR

**Critical Rule:** You can only use **one type** of logical operator in a single query. You cannot mix AND and OR operators.

#### ✅ Valid Queries

```
// All AND
single_text=="text 1";single_text=="text 2";single_text=="text 3"

// All OR
single_text=="text 1",single_text=="text 2",single_text=="text 3"

// All AND (using keyword)
status=="Active" and age>18 and city=="NYC"

// All OR (using keyword)
priority=="High" or priority=="Urgent" or priority=="Critical"
```

#### ❌ Invalid Queries

```
// Mixing AND (;) and OR (,)
single_text=="text 1";single_text=="text 2",single_text=="text 3"

// Mixing AND and OR keywords
status=="Active" and age>18 or city=="NYC"

// Mixing symbols and keywords
status=="Active";age>18 or city=="NYC"
```

---

## Workarounds for Complex Logic

Since you cannot mix AND/OR operators, you need to structure queries differently.

### Example Scenario

**Goal:** Find records where:
- (Status is "Active" AND Age > 18) OR (Status is "Premium")

**Cannot Express Directly:**
```
❌ status=="Active";age>18,status=="Premium"
```

**Workarounds:**

1. **Multiple API Calls:**
   - Query 1: `status=="Active";age>18`
   - Query 2: `status=="Premium"`
   - Merge results in your application

2. **Application-Side Filtering:**
   - Fetch broader dataset
   - Filter programmatically

3. **Restructure Query:**
   - Find alternative query structure that achieves similar result

---

## Compound Query Examples

### All AND Conditions

```
// Find active adult users in New York
status=="Active";age>=18;city=="New York"

// Find high-value electronics
category=="Electronics";price>1000;rating>=4

// Find urgent tasks assigned to team
priority=="Urgent";assigned==true;{Team Name}=="Engineering"
```

### All OR Conditions

```
// Find any high-priority items
priority=="High",priority=="Urgent",priority=="Critical"

// Find items in multiple categories
category=="Phones",category=="Tablets",category=="Laptops"

// Find various status types
status=="New",status=="Pending",status=="In Review"
```

---

## Evaluation Order

### AND Operator

All conditions must be true. Evaluation is left-to-right:

```
A;B;C
```

Record matches if: `A is true AND B is true AND C is true`

### OR Operator

Any condition can be true. Evaluation is left-to-right:

```
A,B,C
```

Record matches if: `A is true OR B is true OR C is true`

---

## Performance Considerations

### AND Queries (More Restrictive)

```
status=="Active";age>18;city=="New York"
```

- More restrictive (fewer results)
- Generally faster
- Each condition reduces result set

### OR Queries (Less Restrictive)

```
status=="New",status=="Pending",status=="In Review"
```

- Less restrictive (more results)
- May be slower with many conditions
- Each condition adds to result set

---

## Common Patterns

### Filter by Multiple Values (OR)

Find records matching any of several values for the same field:

```
status=="New",status=="Pending",status=="Active"
priority=="High",priority=="Urgent"
category=="A",category=="B",category=="C"
```

### Filter by Multiple Criteria (AND)

Find records matching all criteria:

```
status=="Active";price>100;in_stock==true
category=="Electronics";rating>=4;price<1000
{First Name}=="John";age>25;city=="NYC"
```

### Range Queries (AND)

Find records within a range:

```
price>100;price<500
age>=18;age<=65
date>="2023-01-01";date<="2023-12-31"
```

### Multiple Field Matches (OR)

Search across multiple fields:

```
name=c="search term",description=c="search term",tags=c="search term"
```

---

## Best Practices

### 1. Use AND for Filtering Down

```
// Good: Each condition narrows results
category=="Electronics";price<1000;in_stock==true
```

### 2. Use OR for Alternatives

```
// Good: Find any matching status
status=="New",status=="Pending",status=="Active"
```

### 3. Order Conditions Strategically

Place most restrictive conditions first in AND queries:

```
// Good: Most restrictive first
rare_category=="Specialty";price>1000;in_stock==true

// Less efficient: Broad conditions first
in_stock==true;price>1000;rare_category=="Specialty"
```

### 4. Avoid Redundant Conditions

```
// Bad: Redundant
status=="Active";status=="Active"

// Good: Single condition
status=="Active"
```

---

## Examples by Use Case

### User Filtering

```
// Active adult users
status=="Active";age>=18

// Premium or VIP users
{User Type}=="Premium",{User Type}=="VIP"

// Users in specific cities
city=="New York";state=="NY";country=="USA"
```

### Product Filtering

```
// Available products in price range
in_stock==true;price>=50;price<=200

// Products in multiple categories
category=="Electronics",category=="Computers",category=="Phones"

// High-rated, affordable products
rating>=4;price<100;available==true
```

### Task Filtering

```
// Urgent tasks assigned to me
priority=="Urgent";{Assigned To}=="mem123"

// Any incomplete task
status=="To Do",status=="In Progress",status=="Blocked"

// Overdue high-priority tasks
is_overdue==true;priority=="High";status!="Complete"
```

### Date-Based Filtering

```
// Recent records
{Created Time}>="2023-01-01";{Created Time}<="2023-12-31"

// Upcoming or ongoing events
{Start Date}<="2023-10-01",{End Date}>="2023-10-01"
```

---

## Debugging Compound Queries

### Test Individual Conditions

```
// Test each condition separately
status=="Active"        // Returns 100 records
age>18                  // Returns 500 records
city=="New York"        // Returns 200 records

// Combined with AND
status=="Active";age>18;city=="New York"  // Returns 10 records
```

### Simplify Complex Queries

Break down complex queries:

```
// Complex query not working
status=="Active";age>18;city=="NYC";priority=="High"

// Test incrementally
status=="Active"
status=="Active";age>18
status=="Active";age>18;city=="NYC"
status=="Active";age>18;city=="NYC";priority=="High"
```

---

## Summary

| Aspect | AND (`;` or `and`) | OR (`,` or `or`) |
|--------|-------------------|------------------|
| **Matches** | All conditions must be true | Any condition can be true |
| **Result Size** | Smaller (more restrictive) | Larger (less restrictive) |
| **Use Case** | Multiple criteria filtering | Multiple value alternatives |
| **Symbol** | `;` | `,` |
| **Keyword** | `and` | `or` |
| **Can Mix** | ❌ No | ❌ No |

**Remember:** Cannot mix AND and OR in a single query!

---

## Next Steps

- [Comparison Operators](./comparison-operators.md) - Learn all comparison operators
- [Field Queries](./field-queries.md) - Field-specific query examples
- [Examples](./examples.md) - Practical query patterns
