/**
 * Node operation tools for Bika API
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { GetNodeSchema, ListNodesSchema } from '../schemas.js';

/**
 * Node tool definitions
 */
export const nodeTools: Tool[] = [
  {
    name: 'bika_get_node',
    description: 'Get node resource information including metadata and structure for a specific node in a Bika space',
    inputSchema: zodToJsonSchema(GetNodeSchema, { target: 'jsonSchema7' }) as any,
  },
  {
    name: 'bika_list_nodes',
    description: 'List all node resources in a Bika space including metadata and structure',
    inputSchema: zodToJsonSchema(ListNodesSchema, { target: 'jsonSchema7' }) as any,
  },
];

/**
 * Node tool handlers
 */

export async function getNode(
  fetch: (path: string, options?: RequestInit) => Promise<Response>,
  spaceId: string,
  nodeId: string
) {
  const path = `/v1/spaces/${spaceId}/nodes/${nodeId}`;

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

export async function listNodes(
  fetch: (path: string, options?: RequestInit) => Promise<Response>,
  spaceId: string
) {
  const path = `/v1/spaces/${spaceId}/nodes`;

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
