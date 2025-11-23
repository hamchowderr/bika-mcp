/**
 * Zod schemas for Bika MCP tool inputs
 *
 * These schemas provide runtime validation and type safety for tool parameters.
 */

import { z } from 'zod';

// Common field types
export const SpaceIdSchema = z.string().describe('The ID of the space containing the database (optional if BIKA_SPACE_ID is set)').optional();
export const DatabaseIdSchema = z.string().describe('The ID of the database');
export const RecordIdSchema = z.string().describe('The ID of the record');

// Locale and formatting options
export const UserLocaleSchema = z.enum(['en', 'zh-CN', 'zh-TW', 'ja', 'pt', 'de']).describe('User locale for formatted values').optional();
export const CellFormatSchema = z.enum(['json', 'string']).describe('Cell value format: "json" for structured data or "string" for display values').optional();
export const FieldKeySchema = z.enum(['name', 'id']).describe('Use field names or IDs as keys in response').optional();

// System tools
export const GetSystemMetaSchema = z.object({});

export const ListSpacesSchema = z.object({});

// Database tools
export const GetDatabaseSchema = z.object({
  spaceId: SpaceIdSchema,
  databaseId: DatabaseIdSchema,
});

export const GetDatabaseFieldsSchema = z.object({
  spaceId: SpaceIdSchema,
  databaseId: DatabaseIdSchema,
});

export const GetDatabaseViewsSchema = z.object({
  spaceId: SpaceIdSchema,
  databaseId: DatabaseIdSchema,
});

export const GetRecordsSchema = z.object({
  spaceId: SpaceIdSchema,
  databaseId: DatabaseIdSchema,
  filter: z.string().describe('Optional filter query using Bika Filter Query Language (e.g., status=="Active";age>18)').optional(),
});

export const ListRecordsSchema = z.object({
  spaceId: SpaceIdSchema,
  databaseId: DatabaseIdSchema,
  filter: z.string().describe('Filter query using Bika Filter Query Language').optional(),
  offset: z.string().describe('Pagination offset token from previous response').optional(),
  pageSize: z.number().describe('Number of records per page (default: 100)').optional(),
  maxRecords: z.number().describe('Maximum total number of records to return across all pages').optional(),
  fields: z.array(z.string()).describe('Array of field names to return').optional(),
  sort: z.array(z.object({
    field: z.string(),
    order: z.enum(['asc', 'desc']),
  })).describe('Array of sort objects specifying field and order').optional(),
  timeZone: z.string().describe('Time zone for date/time fields (e.g., "Asia/Shanghai")').optional(),
  userLocale: UserLocaleSchema,
  cellFormat: CellFormatSchema,
  fieldKey: FieldKeySchema,
});

export const GetRecordSchema = z.object({
  spaceId: SpaceIdSchema,
  databaseId: DatabaseIdSchema,
  recordId: RecordIdSchema,
  timeZone: z.string().describe('Time zone for date/time fields').optional(),
  userLocale: UserLocaleSchema,
  cellFormat: CellFormatSchema,
  fieldKey: FieldKeySchema,
});

export const CreateRecordSchema = z.object({
  spaceId: z.string().describe('The ID of the space containing the database'),
  databaseId: DatabaseIdSchema,
  cells: z.record(z.unknown()).describe('Field values for the new record as key-value pairs'),
});

export const UpdateRecordSchema = z.object({
  spaceId: z.string().describe('The ID of the space containing the database'),
  databaseId: DatabaseIdSchema,
  recordId: RecordIdSchema,
  cells: z.record(z.unknown()).describe('Field values to update'),
});

export const UpdateRecordV2Schema = z.object({
  spaceId: SpaceIdSchema,
  databaseId: DatabaseIdSchema,
  recordId: RecordIdSchema,
  fieldKey: FieldKeySchema,
  fields: z.record(z.unknown()).describe('Field values to update as key-value pairs'),
});

export const DeleteRecordSchema = z.object({
  spaceId: z.string().describe('The ID of the space containing the database'),
  databaseId: DatabaseIdSchema,
  recordId: RecordIdSchema,
});

export const DeleteRecordV2Schema = z.object({
  spaceId: SpaceIdSchema,
  databaseId: DatabaseIdSchema,
  recordId: RecordIdSchema,
});

export const CreateRecordsSchema = z.object({
  spaceId: SpaceIdSchema,
  databaseId: DatabaseIdSchema,
  fieldKey: FieldKeySchema,
  records: z.array(z.object({
    fields: z.record(z.unknown()).describe('Field values for the record as key-value pairs'),
  })).min(1).max(10).describe('Array of records to create (minimum 1, maximum 10)'),
});

export const UpdateRecordsSchema = z.object({
  spaceId: SpaceIdSchema,
  databaseId: DatabaseIdSchema,
  fieldKey: FieldKeySchema,
  records: z.array(z.object({
    id: z.string().describe('The ID of the record to update'),
    fields: z.record(z.unknown()).describe('Field values to update as key-value pairs'),
  })).min(1).max(10).describe('Array of records to update (minimum 1, maximum 10)'),
});

export const DeleteRecordsSchema = z.object({
  spaceId: SpaceIdSchema,
  databaseId: DatabaseIdSchema,
  recordIds: z.array(z.string()).min(1).max(10).describe('Array of record IDs to delete (minimum 1, maximum 10)'),
});

// User tools
export const GetUserProfileSchema = z.object({});

// Node tools
export const GetNodeSchema = z.object({
  spaceId: SpaceIdSchema,
  nodeId: z.string().describe('The ID of the node'),
});

export const ListNodesSchema = z.object({
  spaceId: SpaceIdSchema,
});

// Webhook tools
export const ListOutgoingWebhooksSchema = z.object({
  spaceId: SpaceIdSchema,
});

export const CreateOutgoingWebhookSchema = z.object({
  spaceId: SpaceIdSchema,
  name: z.string().describe('Name of the webhook'),
  url: z.string().describe('URL to send webhook requests to'),
  secret: z.string().optional().describe('Secret for webhook signature verification'),
  events: z.array(z.string()).optional().describe('Array of event types to subscribe to'),
});

export const DeleteOutgoingWebhookSchema = z.object({
  spaceId: SpaceIdSchema,
  outgoingWebhookId: z.string().describe('The ID of the webhook to delete'),
});
