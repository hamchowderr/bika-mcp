# Filter Query Examples

Practical examples and common query patterns for real-world use cases.

## Basic Queries

### Single Condition

```
// Find active records
status=="Active"

// Find adults
age>=18

// Find checked items
is_complete==true

// Find items with descriptions
description!=null
```

### Text Search

```
// Exact match
title=="Project Alpha"

// Contains keyword
description=c="urgent"

// Doesn't contain word
notes=nc="archived"

// Has content
content!=null
```

---

## User/Customer Queries

### Active Users

```
status=="Active";is_deleted==false
```

### Adult Users in Specific City

```
age>=18;city=="New York"
```

### Premium or VIP Customers

```
{Customer Type}=="Premium",{Customer Type}=="VIP"
```

### Users Who Haven't Logged In

```
{Last Login}==null
```

### Users from Multiple Cities

```
city=="New York",city=="Los Angeles",city=="Chicago"
```

---

## Product/Inventory Queries

### In-Stock Products

```
in_stock==true;quantity>0
```

### Products in Price Range

```
price>=50;price<=500
```

### Electronics Under $1000

```
category=="Electronics";price<1000
```

### High-Rated Products

```
rating>=4;review_count>10
```

### Out of Stock Items

```
quantity==0,in_stock==false
```

### Products on Sale

```
on_sale==true;discount>0
```

---

## Task/Project Queries

### My Active Tasks

```
{Assigned To}=="mem123";status=="In Progress"
```

### Overdue Tasks

```
{Due Date}<"2023-10-01";status!="Complete"
```

### High Priority Incomplete Tasks

```
priority=="High";is_complete==false
```

### Tasks Due This Month

```
{Due Date}>="2023-10-01";{Due Date}<="2023-10-31"
```

### Unassigned Tasks

```
{Assigned To}==null;status!="Complete"
```

### Tasks with Any Priority Flag

```
priority=="High",priority=="Urgent",priority=="Critical"
```

---

## Order/Transaction Queries

### Recent Orders

```
{Order Date}>="2023-10-01"
```

### High-Value Orders

```
total>=1000;status!="Cancelled"
```

### Pending Orders

```
status=="Pending",status=="Processing"
```

### Orders from Specific Customer

```
{Customer ID}=="cust_12345";{Order Date}>="2023-01-01"
```

### Completed Orders in Date Range

```
status=="Completed";{Order Date}>="2023-10-01";{Order Date}<="2023-10-31"
```

---

## Content/Article Queries

### Published Articles

```
is_published==true;{Publish Date}<=2023-10-01"
```

### Draft Articles

```
status=="Draft";is_published==false
```

### Articles by Category

```
category=="Technology",category=="Science",category=="Business"
```

### Articles with Tags

```
tags=c=("featured", "trending", "popular")
```

### Recent Articles Without Images

```
{Created Time}>="2023-10-01";featured_image==null
```

---

## Event Queries

### Upcoming Events

```
{Start Date}>"2023-10-01";is_cancelled==false
```

### Events This Month

```
{Start Date}>="2023-10-01";{Start Date}<="2023-10-31"
```

### Sold Out Events

```
is_sold_out==true,tickets_remaining==0
```

### Events in Multiple Venues

```
venue=="Venue A",venue=="Venue B",venue=="Venue C"
```

### Active Events with Tickets

```
status=="Active";tickets_remaining>0;{End Date}>="2023-10-01"
```

---

## Employee/HR Queries

### Active Employees

```
status=="Active";{End Date}==null
```

### Employees in Department

```
department=="Engineering";status=="Active"
```

### Senior Employees

```
{Years of Service}>=5;level=c=("Senior", "Lead", "Principal")
```

### Employees Due for Review

```
{Next Review}>="2023-10-01";{Next Review}<="2023-10-31"
```

---

## Real Estate/Property Queries

### Available Properties

```
status=="Available";is_sold==false
```

### Properties in Price Range

```
price>=200000;price<=500000;city=="Austin"
```

### Properties by Type

```
type=="House",type=="Condo",type=="Townhouse"
```

### Large Properties

```
bedrooms>=3;bathrooms>=2;sqft>=2000
```

---

## Support Ticket Queries

### Open Tickets

```
status=="Open",status=="In Progress"
```

### High Priority Tickets

```
priority=="High";status!="Closed"
```

### Unassigned Tickets

```
{Assigned To}==null;status=="Open"
```

### Tickets from VIP Customers

```
{Customer Type}=="VIP";status!="Closed"
```

### Old Open Tickets

```
{Created Time}<"2023-09-01";status!="Closed"
```

---

## Financial/Accounting Queries

### Unpaid Invoices

```
status=="Sent";is_paid==false
```

### Overdue Invoices

```
{Due Date}<"2023-10-01";is_paid==false
```

### High-Value Invoices

```
amount>10000;status!="Cancelled"
```

### Invoices from Q4 2023

```
{Invoice Date}>="2023-10-01";{Invoice Date}<="2023-12-31"
```

---

## Complex Multi-Field Queries

### Available Affordable Tech Products

```
category=="Technology";price<500;in_stock==true;rating>=4
```

### Active High-Value Customers

```
status=="Active";{Total Spent}>5000;{Last Purchase}>="2023-01-01"
```

### Urgent Incomplete Tasks Assigned to Team

```
priority=="Urgent";is_complete==false;{Team}=="Engineering";{Due Date}<="2023-10-31"
```

### Featured In-Stock Products on Sale

```
is_featured==true;in_stock==true;on_sale==true;quantity>0
```

---

## Data Quality Queries

### Missing Required Fields

```
// Missing email
email==null;status=="Active"

// Missing description
description==null,description==""

// No category assigned
category==null
```

### Incomplete Records

```
name==null,email==null,phone==null
```

### Test/Demo Data

```
name=c="test",email=c="test",{First Name}=c="demo"
```

---

## Date-Based Patterns

### This Year

```
date>="2023-01-01";date<="2023-12-31"
```

### This Quarter (Q4 2023)

```
date>="2023-10-01";date<="2023-12-31"
```

### Last 30 Days (from Oct 1)

```
date>="2023-09-01";date<="2023-10-01"
```

### Future Dates

```
date>"2023-10-01"
```

### Past Dates

```
date<"2023-10-01"
```

---

## Negation Patterns

### Not Deleted or Archived

```
status!="Deleted";status!="Archived"
```

### Not in Excluded Categories

```
category!="Archived";category!="Spam";category!="Test"
```

### Without Specific Tags

```
tags=nc=("archived", "deleted", "spam")
```

---

## Array Field Patterns

### Has Any of These Tags

```
tags=c=("urgent", "important", "high-priority")
```

### Has None of These Tags

```
tags=nc=("archived", "deleted", "hidden")
```

### Linked to Specific Records

```
{Related Items}=c=("rec_item1", "rec_item2")
```

### Not Linked to Archived Items

```
{Parent}=nc=("rec_archived1", "rec_archived2")
```

---

## Practical API Usage

### In GET Request

```bash
# URL encode the query
curl -X GET "https://bika.ai/api/openapi/bika/v1/spaces/{SPACE_ID}/resources/databases/{NODE_ID}/records?filter=status%3D%3D%22Active%22%3Bage%3E18" \
  -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}"
```

### JavaScript/TypeScript

```typescript
// Build filter query
const filter = 'status=="Active";age>18;city=="New York"';

// URL encode
const encodedFilter = encodeURIComponent(filter);

// Make API call
const response = await fetch(
  `https://bika.ai/api/openapi/bika/v1/spaces/${spaceId}/resources/databases/${nodeId}/records?filter=${encodedFilter}`,
  {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
);
```

### Python

```python
import urllib.parse

# Build filter
filter_query = 'status=="Active";age>18'

# URL encode
encoded_filter = urllib.parse.quote(filter_query)

# Use in request
url = f"https://bika.ai/api/openapi/bika/v1/spaces/{space_id}/resources/databases/{node_id}/records?filter={encoded_filter}"
```

---

## Common Patterns Summary

| Use Case | Pattern | Example |
|----------|---------|---------|
| Exact match | `field=="value"` | `status=="Active"` |
| Range | `field>=min;field<=max` | `age>=18;age<=65` |
| Text search | `field=c="keyword"` | `title=c="project"` |
| Multiple values (OR) | `field=="a",field=="b"` | `status=="A",status=="B"` |
| Multiple conditions (AND) | `field1=="a";field2=="b"` | `status=="Active";age>18` |
| Not empty | `field!=null` | `email!=null` |
| Is empty | `field==null` | `notes==null` |
| Exclude value | `field!="value"` | `status!="Deleted"` |
| Date range | `date>="start";date<="end"` | `date>="2023-01-01";date<="2023-12-31"` |
| Boolean check | `field==true` | `is_active==true` |

---

## Tips for Building Queries

1. **Start Simple**: Begin with single condition, add complexity
2. **Test Incrementally**: Test each condition separately
3. **URL Encode**: Always URL encode queries in API calls
4. **Use Parentheses**: For array values: `("val1", "val2")`
5. **Quote Dates**: Always quote date values: `"2023-10-01"`
6. **Check Field Names**: Use braces for names with spaces: `{Full Name}`
7. **One Logical Operator**: Don't mix `;` and `,` in same query

---

## Next Steps

- [Best Practices](./best-practices.md) - Optimization and tips
- [Field Queries](./field-queries.md) - Field-specific details
- [Syntax](./syntax.md) - Expression structure
