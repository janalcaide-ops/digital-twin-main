import { NextRequest, NextResponse } from 'next/server'
import { createDigitalTwinServer } from '@/lib/mcp-server'

let server: any = null

// Initialize server on first request
async function initializeServer() {
  if (!server) {
    server = createDigitalTwinServer()
  }
  return server
}

// Handle GET request for health check
export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'Digital Twin MCP Server is running',
    tools: [
      {
        name: 'ask_digital_twin',
        description:
          "Ask questions about Jhon Danver's professional background",
      },
      {
        name: 'get_profile_summary',
        description: 'Get a summary of the digital twin profile',
      },
    ],
  })
}

// Handle POST requests for MCP calls
export async function POST(request: NextRequest) {
  try {
    const mcpServer = await initializeServer()
    const body = await request.json()

    // Handle MCP JSONRPC requests
    if (body.jsonrpc === '2.0') {
      const { method, params, id } = body

      // Handle ListToolsRequest
      if (method === 'tools/list') {
        const result = await mcpServer.requestHandler({
          method: 'tools/list',
        })
        return NextResponse.json({
          jsonrpc: '2.0',
          result,
          id,
        })
      }

      // Handle CallToolRequest
      if (method === 'tools/call') {
        const result = await mcpServer.requestHandler({
          method: 'tools/call',
          params,
        })
        return NextResponse.json({
          jsonrpc: '2.0',
          result,
          id,
        })
      }

      // Unknown method
      return NextResponse.json(
        {
          jsonrpc: '2.0',
          error: { code: -32601, message: 'Method not found' },
          id,
        },
        { status: 404 }
      )
    }

    // Invalid request
    return NextResponse.json(
      { error: 'Invalid request: must be JSONRPC 2.0' },
      { status: 400 }
    )
  } catch (error) {
    console.error('MCP Server error:', error)
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    )
  }
}
