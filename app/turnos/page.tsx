'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Calendar as CalendarIcon, Clock, MapPin, Phone, ChevronLeft, ChevronRight } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AssistantWidget } from '@/components/assistant-widget'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { turnosData, getTurnosHoy, getTurnosByMonth, getTurnosByDate } from '@/data/turnos'
import { pharmacies } from '@/data/pharmacies'

const DAYS_OF_WEEK = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

export default function TurnosPage() {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const turnosHoy = getTurnosHoy()
  const farmaciasHoy = turnosHoy
    ? pharmacies.filter(p => turnosHoy.pharmacyIds.includes(p.id))
    : []

  const turnosDelMes = useMemo(() => {
    return getTurnosByMonth(currentYear, currentMonth + 1)
  }, [currentYear, currentMonth])

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1)
    const lastDay = new Date(currentYear, currentMonth + 1, 0)
    const startDay = firstDay.getDay()
    const totalDays = lastDay.getDate()

    const days: (number | null)[] = []
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startDay; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let i = 1; i <= totalDays; i++) {
      days.push(i)
    }

    return days
  }, [currentYear, currentMonth])

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const getDayTurnos = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return getTurnosByDate(dateStr)
  }

  const selectedDateTurnos = selectedDate ? getTurnosByDate(selectedDate) : null
  const selectedDatePharmacies = selectedDateTurnos
    ? pharmacies.filter(p => selectedDateTurnos.pharmacyIds.includes(p.id))
    : []

  return (
    <>
      <Header />
      <AssistantWidget />

      <main className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-balance">Farmacias de Turno</h1>
              <p className="text-lg text-muted-foreground text-balance">
                Encontrá las farmacias que están de guardia hoy y consultá el calendario mensual
              </p>
            </div>

            {/* Today's On-Duty Pharmacies */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Farmacias de turno hoy
                </CardTitle>
              </CardHeader>
              <CardContent>
                {farmaciasHoy.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    {farmaciasHoy.map((pharmacy) => (
                      <Card key={pharmacy.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-5 space-y-3">
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold text-lg">{pharmacy.name}</h3>
                            <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                              De turno
                            </Badge>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex items-start gap-2 text-muted-foreground">
                              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                              <div>
                                <p>{pharmacy.address}</p>
                                <p>{pharmacy.neighborhood}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Phone className="h-4 w-4 flex-shrink-0" />
                              <a 
                                href={`tel:${pharmacy.phone}`}
                                className="hover:text-primary transition-colors"
                              >
                                {pharmacy.phone}
                              </a>
                            </div>
                          </div>

                          <div className="pt-2">
                            <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
                              <Link href={`/farmacias/${pharmacy.id}`}>Ver detalles</Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No hay información de turnos para hoy</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Calendar */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-primary" />
                    Calendario de turnos
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={handlePreviousMonth}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="min-w-[160px] text-center font-semibold">
                      {MONTHS[currentMonth]} {currentYear}
                    </div>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={handleNextMonth}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Calendar Grid */}
                <div className="space-y-4">
                  {/* Days of week header */}
                  <div className="grid grid-cols-7 gap-2 text-center font-semibold text-sm">
                    {DAYS_OF_WEEK.map((day) => (
                      <div key={day} className="py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar days */}
                  <div className="grid grid-cols-7 gap-2">
                    {calendarDays.map((day, index) => {
                      if (day === null) {
                        return <div key={`empty-${index}`} />
                      }

                      const turnos = getDayTurnos(day)
                      const isToday = 
                        day === today.getDate() && 
                        currentMonth === today.getMonth() && 
                        currentYear === today.getFullYear()
                      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                      const isSelected = selectedDate === dateStr

                      return (
                        <button
                          key={day}
                          onClick={() => setSelectedDate(dateStr)}
                          className={`
                            aspect-square p-2 rounded-lg border transition-all
                            ${isToday ? 'border-primary bg-primary/10 font-bold' : 'border-border'}
                            ${turnos ? 'bg-secondary/50 hover:bg-secondary' : 'hover:bg-muted'}
                            ${isSelected ? 'ring-2 ring-primary' : ''}
                          `}
                        >
                          <div className="flex flex-col items-center justify-center h-full">
                            <span className="text-sm">{day}</span>
                            {turnos && (
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1" />
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  {/* Selected date info */}
                  {selectedDate && selectedDatePharmacies.length > 0 && (
                    <div className="mt-6 p-4 border rounded-lg bg-muted/50">
                      <h3 className="font-semibold mb-3">
                        Farmacias de turno - {selectedDate}
                      </h3>
                      <div className="space-y-2">
                        {selectedDatePharmacies.map((pharmacy) => (
                          <div 
                            key={pharmacy.id}
                            className="flex items-center justify-between py-2 border-b last:border-0"
                          >
                            <div>
                              <p className="font-medium">{pharmacy.name}</p>
                              <p className="text-sm text-muted-foreground">{pharmacy.neighborhood}</p>
                            </div>
                            <Button asChild variant="outline" size="sm">
                              <Link href={`/farmacias/${pharmacy.id}`}>Ver</Link>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Info box */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Nota:</strong> Los turnos se actualizan mensualmente. Si necesitás información urgente sobre farmacias de guardia, te recomendamos llamar directamente o usar el Asistente Virtual.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
