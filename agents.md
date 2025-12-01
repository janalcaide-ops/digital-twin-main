# Digital Twin MCP Server Project Instructions

## Project Overview
Build an MCP server using the roll dice pattern to create a digital twin assistant that can answer questions about a person's professional profile using RAG (Retrieval-Augmented Generation).

## Reference Repositories
- **Pattern Reference**: https://github.com/gocallum/rolldice-mcpserver.git
  - Roll dice MCP server - use same technology and pattern for our MCP server
- **Logic Reference**: https://github.com/gocallum/binal_digital-twin_py.git
  - Python code using Upstash Vector for RAG search with Groq and LLaMA for generations

## Core Functionality
- MCP server accepts user questions about the person's professional background
- Create server actions that search Upstash Vector database and return RAG results
- Search logic must match the Python version exactly

## Environment Variables (.env.local)
```
# Upstash Vector Database Configuration
UPSTASH_VECTOR_REST_URL=https://your-workspace-vector.upstash.io
UPSTASH_VECTOR_REST_TOKEN=your_upstash_vector_token_here

# Groq API Configuration
GROQ_API_KEY=y  our_groq_api_key_here

# Upstash Redis Configuration (Optional - for future caching)
UPSTASH_REDIS_REST_URL=https://your-workspace-redis-rest.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token_here
```

**Setup Instructions:**
1. Create `.env.local` in the project root (same level as package.json)
2. Get credentials from:
   - Upstash Vector: https://console.upstash.com/vector
   - Groq API: https://console.groq.com/keys
   - Upstash Redis: https://console.upstash.com/redis
3. Copy the placeholders above and replace with your actual credentials
4. **Important**: Never commit `.env.local` to git (add to .gitignore)

## Technical Requirements
- **Framework**: Next.js 15.5.3+ (use latest available)
- **Package Manager**: Always use pnpm (never npm or yarn)
- **Commands**: Always use Windows PowerShell commands
- **Type Safety**: Enforce strong TypeScript type safety throughout
- **Architecture**: Always use server actions where possible
- **Styling**: Use globals.css instead of inline styling
- **UI Framework**: ShadCN with dark mode theme
- **Focus**: Prioritize MCP functionality over UI - UI is primarily for MCP server configuration

## Setup Commands
```bash
pnpm dlx shadcn@latest init
```
Reference: https://ui.shadcn.com/docs/installation/next

## Upstash Vector Integration

### Key Documentation
- Getting Started: https://upstash.com/docs/vector/overall/getstarted
- Embedding Models: https://upstash.com/docs/vector/features/embeddingmodels
- TypeScript SDK: https://upstash.com/docs/vector/sdks/ts/getting-started

### Example Implementation
```typescript
import { Index } from "@upstash/vector"

const index = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL!,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
})

// RAG search example
await index.query({
  data: "What is Upstash?",
  topK: 3,
  includeMetadata: true,
})
```

## Additional Useful Resources
- Add any other relevant documentation links as needed
- Include specific API references for integrations
- Reference MCP protocol specifications
- Add deployment and testing guidelines

## Project-Specific Requirements

### MCP Server Implementation
The digital twin is now implemented as a full Model Context Protocol (MCP) server:

**Entry Points:**
- **CLI Mode**: `npm run mcp` - Starts stdio-based MCP server for Claude Desktop
- **API Mode**: `npm run dev` then POST to `/api/mcp` - HTTP JSONRPC endpoint
- **Server Actions**: Direct Next.js server action calls via `searchDigitalTwin()`

**Available MCP Tools:**
1. `ask_digital_twin` - Ask questions about the digital twin's profile
2. `get_profile_summary` - Get profile summary information

**MCP Server Files:**
- `lib/mcp-server.ts` - Main MCP server with tool handlers
- `lib/mcp-server-cli.ts` - CLI entry point for stdio transport
- `app/api/mcp/route.ts` - HTTP API endpoint
- `claude_desktop_config.json` - Configuration for Claude Desktop
- `MCP_SERVER_README.md` - Comprehensive MCP setup guide

### Data Schema (digitaltwin.json)
The profile data is stored in `digitaltwin.json` with the following structure:
```typescript
{
  "content_chunks": [
    {
      "id": "chunk-{category}-{number}",
      "title": "Section Title",
      "type": "personal|skills|education|projects|career|interview|strengths",
      "content": "Detailed content about the section",
      "metadata": {
        "category": "technical|personal|education|projects|career|interview",
        "tags": ["tag1", "tag2"]
      }
    }
  ],
  "personal": {
    "name": "Jhon Danver C. Abogado",
    "title": "Certified HTML and CSS Developer",
    "location": "Cagayan, Philippines",
    "contact": {
      "email": "jhonabogado@spup.edu.ph",
      "linkedin": "https://www.linkedin.com/in/jhon-danver-abogado-abb196396/",
      "github": "https://github.com/jedeee-ei"
    }
  }
}
```

### API Endpoints (Server Actions)
- **`searchDigitalTwin(question: string)`** - Main server action in `app/actions/digital-twin.ts`
  - Input: User's question/prompt
  - Output: RAG response with context metadata
  - Uses: Keyword-based search fallback + Groq LLM generation
  - Model: `llama-3.1-8b-instant` (stable, fast inference)
  - Max tokens: 1024

### Custom Business Logic
1. **Keyword-Based Search (Fallback Mode)**
   - Vector database currently uses text-based keyword matching
   - Score calculation: 
     - Body text matches: +2 per keyword occurrence
     - Title matches: +5 per keyword occurrence
     - Fallback minimum score: 0.1 for all content
   - Returns top 3 chunks sorted by relevance score

2. **Response Generation**
   - System prompt configured to answer in first person as the digital twin
   - RAG context includes top 3 matching profile sections
   - Max response length: 1024 tokens to ensure concise answers

3. **Chat Interface Features**
   - Real-time conversation history with user/AI distinction
   - Auto-scrolling message view
   - Source attribution (shows which profile sections were used)
   - Normalized relevance scores (0-1 scale)
   - Error handling with user-friendly messages

### File Organization
- `app/actions/digital-twin.ts` - Server-side RAG implementation
- `components/digital-twin-chat.tsx` - React chat UI component
- `digitaltwin.json` - Profile data store
- `app/page.tsx` - Main page integrating chat component
- `agents.md` - Project specifications (this file)

### Performance Considerations
- Profile data loaded from local JSON (no database latency)
- Groq API for fast LLM inference (sub-2s typical response time)
- Keyword search algorithm O(n*m) where n=chunks, m=keywords
- Vector database disabled due to lack of embedding model (fallback active)

### Constraints & Limitations
- No true vector embeddings (Upstash index lacks embedding model)
- Search limited to exact keyword matching with word boundaries
- Single-user session (no multi-user support yet)
- Profile data must be manually updated in digitaltwin.json
- No persistent conversation storage

### Future Enhancements
- Recreate Upstash Vector index with embedding model for true semantic search
- Add Redis caching for repeated questions
- Implement conversation persistence (database storage)
- Multi-user support with authentication
- Support for multiple profiles/digital twins
- Webhook integration for profile updates

---

**Note**: This file provides context for GitHub Copilot to generate accurate, project-specific code suggestions. Keep it updated as requireme

## Customize Your Project Context
1. ✅ Update GitHub repository links to point to YOUR specific RAG solution - DONE (points to jedeee-ei/Digital-twin)
2. ✅ Add any additional project-specific requirements - DONE (data schema, API endpoints, business logic)
3. ✅ Verify environment variables match your .env.local file - DONE (all credentials configured)
4. ✅ Add any custom business logic or constraints - DONE (keyword search, RAG pipeline, chat features)
5. ✅ Include specific API endpoints or database schemas you're using - DONE (server actions, digitaltwin.json schema)
