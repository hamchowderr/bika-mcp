# Filter Query Best Practices

Tips, patterns, and best practices for writing efficient and maintainable filter queries.

## Query Design

### 1. Start Simple, Add Complexity

```
// ✅ Good: Build incrementally
// Step 1
status=="Active"

// Step 2
status=="Active";age>18

// Step 3
status=="Active";age>18;city=="New York"

// ❌ Bad: Complex query without testing
status=="Active";age>18;city=="New York";{Member Since}>="2023-01-01";tags=c=("premium", "vip");{Total Spent}>1000
```

### 2. Test Each Condition Separately

```
// Test individual conditions first
status=="Active"          // Returns 100 records
age>18                    // Returns 500 records
city=="New York"          // Returns 200 records

// Then combine
status=="Active";age>18;city=="New York"  // Returns 10 records
```

### 3. Order Conditions Strategically

Place most restrictive conditions first:

```
// ✅ Good: Most restrictive first
rare_status=="Specialty";price>1000;in_stock==true

// ❌ Less efficient: Broad conditions first
in_stock==true;price>1000;rare_status=="Specialty"
```

---

## Syntax Best Practices

### 1. Use Proper Quoting

```
// ✅ Good: Quotes for values with spaces
name=="John Doe"
description=="This is a description"

// ❌ Bad: Missing quotes
name==John Doe
```

### 2. Field Names with Spaces

```
// ✅ Good: Braces for field names with spaces
{First Name}=="John"
{Email Address}=="user@example.com"

// ❌ Bad: No braces
First Name=="John"
```

### 3. Date Format Consistency

```
// ✅ Good: YYYY-MM-DD format
date>"2023-10-01"
{Created Time}>="2023-01-01"

// ❌ Bad: Wrong format
date>"10/01/2023"
date>"2023-10-01 12:00:00"
```

### 4. Array Value Format

```
// ✅ Good: Parentheses for arrays
tags=c=("tag1", "tag2")
link==("rec123", "rec456")

// ❌ Bad: Wrong format
tags=c="tag1", "tag2"
link=="rec123", "rec456"
```

---

## Performance Optimization

### 1. Use Specific Operators

```
// ✅ Good: Direct equality check
status=="Active"

// ❌ Less efficient: Contains for exact match
status=c="Active"
```

### 2. Minimize OR Conditions

```
// ✅ Good: Use contains for multiple values
status=c=("Active", "Pending", "New")

// ❌ Less efficient: Multiple OR conditions
status=="Active",status=="Pending",status=="New"
```

### 3. Filter Early with AND

```
// ✅ Good: Restrictive AND conditions
category=="Rare";price>10000;in_stock==true

// ❌ Less efficient: Broad OR conditions
category=="Common",category=="Uncommon",category=="Rare"
```

### 4. Avoid Redundant Conditions

```
// ✅ Good: No redundancy
age>=18;status=="Active"

// ❌ Bad: Redundant
age>=18;age>0;status=="Active";status!="Inactive"
```

---

## Maintainability

### 1. Use Meaningful Field Names

```
// ✅ Good: Clear field references
{Customer Type}=="Premium"
{Order Status}=="Shipped"

// ❌ Bad: Unclear field IDs
fld123=="Premium"
fldXYZ=="Shipped"
```

### 2. Document Complex Queries

```typescript
// Good practice: Comment complex queries
const filter =
  // Active premium customers
  'status=="Active";{Customer Type}=="Premium";' +
  // With recent activity
  '{Last Purchase}>="2023-01-01";' +
  // High value
  '{Total Spent}>5000';
```

### 3. Use Constants for Repeated Values

```typescript
// ✅ Good: Constants for reuse
const ACTIVE_STATUS = 'Active';
const MIN_AGE = 18;
const filter = `status=="${ACTIVE_STATUS}";age>=${MIN_AGE}`;

// ❌ Bad: Magic strings
const filter = 'status=="Active";age>=18';
```

### 4. Build Queries Programmatically

```typescript
// ✅ Good: Modular query building
function buildFilter(conditions: string[]): string {
  return conditions.filter(c => c).join(';');
}

const conditions = [];
if (includeActive) conditions.push('status=="Active"');
if (minAge) conditions.push(`age>=${minAge}`);
if (city) conditions.push(`city=="${city}"`);

const filter = buildFilter(conditions);
```

---

## Common Pitfalls

### 1. Mixing AND and OR

```
// ❌ Invalid: Cannot mix ; and ,
status=="Active";age>18,city=="NYC"

// ✅ Valid: Use one type only
status=="Active";age>18;city=="NYC"
```

### 2. Incorrect Date Format

```
// ❌ Invalid formats
date>"10/01/2023"
date>"2023-10-01 12:00:00"

// ✅ Valid format
date>"2023-10-01"
```

### 3. Single Quotes

```
// ❌ Invalid: Single quotes not supported
name=='John'

// ✅ Valid: Use double quotes
name=="John"
```

### 4. Missing Null Checks

```
// ❌ May include empty records
age>18

// ✅ Good: Explicit null check if needed
age>18;age!=null
```

### 5. Incorrect Array Syntax

```
// ❌ Invalid
tags=="tag1", "tag2"
link=c="rec123"

// ✅ Valid
tags==("tag1", "tag2")
link=c=("rec123")
```

---

## Query Patterns

### Range Queries

```
// Number range
price>=100;price<=500

// Age range
age>=18;age<=65

// Date range
date>="2023-01-01";date<="2023-12-31"
```

### Exclusion Queries

```
// Exclude specific values
status!="Deleted";status!="Archived"

// Exclude categories
category!="Test";category!="Demo"

// Doesn't contain tags
tags=nc=("archived", "spam")
```

### Text Search Queries

```
// Search in multiple fields
name=c="search",description=c="search",notes=c="search"

// Exclude unwanted terms
description=c="important";description=nc="archived"
```

### Null/Empty Checks

```
// Has value
email!=null;phone!=null

// Missing value
{Assigned To}==null

// Either missing
email==null,phone==null
```

---

## API Integration

### URL Encoding

```typescript
// ✅ Good: Always URL encode
const filter = 'status=="Active";age>18';
const encoded = encodeURIComponent(filter);
const url = `${baseUrl}?filter=${encoded}`;

// ❌ Bad: No encoding
const url = `${baseUrl}?filter=${filter}`;
```

### Error Handling

```typescript
// ✅ Good: Handle filter errors
try {
  const response = await fetchRecords(filter);
  if (!response.success) {
    console.error('Filter error:', response.message);
    // Fallback or retry logic
  }
} catch (error) {
  console.error('Query failed:', error);
}
```

### Validate Before Sending

```typescript
// ✅ Good: Validate query syntax
function validateFilter(filter: string): boolean {
  // Check for mixed operators
  const hasSemicolon = filter.includes(';');
  const hasComma = filter.includes(',');

  if (hasSemicolon && hasComma) {
    const andKeyword = / and /i.test(filter);
    const orKeyword = / or /i.test(filter);
    if (!andKeyword && !orKeyword) {
      console.error('Cannot mix ; and ,');
      return false;
    }
  }

  return true;
}
```

---

## Debugging Queries

### 1. Test Incrementally

```
// Build and test step by step
status=="Active"                             // Test
status=="Active";age>18                      // Test
status=="Active";age>18;city=="New York"     // Test
```

### 2. Isolate Conditions

```
// If combined query fails, test each part
// Original (failing)
status=="Active";age>18;city=="New York"

// Test separately
status=="Active"      // Works
age>18                // Works
city=="New York"      // Fails - check field name/value
```

### 3. Check Field Names

```
// Verify field name exists and is spelled correctly
// Use exact field name from database
{Customer Name}=="John"  // Not {customer name} or Customer Name
```

### 4. Verify Data Types

```
// Ensure value type matches field type
age==18           // ✅ Number
age=="18"         // ❌ String
is_active==true   // ✅ Boolean
is_active=="true" // ❌ String
```

---

## Security Considerations

### 1. Sanitize User Input

```typescript
// ✅ Good: Sanitize user input
function sanitizeFilterValue(value: string): string {
  // Remove or escape dangerous characters
  return value.replace(/[;"',]/g, '');
}

const userInput = sanitizeFilterValue(req.query.search);
const filter = `name=c="${userInput}"`;
```

### 2. Validate Field Names

```typescript
// ✅ Good: Whitelist allowed fields
const ALLOWED_FIELDS = ['name', 'status', 'age', 'city'];

function buildSafeFilter(field: string, value: string): string {
  if (!ALLOWED_FIELDS.includes(field)) {
    throw new Error('Invalid field name');
  }
  return `${field}=="${value}"`;
}
```

### 3. Limit Query Complexity

```typescript
// ✅ Good: Limit number of conditions
const MAX_CONDITIONS = 10;

function validateQueryComplexity(filter: string): boolean {
  const conditionCount = (filter.match(/[;,]/g) || []).length + 1;
  return conditionCount <= MAX_CONDITIONS;
}
```

---

## Testing Queries

### Unit Tests

```typescript
describe('Filter Query Building', () => {
  it('should build simple equality query', () => {
    const filter = buildFilter({ status: 'Active' });
    expect(filter).toBe('status=="Active"');
  });

  it('should build AND query', () => {
    const filter = buildFilter({ status: 'Active', age: '>18' });
    expect(filter).toBe('status=="Active";age>18');
  });

  it('should handle field names with spaces', () => {
    const filter = buildFilter({ 'First Name': 'John' });
    expect(filter).toBe('{First Name}=="John"');
  });
});
```

---

## Summary Checklist

### Before Sending Query

- [ ] Proper quoting for values with spaces
- [ ] Braces for field names with spaces
- [ ] Correct date format (`YYYY-MM-DD`)
- [ ] Array syntax for multi-value fields
- [ ] Not mixing `;` and `,`
- [ ] URL encoded for API calls
- [ ] Field names exist and are correct
- [ ] Value types match field types
- [ ] Tested incrementally
- [ ] No redundant conditions

### For Better Performance

- [ ] Most restrictive conditions first
- [ ] Use specific operators
- [ ] Minimize OR conditions
- [ ] Avoid unnecessary complexity

### For Maintainability

- [ ] Clear field names or documented IDs
- [ ] Complex queries are commented
- [ ] Repeated values use constants
- [ ] Modular query building functions

---

## Quick Reference

| Do | Don't |
|----|-------|
| `name=="John Doe"` | `name=='John Doe'` |
| `{First Name}=="John"` | `First Name=="John"` |
| `date>"2023-10-01"` | `date>"10/01/2023"` |
| `tags==("a", "b")` | `tags=="a", "b"` |
| `age>=18;age<=65` | `age>=18,age<=65` (unless OR intended) |
| `status=="Active"` | `status=c="Active"` (for exact match) |
| `field!=null` | `field!=""` |

---

## Next Steps

- [Examples](./examples.md) - See practical examples
- [Field Queries](./field-queries.md) - Field-specific patterns
- [Syntax](./syntax.md) - Understand expression structure
