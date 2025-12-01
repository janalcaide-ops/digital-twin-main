#!/usr/bin/env node

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { createDigitalTwinServer } from './mcp-server.js'

async function main() {
  const server = createDigitalTwinServer()
  const transport = new StdioServerTransport()

  await server.connect(transport)
  console.error('Digital Twin MCP server started')
}

main().catch((error) => {
  console.error('Failed to start server:', error)
  process.exit(1)
})
