// ============================================
// Motor de Datos — Simulador IoT Local
// Genera JSONs simulando lecturas de sensores
// energéticos (como un PZEM-004T)
// ============================================

// Áreas predeterminadas (fallback si no hay empresa seleccionada)
export const AREAS_DEFAULT = [
    { id: 1, nombre: 'Línea de Producción', limite_kwh: 8.0, color: '#38bdf8', icon: 'Factory' },
    { id: 2, nombre: 'Cuarto de Máquinas', limite_kwh: 10.0, color: '#a78bfa', icon: 'Cog' },
    { id: 3, nombre: 'Oficinas', limite_kwh: 3.0, color: '#34d399', icon: 'Building2' },
    { id: 4, nombre: 'Comedor', limite_kwh: 2.0, color: '#fbbf24', icon: 'UtensilsCrossed' },
]

// Tarifa eléctrica promedio en México (MXN por kWh)
export const TARIFA_KWH = 1.35

// Factor de emisión de CO2 (kg CO2 por kWh) - promedio México
export const FACTOR_CO2 = 0.42

/**
 * Genera una lectura simulada de sensor.
 * @param {boolean} forzarPico - Si es true, genera una anomalía extrema (para demo)
 * @param {Array} areas - Array de áreas a usar (default: AREAS_DEFAULT)
 * @returns {Object} JSON con la lectura del sensor
 */
export function generarLectura(forzarPico = false, areas = AREAS_DEFAULT) {
    const listaAreas = areas.length > 0 ? areas : AREAS_DEFAULT
    const area = listaAreas[Math.floor(Math.random() * listaAreas.length)]
    const esPico = forzarPico || Math.random() > 0.85 // 15% probabilidad de anomalía

    const consumo_kwh = esPico
        ? +(Math.random() * 6 + area.limite_kwh * 1.5).toFixed(2)
        : +(Math.random() * (area.limite_kwh * 0.7)).toFixed(2)

    return {
        id: Date.now() + Math.random(),
        hora: new Date().toLocaleTimeString('es-MX'),
        area_id: area.id,
        area_nombre: area.nombre,
        area_color: area.color,
        area_icon: area.icon,
        consumo_kwh,
        costo_estimado: +(consumo_kwh * TARIFA_KWH).toFixed(2),
        alerta_anomalia: esPico || consumo_kwh > area.limite_kwh,
    }
}
