'use client'

import { useSessionStorage } from './use-session-storage'

export interface PharmacySelection {
  pharmacyId: string
  pharmacyName: string
}

export function usePharmacy() {
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

  return {
    selectedPharmacy: selected,
    selectPharmacy,
    clearPharmacy,
  }
}
