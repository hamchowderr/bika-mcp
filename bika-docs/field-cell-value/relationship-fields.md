# Relationship Fields

Fields that create relationships between records, users, and data.

## Member

Associates users, teams, or roles from the system.

### Use Cases
- Task assignees
- Project participants
- Responsible persons
- Team members
- Collaborators
- Reviewers

### Characteristics
- Associates system users
- Supports teams and roles
- Facilitates member management
- Enables collaboration features
- Multiple members supported

### Write

**Type:** `array of string` (member IDs)

**Example:**
```json
["member_id"]
```

**Multiple Members:**
```json
["mem123", "mem456", "mem789"]
```

**Note:** Use member IDs to reference users

### Read

#### cellFormat: json
**Type:** `array of object`

**Object Properties:**
- `id` - Member/Team/Role ID (string)
- `type` - Type indicator: `'Member'` | `'Team'` | `'Role'`
- `name` - Display name (string)

**Example:**
```json
[
  {
    "id": "mem123",
    "type": "Member",
    "name": "John Doe"
  },
  {
    "id": "team456",
    "type": "Team",
    "name": "Engineering Team"
  }
]
```

#### cellFormat: string
**Type:** `string`

**Example:**
```json
"John Doe"
```

**Multiple Members:**
```json
"John Doe, Jane Smith, Engineering Team"
```

**Note:** Multiple members are comma-separated

---

## Link

Associates other records from the same or different tables.

### Use Cases
- Associated orders
- Customer records
- Parent-child relationships
- Related tasks
- Linked documents
- Cross-references

### Characteristics
- Links to other records
- Enables quick navigation
- Supports multiple links
- Facilitates associated queries
- Maintains data relationships

### Write

**Type:** `array of string` (record IDs)

**Example:**
```json
["record123", "record456"]
```

**Single Link:**
```json
["record123"]
```

**Note:** Use record IDs from the linked table

### Read

#### cellFormat: json
**Type:** `array of string`

**Example:**
```json
["record123", "record456"]
```

#### cellFormat: string
**Type:** `string`

**Example:**
```json
"record123, record456"
```

**Note:** Multiple record IDs are comma-separated

---

## Lookup

Displays field values from linked records (computed field).

### Use Cases
- Display customer name from linked customer record
- Show product price from product table
- Pull industry from company record
- Display related data
- Aggregate information

### Characteristics
- Automatically calculated from linked records
- Depends on Link field configuration
- Displays data from related records
- Ensures data consistency
- Cannot be directly edited

### Write

**Status:** `read_only`

**Not supported for direct writing** - automatically calculated by associated Link fields

### Read

#### cellFormat: json
**Type:** Depends on the source field type

Can be any field type value from the linked record.

**Example (from text field):**
```json
"Customer Name"
```

**Example (from number field):**
```json
99.99
```

**Example (from multiple linked records):**
```json
["Value 1", "Value 2", "Value 3"]
```

#### cellFormat: string
**Type:** `array of any`

**Example:**
```json
["example text", "another text"]
```

**Note:** Returns array of values from linked records

---

## Summary Table

| Field Type | Writable | Write Type | Read (JSON) Type | Notes |
|------------|----------|-----------|------------------|-------|
| Member | ✅ Yes | array of string (IDs) | array of objects | User/Team/Role references |
| Link | ✅ Yes | array of string (IDs) | array of string | Record references |
| Lookup | ❌ No | - | varies by source | Auto-calculated |

## Member Field Details

### Member Types

The Member field can reference three types:

1. **Member** - Individual users
2. **Team** - Groups of users
3. **Role** - User roles/permissions

### Writing Members

```json
// Single member
["mem123"]

// Multiple members
["mem123", "mem456"]

// Mix of members and teams
["mem123", "team456"]
```

### Reading Members (JSON)

```json
[
  {
    "id": "mem123",
    "type": "Member",
    "name": "John Doe"
  },
  {
    "id": "team456",
    "type": "Team",
    "name": "Engineering"
  },
  {
    "id": "role789",
    "type": "Role",
    "name": "Admin"
  }
]
```

## Link Field Details

### Linking Records

```json
// Link to single record
["rec_abc123"]

// Link to multiple records
["rec_abc123", "rec_def456", "rec_ghi789"]

// No links
[]
```

### Link Configuration

- Link fields are configured to connect to specific tables
- Can be one-to-many or many-to-many
- May have bidirectional sync enabled
- Check field configuration for linked table

## Lookup Field Details

### How Lookup Works

1. A Link field connects to another table
2. Lookup field is configured to pull specific field from linked records
3. Value automatically updates when link changes
4. Can aggregate multiple values if multiple records linked

### Lookup Value Types

Depends on the source field in the linked table:

```json
// From text field
"Text Value"

// From number field
123.45

// From date field
"2023-10-01T12:00:00Z"

// From multiple linked records (array)
["Value 1", "Value 2"]
```

### Lookup Aggregation

When multiple records are linked, lookup may:
- Return array of all values
- Return aggregated value (sum, average, etc.)
- Return first/last value
- Depends on lookup field configuration

## Validation

### Valid Member Write

```json
// ✅ Correct - array of IDs
["mem123"]

// ✅ Multiple members
["mem123", "mem456", "team789"]

// ✅ Empty (no assignment)
[]
```

### Invalid Member Write

```json
// ❌ Not an array
"mem123"

// ❌ Invalid ID format
["not-a-valid-id"]

// ❌ Null value
null
```

### Valid Link Write

```json
// ✅ Correct - array of record IDs
["rec123"]

// ✅ Multiple links
["rec123", "rec456"]

// ✅ Empty (no links)
[]
```

### Invalid Link Write

```json
// ❌ Not an array
"rec123"

// ❌ Non-existent record
["rec_does_not_exist"]

// ❌ Record from wrong table
["rec_from_different_table"]
```

## Best Practices

### Member Fields

1. **Validate IDs**: Ensure member IDs exist before writing
2. **User Lookup**: Fetch available members before assignment
3. **Permissions**: Check if assigned members have access
4. **Notifications**: Consider notifying assigned members
5. **Array Format**: Always use array, even for single member

### Link Fields

1. **Validate Records**: Ensure target records exist
2. **Correct Table**: Link to records from correct table
3. **Bidirectional**: Be aware of bidirectional link behavior
4. **Cascading**: Understand delete behavior (cascade vs. unlink)
5. **Performance**: Limit excessive links for performance

### Lookup Fields

1. **Read-Only**: Never attempt to write to lookup fields
2. **Type Handling**: Handle different value types from source
3. **Array Handling**: Be prepared for array values
4. **Null Handling**: Lookup may be null if no links exist
5. **Refresh**: May not update immediately after link changes

## Integration Example

### JavaScript/TypeScript

```typescript
// Assign members to task
await updateRecord(spaceId, nodeId, recordId, {
  cells: {
    'Assigned To': ['mem123', 'mem456'],
    'Team': ['team789']
  }
});

// Link to related records
await updateRecord(spaceId, nodeId, recordId, {
  cells: {
    'Related Orders': ['rec_order1', 'rec_order2'],
    'Customer': ['rec_customer123']
  }
});

// Read member information
const record = await getRecord(spaceId, nodeId, recordId);
const members = record.cells['Assigned To'];

members.forEach(member => {
  console.log(`${member.type}: ${member.name} (${member.id})`);
});

// Read linked records and lookup values
const linkedRecordIds = record.cells['Related Orders'];
const customerName = record.cells['Customer Name']; // Lookup field

console.log('Linked to', linkedRecordIds.length, 'orders');
console.log('Customer:', customerName);
```

## Common Patterns

### Assign Single Member

```json
{
  "cells": {
    "Assignee": ["mem123"]
  }
}
```

### Assign Multiple Members and Team

```json
{
  "cells": {
    "Collaborators": ["mem123", "mem456", "team789"]
  }
}
```

### Link Parent-Child Records

```json
{
  "cells": {
    "Parent Task": ["rec_parent123"],
    "Subtasks": ["rec_sub1", "rec_sub2", "rec_sub3"]
  }
}
```

### Clear Assignments/Links

```json
{
  "cells": {
    "Assignee": [],
    "Related Records": []
  }
}
```
