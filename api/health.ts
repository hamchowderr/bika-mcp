/**
 * Health check endpoint for monitoring deployment status
 */

export const GET = () => {
  return Response.json({
    status: 'ok',
    service: 'bika-mcp',
    timestamp: new Date().toISOString(),
  });
};
