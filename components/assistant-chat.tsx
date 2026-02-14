'use client'

import React from "react"

import { useState, useEffect, useRef } from 'react'
import { Send, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { useSessionStorage } from '@/hooks/use-session-storage'
import { processUserMessage, getQuickActions, type AssistantMessage } from '@/lib/assistant-service'
import { cn } from '@/lib/utils'

interface AssistantChatProps {
  compact?: boolean
}

export function AssistantChat({ compact = false }: AssistantChatProps) {
  const [messages, setMessages] = useSessionStorage<AssistantMessage[]>('farmaciaya-chat', [
    {
      id: '1',
      role: 'assistant',
      content: '¡Hola! Soy tu asistente virtual de FarmaciaYA. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const quickActions = getQuickActions()

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = (text: string) => {
    if (!text.trim()) return

    const userMessage: AssistantMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate processing time
    setTimeout(() => {
      const response = processUserMessage(text)
      const assistantMessage: AssistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 800)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleQuickAction = (message: string) => {
    sendMessage(message)
  }

  return (
    <div className={cn('flex flex-col h-full', compact ? '' : 'min-h-[600px]')}>
      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  'max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                )}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-2xl px-4 py-3">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Quick Actions */}
      {!isTyping && (
        <div className="border-t p-3 space-y-2">
          <p className="text-xs text-muted-foreground mb-2">Acciones rápidas:</p>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, i) => (
              <Badge
                key={i}
                variant="outline"
                className="cursor-pointer hover:bg-accent transition-colors text-xs"
                onClick={() => handleQuickAction(action.message)}
              >
                {action.label}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribí tu consulta..."
            disabled={isTyping}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!input.trim() || isTyping}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Enviar mensaje</span>
          </Button>
        </div>
      </form>
    </div>
  )
}
