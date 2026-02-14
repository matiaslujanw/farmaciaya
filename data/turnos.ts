// Actualizar este archivo mes a mes con los turnos de las farmacias
// Formato de fecha: YYYY-MM-DD

export interface TurnoEntry {
  date: string // Formato: YYYY-MM-DD
  pharmacyIds: string[] // IDs de las farmacias de turno
}

// Ejemplo de turnos para el mes actual
export const turnosData: TurnoEntry[] = [
  // Enero 2025
  { date: '2025-01-15', pharmacyIds: ['farmacity-centro', 'farmacity-nueva-cordoba'] },
  { date: '2025-01-16', pharmacyIds: ['farmacias-del-pueblo-alta-cordoba'] },
  { date: '2025-01-17', pharmacyIds: ['farmacity-centro'] },
  { date: '2025-01-18', pharmacyIds: ['farmacity-nueva-cordoba', 'farmacias-del-pueblo-alta-cordoba'] },
  { date: '2025-01-19', pharmacyIds: ['farmacity-centro'] },
  { date: '2025-01-20', pharmacyIds: ['farmacity-nueva-cordoba'] },
  { date: '2025-01-21', pharmacyIds: ['farmacias-del-pueblo-alta-cordoba', 'farmacity-centro'] },
  { date: '2025-01-22', pharmacyIds: ['farmacity-nueva-cordoba'] },
  { date: '2025-01-23', pharmacyIds: ['farmacity-centro'] },
  { date: '2025-01-24', pharmacyIds: ['farmacias-del-pueblo-alta-cordoba'] },
  { date: '2025-01-25', pharmacyIds: ['farmacity-nueva-cordoba', 'farmacity-centro'] },
  { date: '2025-01-26', pharmacyIds: ['farmacity-centro'] },
  { date: '2025-01-27', pharmacyIds: ['farmacias-del-pueblo-alta-cordoba'] },
  { date: '2025-01-28', pharmacyIds: ['farmacity-nueva-cordoba'] },
  { date: '2025-01-29', pharmacyIds: ['farmacity-centro', 'farmacias-del-pueblo-alta-cordoba'] },
  { date: '2025-01-30', pharmacyIds: ['farmacity-nueva-cordoba'] },
  { date: '2025-01-31', pharmacyIds: ['farmacity-centro'] },
  
  // Febrero 2025 - Agregar aquí los turnos del mes siguiente
  { date: '2025-02-01', pharmacyIds: ['farmacias-del-pueblo-alta-cordoba'] },
  { date: '2025-02-02', pharmacyIds: ['farmacity-centro', 'farmacity-nueva-cordoba'] },
  { date: '2025-02-03', pharmacyIds: ['farmacity-nueva-cordoba'] },
  { date: '2025-02-04', pharmacyIds: ['farmacias-del-pueblo-alta-cordoba'] },
  { date: '2025-02-05', pharmacyIds: ['farmacity-centro'] },
  { date: '2025-02-06', pharmacyIds: ['farmacity-nueva-cordoba'] },
  { date: '2025-02-07', pharmacyIds: ['farmacity-centro', 'farmacias-del-pueblo-alta-cordoba'] },
  { date: '2025-02-08', pharmacyIds: ['farmacity-nueva-cordoba'] },
  { date: '2025-02-09', pharmacyIds: ['farmacity-centro'] },
  { date: '2025-02-10', pharmacyIds: ['farmacias-del-pueblo-alta-cordoba'] },
]

// Helper para obtener turnos de hoy
export function getTurnosHoy(): TurnoEntry | undefined {
  const today = new Date().toISOString().split('T')[0]
  return turnosData.find(t => t.date === today)
}

// Helper para obtener turnos de una fecha específica
export function getTurnosByDate(date: string): TurnoEntry | undefined {
  return turnosData.find(t => t.date === date)
}

// Helper para obtener turnos de un mes específico
export function getTurnosByMonth(year: number, month: number): TurnoEntry[] {
  const monthStr = month.toString().padStart(2, '0')
  const prefix = `${year}-${monthStr}`
  return turnosData.filter(t => t.date.startsWith(prefix))
}
