# VS Code MCP Configuration Guide

This directory contains VS Code configuration files for optimal development experience with the Digital Twin MCP server.

## Configuration Files

### `mcp.json`
MCP server configuration for VS Code MCP client integration.

**Features:**
- Configures digital-twin MCP server entry point
- Uses environment variables from `.env.local`
- Enables debug logging for troubleshooting
- Auto-start on VS Code launch

**Setup:**
1. Ensure `.env.local` has `GROQ_API_KEY` set
2. VS Code will automatically detect and load this config
3. Install VS Code MCP extension if needed

### `settings.json`
Project-level VS Code settings for TypeScript, formatting, and exclusions.

**Includes:**
- TypeScript configuration with workspace tsdk
- Prettier auto-formatting on save
- ESLint code actions on save
- File exclusions (.next, node_modules, .env.local)
- Extension recommendations

### `launch.json`
Debug configurations for running and debugging the project.

**Available Configurations:**
- **Next.js Dev Server**: Debug the Next.js application
- **MCP Server (CLI)**: Debug the MCP server directly
- **Debug Tests**: Run tests with debugging
- **Full Stack (Compound)**: Run both Next.js and MCP together

**Usage:**
1. Open Run and Debug (Ctrl+Shift+D / Cmd+Shift+D)
2. Select configuration from dropdown
3. Press F5 or click "Start Debugging"

### `extensions.json`
Recommended VS Code extensions for this project.

**Recommended Extensions:**
- **Prettier** - Code formatter
- **ESLint** - JavaScript linter
- **TypeScript** - Language support
- **Biome** - Fast linter and formatter
- **GitLens** - Git integration
- **GitHub Copilot** - AI code assistance
- **Copilot Chat** - AI chat in VS Code
- **Tailwind CSS** - CSS framework support

**Install Recommendations:**
- VS Code will prompt to install recommended extensions
- Or use command palette: `Extensions: Show Recommended Extensions`

### `tasks.json`
Development tasks for common workflows.

**Available Tasks:**
- **dev** (default) - Start Next.js dev server
- **mcp** - Start MCP server
- **build** - Build for production
- **lint** - Run linter
- **install** - Install dependencies
- **Full Stack** - Run dev and mcp in parallel

**Usage:**
- Run command: `Ctrl+Shift+B` (Run Build Task)
- Or use command palette: `Tasks: Run Task`

## Quick Start

### 1. Open Project
```bash
cd digital-twin
code .
```

### 2. Install Extensions
- VS Code will prompt for recommended extensions
- Click "Install All" or manually install

### 3. Start Development
**Option A: Next.js Only**
- Press `Ctrl+Shift+B` → Select "dev"
- Or: Terminal → Run Task → "dev"

**Option B: MCP Server Only**
- Terminal → Run Task → "mcp"

**Option C: Full Stack (Recommended)
- Terminal → Run Task → "Full Stack (Next.js + MCP)"
- Or: Debug → Select "Full Stack (Next.js + MCP)" → F5

## Environment Setup

The MCP configuration automatically reads from `.env.local`:

```bash
# Required
GROQ_API_KEY=your_key_here

# Optional (for Vector search)
UPSTASH_VECTOR_REST_URL=your_url_here
UPSTASH_VECTOR_REST_TOKEN=your_token_here
```

**Important:** Never commit `.env.local` to git

## VS Code Extensions in Detail

### Essential
- **Prettier** (esbenp.prettier-vscode) - Auto-format code
- **ESLint** (dbaeumer.vscode-eslint) - Catch errors
- **TypeScript** (ms-vscode.vscode-typescript-next) - Latest TS support

### Recommended
- **GitHub Copilot** (github.copilot) - AI code completion
- **Copilot Chat** (github.copilot-chat) - AI chat assistant
- **GitLens** (eamodio.gitlens) - Git blame and history

### Optional
- **Tailwind CSS** (bradlc.vscode-tailwindcss) - CSS class IntelliSense
- **Biome** (biomejs.biome) - Fast linter and formatter
- **MDX** (unifiedjs.vscode-mdx) - Markdown support

## Debug Configuration Examples

### Debug MCP Server with Breakpoints
1. Open `lib/mcp-server.ts`
2. Set breakpoint by clicking line number
3. Run Debug → "MCP Server (CLI)"
4. Execution will pause at breakpoint

### Debug Full Stack
1. Set breakpoints in both `lib/mcp-server.ts` and Next.js files
2. Run Debug → "Full Stack (Next.js + MCP)"
3. Debug both simultaneously

### Inspect MCP Tool Calls
Add this to `lib/mcp-server.ts`:
```typescript
console.log('Tool called:', { name, arguments: args })
```
Then check VS Code Debug Console output.

## Troubleshooting

### MCP Server Won't Start
1. Check `.env.local` exists with `GROQ_API_KEY`
2. Open Debug Console (Shift+Ctrl+Y)
3. Look for error messages
4. Verify Node.js version >= 18

### TypeScript Errors
1. Command Palette → "TypeScript: Restart TS Server"
2. Or reload VS Code (Cmd/Ctrl+R)

### Extensions Not Installing
1. Ensure internet connection
2. Try manual install: Ctrl+Shift+X → Search extension → Install
3. Restart VS Code

### Debug Not Working
1. Check Node.js is accessible: `node --version`
2. Try running task manually first: `npm run mcp`
3. Check VS Code version is latest

## Productivity Tips

### 1. Use Command Palette
- Ctrl+Shift+P (Windows/Linux) or Cmd+Shift+P (Mac)
- Type task name to run quickly

### 2. Use Terminal Integration
- Ctrl+` opens integrated terminal
- Run `npm run dev` and `npm run mcp` in separate terminals

### 3. Git Integration with GitLens
- Hover over code to see git blame
- Right-click for git actions
- View commit history

### 4. Use Copilot Chat
- Ctrl+Alt+I for inline suggestions
- Cmd+L for chat window
- Ask "explain this code" or "fix this error"

### 5. Debug Console
- Press F5 to start debugging
- Open Debug Console (Shift+Ctrl+Y)
- Evaluate expressions: `searchProfile("skills")`

## File Organization in VS Code

- `.vscode/` - VS Code configuration (this directory)
  - `mcp.json` - MCP server config
  - `settings.json` - Editor settings
  - `launch.json` - Debug configurations
  - `tasks.json` - Development tasks
  - `extensions.json` - Recommended extensions
- `lib/` - Source code
- `app/` - Next.js pages and API routes
- `components/` - React components
- `.env.local` - Environment variables (not in git)

## Next Steps

1. ✅ Open project in VS Code
2. ✅ Install recommended extensions
3. ✅ Create `.env.local` with your API keys
4. ✅ Start development: Terminal → Run Task → "dev"
5. ✅ Debug MCP: Debug → "MCP Server (CLI)" → F5

## Support

For issues or questions:
1. Check `.vscode/` files for syntax errors
2. Review `.env.local` configuration
3. Check VS Code Output panel for errors
4. Consult MCP_SERVER_README.md for MCP setup

---

**Happy coding!** 🚀
