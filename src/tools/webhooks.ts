/**
 * Bika Webhook Tools
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { zodToJsonSchema } from 'zod-to-json-schema';
import {
  ListOutgoingWebhooksSchema,
  CreateOutgoingWebhookSchema,
  DeleteOutgoingWebhookSchema,
} from '../schemas.js';

/**
 * Tool definitions for webhook operations
 */
export const webhookTools: Tool[] = [
  {
    name: 'bika_list_outgoing_webhooks',
    description: 'List all outgoing webhooks in a Bika space',
    inputSchema: zodToJsonSchema(ListOutgoingWebhooksSchema, { target: 'jsonSchema7' }) as any,
  },
  {
    name: 'bika_create_outgoing_webhook',
    description: 'Create a new outgoing webhook in a Bika space',
    inputSchema: zodToJsonSchema(CreateOutgoingWebhookSchema, { target: 'jsonSchema7' }) as any,
  },
  {
    name: 'bika_delete_outgoing_webhook',
    description: 'Delete an outgoing webhook from a Bika space',
    inputSchema: zodToJsonSchema(DeleteOutgoingWebhookSchema, { target: 'jsonSchema7' }) as any,
  },
];

/**
 * List all outgoing webhooks in a space
 */
export async function listOutgoingWebhooks(
  fetch: (path: string, options?: RequestInit) => Promise<Response>,
  spaceId: string
) {
  const path = `/v1/spaces/${spaceId}/outgoing-webhooks`;

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

/**
 * Create a new outgoing webhook in a space
 */
export async function createOutgoingWebhook(
  fetch: (path: string, options?: RequestInit) => Promise<Response>,
  spaceId: string,
  webhookData: string
) {
  const path = `/v1/spaces/${spaceId}/outgoing-webhooks`;

  const response = await fetch(path, {
    method: 'POST',
    body: webhookData,
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

/**
 * Delete an outgoing webhook from a space
 */
export async function deleteOutgoingWebhook(
  fetch: (path: string, options?: RequestInit) => Promise<Response>,
  spaceId: string,
  outgoingWebhookId: string
) {
  const path = `/v1/spaces/${spaceId}/outgoing-webhooks/${outgoingWebhookId}`;

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
