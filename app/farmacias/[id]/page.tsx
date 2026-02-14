'use client'

import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, MapPin, Phone, Clock, ExternalLink } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AssistantWidget } from '@/components/assistant-widget'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { pharmacies } from '@/data/pharmacies'
import { usePharmacy } from '@/hooks/use-pharmacy'
import { toast } from 'sonner'

export default function FarmaciaDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { selectPharmacy, selectedPharmacy } = usePharmacy()

  const pharmacy = pharmacies.find((p) => p.id === params.id)

  if (!pharmacy) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">Farmacia no encontrada</h1>
            <Button onClick={() => router.push('/farmacias')}>Volver a farmacias</Button>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const handleSelectPharmacy = () => {
    selectPharmacy(pharmacy.id, pharmacy.name)
    toast.success(`Farmacia seleccionada: ${pharmacy.name}`)
  }

  const isSelected = selectedPharmacy?.pharmacyId === pharmacy.id
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pharmacy.address)}`

  return (
    <>
      <Header />
      <AssistantWidget />

      <main className="min-h-screen bg-muted/20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            {/* Back Button */}
            <Button variant="ghost" onClick={() => router.back()} className="mb-6 gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>

            {/* Pharmacy Detail */}
            <Card>
              <CardContent className="p-8 space-y-6">
                {/* Header */}
                <div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h1 className="text-3xl font-bold">{pharmacy.name}</h1>
                    {pharmacy.isOnDuty && <Badge className="bg-green-500">De guardia</Badge>}
                  </div>
                  <p className="text-xl text-muted-foreground">{pharmacy.neighborhood}</p>
                </div>

                {/* Contact Info */}
                <div className="space-y-4 border-t pt-6">
                  <h2 className="text-lg font-semibold">Información de contacto</h2>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                      <div className="flex-1">
                        <p className="font-medium mb-1">Dirección</p>
                        <p className="text-muted-foreground">{pharmacy.address}</p>
                        <Button
                          asChild
                          variant="link"
                          className="p-0 h-auto mt-2 gap-1"
                          size="sm"
                        >
                          <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                            Ver en Google Maps <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground shrink-0" />
                      <div>
                        <p className="font-medium mb-1">Teléfono</p>
                        <a
                          href={`tel:${pharmacy.phone}`}
                          className="text-primary hover:underline"
                        >
                          {pharmacy.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium mb-1">Horario de atención</p>
                        <p className="text-muted-foreground">{pharmacy.hours}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services */}
                {pharmacy.services.length > 0 && (
                  <div className="border-t pt-6">
                    <h2 className="text-lg font-semibold mb-4">Servicios disponibles</h2>
                    <div className="flex flex-wrap gap-2">
                      {pharmacy.services.map((service, i) => (
                        <Badge key={i} variant="secondary">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Map Placeholder */}
                <div className="border-t pt-6">
                  <h2 className="text-lg font-semibold mb-4">Ubicación</h2>
                  <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <MapPin className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {pharmacy.address}
                      </p>
                      <Button asChild size="sm" variant="outline">
                        <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                          Abrir en Google Maps
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Action */}
                <div className="border-t pt-6">
                  <Button
                    onClick={handleSelectPharmacy}
                    className="w-full"
                    size="lg"
                    variant={isSelected ? 'outline' : 'default'}
                  >
                    {isSelected ? '✓ Farmacia seleccionada' : 'Elegir esta farmacia'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
