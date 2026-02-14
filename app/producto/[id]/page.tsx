'use client'

import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, ShoppingCart, Minus, Plus, CheckCircle2, XCircle } from 'lucide-react'
import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AssistantWidget } from '@/components/assistant-widget'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { useCart } from '@/hooks/use-cart'
import { products } from '@/data/products'
import { toast } from 'sonner'

export default function ProductoPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)

  const product = products.find((p) => p.id === params.id)

  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">Producto no encontrado</h1>
            <Button onClick={() => router.push('/catalogo')}>Volver al catálogo</Button>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const similarProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id && p.isAvailable)
    .slice(0, 3)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        productId: product.id,
        name: product.name,
        brand: product.brand,
        presentation: product.presentation,
        price: product.price,
      })
    }
    toast.success(`${quantity} ${quantity === 1 ? 'producto agregado' : 'productos agregados'} al carrito`)
    setQuantity(1)
  }

  return (
    <>
      <Header />
      <AssistantWidget />

      <main className="min-h-screen bg-muted/20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mb-6 gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>

            {/* Product Detail */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                        <p className="text-xl text-muted-foreground">{product.brand}</p>
                      </div>
                      <Badge
                        variant={product.isAvailable ? 'default' : 'secondary'}
                        className="text-base px-4 py-2"
                      >
                        {product.isAvailable ? (
                          <>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Disponible
                          </>
                        ) : (
                          <>
                            <XCircle className="mr-2 h-4 w-4" />
                            Sin stock
                          </>
                        )}
                      </Badge>
                    </div>
                    <p className="text-lg">{product.presentation}</p>
                  </div>

                  {/* Description */}
                  <div>
                    <h2 className="text-sm font-semibold mb-2 text-muted-foreground">
                      DESCRIPCIÓN
                    </h2>
                    <p className="text-base leading-relaxed">{product.description}</p>
                  </div>

                  {/* Tags */}
                  {product.tags.length > 0 && (
                    <div>
                      <h2 className="text-sm font-semibold mb-2 text-muted-foreground">
                        INDICACIONES
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag, i) => (
                          <Badge key={i} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price & Actions */}
                  <div className="border-t pt-6 space-y-4">
                    {product.price && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Precio referencial</p>
                        <p className="text-3xl font-bold text-primary">
                          ${product.price.toLocaleString('es-AR')}
                        </p>
                      </div>
                    )}

                    {product.isAvailable && (
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border rounded-lg">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            disabled={quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-semibold">{quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setQuantity(Math.min(99, quantity + 1))}
                            disabled={quantity >= 99}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button onClick={handleAddToCart} className="flex-1 gap-2" size="lg">
                          <ShoppingCart className="h-5 w-5" />
                          Agregar al carrito
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Disclaimer */}
                  <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      {'Los precios y disponibilidad son referenciales. Consultá con tu farmacia seleccionada antes de retirar.'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Similar Products */}
            {similarProducts.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Alternativas similares</h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {similarProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
