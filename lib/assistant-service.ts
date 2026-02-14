import { products } from '@/data/products'
import { pharmacies } from '@/data/pharmacies'
import { faqs } from '@/data/faqs'

export interface AssistantMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

// Simple intent matcher
export function processUserMessage(message: string, userLocation?: { lat: number; lng: number }): string {
  const lowerMessage = message.toLowerCase().trim()

  // Stock availability query
  if (lowerMessage.includes('hay') || lowerMessage.includes('stock') || lowerMessage.includes('disponible')) {
    const matchedProducts = products.filter((p) =>
      lowerMessage.includes(p.name.toLowerCase()) ||
      p.tags.some((tag) => lowerMessage.includes(tag.toLowerCase()))
    )

    if (matchedProducts.length > 0) {
      const available = matchedProducts.filter((p) => p.isAvailable)
      const unavailable = matchedProducts.filter((p) => !p.isAvailable)

      if (available.length > 0) {
        const productList = available.slice(0, 3).map((p) => `${p.name} (${p.brand})`).join(', ')
        return `Sí, encontré estos productos disponibles: ${productList}. Recordá que la disponibilidad es referencial según nuestro catálogo.`
      }
      if (unavailable.length > 0) {
        return `Encontré ${unavailable[0].name}, pero figura sin stock en este momento (dato referencial). Podés contactar directamente a la farmacia para confirmar.`
      }
    }

    // Generic search
    const searchTerms = lowerMessage.replace(/(hay|stock|disponible|tenés|tienen)/g, '').trim()
    if (searchTerms.length > 3) {
      const fuzzyMatches = products.filter((p) =>
        p.name.toLowerCase().includes(searchTerms) ||
        p.description.toLowerCase().includes(searchTerms)
      )
      if (fuzzyMatches.length > 0) {
        return `Encontré ${fuzzyMatches.length} producto(s) relacionado(s) con "${searchTerms}". Te recomiendo buscar en el catálogo para ver todas las opciones.`
      }
    }

    return 'No encontré ese producto con ese nombre exacto. Probá con otra forma de escribirlo, o buscá en el catálogo para ver todas las opciones disponibles.'
  }

  // Pharmacy location query
  if (lowerMessage.includes('dónde') || lowerMessage.includes('donde') || lowerMessage.includes('ubicación') || lowerMessage.includes('direccion')) {
    const matchedPharmacy = pharmacies.find((p) =>
      lowerMessage.includes(p.name.toLowerCase()) ||
      lowerMessage.includes(p.neighborhood.toLowerCase())
    )

    if (matchedPharmacy) {
      return `📍 ${matchedPharmacy.name} está en ${matchedPharmacy.address}, ${matchedPharmacy.neighborhood}.\n\n📞 Teléfono: ${matchedPharmacy.phone}\n⏰ Horario: ${matchedPharmacy.hours}\n\n¿Querés ver en Google Maps? Buscá "${matchedPharmacy.address}"`
    }

    return 'Decime el nombre de la farmacia o el barrio que buscás, y te paso la dirección.'
  }

  // Nearby pharmacies
  if (lowerMessage.includes('cerca') || lowerMessage.includes('cercana') || lowerMessage.includes('próxima')) {
    if (userLocation) {
      // This would use real geolocation in production
      const nearbyPharmacies = pharmacies.slice(0, 3)
      const list = nearbyPharmacies.map((p, i) => `${i + 1}. ${p.name} - ${p.neighborhood} (${p.address})`).join('\n')
      return `Estas son las farmacias más cercanas a tu ubicación:\n\n${list}\n\n¿Querés más detalles de alguna?`
    }
    const topPharmacies = pharmacies.slice(0, 3)
    const list = topPharmacies.map((p, i) => `${i + 1}. ${p.name} - ${p.neighborhood}`).join('\n')
    return `Te muestro algunas farmacias destacadas:\n\n${list}\n\nPara ver las más cercanas a vos, activá la ubicación en la app.`
  }

  // Hours query
  if (lowerMessage.includes('horario') || lowerMessage.includes('abre') || lowerMessage.includes('cierra') || lowerMessage.includes('abierta')) {
    const matchedPharmacy = pharmacies.find((p) =>
      lowerMessage.includes(p.name.toLowerCase()) ||
      lowerMessage.includes(p.neighborhood.toLowerCase())
    )

    if (matchedPharmacy) {
      return `⏰ ${matchedPharmacy.name} atiende:\n${matchedPharmacy.hours}\n\n📞 Teléfono: ${matchedPharmacy.phone}`
    }

    return 'Decime qué farmacia te interesa y te paso el horario.'
  }

  // How to use the app
  if (lowerMessage.includes('cómo') || lowerMessage.includes('como') || lowerMessage.includes('funciona') || lowerMessage.includes('usar') || lowerMessage.includes('ayuda')) {
    const relevantFaq = faqs.find((faq) =>
      faq.question.toLowerCase().includes('funciona') ||
      faq.question.toLowerCase().includes('cómo')
    )
    if (relevantFaq) {
      return `${relevantFaq.answer}\n\n¿Tenés otra consulta?`
    }
    return 'Con FarmaciaYA podés buscar productos, elegir tu farmacia preferida (o la más cercana), y armar tu pedido. Después coordinás con la farmacia para retirarlo. ¿Qué más querés saber?'
  }

  // Cart confirmation
  if (lowerMessage.includes('carrito') || lowerMessage.includes('pedido') || lowerMessage.includes('confirmar')) {
    return 'Para confirmar tu pedido, verificá que tengas todos los productos en el carrito y que hayas elegido tu farmacia. Luego, contactá a la farmacia para coordinar el retiro. ¿Necesitás el teléfono de tu farmacia seleccionada?'
  }

  // Default fallback
  return 'No entendí bien tu consulta. Podés preguntarme:\n\n• Si hay stock de un producto\n• Dónde queda una farmacia\n• Farmacias cerca tuyo\n• Horarios de atención\n• Cómo usar la app\n\n¿En qué te ayudo?'
}

export function getQuickActions(): { label: string; message: string }[] {
  return [
    { label: '¿Hay stock de Ibuprofeno?', message: '¿Hay stock de Ibuprofeno?' },
    { label: 'Farmacias cerca', message: 'Quiero ver farmacias cerca mío' },
    { label: 'Horario de mi farmacia', message: '¿Cuál es el horario de la farmacia seleccionada?' },
    { label: 'Cómo funciona', message: '¿Cómo funciona FarmaciaYA?' },
  ]
}
