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

});

export { handler as GET, handler as POST, handler as DELETE };
