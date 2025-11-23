/**
 * User-related tools for Bika API
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { GetUserProfileSchema } from '../schemas.js';

/**
 * User tool definitions
 */
export const userTools: Tool[] = [
  {
    name: 'bika_get_user_profile',
    description: 'Get the authenticated user\'s profile information including name, email, settings, and preferences',
    inputSchema: zodToJsonSchema(GetUserProfileSchema, { target: 'jsonSchema7' }) as any,
  },
];

/**
 * User tool handlers
 */

export async function getUserProfile(
  fetch: (path: string, options?: RequestInit) => Promise<Response>
) {
  const response = await fetch('/v1/user/profile');
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
