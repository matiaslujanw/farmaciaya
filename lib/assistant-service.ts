import { products } from '@/data/products'
import { pharmacies } from '@/data/pharmacies'
import { faqs } from '@/data/faqs'

export interface AssistantMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

// Simple intent matcher (replaced with API call)
export async function processUserMessage(message: string, userLocation?: { lat: number; lng: number }): Promise<string> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) throw new Error('Failed to fetch response');

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error calling chat API:', error);
    return "Lo siento, tuve un problema al procesar tu mensaje. Por favor intentá nuevamente.";
  }
}

export function getQuickActions(): { label: string; message: string }[] {
  return [
    { label: '¿Hay stock de Ibuprofeno?', message: '¿Hay stock de Ibuprofeno?' },
    { label: 'Farmacias cerca', message: 'Quiero ver farmacias cerca mío' },
    { label: 'Horario de mi farmacia', message: '¿Cuál es el horario de la farmacia seleccionada?' },
    { label: 'Cómo funciona', message: '¿Cómo funciona FarmaciaYA?' },
  ]
}
