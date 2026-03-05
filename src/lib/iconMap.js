import {
    Factory, Cog, Building2, UtensilsCrossed,
    Warehouse, Server, Thermometer, Fan,
    Lightbulb, Plug, BatteryCharging, Gauge,
    MapPin, Box, MonitorSpeaker, Cpu,
    FlaskConical, Forklift, ParkingCircle, ShieldCheck
} from 'lucide-react'

// Mapa de nombres de string → componentes Lucide
// Usado para renderizar iconos dinámicamente desde datos/localStorage
const ICON_MAP = {
    Factory,
    Cog,
    Building2,
    UtensilsCrossed,
    Warehouse,
    Server,
    Thermometer,
    Fan,
    Lightbulb,
    Plug,
    BatteryCharging,
    Gauge,
    MapPin,
    Box,
    MonitorSpeaker,
    Cpu,
    FlaskConical,
    Forklift,
    ParkingCircle,
    ShieldCheck,
}

// Lista de iconos disponibles para el selector de áreas
export const ICONOS_DISPONIBLES = [
    { nombre: 'Factory', etiqueta: 'Fábrica' },
    { nombre: 'Cog', etiqueta: 'Máquinas' },
    { nombre: 'Building2', etiqueta: 'Oficinas' },
    { nombre: 'UtensilsCrossed', etiqueta: 'Comedor' },
    { nombre: 'Warehouse', etiqueta: 'Almacén' },
    { nombre: 'Server', etiqueta: 'Servidores' },
    { nombre: 'Thermometer', etiqueta: 'Clima' },
    { nombre: 'Fan', etiqueta: 'Ventilación' },
    { nombre: 'Lightbulb', etiqueta: 'Iluminación' },
    { nombre: 'Plug', etiqueta: 'Conexión' },
    { nombre: 'BatteryCharging', etiqueta: 'Baterías' },
    { nombre: 'Gauge', etiqueta: 'Medidor' },
    { nombre: 'FlaskConical', etiqueta: 'Laboratorio' },
    { nombre: 'Forklift', etiqueta: 'Logística' },
    { nombre: 'ParkingCircle', etiqueta: 'Estacionamiento' },
    { nombre: 'ShieldCheck', etiqueta: 'Seguridad' },
]

// Colores predefinidos para áreas
export const COLORES_DISPONIBLES = [
    '#38bdf8', // sky
    '#a78bfa', // violet
    '#34d399', // emerald
    '#fbbf24', // amber
    '#f472b6', // pink
    '#fb923c', // orange
    '#2dd4bf', // teal
    '#818cf8', // indigo
    '#a3e635', // lime
    '#f87171', // red
]

/**
 * Obtiene el componente de icono Lucide a partir de un nombre string
 * @param {string} nombre - Nombre del icono (ej: 'Factory')
 * @returns {Component} Componente Lucide React
 */
export function getIcono(nombre) {
    return ICON_MAP[nombre] || MapPin
}

export default ICON_MAP
