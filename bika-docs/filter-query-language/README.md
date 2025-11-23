# Bika Filter Query Language Documentation

Comprehensive documentation for Bika's Filter Query Language (FQL) used to query and filter database records.

## Overview

The Filter Query Language allows you to construct powerful queries to filter database records based on field values, using a simple expression-based syntax.

## Contents

- [Syntax](./syntax.md) - Expression structure, field references, and value formats
- [Logical Operators](./logical-operators.md) - AND/OR operators for compound queries
- [Comparison Operators](./comparison-operators.md) - All comparison operators and their usage
- [Field Queries](./field-queries.md) - Query examples for each field type
- [Examples](./examples.md) - Practical query examples and common patterns
- [Best Practices](./best-practices.md) - Query optimization and tips

## Quick Start

### Basic Expression

```
field_name==value
```

### Compound Query (AND)

```
field1=="value1";field2=="value2"
```

### Compound Query (OR)

```
field1=="value1",field2=="value2"
```

## Common Operators

| Operator | Meaning | Example |
|----------|---------|---------|
| `==` | Equal to | `name=="John"` |
| `!=` | Not equal to | `status!="Complete"` |
| `>` | Greater than | `age>18` |
| `<` | Less than | `price<100` |
| `>=` | Greater than or equal | `score>=90` |
| `<=` | Less than or equal | `quantity<=10` |
| `=c=` | Contains | `description=c="urgent"` |
| `=nc=` | Does not contain | `tags=nc="archived"` |
| `;` or `and` | Logical AND | `status=="Active";age>18` |
| `,` or `or` | Logical OR | `priority=="High",priority=="Urgent"` |
