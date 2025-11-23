/**
 * Database operation tools for Bika API
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { zodToJsonSchema } from 'zod-to-json-schema';
import {
  GetDatabaseSchema,
  GetDatabaseFieldsSchema,
  GetDatabaseViewsSchema,
  GetRecordsSchema,
  ListRecordsSchema,
  GetRecordSchema,
  CreateRecordSchema,
  UpdateRecordSchema,
  UpdateRecordV2Schema,
  DeleteRecordSchema,
  DeleteRecordV2Schema,
  CreateRecordsSchema,
  UpdateRecordsSchema,
  DeleteRecordsSchema,
} from '../schemas.js';

/**
 * Database tool definitions
 */
export const databaseTools: Tool[] = [
  {
    name: 'bika_get_database',
    description: 'Get database metadata including schema, fields, and configuration for a specific database',
    inputSchema: zodToJsonSchema(GetDatabaseSchema, { target: 'jsonSchema7' }) as any,
  },
  {
    name: 'bika_get_database_fields',
    description: 'Get field definitions and schemas for a specific database',
    inputSchema: zodToJsonSchema(GetDatabaseFieldsSchema, { target: 'jsonSchema7' }) as any,
  },
  {
    name: 'bika_get_database_views',
    description: 'Get views for a specific database',
    inputSchema: zodToJsonSchema(GetDatabaseViewsSchema, { target: 'jsonSchema7' }) as any,
  },
  {
    name: 'bika_get_records_v1',
    description: 'Get records from a Bika database with optional filtering using Filter Query Language (v1 API). For advanced queries with pagination, sorting, and field selection, use bika_list_records instead.',
    inputSchema: zodToJsonSchema(GetRecordsSchema, { target: 'jsonSchema7' }) as any,
  },
  {
    name: 'bika_list_records_v2',
    description: 'List records from a Bika database with advanced filtering, sorting, pagination, and field selection (v2 API)',
    inputSchema: zodToJsonSchema(ListRecordsSchema, { target: 'jsonSchema7' }) as any,
  },
  {
    name: 'bika_get_record_v2',
    description: 'Get a single record from a Bika database with optional formatting options (v2 API)',
    inputSchema: zodToJsonSchema(GetRecordSchema, { target: 'jsonSchema7' }) as any,
  },
  {
    name: 'bika_create_record_v1',
    description: 'Create a new record in a Bika database (v1 API)',
    inputSchema: zodToJsonSchema(CreateRecordSchema, { target: 'jsonSchema7' }) as any,
  },
  {
    name: 'bika_update_record_v1',
    description: 'Update an existing record in a Bika database (v1 API)',
    inputSchema: zodToJsonSchema(UpdateRecordSchema, { target: 'jsonSchema7' }) as any,
  },
  {
    name: 'bika_update_record_v2',
    description: 'Update a single record in a Bika database using the v2 API with optional field key formatting',
    inputSchema: zodToJsonSchema(UpdateRecordV2Schema, { target: 'jsonSchema7' }) as any,
  },
  {
    name: 'bika_delete_record_v2',
    description: 'Delete a single record from a Bika database using the v2 API',
    inputSchema: zodToJsonSchema(DeleteRecordV2Schema, { target: 'jsonSchema7' }) as any,
  },
  {
    name: 'bika_delete_record_v1',
    description: 'Delete a record from a Bika database (v1 API)',
    inputSchema: zodToJsonSchema(DeleteRecordSchema, { target: 'jsonSchema7' }) as any,
  },
  {
    name: 'bika_create_records_v2',
    description: 'Create multiple records (up to 10) in a Bika database in a single batch operation (v2 API)',
    inputSchema: zodToJsonSchema(CreateRecordsSchema, { target: 'jsonSchema7' }) as any,
  },
  {
    name: 'bika_update_records_v2',
    description: 'Update multiple records (up to 10) in a Bika database in a single batch operation (v2 API)',
    inputSchema: zodToJsonSchema(UpdateRecordsSchema, { target: 'jsonSchema7' }) as any,
  },
  {
    name: 'bika_delete_records_v2',
    description: 'Delete multiple records (up to 10) from a Bika database in a single batch operation (v2 API)',
    inputSchema: zodToJsonSchema(DeleteRecordsSchema, { target: 'jsonSchema7' }) as any,
  },
];

/**
 * Database tool handlers
 */

export async function getDatabase(
  fetch: (path: string, options?: RequestInit) => Promise<Response>,
  spaceId: string,
  databaseId: string
) {
  const path = `/v1/spaces/${spaceId}/resources/databases/${databaseId}`;

  const response = await fetch(path);
  const data = await response.json();

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}

export async function getDatabaseFields(
  fetch: (path: string, options?: RequestInit) => Promise<Response>,
  spaceId: string,
  databaseId: string
) {
  const path = `/v1/spaces/${spaceId}/resources/databases/${databaseId}/fields`;

  const response = await fetch(path);
  const data = await response.json();

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}

export async function getDatabaseViews(
  fetch: (path: string, options?: RequestInit) => Promise<Response>,
  spaceId: string,
  databaseId: string
) {
  const path = `/v1/spaces/${spaceId}/resources/databases/${databaseId}/views`;

  const response = await fetch(path);
  const data = await response.json();

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}

export async function getRecords(
  fetch: (path: string, options?: RequestInit) => Promise<Response>,
  spaceId: string,
  databaseId: string,
  filter?: string
) {
  let path = `/v1/spaces/${spaceId}/resources/databases/${databaseId}/records`;

  if (filter) {
    const encodedFilter = encodeURIComponent(filter);
    path += `?filter=${encodedFilter}`;
  }

  const response = await fetch(path);
  const data = await response.json();

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}

export async function listRecords(
  fetch: (path: string, options?: RequestInit) => Promise<Response>,
  spaceId: string,
  databaseId: string,
  options?: {
    filter?: string;
    offset?: string;
    pageSize?: number;
    maxRecords?: number;
    fields?: string[];
    sort?: Array<{ field: string; order: 'asc' | 'desc' }>;
    timeZone?: string;
    userLocale?: 'en' | 'zh-CN' | 'zh-TW' | 'ja' | 'pt' | 'de';
    cellFormat?: 'json' | 'string';
    fieldKey?: 'name' | 'id';
  }
) {
  const basePath = `/v2/spaces/${spaceId}/resources/databases/${databaseId}/records`;

  const queryParams = new URLSearchParams();

  if (options?.filter) {
    queryParams.append('filter', options.filter);
  }
  if (options?.offset) {
    queryParams.append('offset', options.offset);
  }
  if (options?.pageSize !== undefined) {
    queryParams.append('pageSize', options.pageSize.toString());
  }
  if (options?.maxRecords !== undefined) {
    queryParams.append('maxRecords', options.maxRecords.toString());
  }
  if (options?.fields && options.fields.length > 0) {
    options.fields.forEach(field => queryParams.append('fields', field));
  }
  if (options?.sort && options.sort.length > 0) {
    options.sort.forEach((s, index) => {
      queryParams.append(`sort[${index}][field]`, s.field);
      queryParams.append(`sort[${index}][order]`, s.order);
    });
  }
  if (options?.timeZone) {
    queryParams.append('timeZone', options.timeZone);
  }
  if (options?.userLocale) {
    queryParams.append('userLocale', options.userLocale);
  }
  if (options?.cellFormat) {
    queryParams.append('cellFormat', options.cellFormat);
  }
  if (options?.fieldKey) {
    queryParams.append('fieldKey', options.fieldKey);
  }

  const queryString = queryParams.toString();
  const path = queryString ? `${basePath}?${queryString}` : basePath;

  const response = await fetch(path);
  const data = await response.json();

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}

export async function createRecord(
  fetch: (path: string, options?: RequestInit) => Promise<Response>,
  spaceId: string,
  databaseId: string,
  cells: Record<string, unknown>
) {
  const path = `/v1/spaces/${spaceId}/resources/databases/${databaseId}/records`;

  const response = await fetch(path, {
    method: 'POST',
    body: JSON.stringify({ cells }),
  });

  const data = await response.json();

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}

export async function updateRecord(
  fetch: (path: string, options?: RequestInit) => Promise<Response>,
  spaceId: string,
  databaseId: string,
  recordId: string,
  cells: Record<string, unknown>
) {
  const path = `/v1/spaces/${spaceId}/resources/databases/${databaseId}/records`;

  const response = await fetch(path, {
    method: 'PATCH',
    body: JSON.stringify({ id: recordId, cells }),
  });

  const data = await response.json();

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}

export async function updateRecordV2(
  fetch: (path: string, options?: RequestInit) => Promise<Response>,
  spaceId: string,
  databaseId: string,
  recordId: string,
  fields: Record<string, unknown>,
  fieldKey?: 'name' | 'id'
) {
  const basePath = `/v2/spaces/${spaceId}/resources/databases/${databaseId}/records/${recordId}`;

  const queryParams = new URLSearchParams();
  if (fieldKey) {
    queryParams.append('fieldKey', fieldKey);
  }

  const queryString = queryParams.toString();
  const path = queryString ? `${basePath}?${queryString}` : basePath;

  const response = await fetch(path, {
    method: 'PUT',
    body: JSON.stringify({ fields }),
  });

  const data = await response.json();

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}

export async function deleteRecord(
  fetch: (path: string, options?: RequestInit) => Promise<Response>,
  spaceId: string,
  databaseId: string,
  recordId: string
) {
  const path = `/v1/spaces/${spaceId}/resources/databases/${databaseId}/records/${recordId}`;

  const response = await fetch(path, {
    method: 'DELETE',
  });

  const data = await response.json();

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}

export async function deleteRecordV2(
  fetch: (path: string, options?: RequestInit) => Promise<Response>,
  spaceId: string,
  databaseId: string,
  recordId: string
) {
  const path = `/v2/spaces/${spaceId}/resources/databases/${databaseId}/records/${recordId}`;

  const response = await fetch(path, {
    method: 'DELETE',
  });

  const data = await response.json();

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}

export async function createRecords(
  fetch: (path: string, options?: RequestInit) => Promise<Response>,
  spaceId: string,
  databaseId: string,
  records: Array<{ fields: Record<string, unknown> }>,
  fieldKey?: 'name' | 'id'
) {
  const basePath = `/v2/spaces/${spaceId}/resources/databases/${databaseId}/records`;

  const queryParams = new URLSearchParams();
  if (fieldKey) {
    queryParams.append('fieldKey', fieldKey);
  }

  const queryString = queryParams.toString();
  const path = queryString ? `${basePath}?${queryString}` : basePath;

  const response = await fetch(path, {
    method: 'POST',
    body: JSON.stringify({ records }),
  });

  const data = await response.json();

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}

export async function updateRecords(
  fetch: (path: string, options?: RequestInit) => Promise<Response>,
  spaceId: string,
  databaseId: string,
  records: Array<{ id: string; fields: Record<string, unknown> }>,
  fieldKey?: 'name' | 'id'
) {
  const basePath = `/v2/spaces/${spaceId}/resources/databases/${databaseId}/records`;

  const queryParams = new URLSearchParams();
  if (fieldKey) {
    queryParams.append('fieldKey', fieldKey);
  }

  const queryString = queryParams.toString();
  const path = queryString ? `${basePath}?${queryString}` : basePath;

  const response = await fetch(path, {
    method: 'PUT',
    body: JSON.stringify({ records }),
  });

  const data = await response.json();

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}

export async function deleteRecords(
  fetch: (path: string, options?: RequestInit) => Promise<Response>,
  spaceId: string,
  databaseId: string,
  recordIds: string[]
) {
  const basePath = `/v2/spaces/${spaceId}/resources/databases/${databaseId}/records`;

  const queryParams = new URLSearchParams();
  // Add each record ID as a separate 'records' parameter
  recordIds.forEach(id => queryParams.append('records', id));

  const queryString = queryParams.toString();
  const path = `${basePath}?${queryString}`;

  const response = await fetch(path, {
    method: 'DELETE',
  });

  const data = await response.json();

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}

export async function getRecord(
  fetch: (path: string, options?: RequestInit) => Promise<Response>,
  spaceId: string,
  databaseId: string,
  recordId: string,
  options?: {
    timeZone?: string;
    userLocale?: 'en' | 'zh-CN' | 'zh-TW' | 'ja' | 'pt' | 'de';
    cellFormat?: 'json' | 'string';
    fieldKey?: 'name' | 'id';
  }
) {
  const basePath = `/v2/spaces/${spaceId}/resources/databases/${databaseId}/records/${recordId}`;

  const queryParams = new URLSearchParams();
  if (options?.timeZone) {
    queryParams.append('timeZone', options.timeZone);
  }
  if (options?.userLocale) {
    queryParams.append('userLocale', options.userLocale);
  }
  if (options?.cellFormat) {
    queryParams.append('cellFormat', options.cellFormat);
  }
  if (options?.fieldKey) {
    queryParams.append('fieldKey', options.fieldKey);
  }

  const queryString = queryParams.toString();
  const path = queryString ? `${basePath}?${queryString}` : basePath;

  const response = await fetch(path);
  const data = await response.json();

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}
