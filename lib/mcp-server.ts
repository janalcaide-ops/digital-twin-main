import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js'
import fs from 'fs'
import path from 'path'
import { Groq } from 'groq-sdk'

// Lazy-initialize Groq client
let groqInstance: Groq | null = null

function getGroqClient(): Groq {
  if (!groqInstance) {
    groqInstance = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    })
  }
  return groqInstance
}

// Load profile data
function loadProfileData() {
  try {
    const dataPath = path.join(process.cwd(), 'digitaltwin.json')
    const rawData = fs.readFileSync(dataPath, 'utf-8')
    return JSON.parse(rawData)
  } catch (error) {
    console.error('Error loading profile data:', error)
    throw error
  }
}

// Keyword-based search implementation
function searchProfile(question: string) {
  try {
    const data = loadProfileData()
    const questionLower = question.toLowerCase()
    const keywords = questionLower.split(/\s+/).filter(k => k.length > 0)

    const results: Array<{
      title: string
      content: string
      score: number
    }> = []

    if (data.content_chunks && Array.isArray(data.content_chunks)) {
      for (const chunk of data.content_chunks) {
        const chunkText = `${chunk.title} ${chunk.content}`.toLowerCase()
        let score = 0

        // Check for keyword matches
        for (const keyword of keywords) {
          const regex = new RegExp(`\\b${keyword}`, 'gi')
          const matches = (chunkText.match(regex) || []).length
          score += matches * 2
        }

        // Check title matches (higher weight)
        const titleLower = chunk.title.toLowerCase()
        for (const keyword of keywords) {
          if (titleLower.includes(keyword)) {
            score += 5
          }
        }

        // Include all chunks with fallback scoring
        if (score === 0) {
          score = 0.1
        }

        results.push({
          title: chunk.title,
          content: chunk.content,
          score: score,
        })
      }
    }

    return results.sort((a, b) => b.score - a.score).slice(0, 3)
  } catch (error) {
    console.error('Error searching profile:', error)
    throw error
  }
}

// Generate RAG response using Groq
async function generateResponse(question: string, context: string) {
  try {
    const groq = getGroqClient()
    const message = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      max_tokens: 1024,
      messages: [
        {
          role: 'system',
          content:
            'You are an AI digital twin assistant representing Jhon Danver. Answer questions as if you are the person, speaking in first person about your background, skills, and experience. If the question is not directly related to the profile, still try to give a helpful response based on your background.',
        },
        {
          role: 'user',
          content: `Based on the following information, answer the question:\n\n${context}\n\nQuestion: ${question}`,
        },
      ],
    })

    return message.choices[0].message.content || ''
  } catch (error) {
    console.error('Error generating response:', error)
    throw error
  }
}

// Create and export MCP server instance
export function createDigitalTwinServer() {
  const server = new Server({
    name: 'digital-twin-mcp',
    version: '1.0.0',
  })

  // List available tools
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        {
          name: 'ask_digital_twin',
          description:
            'Ask questions about Jhon Danver\'s professional background, skills, projects, and experience. The AI will provide answers based on his profile information.',
          inputSchema: {
            type: 'object' as const,
            properties: {
              question: {
                type: 'string',
                description:
                  'Your question about the digital twin\'s background, skills, or experience',
              },
            },
            required: ['question'],
          },
        },
        {
          name: 'get_profile_summary',
          description:
            'Get a summary of the digital twin\'s personal information and key details',
          inputSchema: {
            type: 'object' as const,
            properties: {},
            required: [],
          },
        },
      ] as Tool[],
    }
  })

  // Handle tool calls
  server.setRequestHandler(CallToolRequestSchema, async (request: any) => {
    const { params } = request
    const { name, arguments: args } = params

    if (name === 'ask_digital_twin') {
      try {
        const question = (args as any).question
        if (!question || typeof question !== 'string') {
          return {
            content: [
              {
                type: 'text',
                text: 'Error: Please provide a valid question',
              },
            ],
            isError: true,
          }
        }

        // Search for relevant content
        const searchResults = searchProfile(question)

        // Extract context
        const context = searchResults
          .map((result) => `${result.title}: ${result.content}`)
          .join('\n\n')

        // Generate response
        const response = await generateResponse(question, context)

        // Format output with sources
        const sources = searchResults
          .map(
            (r) =>
              `- ${r.title} (relevance: ${(r.score / Math.max(...searchResults.map(x => x.score), 1) * 100).toFixed(0)}%)`
          )
          .join('\n')

        const fullResponse = `${response}\n\n**Sources:**\n${sources}`

        return {
          content: [
            {
              type: 'text',
              text: fullResponse,
            },
          ],
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
            },
          ],
          isError: true,
        }
      }
    }

    if (name === 'get_profile_summary') {
      try {
        const data = loadProfileData()
        const personal = data.personal

        const summary = `
**Digital Twin Profile Summary**

**Name:** ${personal.name}
**Title:** ${personal.title}
**Location:** ${personal.location}
**Email:** ${personal.contact?.email}
**LinkedIn:** ${personal.contact?.linkedin}
**GitHub:** ${personal.contact?.github}

This digital twin can answer questions about:
- Professional background and experience
- Technical skills and certifications
- Education and coursework
- Projects and portfolio work
- Career goals and interests
- Interview preparation insights
`

        return {
          content: [
            {
              type: 'text',
              text: summary,
            },
          ],
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
            },
          ],
          isError: true,
        }
      }
    }

    return {
      content: [
        {
          type: 'text',
          text: `Unknown tool: ${name}`,
        },
      ],
      isError: true,
    }
  })

  return server
}
