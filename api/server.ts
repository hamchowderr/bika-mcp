/**
 * Vercel Serverless Function for Bika MCP
 *
 * Following the official Vercel MCP template pattern with all tools defined inline.
 * Template: https://github.com/hamchowderr/vercel-mcp-template
 *
 * Simple bearer token authentication for custom connector support
 */

import { createMcpHandler } from "mcp-handler";
import { z } from "zod";
import { readFileSync } from "fs";
import { join } from "path";

// Load config from environment variables
const config = {
  apiToken: process.env.BIKA_API_TOKEN || "",
  baseUrl: process.env.BIKA_API_BASE_URL || "https://bika.ai/api/openapi/bika",
  defaultSpaceId: process.env.BIKA_SPACE_ID,
};

// Create fetch helper for Bika API
const bikaFetch = async (path: string, options?: RequestInit) => {
  const url = `${config.baseUrl}${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${config.apiToken}`,
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Bika API error: ${response.status} - ${error}`);
  }

  return response;
};

const handler = createMcpHandler((server) => {
  // ===== System Tools =====

  server.tool(
    "bika_get_system_meta",
    "Get Bika system metadata including version and environment information",
    {},
    async () => {
      const response = await bikaFetch("/v1/system/meta");
      const data = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      };
    }
  );

  server.tool(
    "bika_list_spaces",
    "List all accessible Bika spaces",
    {},
    async () => {
      const response = await bikaFetch("/v1/spaces");
      const data = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      };
    }
  );

  // ===== Database Tools =====

  server.tool(
    "bika_get_database",
    "Get database metadata including schema, fields, and configuration for a specific database",
    {
      spaceId: z.string().optional(),
      databaseId: z.string(),
    },
    async ({ spaceId, databaseId }) => {
      const space = spaceId || config.defaultSpaceId;
      if (!space) throw new Error("spaceId is required (or set BIKA_SPACE_ID)");

      const response = await bikaFetch(`/v1/spaces/${space}/resources/databases/${databaseId}`);
      const data = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      };
    }
  );

  server.tool(
    "bika_get_database_fields",
    "Get field definitions and schemas for a specific database",
    {
      spaceId: z.string().optional(),
      databaseId: z.string(),
    },
    async ({ spaceId, databaseId }) => {
      const space = spaceId || config.defaultSpaceId;
      if (!space) throw new Error("spaceId is required (or set BIKA_SPACE_ID)");

      const response = await bikaFetch(`/v1/spaces/${space}/resources/databases/${databaseId}/fields`);
      const data = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      };
    }
  );

  server.tool(
    "bika_get_database_views",
    "Get views for a specific database",
    {
      spaceId: z.string().optional(),
      databaseId: z.string(),
    },
    async ({ spaceId, databaseId }) => {
      const space = spaceId || config.defaultSpaceId;
      if (!space) throw new Error("spaceId is required (or set BIKA_SPACE_ID)");

      const response = await bikaFetch(`/v1/spaces/${space}/resources/databases/${databaseId}/views`);
      const data = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      };
    }
  );

  server.tool(
    "bika_get_records_v1",
    "Get records from a Bika database with optional filtering using Filter Query Language (v1 API)",
    {
      spaceId: z.string().optional(),
      databaseId: z.string(),
      filter: z.string().optional(),
    },
    async ({ spaceId, databaseId, filter }) => {
      const space = spaceId || config.defaultSpaceId;
      if (!space) throw new Error("spaceId is required (or set BIKA_SPACE_ID)");

      let path = `/v1/spaces/${space}/resources/databases/${databaseId}/records`;
      if (filter) {
        path += `?filter=${encodeURIComponent(filter)}`;
      }

      const response = await bikaFetch(path);
      const data = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      };
    }
  );

  server.tool(
    "bika_list_records_v2",
    "List records from a Bika database with advanced filtering, sorting, pagination, and field selection (v2 API)",
    {
      spaceId: z.string().optional(),
      databaseId: z.string(),
      filter: z.string().optional(),
      offset: z.string().optional(),
      pageSize: z.number().optional(),
      maxRecords: z.number().optional(),
      fields: z.array(z.string()).optional(),
      sort: z.array(z.object({ field: z.string(), order: z.enum(["asc", "desc"]) })).optional(),
      timeZone: z.string().optional(),
      userLocale: z.enum(["en", "zh-CN", "zh-TW", "ja", "pt", "de"]).optional(),
      cellFormat: z.enum(["json", "string"]).optional(),
      fieldKey: z.enum(["name", "id"]).optional(),
    },
    async ({ spaceId, databaseId, filter, offset, pageSize, maxRecords, fields, sort, timeZone, userLocale, cellFormat, fieldKey }) => {
      const space = spaceId || config.defaultSpaceId;
      if (!space) throw new Error("spaceId is required (or set BIKA_SPACE_ID)");

      const params = new URLSearchParams();
      if (filter) params.append("filter", filter);
      if (offset) params.append("offset", offset);
      if (pageSize) params.append("pageSize", pageSize.toString());
      if (maxRecords) params.append("maxRecords", maxRecords.toString());
      if (fields) params.append("fields", fields.join(","));
      if (sort) params.append("sort", JSON.stringify(sort));
      if (timeZone) params.append("timeZone", timeZone);
      if (userLocale) params.append("userLocale", userLocale);
      if (cellFormat) params.append("cellFormat", cellFormat);
      if (fieldKey) params.append("fieldKey", fieldKey);

      const path = `/v2/spaces/${space}/resources/databases/${databaseId}/records?${params.toString()}`;
      const response = await bikaFetch(path);
      const data = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      };
    }
  );

  server.tool(
    "bika_get_record_v2",
    "Get a single record from a Bika database with optional formatting options (v2 API)",
    {
      spaceId: z.string().optional(),
      databaseId: z.string(),
      recordId: z.string(),
      timeZone: z.string().optional(),
      userLocale: z.enum(["en", "zh-CN", "zh-TW", "ja", "pt", "de"]).optional(),
      cellFormat: z.enum(["json", "string"]).optional(),
      fieldKey: z.enum(["name", "id"]).optional(),
    },
    async ({ spaceId, databaseId, recordId, timeZone, userLocale, cellFormat, fieldKey }) => {
      const space = spaceId || config.defaultSpaceId;
      if (!space) throw new Error("spaceId is required (or set BIKA_SPACE_ID)");

      const params = new URLSearchParams();
      if (timeZone) params.append("timeZone", timeZone);
      if (userLocale) params.append("userLocale", userLocale);
      if (cellFormat) params.append("cellFormat", cellFormat);
      if (fieldKey) params.append("fieldKey", fieldKey);

      const path = `/v2/spaces/${space}/resources/databases/${databaseId}/records/${recordId}?${params.toString()}`;
      const response = await bikaFetch(path);
      const data = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      };
    }
  );

  server.tool(
    "bika_create_record_v1",
    "Create a new record in a Bika database (v1 API)",
    {
      spaceId: z.string(),
      databaseId: z.string(),
      cells: z.record(z.unknown()),
    },
    async ({ spaceId, databaseId, cells }) => {
      const path = `/v1/spaces/${spaceId}/resources/databases/${databaseId}/records`;
      const response = await bikaFetch(path, {
        method: "POST",
        body: JSON.stringify({ cells }),
      });
      const data = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      };
    }
  );

  server.tool(
    "bika_update_record_v1",
    "Update an existing record in a Bika database (v1 API)",
    {
      spaceId: z.string(),
      databaseId: z.string(),
      recordId: z.string(),
      cells: z.record(z.unknown()),
    },
    async ({ spaceId, databaseId, recordId, cells }) => {
      const path = `/v1/spaces/${spaceId}/resources/databases/${databaseId}/records/${recordId}`;
      const response = await bikaFetch(path, {
        method: "PUT",
        body: JSON.stringify({ cells }),
      });
      const data = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      };
    }
  );

  server.tool(
    "bika_update_record_v2",
    "Update a single record in a Bika database using the v2 API with optional field key formatting",
    {
      spaceId: z.string(),
      databaseId: z.string(),
      recordId: z.string(),
      fields: z.record(z.unknown()),
      fieldKey: z.enum(["name", "id"]).optional(),
    },
    async ({ spaceId, databaseId, recordId, fields, fieldKey }) => {
      const params = new URLSearchParams();
      if (fieldKey) params.append("fieldKey", fieldKey);

      const path = `/v2/spaces/${spaceId}/resources/databases/${databaseId}/records/${recordId}?${params.toString()}`;
      const response = await bikaFetch(path, {
        method: "PUT",
        body: JSON.stringify({ fields }),
      });
      const data = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      };
    }
  );

  server.tool(
    "bika_delete_record_v1",
    "Delete a record from a Bika database (v1 API)",
    {
      spaceId: z.string(),
      databaseId: z.string(),
      recordId: z.string(),
    },
    async ({ spaceId, databaseId, recordId }) => {
      const path = `/v1/spaces/${spaceId}/resources/databases/${databaseId}/records/${recordId}`;
      const response = await bikaFetch(path, {
        method: "DELETE",
      });
      const data = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      };
    }
  );

  server.tool(
    "bika_delete_record_v2",
    "Delete a single record from a Bika database using the v2 API",
    {
      spaceId: z.string(),
      databaseId: z.string(),
      recordId: z.string(),
    },
    async ({ spaceId, databaseId, recordId }) => {
      const path = `/v2/spaces/${spaceId}/resources/databases/${databaseId}/records/${recordId}`;
      const response = await bikaFetch(path, {
        method: "DELETE",
      });
      const data = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      };
    }
  );

  server.tool(
    "bika_batch_create_records_v2",
    "Batch create multiple records (up to 10) in a Bika database in a single operation (v2 API)",
    {
      spaceId: z.string().optional(),
      databaseId: z.string(),
      fieldKey: z.enum(["name", "id"]).optional(),
      records: z.array(z.object({ fields: z.record(z.unknown()) })).min(1).max(10),
    },
    async ({ spaceId, databaseId, fieldKey, records }) => {
      const space = spaceId || config.defaultSpaceId;
      if (!space) throw new Error("spaceId is required (or set BIKA_SPACE_ID)");

      const params = new URLSearchParams();
      if (fieldKey) params.append("fieldKey", fieldKey);

      const path = `/v2/spaces/${space}/resources/databases/${databaseId}/records?${params.toString()}`;
      const response = await bikaFetch(path, {
        method: "POST",
        body: JSON.stringify({ records }),
      });
      const data = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      };
    }
  );

  server.tool(
    "bika_batch_update_records_v2",
    "Batch update multiple records (up to 10) in a Bika database in a single operation (v2 API)",
    {
      spaceId: z.string().optional(),
      databaseId: z.string(),
      fieldKey: z.enum(["name", "id"]).optional(),
      records: z.array(z.object({ id: z.string(), fields: z.record(z.unknown()) })).min(1).max(10),
    },
    async ({ spaceId, databaseId, fieldKey, records }) => {
      const space = spaceId || config.defaultSpaceId;
      if (!space) throw new Error("spaceId is required (or set BIKA_SPACE_ID)");

      const params = new URLSearchParams();
      if (fieldKey) params.append("fieldKey", fieldKey);

      const path = `/v2/spaces/${space}/resources/databases/${databaseId}/records?${params.toString()}`;
      const response = await bikaFetch(path, {
        method: "PATCH",
        body: JSON.stringify({ records }),
      });
      const data = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      };
    }
  );

  server.tool(
    "bika_batch_delete_records_v2",
    "Batch delete multiple records (up to 10) from a Bika database in a single operation (v2 API)",
    {
      spaceId: z.string().optional(),
      databaseId: z.string(),
      recordIds: z.array(z.string()).min(1).max(10),
    },
    async ({ spaceId, databaseId, recordIds }) => {
      const space = spaceId || config.defaultSpaceId;
      if (!space) throw new Error("spaceId is required (or set BIKA_SPACE_ID)");

      const path = `/v2/spaces/${space}/resources/databases/${databaseId}/records`;
      const response = await bikaFetch(path, {
        method: "DELETE",
        body: JSON.stringify({ recordIds }),
      });
      const data = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      };
    }
  );

  // ===== User Tools =====

  server.tool(
    "bika_get_user_profile",
    "Get the authenticated user's profile information including name, email, settings, and preferences",
    {},
    async () => {
      const response = await bikaFetch("/v1/user/profile");
      const data = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      };
    }
  );

  // ===== Node Tools =====

  server.tool(
    "bika_get_node",
    "Get node resource information including metadata and structure for a specific node in a Bika space",
    {
      spaceId: z.string().optional(),
      nodeId: z.string(),
    },
    async ({ spaceId, nodeId }) => {
      const space = spaceId || config.defaultSpaceId;
      if (!space) throw new Error("spaceId is required (or set BIKA_SPACE_ID)");

      const response = await bikaFetch(`/v1/spaces/${space}/nodes/${nodeId}`);
      const data = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      };
    }
  );

  server.tool(
    "bika_list_nodes",
    "List all node resources in a Bika space including metadata and structure",
    {
      spaceId: z.string().optional(),
    },
    async ({ spaceId }) => {
      const space = spaceId || config.defaultSpaceId;
      if (!space) throw new Error("spaceId is required (or set BIKA_SPACE_ID)");

      const response = await bikaFetch(`/v1/spaces/${space}/nodes`);
      const data = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      };
    }
  );

  // ===== Webhook Tools =====

  server.tool(
    "bika_list_outgoing_webhooks",
    "List all outgoing webhooks in a Bika space",
    {
      spaceId: z.string().optional(),
    },
    async ({ spaceId }) => {
      const space = spaceId || config.defaultSpaceId;
      if (!space) throw new Error("spaceId is required (or set BIKA_SPACE_ID)");

      const response = await bikaFetch(`/v1/spaces/${space}/outgoing-webhooks`);
      const data = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      };
    }
  );

  server.tool(
    "bika_create_outgoing_webhook",
    "Create a new outgoing webhook in a Bika space",
    {
      spaceId: z.string().optional(),
      name: z.string(),
      url: z.string(),
      secret: z.string().optional(),
      events: z.array(z.string()).optional(),
    },
    async ({ spaceId, name, url, secret, events }) => {
      const space = spaceId || config.defaultSpaceId;
      if (!space) throw new Error("spaceId is required (or set BIKA_SPACE_ID)");

      const response = await bikaFetch(`/v1/spaces/${space}/outgoing-webhooks`, {
        method: "POST",
        body: JSON.stringify({ name, url, secret, events }),
      });
      const data = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      };
    }
  );

  server.tool(
    "bika_delete_outgoing_webhook",
    "Delete an outgoing webhook from a Bika space",
    {
      spaceId: z.string().optional(),
      outgoingWebhookId: z.string(),
    },
    async ({ spaceId, outgoingWebhookId }) => {
      const space = spaceId || config.defaultSpaceId;
      if (!space) throw new Error("spaceId is required (or set BIKA_SPACE_ID)");

      const response = await bikaFetch(`/v1/spaces/${space}/outgoing-webhooks/${outgoingWebhookId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      };
    }
  );

  // ===== Resources =====

  // Documentation file mappings
  const docFiles: Record<string, string> = {
    "bika://docs/api/basic-concepts": "bika-docs/api/basic-concepts.md",
    "bika://docs/api/authentication": "bika-docs/api/authentication.md",
    "bika://docs/api/system-endpoints": "bika-docs/api/system-endpoints.md",
    "bika://docs/api/database-operations": "bika-docs/api/database-operations.md",
    "bika://docs/api/user-endpoints": "bika-docs/api/user-endpoints.md",
    "bika://docs/api/other-endpoints": "bika-docs/api/other-endpoints.md",
    "bika://docs/api/examples": "bika-docs/api/examples.md",
    "bika://docs/field-cell-value/overview": "bika-docs/field-cell-value/overview.md",
    "bika://docs/field-cell-value/text-fields": "bika-docs/field-cell-value/text-fields.md",
    "bika://docs/field-cell-value/numeric-fields": "bika-docs/field-cell-value/numeric-fields.md",
    "bika://docs/field-cell-value/selection-fields": "bika-docs/field-cell-value/selection-fields.md",
    "bika://docs/field-cell-value/date-time-fields": "bika-docs/field-cell-value/date-time-fields.md",
    "bika://docs/field-cell-value/file-fields": "bika-docs/field-cell-value/file-fields.md",
    "bika://docs/field-cell-value/system-fields": "bika-docs/field-cell-value/system-fields.md",
    "bika://docs/field-cell-value/relationship-fields": "bika-docs/field-cell-value/relationship-fields.md",
    "bika://docs/field-cell-value/computed-fields": "bika-docs/field-cell-value/computed-fields.md",
    "bika://docs/field-cell-value/quick-reference": "bika-docs/field-cell-value/quick-reference.md",
    "bika://docs/filter-query-language/syntax": "bika-docs/filter-query-language/syntax.md",
    "bika://docs/filter-query-language/logical-operators": "bika-docs/filter-query-language/logical-operators.md",
    "bika://docs/filter-query-language/comparison-operators": "bika-docs/filter-query-language/comparison-operators.md",
    "bika://docs/filter-query-language/field-queries": "bika-docs/filter-query-language/field-queries.md",
    "bika://docs/filter-query-language/examples": "bika-docs/filter-query-language/examples.md",
    "bika://docs/filter-query-language/best-practices": "bika-docs/filter-query-language/best-practices.md",
  };

  // Register all documentation resources
  Object.entries(docFiles).forEach(([uri, filePath]) => {
    server.resource(
      uri,
      uri,
      { description: `Documentation for ${uri.replace("bika://docs/", "").replace(/-/g, " ")}` },
      async () => {
        try {
          const content = readFileSync(join(process.cwd(), filePath), "utf-8");
          return {
            contents: [{
              uri,
              text: content,
              mimeType: "text/markdown"
            }]
          };
        } catch (error) {
          throw new Error(`Failed to read documentation file: ${uri}`);
        }
      }
    );
  });

  // Metadata resources
  server.resource(
    "bika://node-types",
    "bika://node-types",
    { description: "Reference information about all Bika node resource types (Database, Automation, Form, etc.)" },
    async () => {
      const nodeTypes = [
        { type: "Folder", icon: "Folder", description: "Folder for storing and managing files" },
        { type: "Database", icon: "Database", description: "The database is similar to a spreadsheet but more versatile. Each database consists of rows and columns, where rows represent records and columns represent fields." },
        { type: "Document", icon: "Document", description: "A resource for creating and storing documents" },
        { type: "File", icon: "File", description: "A resource for storing and managing pure files" },
        { type: "Automation", icon: "Automation", description: "A resource for setting up and managing automation workflows" },
        { type: "Dashboard", icon: "Dashboard", description: "A dashboard for summarizing and displaying key data" },
        { type: "AI Page", icon: "AI Page", description: "Code a page via React / Vue with Bika Page Data API" },
        { type: "Form", icon: "Form", description: "The form feature allows you to create custom forms to collect and input data into specified databases." },
        { type: "AI Agent", icon: "AI Agent", description: "A resource for artificial intelligence features" },
        { type: "Mirror", icon: "Mirror", description: "A resource for synchronizing and reflecting data" },
      ];
      return {
        contents: [{
          uri: "bika://node-types",
          text: JSON.stringify(nodeTypes, null, 2),
          mimeType: "application/json"
        }]
      };
    }
  );

  server.resource(
    "bika://field-types",
    "bika://field-types",
    { description: "Reference information about all database field types (Text, Number, Date, etc.)" },
    async () => {
      const fieldTypes = [
        { type: "Single Line Text", icon: "Single Line Text", description: "Stores brief single-line text, suitable for titles, names and other concise information" },
        { type: "Multi-line Text", icon: "Multi-line Text", description: "Used for storing long text content, such as detailed descriptions, comments or article body text" },
        { type: "Checkbox", icon: "Checkbox", description: "Provides a yes/no option checkbox, suitable for status marking or simple boolean value selection" },
        { type: "Currency", icon: "Currency", description: "Specifically for storing and formatting currency amounts, supporting different currency symbols and precision settings" },
        { type: "Date Time", icon: "Date Time", description: "Stores precise date and time information, suitable for scenarios that require recording exact time points" },
        { type: "Date Range", icon: "Date Range", description: "Stores time periods or date ranges, including start and end time points" },
        { type: "Number", icon: "Number", description: "Stores numeric data, supports integers and decimals, can set precision and format" },
        { type: "Percentage", icon: "Percentage", description: "Stores percentage values, automatically formatted as percentages" },
        { type: "Phone", icon: "Phone", description: "Specifically for storing phone numbers" },
        { type: "Email", icon: "Email", description: "Specifically for storing email addresses" },
        { type: "Rating", icon: "Rating", description: "Stores rating information in the form of stars or numerical values" },
        { type: "Single Select", icon: "Single Select", description: "Selects a single option from a predefined list of options" },
        { type: "Multi Select", icon: "Multi Select", description: "Selects multiple options from a predefined list of options" },
        { type: "URL", icon: "URL", description: "Stores web link addresses, supports direct link jumping for access" },
        { type: "Member", icon: "Member", description: "Stores system member information, can select single or multiple members as field values" },
        { type: "Created By", icon: "Created By", description: "Automatically records the user information of who created the record" },
        { type: "Modified By", icon: "Modified By", description: "Automatically records the user information of who last modified the record" },
        { type: "Created Time", icon: "Created Time", description: "Automatically generated date and time string when a new record is created" },
        { type: "Modified Time", icon: "Modified Time", description: "Automatically generated date and time string when a record is updated" },
        { type: "Link", icon: "Link", description: "Creates bidirectional associations with other databases" },
        { type: "Attachment", icon: "Attachment", description: "Allows uploading and storing various types of files as record attachments" },
        { type: "Formula", icon: "Formula", description: "Automatically calculates values through formulas, can reference other fields" },
        { type: "Auto Number", icon: "Auto Number", description: "Automatically generates a unique sequence number for each new record" },
        { type: "Lookup", icon: "Lookup", description: "Automatically looks up and displays values of specific fields from linked databases" },
        { type: "AI Text", icon: "AI Text", description: "AI-generated text content that can reference data within database" },
        { type: "Document", icon: "Document", description: "Stores rich text documents that support Markdown format" },
      ];
      return {
        contents: [{
          uri: "bika://field-types",
          text: JSON.stringify(fieldTypes, null, 2),
          mimeType: "application/json"
        }]
      };
    }
  );

  server.resource(
    "bika://view-types",
    "bika://view-types",
    { description: "Reference information about all database view types (Grid, Kanban, Gallery, etc.)" },
    async () => {
      const viewTypes = [
        { type: "Grid", icon: "Grid", description: "The grid view offers a spreadsheet-like layout where users can view and manage data in a structured manner." },
        { type: "Gallery", icon: "Gallery", description: "The gallery view displays records in a card format, using images from record attachments as covers." },
        { type: "Kanban", icon: "Kanban", description: "The kanban view displays data in card format, with each column representing a status or category." },
        { type: "Gantt", icon: "Gantt", description: "The Gantt view displays project progress on a timeline (Coming Soon)" },
        { type: "Form", icon: "Form", description: "The form view allows users to create custom forms for easy data entry and collection (Coming Soon)" },
      ];
      return {
        contents: [{
          uri: "bika://view-types",
          text: JSON.stringify(viewTypes, null, 2),
          mimeType: "application/json"
        }]
      };
    }
  );

  server.resource(
    "bika://formula-functions",
    "bika://formula-functions",
    { description: "Reference information about all formula functions available in Bika" },
    async () => {
      const formulaFunctions = {
        numeric: [
          { name: "Sum", description: "Sum together the numbers. Equivalent to number1 + number2 + ..." },
          { name: "Average", description: "Returns the average of the numbers" },
          { name: "Max", description: "Returns the largest of the given numbers" },
          { name: "Min", description: "Returns the minimum value among the numbers" },
          { name: "Round", description: 'Rounds the value to the number of decimal places given by "precision"' },
          { name: "RoundUp", description: 'Rounds the value up to the number of decimal places given by "precision"' },
          { name: "RoundDown", description: 'Rounds the value down to the number of decimal places given by "precision"' },
          { name: "Ceiling", description: "Returns the nearest integer multiple of significance that is greater than or equal to the value" },
          { name: "Floor", description: "Returns the nearest integer multiple of significance that is less than or equal to the value" },
          { name: "Abs", description: "Returns the absolute value of a number" },
          { name: "Sqrt", description: "Returns the square root of a number" },
          { name: "Mod", description: "Returns the remainder of a division between two numbers" },
          { name: "Power", description: "Returns the power of a specified base" },
          { name: "Exp", description: "Returns e raised to the power of a specified number" },
          { name: "Log", description: "Returns the logarithm of a number with a specified base" },
        ],
        text: [
          { name: "Concatenate", description: "Concatenates multiple text values into a single text value" },
          { name: "Find", description: "Finds the position of a specific text within content for the first time" },
          { name: "Search", description: "Searches for the position of specific text within content for the first time" },
          { name: "Mid", description: "Extracts a fixed-length text from a specific position within content" },
          { name: "Replace", description: "Replaces a segment of text at a specific position within content with new text" },
          { name: "Substitute", description: "Replaces occurrences of a specified text within content with new text" },
          { name: "Len", description: "Counts the number of characters in a text" },
          { name: "Left", description: "Extracts a given number of characters from the start of a text string" },
          { name: "Right", description: "Extracts a given number of characters from the end of a text string" },
          { name: "Lower", description: "Converts all uppercase characters in a text string to lowercase" },
          { name: "Upper", description: "Converts all uppercase characters in a text string to uppercase" },
          { name: "Trim", description: "Removes spaces from the start and end of a text string" },
        ],
        logical: [
          { name: "If", description: "Checks whether a condition is met, returns one value if true and another value if false" },
          { name: "Switch", description: "Multi-branch selection function that matches an expression against multiple patterns" },
          { name: "And", description: "Returns true if all arguments are true; otherwise, returns false" },
          { name: "Or", description: "Returns true if any argument is true; otherwise, returns false" },
          { name: "Not", description: "Reverses the logical value of its argument" },
          { name: "True", description: "Returns the logical value true" },
          { name: "False", description: "Returns the logical value false" },
        ],
        datetime: [
          { name: "Today", description: "Returns today's date (year, month, day)" },
          { name: "Now", description: "Returns today's date and time, accurate to the second" },
          { name: "DateAdd", description: "Adds a fixed time interval to the specified date" },
          { name: "DatetimeDiff", description: "Returns the difference between two dates" },
          { name: "Workday", description: "Returns the date after a specified number of working days from the start date" },
          { name: "IsAfter", description: "Compares if date1 is later than date2" },
          { name: "IsBefore", description: "Compares if date1 is earlier than date2" },
          { name: "IsSame", description: "Determines if date1 is equal to date2" },
          { name: "DatetimeFormat", description: "Formats a date as text in a custom format" },
          { name: "Year", description: "Returns the four-digit year corresponding to the specified date" },
          { name: "Month", description: "Returns the month corresponding to the specified date" },
          { name: "Day", description: "Returns the day of the month for a given date" },
          { name: "Hour", description: "Returns the hour of the day for a given date" },
          { name: "Minute", description: "Returns the minute of the hour for a given date" },
          { name: "Second", description: "Returns the second of the minute for a given date" },
        ],
        array: [
          { name: "ArrayCompact", description: "Removes empty strings and null values from an array" },
          { name: "ArrayUnique", description: "Returns only the unique items in an array" },
          { name: "ArrayJoin", description: "Concatenates all values in an array into a single string with a delimiter" },
          { name: "ArrayFlatten", description: "Flattens an array by removing any nested arrays" },
        ],
        aggregate: [
          { name: "Count", description: 'Counts the number of "number" type values' },
          { name: "CountA", description: "Counts the number of non-empty values" },
          { name: "CountIf", description: "Counts the number of times a keyword appears in values" },
          { name: "CountAll", description: "Counts the number of all values, including empty values" },
        ],
        record: [
          { name: "RecordID", description: "Returns the ID of the record" },
          { name: "CreatedTime", description: "Returns the creation time of the record" },
          { name: "LastModifiedTime", description: "Returns the last modified time of each cell in a row" },
        ],
      };
      return {
        contents: [{
          uri: "bika://formula-functions",
          text: JSON.stringify(formulaFunctions, null, 2),
          mimeType: "application/json"
        }]
      };
    }
  );
});

export { handler as GET, handler as POST, handler as DELETE };
