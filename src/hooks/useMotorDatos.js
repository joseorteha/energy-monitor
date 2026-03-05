'use client'
import { useState, useEffect, useCallback } from 'react'
import { generarLectura, FACTOR_CO2, AREAS_DEFAULT } from '../lib/motorDatos'

const INTERVALO_MS = 3000
const MAX_HISTORIAL = 50
const MAX_ALERTAS = 10

export function useMotorDatos(areasEmpresa = null) {
    const areas = areasEmpresa && areasEmpresa.length > 0 ? areasEmpresa : AREAS_DEFAULT
    const [lecturas, setLecturas] = useState([])
    const [alertas, setAlertas] = useState([])
    const [corriendo, setCorriendo] = useState(true)
    const [ultimaAlerta, setUltimaAlerta] = useState(null)

    const agregarLectura = useCallback((lectura) => {
        setLecturas(prev => [...prev.slice(-(MAX_HISTORIAL - 1)), lectura])
        if (lectura.alerta_anomalia) {
            setAlertas(prev => [lectura, ...prev].slice(0, MAX_ALERTAS))
            setUltimaAlerta(Date.now())
        }
    }, [])

    useEffect(() => {
        if (!corriendo) return
        // Reiniciar con 10 lecturas al cambiar áreas
        setLecturas(Array.from({ length: 10 }, () => generarLectura(false, areas)))
        setAlertas([])
        const intervalo = setInterval(() => agregarLectura(generarLectura(false, areas)), INTERVALO_MS)
        return () => clearInterval(intervalo)
    }, [corriendo, agregarLectura, areas])

    // Función de pánico para la demo
    const dispararEmergencia = useCallback(() => {
        agregarLectura(generarLectura(true, areas))
        setTimeout(() => agregarLectura(generarLectura(true, areas)), 300)
        setTimeout(() => agregarLectura(generarLectura(true, areas)), 600)
    }, [agregarLectura, areas])

    // Métricas calculadas
    const totalKwh = lecturas.reduce((s, l) => s + Number(l.consumo_kwh), 0)
    const totalCosto = lecturas.reduce((s, l) => s + Number(l.costo_estimado), 0)
    const consumoPorArea = lecturas.reduce((acc, l) => {
        acc[l.area_nombre] = (acc[l.area_nombre] || 0) + Number(l.consumo_kwh)
        return acc
    }, {})

    return {
        lecturas,
        alertas,
        corriendo,
        setCorriendo,
        dispararEmergencia,
        ultimaAlerta,
        metricas: {
            totalKwh: totalKwh.toFixed(2),
            totalCosto: totalCosto.toFixed(2),
            huellaCO2: (totalKwh * FACTOR_CO2).toFixed(2),
            totalAlertas: alertas.length,
            consumoPorArea,
            areaMasActiva: Object.entries(consumoPorArea).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—',
        },
    }
}
