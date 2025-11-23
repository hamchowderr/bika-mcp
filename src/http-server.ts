/**
 * Bika MCP HTTP Server
 *
 * Express-based HTTP server for local testing
 * Note: This is a simplified HTTP wrapper for testing. For Vercel deployment, use api/mcp.ts
 */

import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

/**
 * Health check endpoint
 */
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    server: 'bika-mcp',
    message: 'For full MCP functionality, use stdio transport or deploy to Vercel'
  });
});

/**
 * Info endpoint
 */
app.get('/', (_req, res) => {
  res.json({
    name: 'bika-mcp',
    version: '0.1.0',
    description: 'Model Context Protocol server for Bika.ai integration',
    endpoints: {
      health: '/health',
      mcp: '/mcp (POST only - for Vercel deployment)'
    },
    note: 'For local use, run via stdio: npm start'
  });
});

/**
 * Start the HTTP server
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(PORT, () => {
    console.log(`Bika MCP HTTP server running on http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log(`\nNote: This HTTP server is for basic testing only.`);
    console.log(`For full MCP functionality:`);
    console.log(`  - Local: npm start (stdio transport)`);
    console.log(`  - Cloud: Deploy to Vercel`);
  });
}

export default app;
