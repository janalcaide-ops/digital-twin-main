# Digital Twin MCP Server

A Model Context Protocol (MCP) server that provides Claude with access to a digital twin assistant. This server allows Claude to ask questions about Jan Alcaide's professional profile, skills, projects, and experience using RAG (Retrieval-Augmented Generation).

## Features

- **RAG-Powered Responses**: Uses keyword-based search + Groq LLM generation
- **MCP Protocol Support**: Compatible with Claude Desktop and other MCP clients
- **Profile-Based Q&A**: Answer questions about professional background, skills, projects, and experience
- **Metadata Tracking**: Shows which profile sections were used in generating responses
- **Server Actions**: Includes Next.js server actions for programmatic access

## Quick Start

### Prerequisites

- Node.js 18+
- Groq API key (get from https://console.groq.com/keys)
- Upstash Vector credentials (optional, currently using fallback search)

### Environment Setup

1. Create `.env.local` in the project root:

```bash
# Groq API Configuration
GROQ_API_KEY=your_groq_api_key_here

# Upstash Vector Database Configuration (optional)
UPSTASH_VECTOR_REST_URL=https://your-workspace-vector.upstash.io
UPSTASH_VECTOR_REST_TOKEN=your_upstash_vector_token_here
```

2. Install dependencies:

```bash
npm install
```

### Running the MCP Server

**Option 1: CLI Mode (for Claude Desktop)**

```bash
npm run mcp
```

This starts the server in stdio mode, ready to be connected to Claude Desktop.

**Option 2: API Mode (HTTP)**

```bash
npm run dev
```

Access the MCP API at `http://localhost:3000/api/mcp`

- `GET /api/mcp` - Health check
- `POST /api/mcp` - Handle MCP JSONRPC requests

**Option 3: Next.js Server Actions**

Use the built-in server action for programmatic access:

```typescript
import { searchDigitalTwin } from "@/app/actions/digital-twin";

const result = await searchDigitalTwin("What are your skills?");
```

## Claude Desktop Integration

To use this MCP server with Claude Desktop:

1. Locate your Claude Desktop config file:

   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

2. Add the digital-twin server configuration:

```json
{
  "mcpServers": {
    "digital-twin": {
      "command": "node",
      "args": ["path/to/digital-twin/lib/mcp-server-cli.ts"],
      "env": {
        "GROQ_API_KEY": "your_groq_api_key"
      }
    }
  }
}
```

3. Restart Claude Desktop

4. Claude will now have access to the tools:
   - `ask_digital_twin` - Ask questions about the profile
   - `get_profile_summary` - Get profile summary

## Available Tools

### `ask_digital_twin`

Ask questions about Jan Alcaide's professional profile.

**Parameters:**

- `question` (string): Your question about background, skills, or experience

**Response:** AI-generated answer with source attribution

### `get_profile_summary`

Get a summary of the digital twin's profile information.

**Parameters:** None

**Response:** Personal information and contact details

## Architecture

### Core Components

- **`lib/mcp-server.ts`** - MCP server implementation with tool definitions
- **`lib/mcp-server-cli.ts`** - CLI entry point for stdio transport
- **`app/api/mcp/route.ts`** - HTTP API endpoint for JSONRPC requests
- **`app/actions/digital-twin.ts`** - Next.js server action for Q&A
- **`components/digital-twin-chat.tsx`** - React chat UI component

### Data Flow

```
User Question
    ↓
MCP Tool Call (ask_digital_twin)
    ↓
Keyword Search (searchProfile)
    ↓
Context Extraction
    ↓
Groq LLM Generation
    ↓
Response with Sources
```

## Search Algorithm

The server uses keyword-based search with the following scoring:

- **Body text matches**: +2 per occurrence
- **Title matches**: +5 per occurrence
- **Minimum score**: 0.1 (all content included as fallback)

Results are sorted by score and top 3 are returned.

## Profile Data Structure

Profile data is stored in `digitaltwin.json`:

```json
{
  "content_chunks": [
    {
      "id": "chunk-{category}-{number}",
      "title": "Section Title",
      "type": "personal|skills|education|projects|career|interview|strengths",
      "content": "Detailed content",
      "metadata": {
        "category": "technical|personal|education|projects|career|interview",
        "tags": ["tag1", "tag2"]
      }
    }
  ],
  "personal": {
    "name": "Jan Alcaide",
    "title": "Certified MCF AI-900",
    "location": "Cagayan, Philippines",
    "contact": {
      "email": "janalcaide@spup.edu.ph",
      "linkedin": "https://www.linkedin.com/in/jan-cornelius-miguel-alcaide-619a07393/",
      "github": "https://github.com/janalcaide-ops"
    }
  }
}
```

## Configuration

### Groq Model

Currently using `llama-3.1-8b-instant` for fast inference. To change:

Edit `lib/mcp-server.ts`:

```typescript
const message = await groq.chat.completions.create({
  model: "your-preferred-model",
  // ...
});
```

### Response Settings

In `lib/mcp-server.ts`, adjust:

- `max_tokens`: Maximum response length (default: 1024)
- `system_prompt`: Role and behavior of the AI
- `topK`: Number of search results (default: 3)

## Future Enhancements

- [ ] True vector embeddings with Upstash
- [ ] Redis caching for repeated questions
- [ ] Conversation persistence
- [ ] Multi-user support with authentication
- [ ] Multiple profile support
- [ ] Webhook integration for profile updates

## Troubleshooting

### Server won't start

- Check that `GROQ_API_KEY` is set in `.env.local`
- Verify `digitaltwin.json` exists in project root
- Check Node.js version (need 18+)

### Claude Desktop can't connect

- Verify MCP server is running (`npm run mcp`)
- Check config file path is correct
- Restart Claude Desktop after config changes

### Slow responses

- First request may be slow (LLM model loading)
- Subsequent requests should be <2 seconds
- Check network connection to Groq API

## Development

### Testing the MCP Server

```bash
# Start MCP server
npm run mcp

# In another terminal, test with curl
curl -X POST http://localhost:3000/api/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/list",
    "id": 1
  }'
```

### Debug Mode

Set environment variable for verbose logging:

```bash
DEBUG=* npm run mcp
```

## License

MIT

## Repository

https://github.com/janalcaide-ops/Digital-twin
