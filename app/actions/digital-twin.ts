'use server'

import { Groq } from 'groq-sdk'
import fs from 'fs'
import path from 'path'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
})

// Load digitaltwin.json from the project root
function loadProfileData() {
  try {
    // The file should be at digital-twin/digitaltwin.json
    const dataPath = path.join(process.cwd(), 'digitaltwin.json')
    console.log('Attempting to load from:', dataPath)
    
    if (!fs.existsSync(dataPath)) {
      console.error('File not found at:', dataPath)
      console.log('Current working directory:', process.cwd())
      console.log('Files in cwd:', fs.readdirSync(process.cwd()).slice(0, 20))
      throw new Error(`File not found: ${dataPath}`)
    }

    const rawData = fs.readFileSync(dataPath, 'utf-8')
    const data = JSON.parse(rawData)
    return data
  } catch (error) {
    console.error('Error loading profile data:', error)
    throw error
  }
}

// Search through content chunks
async function searchLocalProfile(question: string) {
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

    // Sort by score and return top 3
    return results.sort((a, b) => b.score - a.score).slice(0, 3)
  } catch (error) {
    console.error('Error in searchLocalProfile:', error)
    throw error
  }
}

export async function searchDigitalTwin(question: string) {
  try {
    // Step 1: Search local profile data
    let results = await searchLocalProfile(question)

    // Step 2: Extract context from search results
    const context = results
      .map((result) => `${result.title}: ${result.content}`)
      .join('\n\n')

    // Step 3: Generate response using Groq with RAG context
    const message = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      max_tokens: 1024,
      messages: [
        {
          role: 'system',
          content:
            'You are an AI digital twin assistant. Answer questions as if you are the person, speaking in first person about your background, skills, and experience. If the question is not directly related to your profile, still try to give a helpful response based on your background.',
        },
        {
          role: 'user',
          content: `Based on the following information, answer the question:\n\n${context}\n\nQuestion: ${question}`,
        },
      ],
    })

    const responseText = message.choices[0].message.content || ''

    return {
      success: true,
      message: responseText,
      context: results.map((r) => ({
        title: r.title,
        score: r.score / Math.max(...results.map(x => x.score), 1),
      })),
    }
  } catch (error) {
    console.error('Error in searchDigitalTwin:', error)
    return {
      success: false,
      message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      response: "",
    }
  }
}
