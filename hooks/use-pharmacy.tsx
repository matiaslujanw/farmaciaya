'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useSessionStorage } from './use-session-storage'

export interface PharmacySelection {
  pharmacyId: string
  pharmacyName: string
}

interface PharmacyContextType {
  selectedPharmacy: PharmacySelection | null
  selectPharmacy: (id: string, name: string) => void
  clearPharmacy: () => void
}

const PharmacyContext = createContext<PharmacyContextType | undefined>(undefined)

export function PharmacyProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useSessionStorage<PharmacySelection | null>(
    'farmaciaya-pharmacy',
    null
  )

  const selectPharmacy = (id: string, name: string) => {
    setSelected({ pharmacyId: id, pharmacyName: name })
  }

  const clearPharmacy = () => {
    setSelected(null)
  }

  return (
    <PharmacyContext.Provider
      value={{
        selectedPharmacy: selected,
        selectPharmacy,
        clearPharmacy,
      }}
    >
      {children}
    </PharmacyContext.Provider>
  )
}

export function usePharmacy() {
  const context = useContext(PharmacyContext)
  if (context === undefined) {
    throw new Error('usePharmacy must be used within a PharmacyProvider')
  }
  return context
}
