/**
 * Bika MCP Server
 *
 * Model Context Protocol server for Bika.ai integration
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

// Import tools
import { systemTools, databaseTools, userTools, nodeTools, webhookTools } from './tools/index.js';
import * as SystemHandlers from './tools/system.js';
import * as DatabaseHandlers from './tools/database.js';
import * as UserHandlers from './tools/user.js';
import * as NodeHandlers from './tools/node.js';
import * as WebhookHandlers from './tools/webhooks.js';

// Import resources
import * as Resources from './resources/index.js';

// Import Zod schemas for validation
import * as Schemas from './schemas.js';

/**
 * Bika API configuration
 */
interface BikaConfig {
  apiToken: string;
  baseUrl?: string;
  defaultSpaceId?: string;
}

/**
 * Create and configure the Bika MCP server
 */
export function createBikaServer(config: BikaConfig): Server {
  const server = new Server(
    {
      name: 'bika-mcp',
      version: '0.1.0',
    },
    {
      capabilities: {
        tools: {},
        resources: {},
      },
    }
  );

  // Store config for use in tools
  const bikaConfig = {
    apiToken: config.apiToken,
    baseUrl: config.baseUrl || 'https://bika.ai/api/openapi/bika',
    defaultSpaceId: config.defaultSpaceId,
  };

  /**
   * List available tools
   */
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        ...systemTools,
        ...databaseTools,
        ...userTools,
        ...nodeTools,
        ...webhookTools,
      ],
    };
  });

  /**
   * Handle tool calls
   */
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    if (!args) {
      throw new Error('Missing arguments');
    }

    // Create fetch helper with config
    const fetchHelper = (path: string, options?: RequestInit) =>
      bikaFetch(bikaConfig, path, options);

    try {
      switch (name) {
        case 'bika_get_system_meta': {
          Schemas.GetSystemMetaSchema.parse(args);
          return await SystemHandlers.getSystemMeta(fetchHelper);
        }

        case 'bika_list_spaces': {
          Schemas.ListSpacesSchema.parse(args);
          return await SystemHandlers.listSpaces(fetchHelper);
        }

        case 'bika_get_database': {
          const validated = Schemas.GetDatabaseSchema.parse(args);
          return await DatabaseHandlers.getDatabase(
            fetchHelper,
            validated.spaceId || bikaConfig.defaultSpaceId || '',
            validated.databaseId
          );
        }

        case 'bika_get_database_fields': {
          const validated = Schemas.GetDatabaseFieldsSchema.parse(args);
          return await DatabaseHandlers.getDatabaseFields(
            fetchHelper,
            validated.spaceId || bikaConfig.defaultSpaceId || '',
            validated.databaseId
          );
        }

        case 'bika_get_database_views': {
          const validated = Schemas.GetDatabaseViewsSchema.parse(args);
          return await DatabaseHandlers.getDatabaseViews(
            fetchHelper,
            validated.spaceId || bikaConfig.defaultSpaceId || '',
            validated.databaseId
          );
        }

        case 'bika_get_records_v1': {
          const validated = Schemas.GetRecordsSchema.parse(args);
          return await DatabaseHandlers.getRecords(
            fetchHelper,
            validated.spaceId || bikaConfig.defaultSpaceId || '',
            validated.databaseId,
            validated.filter
          );
        }

        case 'bika_list_records_v2': {
          const validated = Schemas.ListRecordsSchema.parse(args);
          return await DatabaseHandlers.listRecords(
            fetchHelper,
            validated.spaceId || bikaConfig.defaultSpaceId || '',
            validated.databaseId,
            {
              filter: validated.filter,
              offset: validated.offset,
              pageSize: validated.pageSize,
              maxRecords: validated.maxRecords,
              fields: validated.fields,
              sort: validated.sort,
              timeZone: validated.timeZone,
              userLocale: validated.userLocale,
              cellFormat: validated.cellFormat,
              fieldKey: validated.fieldKey,
            }
          );
        }

        case 'bika_create_record_v1': {
          const validated = Schemas.CreateRecordSchema.parse(args);
          return await DatabaseHandlers.createRecord(
            fetchHelper,
            validated.spaceId || bikaConfig.defaultSpaceId || '',
            validated.databaseId,
            validated.cells
          );
        }

        case 'bika_update_record_v1': {
          const validated = Schemas.UpdateRecordSchema.parse(args);
          return await DatabaseHandlers.updateRecord(
            fetchHelper,
            validated.spaceId || bikaConfig.defaultSpaceId || '',
            validated.databaseId,
            validated.recordId,
            validated.cells
          );
        }

        case 'bika_update_record_v2': {
          const validated = Schemas.UpdateRecordV2Schema.parse(args);
          return await DatabaseHandlers.updateRecordV2(
            fetchHelper,
            validated.spaceId || bikaConfig.defaultSpaceId || '',
            validated.databaseId,
            validated.recordId,
            validated.fields,
            validated.fieldKey
          );
        }

        case 'bika_delete_record_v1': {
          const validated = Schemas.DeleteRecordSchema.parse(args);
          return await DatabaseHandlers.deleteRecord(
            fetchHelper,
            validated.spaceId || bikaConfig.defaultSpaceId || '',
            validated.databaseId,
            validated.recordId
          );
        }

        case 'bika_delete_record_v2': {
          const validated = Schemas.DeleteRecordV2Schema.parse(args);
          return await DatabaseHandlers.deleteRecordV2(
            fetchHelper,
            validated.spaceId || bikaConfig.defaultSpaceId || '',
            validated.databaseId,
            validated.recordId
          );
        }

        case 'bika_create_records_v2': {
          const validated = Schemas.CreateRecordsSchema.parse(args);
          return await DatabaseHandlers.createRecords(
            fetchHelper,
            validated.spaceId || bikaConfig.defaultSpaceId || '',
            validated.databaseId,
            validated.records,
            validated.fieldKey
          );
        }

        case 'bika_update_records_v2': {
          const validated = Schemas.UpdateRecordsSchema.parse(args);
          return await DatabaseHandlers.updateRecords(
            fetchHelper,
            validated.spaceId || bikaConfig.defaultSpaceId || '',
            validated.databaseId,
            validated.records,
            validated.fieldKey
          );
        }

        case 'bika_delete_records_v2': {
          const validated = Schemas.DeleteRecordsSchema.parse(args);
          return await DatabaseHandlers.deleteRecords(
            fetchHelper,
            validated.spaceId || bikaConfig.defaultSpaceId || '',
            validated.databaseId,
            validated.recordIds
          );
        }

        case 'bika_get_record_v2': {
          const validated = Schemas.GetRecordSchema.parse(args);
          return await DatabaseHandlers.getRecord(
            fetchHelper,
            validated.spaceId || bikaConfig.defaultSpaceId || '',
            validated.databaseId,
            validated.recordId,
            {
              timeZone: validated.timeZone,
              userLocale: validated.userLocale,
              cellFormat: validated.cellFormat,
              fieldKey: validated.fieldKey,
            }
          );
        }

        case 'bika_get_user_profile': {
          Schemas.GetUserProfileSchema.parse(args);
          return await UserHandlers.getUserProfile(fetchHelper);
        }

        case 'bika_get_node': {
          const validated = Schemas.GetNodeSchema.parse(args);
          return await NodeHandlers.getNode(
            fetchHelper,
            validated.spaceId || bikaConfig.defaultSpaceId || '',
            validated.nodeId
          );
        }

        case 'bika_list_nodes': {
          const validated = Schemas.ListNodesSchema.parse(args);
          return await NodeHandlers.listNodes(
            fetchHelper,
            validated.spaceId || bikaConfig.defaultSpaceId || ''
          );
        }

        case 'bika_list_outgoing_webhooks': {
          const validated = Schemas.ListOutgoingWebhooksSchema.parse(args);
          return await WebhookHandlers.listOutgoingWebhooks(
            fetchHelper,
            validated.spaceId || bikaConfig.defaultSpaceId || ''
          );
        }

        case 'bika_create_outgoing_webhook': {
          const validated = Schemas.CreateOutgoingWebhookSchema.parse(args);
          return await WebhookHandlers.createOutgoingWebhook(
            fetchHelper,
            validated.spaceId || bikaConfig.defaultSpaceId || '',
            JSON.stringify({
              name: validated.name,
              url: validated.url,
              secret: validated.secret,
              events: validated.events,
            })
          );
        }

        case 'bika_delete_outgoing_webhook': {
          const validated = Schemas.DeleteOutgoingWebhookSchema.parse(args);
          return await WebhookHandlers.deleteOutgoingWebhook(
            fetchHelper,
            validated.spaceId || bikaConfig.defaultSpaceId || '',
            validated.outgoingWebhookId
          );
        }

        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        content: [
          {
            type: 'text',
            text: `Error: ${errorMessage}`,
          },
        ],
      };
    }
  });

  /**
   * List available resources
   */
  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    return {
      resources: Resources.getAllResources(),
    };
  });

  /**
   * Read a specific resource
   */
  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const { uri } = request.params;
    return Resources.readResource(uri);
  });

  return server;
}

/**
 * Helper function to make Bika API requests
 */
async function bikaFetch(
  config: { apiToken: string; baseUrl: string },
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const url = `${config.baseUrl}${path}`;
  const headers = {
    'Authorization': `Bearer ${config.apiToken}`,
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Bika API error: ${response.status} - ${errorText}`);
  }

  return response;
}

/**
 * Start the MCP server with stdio transport
 */
export async function startStdioServer(config: BikaConfig): Promise<void> {
  const server = createBikaServer(config);
  const transport = new StdioServerTransport();

  await server.connect(transport);

  console.error('Bika MCP server running on stdio');
}

/**
 * Legacy export for backward compatibility
 */
export async function startServer(config: BikaConfig): Promise<void> {
  return startStdioServer(config);
}
