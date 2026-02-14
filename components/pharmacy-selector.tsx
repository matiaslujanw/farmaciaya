'use client'

import { useState } from 'react'
import { MapPin, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { usePharmacy } from '@/hooks/use-pharmacy'
import { pharmacies } from '@/data/pharmacies'

export function PharmacySelector() {
  const { selectedPharmacy, selectPharmacy } = usePharmacy()
  const [search, setSearch] = useState('')

  const filteredPharmacies = pharmacies.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.neighborhood.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2 bg-transparent">
          <MapPin className="h-4 w-4" />
          <span className="hidden md:inline max-w-[150px] truncate">
            {selectedPharmacy ? selectedPharmacy.pharmacyName : 'Elegir farmacia'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Seleccioná tu farmacia</DropdownMenuLabel>
        <div className="p-2">
          <Input
            placeholder="Buscar por nombre o barrio..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8"
          />
        </div>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-y-auto">
          {filteredPharmacies.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No se encontraron farmacias
            </div>
          ) : (
            filteredPharmacies.slice(0, 10).map((pharmacy) => (
              <DropdownMenuItem
                key={pharmacy.id}
                onClick={() => selectPharmacy(pharmacy.id, pharmacy.name)}
                className="flex items-start gap-2 py-2"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{pharmacy.name}</span>
                    {selectedPharmacy?.pharmacyId === pharmacy.id && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{pharmacy.neighborhood}</p>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a href="/farmacias" className="cursor-pointer text-primary text-sm">
            Ver todas las farmacias
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
