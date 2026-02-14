'use client'

import { useState, useEffect } from 'react'
import { MapPin, Phone } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSessionStorage } from '@/hooks/use-session-storage'
import { useGeolocation, calculateDistance } from '@/hooks/use-geolocation'
import { usePharmacy } from '@/hooks/use-pharmacy'
import { pharmacies } from '@/data/pharmacies'
import { toast } from 'sonner'

export function OnboardingModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<'phone' | 'location'>('phone')
  const [phone, setPhone] = useState('')
  const [isMounted, setIsMounted] = useState(false)
  const [onboardingComplete, setOnboardingComplete] = useSessionStorage('farmaciaya-onboarding', false)
  const { location, requestLocation, loading } = useGeolocation()
  const { selectPharmacy } = usePharmacy()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted && !onboardingComplete) {
      // Delay to show after page loads
      const timer = setTimeout(() => setIsOpen(true), 500)
      return () => clearTimeout(timer)
    }
  }, [isMounted, onboardingComplete])

  const handlePhoneSubmit = () => {
    if (phone.length < 8) {
      toast.error('Ingresá un teléfono válido')
      return
    }
    setStep('location')
  }

  const handleLocationRequest = () => {
    requestLocation()
  }

  useEffect(() => {
    if (location) {
      // Find nearest pharmacy
      const pharmaciesWithDistance = pharmacies.map((p) => ({
        ...p,
        distance: calculateDistance(location.latitude, location.longitude, p.lat, p.lng),
      }))
      pharmaciesWithDistance.sort((a, b) => a.distance - b.distance)
      const nearest = pharmaciesWithDistance[0]
      selectPharmacy(nearest.id, nearest.name)
      toast.success(`Farmacia seleccionada: ${nearest.name}`)
      completeOnboarding()
    }
  }, [location])

  const handleManualSelection = () => {
    completeOnboarding()
    window.location.href = '/farmacias'
  }

  const completeOnboarding = () => {
    setOnboardingComplete(true)
    setIsOpen(false)
  }

  if (!isMounted) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        {step === 'phone' ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">Bienvenido a FarmaciaYA</DialogTitle>
              <DialogDescription>
                {'Para empezar, ingresá tu teléfono de contacto'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="11 1234-5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handlePhoneSubmit()}
                  />
                </div>
              </div>
              <Button onClick={handlePhoneSubmit} className="w-full">
                Continuar
              </Button>
              <Button
                variant="ghost"
                onClick={() => setStep('location')}
                className="w-full text-sm"
              >
                {'Omitir'}
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">Elegí tu farmacia</DialogTitle>
              <DialogDescription>
                {'Permitinos acceder a tu ubicación para recomendarte farmacias cercanas'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-4">
              <Button
                onClick={handleLocationRequest}
                disabled={loading}
                className="w-full gap-2"
                size="lg"
              >
                <MapPin className="h-4 w-4" />
                {loading ? 'Obteniendo ubicación...' : 'Usar mi ubicación'}
              </Button>
              <Button variant="outline" onClick={handleManualSelection} className="w-full bg-transparent" size="lg">
                {'Elegir farmacia manualmente'}
              </Button>
              <Button
                variant="ghost"
                onClick={completeOnboarding}
                className="w-full text-sm text-muted-foreground"
              >
                {'Lo haré después'}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
