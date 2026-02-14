'use client'

import Link from 'next/link'
import { ArrowRight, Pill, Search, MapPin, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { OnboardingModal } from '@/components/onboarding-modal'
import { AssistantWidget } from '@/components/assistant-widget'
import { ProductCard } from '@/components/product-card'
import { categories } from '@/data/categories'
import { products } from '@/data/products'
import { pharmacies } from '@/data/pharmacies'
import { usePharmacy } from '@/hooks/use-pharmacy'

export default function HomePage() {
  const { selectedPharmacy } = usePharmacy()
  const featuredProducts = products.filter((p) => p.isAvailable).slice(0, 6)
  const nearbyPharmacies = pharmacies.filter((p) => p.isOnDuty)

  return (
    <>
      <Header />
      <OnboardingModal />
      <AssistantWidget />

      <main className="min-h-screen">
        {/* Hero */}
        <section className="border-b bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
                FarmaciaYA
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground text-balance leading-relaxed">
                {'Encontrá productos y farmacias cerca tuyo en segundos'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/catalogo">
                    <Search className="h-5 w-5" />
                    Buscar productos
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2 bg-transparent">
                  <Link href="/farmacias">
                    <MapPin className="h-5 w-5" />
                    Ver farmacias
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Nearby Pharmacies (if on duty) */}
        {nearbyPharmacies.length > 0 && (
          <section className="py-16 border-b bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold">Farmacias de guardia</h2>
                  <Button asChild variant="ghost">
                    <Link href="/farmacias">
                      Ver todas <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <Carousel
                  opts={{
                    align: 'start',
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-4">
                    {nearbyPharmacies.map((pharmacy) => (
                      <CarouselItem key={pharmacy.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                        <Card className="hover:shadow-lg transition-shadow h-full">
                          <CardContent className="p-5 space-y-3">
                            <div className="flex items-start justify-between">
                              <h3 className="font-semibold">{pharmacy.name}</h3>
                              <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                                {'Abierta'}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{pharmacy.address}</p>
                            <p className="text-sm text-muted-foreground">{pharmacy.neighborhood}</p>
                            <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
                              <Link href={`/farmacias/${pharmacy.id}`}>Ver detalles</Link>
                            </Button>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden md:flex" />
                  <CarouselNext className="hidden md:flex" />
                </Carousel>
              </div>
            </div>
          </section>
        )}

        {/* Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                {'Categorías principales'}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {categories.map((category) => (
                  <Link key={category.id} href={`/catalogo?categoria=${category.slug}`}>
                    <Card className="hover:shadow-lg hover:scale-105 transition-all cursor-pointer h-full">
                      <CardContent className="p-6 text-center space-y-3">
                        <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                          <Pill className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-medium text-sm leading-tight">{category.name}</h3>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 border-t bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-bold">Productos destacados</h2>
                <Button asChild variant="ghost">
                  <Link href="/catalogo">
                    Ver catálogo <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 border-t">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <MessageCircle className="h-12 w-12 mx-auto text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold">¿Tenés dudas?</h2>
              <p className="text-lg text-muted-foreground text-balance">
                {'Usá nuestro Asistente Virtual para resolver tus consultas. Hacé clic en el ícono del chat en la esquina inferior derecha.'}
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
