# Bika MCP Server

![Bika Logo](./images/bika-logo.jpeg)

Model Context Protocol (MCP) server for integrating with Bika.ai platform.

## Overview

This MCP server provides integration with Bika.ai's database and automation platform, enabling AI assistants to:
- Query and filter database records
- Create, update, and delete records
- Upload and manage attachments
- Work with formulas and field types
- Access automation and webhooks

## Features

- **Database Operations**: Full CRUD operations on Bika databases
- **Advanced Filtering**: Support for Bika's Filter Query Language
- **Field Types**: Handle all 23 Bika field types with proper type safety
- **Attachments**: Upload and manage files
- **Type Safety**: Full TypeScript support with comprehensive type definitions

## Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- Bika.ai account with API access token

## Installation

### Option 1: Install via npm (Recommended)

Once published, you can install directly via npx:

```bash
# No installation needed! Run directly with npx
npx bika-mcp
```

### Option 2: Install from Source

```bash
# Clone the repository
git clone https://github.com/hamchowderr/bika-mcp.git
cd bika-mcp

# Install dependencies
npm install

# Build the project
npm run build
```

## Configuration

### Environment Variables

The server requires the following environment variables:

| Variable | Required | Description |
|----------|----------|-------------|
| `BIKA_API_TOKEN` | Yes | Your Bika.ai API access token |
| `BIKA_SPACE_ID` | No | Default space ID (can be overridden per-tool) |

### Setting Environment Variables

**Option 1: Environment variables**

```bash
# Windows
set BIKA_API_TOKEN=your-api-token-here
set BIKA_SPACE_ID=your-default-space-id

# macOS/Linux
export BIKA_API_TOKEN="your-api-token-here"
export BIKA_SPACE_ID="your-default-space-id"
```

**Option 2: Create a `.env` file**

Create a `.env` file in the project root:

```env
BIKA_API_TOKEN=your-api-token-here
BIKA_SPACE_ID=your-default-space-id
```

## Usage

### Option 1: Claude Desktop (Stdio Transport)

The recommended way to use this MCP server is with Claude Desktop using stdio transport.

#### Configuration File Locations

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

#### Using npx (Recommended)

Add to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "bika": {
      "command": "npx",
      "args": ["-y", "bika-mcp"],
      "env": {
        "BIKA_API_TOKEN": "your-token-here",
        "BIKA_SPACE_ID": "your-default-space-id"
      }
    }
  }
}
```

#### Using Local Installation

For development or local installations:

```json
{
  "mcpServers": {
    "bika": {
      "command": "node",
      "args": ["C:\\absolute\\path\\to\\bika-mcp\\dist\\index.js"],
      "env": {
        "BIKA_API_TOKEN": "your-token-here",
        "BIKA_SPACE_ID": "your-default-space-id"
      }
    }
  }
}
```

**Important**: Restart Claude Desktop after updating the configuration.

### Option 2: Testing with MCP Inspector

Test your server locally with the official MCP Inspector:

```bash
# Run the inspector
npm run inspector

# Or run directly
npx @modelcontextprotocol/inspector dist/index.js
```

This will:
1. Start the MCP server
2. Launch the inspector web interface at `http://localhost:6274`
3. Allow you to test tools, resources, and prompts interactively

### Option 3: Running Standalone (Stdio)

Run the server directly for stdio transport:

```bash
# Build and start
npm run build
npm start

# Development mode with watch
npm run dev
```

### Option 4: Custom Connector (HTTP Transport via Vercel)

Deploy as a custom connector for HTTP-based MCP access.

#### Deploy to Vercel

1. **Initial Deployment**:
   ```bash
   # Install Vercel CLI if needed
   npm install -g vercel

   # Deploy to Vercel
   npx vercel@latest
   ```

2. **Production Deployment**:
   ```bash
   npx vercel@latest --prod
   ```

3. **Set Environment Variables**:

   In your Vercel project settings (Settings → Environment Variables), add:
   - `BIKA_API_TOKEN` - Your Bika API token (required for authenticating with Bika.ai)
   - `BIKA_SPACE_ID` - Default space ID (optional)

4. **Configure as Custom Connector in Claude Desktop**:

   **IMPORTANT**: Custom connectors must be configured via the Claude Desktop UI, NOT via `claude_desktop_config.json`.

   **To add the custom connector:**
   1. Open Claude Desktop
   2. Go to **Settings → Connectors**
   3. Click **Add Custom Connector**
   4. Enter your deployment URL: `https://your-project.vercel.app/mcp`

   **Note**: The `BIKA_API_TOKEN` environment variable in Vercel is used ONLY for the MCP server to authenticate with Bika.ai. There is no client authentication - anyone with your deployment URL can connect to your MCP server.

5. **Test the Deployment**:
   ```bash
   # Check server is responding
   curl https://your-project.vercel.app
   ```

#### When to Use Each Transport

**Stdio (Recommended):**
- Local only, maximum security
- No network exposure
- Best for personal use

**HTTP (Vercel Deployment):**
- For remote access when you're not at your computer
- Can share URL with trusted people who need access to your Bika account
- Simpler than setting up VPN or remote desktop

### Option 5: Using with n8n

This MCP server can be used as an MCP client in n8n workflows for automation:

#### Setup in n8n

1. **Add MCP Node** to your workflow
2. **Configure Connection:**
   - **URL**: `https://your-deployment.vercel.app/mcp`
   - **Authentication**: None
3. **Use Bika Tools** in your automation workflows

#### Available in n8n Workflows

All 22+ Bika tools are available for use in n8n:
- Query and filter database records with FQL
- Create, update, delete records (single and batch operations)
- Manage databases, fields, and views
- Work with nodes, webhooks, and user profiles
- Full automation integration with your Bika workspace

#### Example Use Cases

- **Automated Data Sync**: Sync records between Bika and other systems
- **Scheduled Updates**: Batch update records on a schedule
- **Webhook Processing**: Process incoming webhooks and update Bika records
- **Data Migration**: Move data between databases with transformation
- **Reporting**: Extract data from Bika for custom reports

**Note**: The MCP server must be deployed to Vercel to use with n8n. Local stdio transport is not supported for n8n integration.

### Option 6: Using with Bika.ai AI Agents

Bika.ai AI Agents support connecting to remote MCP servers through the **Custom MCP Server** skillset. This enables powerful workflows like migrating data from AITable to Bika.

#### What is MCP in Bika.ai?

The Model Context Protocol (MCP) is an open standard that allows AI Agents to connect to external data sources and tools. In Bika.ai, AI Agents can use the Custom MCP Server skillset to access remote MCP servers and extend their capabilities.

#### Setting Up Custom MCP Server

1. **Open AI Agent Editor** in your Bika workspace
2. **Click "Add"** under the Skillset section
3. **Select "Custom MCP Server"** from the skillsets list
4. **Enter JSON configuration** for your MCP servers:

```json
{
  "mcpServers": {
    "bika": {
      "url": "https://your-deployment.vercel.app/mcp"
    }
  }
}
```

5. **Click "OK"** to add the MCP server
6. **Click "Save"** to finalize the configuration

Your AI Agent can now use all 22+ tools from the Bika MCP server!

#### Migrating Data from AITable to Bika

Use the [AITable MCP Server](https://github.com/hamchowderr/aitable-mcp) in your Bika AI Agent to read data from AITable. The AI Agent can then use Bika's native tools to write data into Bika databases.

**Important**: You only need the **AITable MCP** in your Bika AI Agent. Bika can already read and write its own data natively - you don't need to add this Bika MCP server to a Bika AI Agent.

**Configuration in Bika AI Agent:**
```json
{
  "mcpServers": {
    "aitable": {
      "url": "https://your-aitable-mcp-deployment.vercel.app/mcp"
    }
  }
}
```

**Migration Workflow:**
1. **Read from AITable** - Use AITable MCP tools to query records
2. **Transform Data** - AI Agent processes and maps fields
3. **Write to Bika** - Use Bika's native database tools (no MCP needed)

**Example Use Cases:**
- **Database Migration** - Move entire databases from AITable to Bika
- **Selective Sync** - Migrate specific records based on filters
- **Field Mapping** - Transform field types during migration
- **Incremental Updates** - Sync changes between systems

**Benefits:**
- ✅ AI-powered data transformation
- ✅ Intelligent field mapping
- ✅ No manual coding required
- ✅ Uses Bika's native tools for writing data

**Learn More:**
- [AITable MCP Server](https://github.com/hamchowderr/aitable-mcp) - For reading AITable data
- [Bika Custom MCP Server Documentation](https://bika.ai/help/custom-mcp-server)

**Note**: This Bika MCP server is intended for use with **Claude Desktop, n8n, or other MCP clients** - not for use within Bika AI Agents (since Bika already has native tools).

## Security

### Authentication Overview

This MCP server uses different authentication strategies depending on the transport:

**Stdio Transport (Recommended for Personal Use)**
- Uses environment variables for Bika.ai API authentication
- No client authentication required (local process, no network exposure)
- Most secure for personal use
- Configure via `claude_desktop_config.json`:
  ```json
  {
    "mcpServers": {
      "bika": {
        "command": "npx",
        "args": ["-y", "bika-mcp"],
        "env": {
          "BIKA_API_TOKEN": "your-token-here",
          "BIKA_SPACE_ID": "your-default-space-id"
        }
      }
    }
  }
  ```

**HTTP Transport (Custom Connector)**
- Deployed to Vercel as a serverless function
- No client authentication - URL-based access only
- CORS-enabled for browser-based access
- Configure via Claude Desktop UI (Settings → Connectors)

### HTTP Authentication

The HTTP transport has **no client authentication** - anyone with your deployment URL can connect.

**How Authentication Works:**
- `BIKA_API_TOKEN` in Vercel → Used ONLY for server → Bika.ai API calls
- No authentication required from MCP clients
- URL acts as the only access control

### Security Best Practices

**CRITICAL SECURITY WARNINGS:**

1. **Keep Repository Private**
   - ⚠️ **NEVER make this GitHub repository public**
   - ⚠️ If the repo is public and connected to Vercel CLI, your URL may be exposed
   - ✅ Keep the repository private
   - ✅ Share the GitHub repo link so others can clone and deploy their own instance

2. **Keep Deployment URL Secret**
   - ⚠️ **Your deployment URL = full access to your Bika account**
   - ⚠️ Anyone with the URL can read, create, update, and delete all your Bika data
   - ⚠️ Do NOT share your deployment URL publicly or commit it to git
   - ✅ Treat your deployment URL like a password
   - ✅ Only share with absolutely trusted individuals

3. **Keep API Token Secret**
   - ⚠️ Never commit `BIKA_API_TOKEN` to git (use `.env` locally, Vercel env vars for deployment)
   - ⚠️ Never share your API token
   - ✅ Use Vercel environment variables for secure storage
   - ✅ Rotate your API token periodically

4. **Deployment Method**
   - ⚠️ Do NOT connect repository to Vercel automatic deployments from GitHub
   - ✅ Deploy manually using Vercel CLI (`npx vercel --prod`)
   - ✅ This prevents accidental URL exposure through GitHub integration

5. **Monitoring**
   - ✅ Monitor Vercel access logs for unexpected activity
   - ✅ Check for unusual patterns in your Bika account
   - ✅ Redeploy to get new URL if compromised

**Recommended for Maximum Security:**
- Use **stdio transport** (local only) instead of HTTP deployment
- Only deploy to Vercel if you absolutely need remote access

## Architecture

This MCP server supports **dual transport** following official MCP patterns:

### Stdio Transport (src/index.ts)
- Primary entry point for Claude Desktop
- Direct process communication via stdin/stdout
- Low latency, perfect for local development
- Executable via `npx` or `node dist/index.js`

### HTTP Transport (api/server.ts)
- Vercel serverless function with CORS support
- Uses `mcp-handler` library for HTTP transport
- No client authentication - URL-based access only
- Supports custom connector deployments
- All requests handled at root path with catch-all routing

Both transports share the same core business logic while providing different communication mechanisms.

## Project Structure

```
bika-mcp/
├── src/
│   ├── index.ts           # Stdio entry point
│   ├── server.ts          # MCP server setup (stdio)
│   ├── schemas.ts         # Zod schemas for validation
│   ├── tools/             # MCP tool implementations
│   ├── resources/         # MCP resource providers
│   └── types/             # TypeScript type definitions
├── api/
│   ├── server.ts         # HTTP entry point (Vercel)
│   └── health.ts         # Health check endpoint
├── public/
│   └── index.html        # Landing page
├── bika-docs/             # Bika API documentation
│   ├── api/               # API endpoints documentation
│   ├── field-cell-value/  # Field types documentation
│   ├── filter-query-language/ # FQL documentation
│   └── formulas/          # Formulas documentation
├── dist/                  # Compiled output
├── package.json
├── tsconfig.json
├── vercel.json           # Vercel configuration
└── README.md
```

## Documentation

Comprehensive documentation for Bika.ai integration can be found in the `bika-docs/` directory:

- [API Documentation](./bika-docs/api/README.md) - Bika API endpoints and usage
- [Field Cell Value](./bika-docs/field-cell-value/README.md) - Field types and data formats
- [Filter Query Language](./bika-docs/filter-query-language/README.md) - Query syntax and examples

## Development

```bash
# Clean build artifacts
npm run clean

# Build TypeScript
npm run build

# Watch mode for development
npm run dev
```

## Available Tools (22+)

The MCP server provides comprehensive Bika.ai integration tools:

### System Tools
- `bika_get_system_meta` - Get system metadata and version information
- `bika_list_spaces` - List all accessible Bika spaces

### Database Tools
- `bika_get_database` - Get database metadata, schema, and configuration
- `bika_get_database_fields` - Get field definitions and schemas
- `bika_get_database_views` - Get all views from a database
- `bika_get_records_v1` - Query records with filtering (v1 API)
- `bika_list_records_v2` - Advanced record queries with pagination, sorting (v2 API)
- `bika_get_record_v2` - Get a single record with formatting options (v2 API)
- `bika_create_record_v1` - Create a new record (v1 API)
- `bika_update_record_v1` - Update an existing record (v1 API)
- `bika_update_record_v2` - Update a record with field key formatting (v2 API)
- `bika_delete_record_v1` - Delete a record (v1 API)
- `bika_delete_record_v2` - Delete a record (v2 API)
- `bika_batch_create_records_v2` - Batch create up to 10 records (v2 API)
- `bika_batch_update_records_v2` - Batch update up to 10 records (v2 API)
- `bika_batch_delete_records_v2` - Batch delete up to 10 records (v2 API)

### Node Tools
- `bika_get_node` - Get information about a specific node (database, folder, etc.)
- `bika_list_nodes` - List all nodes in a space

### User Tools
- `bika_get_user_profile` - Get current user profile information

### Webhook Tools
- `bika_list_outgoing_webhooks` - List all outgoing webhooks
- `bika_create_outgoing_webhook` - Create a new outgoing webhook
- `bika_delete_outgoing_webhook` - Delete an outgoing webhook

## Contributing

Contributions are welcome! Please read the documentation in `bika-docs/` to understand the Bika.ai API.

### For AI-Assisted Development

If you're using Claude Code or other AI assistants to work on this codebase, run `/init` to generate a `CLAUDE.md` file with architectural guidance and development patterns specific to this project.

## License

MIT

## Related Projects

### AITable MCP Server

If you're migrating from AITable to Bika, check out the [AITable MCP Server](https://github.com/hamchowderr/aitable-mcp). It provides similar MCP integration for AITable, making it easy to read data from AITable and write it to Bika using both servers together.

## Resources

- [Bika.ai](https://bika.ai)
- [Model Context Protocol](https://github.com/modelcontextprotocol)
- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [AITable MCP Server](https://github.com/hamchowderr/aitable-mcp) - MCP server for AITable integration
