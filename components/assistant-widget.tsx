'use client'

import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AssistantChat } from '@/components/assistant-chat'
import { usePathname } from 'next/navigation'

export function AssistantWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Don't show on assistant page
  if (pathname === '/asistente') {
    return null
  }

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all p-0 overflow-hidden"
        >
          <div className="relative h-full w-full">
            <Image
              src="/farmaceutico.jpg"
              alt="Asistente Virtual"
              fill
              className="object-cover"
            />
          </div>
          <span className="sr-only">Abrir asistente virtual</span>
        </Button>
      )}

      {/* Floating Chat */}
      {isOpen && (
        <Card className="fixed inset-0 z-50 flex flex-col shadow-2xl md:inset-auto md:bottom-6 md:right-6 md:h-[600px] md:w-[380px] md:rounded-xl">
          <div className="flex items-center justify-between border-b p-4 bg-primary text-primary-foreground">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <h3 className="font-semibold">Asistente Virtual</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="hover:bg-primary-foreground/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 overflow-hidden">
            <AssistantChat compact />
          </div>
        </Card>
      )}
    </>
  )
}
