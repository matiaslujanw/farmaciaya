'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MapPin, Phone, Clock, Search, Navigation } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AssistantWidget } from '@/components/assistant-widget'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { pharmacies } from '@/data/pharmacies'
import { usePharmacy } from '@/hooks/use-pharmacy'
import { useGeolocation, calculateDistance } from '@/hooks/use-geolocation'
import { toast } from 'sonner'

export default function FarmaciasPage() {
  const [search, setSearch] = useState('')
  const { selectedPharmacy, selectPharmacy } = usePharmacy()
  const { location, requestLocation, loading } = useGeolocation()
  const [sortedPharmacies, setSortedPharmacies] = useState(pharmacies)

  useEffect(() => {
    if (location) {
      const withDistance = pharmacies.map((p) => ({
        ...p,
        distance: calculateDistance(location.latitude, location.longitude, p.lat, p.lng),
      }))
      withDistance.sort((a, b) => a.distance - b.distance)
      setSortedPharmacies(withDistance)
    }
  }, [location])

  const filteredPharmacies = sortedPharmacies.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.neighborhood.toLowerCase().includes(search.toLowerCase()) ||
      p.address.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelectPharmacy = (id: string, name: string) => {
    selectPharmacy(id, name)
    toast.success(`Farmacia seleccionada: ${name}`)
  }

  return (
    <>
      <Header />
      <AssistantWidget />

      <main className="min-h-screen bg-muted/20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Farmacias</h1>
              <p className="text-muted-foreground leading-relaxed">
                {'Encontrá la farmacia más cercana a tu ubicación'}
              </p>
            </div>

            {/* Search & Location */}
            <div className="bg-background border rounded-xl p-6 mb-8 space-y-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nombre, barrio o dirección..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button
                  onClick={requestLocation}
                  disabled={loading}
                  variant="outline"
                  className="gap-2 bg-transparent"
                >
                  <Navigation className="h-4 w-4" />
                  {loading ? 'Obteniendo...' : location ? 'Actualizar ubicación' : 'Usar mi ubicación'}
                </Button>
              </div>
              {location && (
                <p className="text-sm text-muted-foreground">
                  📍 Mostrando farmacias ordenadas por cercanía a tu ubicación
                </p>
              )}
            </div>

            {/* Results */}
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                {filteredPharmacies.length} farmacia{filteredPharmacies.length !== 1 ? 's' : ''} encontrada{filteredPharmacies.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Pharmacies List */}
            {filteredPharmacies.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No se encontraron farmacias con ese criterio</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredPharmacies.map((pharmacy) => (
                  <Card
                    key={pharmacy.id}
                    className={`hover:shadow-lg transition-all ${selectedPharmacy?.pharmacyId === pharmacy.id ? 'ring-2 ring-primary' : ''
                      }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-xl font-semibold">{pharmacy.name}</h3>
                                {pharmacy.isOnDuty && (
                                  <Badge className="bg-green-500">De guardia</Badge>
                                )}
                                {selectedPharmacy?.pharmacyId === pharmacy.id && (
                                  <Badge variant="outline">Seleccionada</Badge>
                                )}
                              </div>
                              <p className="text-muted-foreground">{pharmacy.neighborhood}</p>
                            </div>
                          </div>

                          <div className="space-y-2 text-sm">
                            <div className="flex items-start gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                              <span>{pharmacy.address}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                              <a
                                href={`tel:${pharmacy.phone}`}
                                className="hover:text-primary"
                              >
                                {pharmacy.phone}
                              </a>
                            </div>
                            <div className="flex items-start gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                              <span>{pharmacy.hours}</span>
                            </div>
                          </div>

                          {pharmacy.services.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {pharmacy.services.map((service, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {service}
                                </Badge>
                              ))}
                            </div>
                          )}

                          {'distance' in pharmacy && pharmacy.distance !== undefined && (
                            <p className="text-sm text-muted-foreground">
                              📍 A {pharmacy.distance?.toFixed(1)} km de tu ubicación
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col gap-2">
                          <Button
                            onClick={() => handleSelectPharmacy(pharmacy.id, pharmacy.name)}
                            variant={
                              selectedPharmacy?.pharmacyId === pharmacy.id ? 'default' : 'outline'
                            }
                          >
                            {selectedPharmacy?.pharmacyId === pharmacy.id
                              ? 'Seleccionada'
                              : 'Elegir esta farmacia'}
                          </Button>
                          <Button asChild variant="ghost" size="sm">
                            <Link href={`/farmacias/${pharmacy.id}`}>Ver detalles</Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
