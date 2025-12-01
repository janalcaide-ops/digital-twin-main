'use client'

import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import { searchDigitalTwin } from '../app/actions/digital-twin'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  context?: Array<{ title: string; score: number }>
}

export default function DigitalTwinChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      // Call server action
      const result = await searchDigitalTwin(input)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: result.message,
        context: result.context,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'Failed to get response'}`,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-full flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
        {messages.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <div className="text-center px-4">
              <div className="mb-3 text-4xl">💬</div>
              <h2 className="mb-2 text-xl font-bold text-white">
                Welcome to Your Digital Twin
              </h2>
              <p className="text-sm text-slate-400">
                Ask me anything about my professional profile
              </p>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex animate-fade-in ${
              message.type === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-sm rounded-2xl px-4 py-2.5 shadow-md ${
                message.type === 'user'
                  ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-none'
                  : 'bg-slate-800/80 text-slate-100 rounded-bl-none border border-slate-700/50'
              }`}
            >
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
              {message.context && message.context.length > 0 && (
                <div className="mt-2 border-t border-slate-600/30 pt-2 text-xs text-slate-300">
                  <p className="mb-1 font-semibold opacity-75">Answered with AI</p>
                  {message.context.slice(0, 2).map((ctx, i) => (
                    <p key={i} className="opacity-60">
                      • {ctx.title}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-slate-800/80 p-3 rounded-bl-none border border-slate-700/50">
              <div className="flex space-x-2">
                <div className="h-2 w-2 animate-bounce rounded-full bg-blue-400"></div>
                <div className="animation-delay-200 h-2 w-2 animate-bounce rounded-full bg-blue-400"></div>
                <div className="animation-delay-400 h-2 w-2 animate-bounce rounded-full bg-blue-400"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-slate-700/50 bg-gradient-to-t from-slate-950 to-slate-900/50 p-3.5">
        <form onSubmit={handleSubmit} className="flex gap-2 items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about my background..."
            disabled={loading}
            className="flex-1 rounded-full border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="p-2.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 text-white transition transform hover:scale-105 shadow-lg"
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  )
}
