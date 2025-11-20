/**
 * System-level tools for Bika API
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { GetSystemMetaSchema, ListSpacesSchema } from '../schemas.js';

/**
 * System tool definitions
 */
export const systemTools: Tool[] = [
  {
    name: 'bika_get_system_meta',
    description: 'Get Bika system metadata including version and environment information',
    inputSchema: zodToJsonSchema(GetSystemMetaSchema, { target: 'jsonSchema7' }) as any,
  },
  {
    name: 'bika_list_spaces',
    description: 'List all accessible Bika spaces',
    inputSchema: zodToJsonSchema(ListSpacesSchema, { target: 'jsonSchema7' }) as any,
  },
];

/**
 * System tool handlers
 */

export async function getSystemMeta(
  fetch: (path: string, options?: RequestInit) => Promise<Response>
) {
  const response = await fetch('/v1/system/meta');
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

export async function listSpaces(
  fetch: (path: string, options?: RequestInit) => Promise<Response>
) {
  const response = await fetch('/v1/spaces');
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
