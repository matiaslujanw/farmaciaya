'use client'

import { useLocalStorage } from './use-local-storage'

export interface PharmacySelection {
  pharmacyId: string
  pharmacyName: string
}

export function usePharmacy() {
  const [selected, setSelected] = useLocalStorage<PharmacySelection | null>(
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
