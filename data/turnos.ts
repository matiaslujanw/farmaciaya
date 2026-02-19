// Actualizar este archivo mes a mes con los turnos de las farmacias
// Formato de fecha: YYYY-MM-DD

export interface TurnoEntry {
  date: string // Formato: YYYY-MM-DD
  pharmacyIds: string[] // IDs de las farmacias de turno
}

// Ejemplo de turnos para el mes actual
export const turnosData: TurnoEntry[] = [
  // Febrero 2026
  { date: '2026-02-01', pharmacyIds: ['1', '2'] },
  { date: '2026-02-02', pharmacyIds: ['3', '4'] },
  { date: '2026-02-03', pharmacyIds: ['5', '6'] },
  { date: '2026-02-04', pharmacyIds: ['7', '8'] },
  { date: '2026-02-05', pharmacyIds: ['9', '10'] },
  { date: '2026-02-06', pharmacyIds: ['11', '12'] },
  { date: '2026-02-07', pharmacyIds: ['13', '14'] },
  { date: '2026-02-08', pharmacyIds: ['15', '16'] },
  { date: '2026-02-09', pharmacyIds: ['17', '18'] },
  { date: '2026-02-10', pharmacyIds: ['19', '20'] },
  { date: '2026-02-11', pharmacyIds: ['21', '22'] },
  { date: '2026-02-12', pharmacyIds: ['1', '2', '21'] },
  { date: '2026-02-13', pharmacyIds: ['3', '4', '22'] },
  { date: '2026-02-14', pharmacyIds: ['5', '6'] },
  { date: '2026-02-15', pharmacyIds: ['7', '8'] },
  { date: '2026-02-16', pharmacyIds: ['9', '10'] },
  { date: '2026-02-17', pharmacyIds: ['11', '12'] },
  { date: '2026-02-18', pharmacyIds: ['13', '14'] },
  { date: '2026-02-19', pharmacyIds: ['21', '22'] }, // Hoy
  { date: '2026-02-20', pharmacyIds: ['15', '16', '21'] },
  { date: '2026-02-21', pharmacyIds: ['17', '18', '22'] },
  { date: '2026-02-22', pharmacyIds: ['19', '20'] },
  { date: '2026-02-23', pharmacyIds: ['1', '2'] },
  { date: '2026-02-24', pharmacyIds: ['3', '4'] },
  { date: '2026-02-25', pharmacyIds: ['5', '6'] },
  { date: '2026-02-26', pharmacyIds: ['7', '8'] },
  { date: '2026-02-27', pharmacyIds: ['9', '10'] },
  { date: '2026-02-28', pharmacyIds: ['11', '12'] },
];

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
