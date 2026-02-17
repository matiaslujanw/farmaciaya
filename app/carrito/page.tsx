'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, MessageCircle } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AssistantWidget } from '@/components/assistant-widget'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/hooks/use-cart'
import { usePharmacy } from '@/hooks/use-pharmacy'
import { Empty } from '@/components/ui/empty'
import { pharmacies } from '@/data/pharmacies'

function generateOrderCode(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  let code = ''
  
  for (let i = 0; i < 3; i++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length))
  }
  for (let i = 0; i < 3; i++) {
    code += numbers.charAt(Math.floor(Math.random() * numbers.length))
  }
  
  return code
}

export default function CarritoPage() {
  const router = useRouter()
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart()
  const { selectedPharmacy } = usePharmacy()
  const [showCheckout, setShowCheckout] = useState(false)

  const pharmacy = selectedPharmacy 
    ? pharmacies.find(p => p.id === selectedPharmacy.pharmacyId)
    : null

  const handleCheckout = () => {
    if (!selectedPharmacy || !pharmacy) {
      router.push('/farmacias')
      return
    }
    setShowCheckout(true)
  }

  const handleWhatsAppOrder = () => {
    if (!pharmacy) return
    
    const orderCode = generateOrderCode()
    
    // Build order message
    let message = `*Pedido #${orderCode}*\n\n`
    message += `Farmacia: *${pharmacy.name}*\n`
    message += `Dirección: ${pharmacy.address}, ${pharmacy.neighborhood}\n\n`
    message += `*Productos solicitados:*\n\n`
    
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`
      message += `   Marca: ${item.brand}\n`
      message += `   Presentación: ${item.presentation}\n`
      message += `   Cantidad: ${item.quantity}\n`
      if (item.price) {
        message += `   Precio unitario: $${item.price.toLocaleString('es-AR')}\n`
        message += `   Subtotal: $${(item.price * item.quantity).toLocaleString('es-AR')}\n`
      }
      message += `\n`
    })
    
    if (totalPrice > 0) {
      message += `*Total estimado: $${totalPrice.toLocaleString('es-AR')}*\n\n`
    }
    
    message += `Quiero confirmar disponibilidad de estos productos. ¡Gracias!`
    
    // Encode for WhatsApp
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${pharmacy.phone}?text=${encodedMessage}`
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank')
    
    // Clear cart after sending
    setTimeout(() => {
      clearCart()
      router.push('/')
    }, 1000)
  }

  const handleContinue = () => {
    // Placeholder for handleContinue logic
  }

  if (items.length === 0) {
    return (
      <>
        <Header />
        <AssistantWidget />
        <main className="min-h-screen bg-muted/20 flex items-center justify-center">
          <div className="container mx-auto px-4 py-16">
            <Empty
              icon={<ShoppingCart className="h-16 w-16" />}
              title="Tu carrito está vacío"
              description="Agregá productos desde el catálogo para armar tu pedido"
            >
              <Button asChild size="lg" className="mt-4">
                <Link href="/catalogo">Ver catálogo</Link>
              </Button>
            </Empty>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <AssistantWidget />

      <main className="min-h-screen bg-muted/20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Carrito</h1>
              <p className="text-muted-foreground leading-relaxed">
                Revisá tu pedido antes de continuar
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-semibold">
                        Productos ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                      </h2>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearCart}
                        className="text-destructive hover:text-destructive"
                      >
                        Vaciar carrito
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={item.productId}>
                          <div className="flex gap-4">
                            <div className="flex-1 space-y-1">
                              <h3 className="font-semibold">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">{item.brand}</p>
                              <p className="text-sm text-muted-foreground">{item.presentation}</p>
                              {item.price && (
                                <p className="text-sm font-medium text-primary">
                                  ${item.price.toLocaleString('es-AR')} c/u
                                </p>
                              )}
                            </div>

                            <div className="flex flex-col items-end gap-2">
                              <div className="flex items-center border rounded-lg">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() =>
                                    updateQuantity(item.productId, item.quantity - 1)
                                  }
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-10 text-center text-sm font-semibold">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() =>
                                    updateQuantity(item.productId, item.quantity + 1)
                                  }
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              {item.price && (
                                <p className="text-sm font-bold">
                                  ${(item.price * item.quantity).toLocaleString('es-AR')}
                                </p>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(item.productId)}
                                className="text-destructive hover:text-destructive h-8 px-2"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <Separator className="mt-4" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-20">
                  <CardContent className="p-6 space-y-6">
                    <h2 className="text-lg font-semibold">Resumen</h2>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total de items</span>
                        <span className="font-medium">{totalItems}</span>
                      </div>

                      {selectedPharmacy ? (
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Farmacia seleccionada</p>
                          <p className="font-medium text-sm">{selectedPharmacy.pharmacyName}</p>
                          <Button asChild variant="link" size="sm" className="p-0 h-auto mt-1">
                            <Link href="/farmacias">Cambiar farmacia</Link>
                          </Button>
                        </div>
                      ) : (
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                          <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-2">
                            No seleccionaste una farmacia
                          </p>
                          <Button asChild size="sm" variant="outline" className="w-full bg-transparent">
                            <Link href="/farmacias">Elegir farmacia</Link>
                          </Button>
                        </div>
                      )}

                      {totalPrice > 0 && (
                        <>
                          <Separator />
                          <div className="flex justify-between">
                            <span className="font-semibold">Total estimado</span>
                            <span className="text-xl font-bold text-primary">
                              ${totalPrice.toLocaleString('es-AR')}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {'Precio referencial. Confirmá con la farmacia.'}
                          </p>
                        </>
                      )}
                    </div>

                    {!showCheckout ? (
                      <>
                        <div className="flex flex-col gap-2">
                          <Button
                            onClick={handleCheckout}
                            className="w-full gap-2"
                            size="lg"
                            disabled={!selectedPharmacy}
                          >
                            Consultar pedido
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                          <Button
                            asChild
                            variant="outline"
                            className="w-full gap-2 bg-transparent"
                            size="lg"
                          >
                            <Link href="/catalogo">
                              Seguir comprando
                            </Link>
                          </Button>
                        </div>

                        <div className="bg-muted/50 rounded-lg p-4 text-xs text-muted-foreground leading-relaxed">
                          <p>
                            Elegí seguir comprando o finalizá tu pedido para contactar a la farmacia.
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-3">
                          <h3 className="font-semibold text-sm">Confirmá tu pedido</h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            Tu pedido será enviado por WhatsApp a la farmacia seleccionada. Ellos confirmarán disponibilidad y precio final.
                          </p>
                        </div>

                        <Button
                          onClick={handleWhatsAppOrder}
                          className="w-full gap-2"
                          size="lg"
                        >
                          <MessageCircle className="h-5 w-5" />
                          Enviar por WhatsApp
                        </Button>

                        <Button
                          onClick={() => setShowCheckout(false)}
                          variant="ghost"
                          className="w-full"
                          size="sm"
                        >
                          Volver
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
