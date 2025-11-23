#!/usr/bin/env node

/**
 * Bika MCP Server Entry Point
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { startServer } from './server.js';

// Manually load .env file to avoid any stdout pollution from dotenv package
// This is critical for MCP stdio protocol which requires clean JSON communication
try {
  const envPath = join(process.cwd(), '.env');
  const envContent = readFileSync(envPath, 'utf-8');

  // Parse .env file line by line
  envContent.split('\n').forEach((line) => {
    // Skip empty lines and comments
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    // Parse KEY=value format
    const match = trimmed.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      // Only set if not already defined in environment
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  });
} catch (error) {
  // .env file is optional, continue without it
}

/**
 * Get configuration from environment
 */
function getConfig() {
  const apiToken = process.env.BIKA_API_TOKEN;

  if (!apiToken) {
    console.error('Error: BIKA_API_TOKEN environment variable is required');
    console.error('Please set BIKA_API_TOKEN in your .env file or environment');
    process.exit(1);
  }

  return {
    apiToken,
    baseUrl: process.env.BIKA_API_BASE_URL,
    defaultSpaceId: process.env.BIKA_SPACE_ID,
  };
}

/**
 * Main entry point
 */
async function main() {
  try {
    const config = getConfig();
    await startServer(config);
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

main();
