'use client'
import { AREAS_DEFAULT } from '../lib/motorDatos'
import { getIcono } from '../lib/iconMap'

export default function RankingAreas({ consumoPorArea, areas }) {
    const areasRef = areas && areas.length > 0 ? areas : AREAS_DEFAULT
    const entries = Object.entries(consumoPorArea)
    const maxConsumo = Math.max(...entries.map(([, v]) => v), 1)

    const ranking = entries
        .map(([nombre, consumo]) => {
            const areaInfo = areasRef.find(a => a.nombre === nombre) || {}
            return {
                nombre, consumo: consumo.toFixed(2),
                porcentaje: ((consumo / maxConsumo) * 100).toFixed(0),
                color: areaInfo.color || '#64748b',
                iconName: areaInfo.icon || 'MapPin',
                excedido: consumo > (areaInfo.limite_kwh || 0) * 3,
            }
        })
        .sort((a, b) => b.consumo - a.consumo)

    return (
        <div className="card p-6">
            <div className="mb-5">
                <h3 className="text-lg font-bold text-base">Ranking por Área</h3>
                <p className="text-sm text-mute mt-1">Consumo acumulado (kWh)</p>
            </div>
            <div className="space-y-4">
                {ranking.map((area, i) => {
                    const IconComponent = getIcono(area.iconName)
                    return (
                        <div key={area.nombre} className="group">
                            <div className="flex items-center justify-between mb-1.5">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-surface" style={{ color: area.color }}>
                                        <IconComponent size={16} />
                                    </div>
                                    <span className="text-sm font-medium text-dim group-hover:text-base transition-colors">{area.nombre}</span>
                                    {i === 0 && (
                                        <span className="text-[10px] font-bold bg-rose-500/20 text-rose-500 px-2 py-0.5 rounded-full uppercase tracking-wider">#1 Crítica</span>
                                    )}
                                </div>
                                <span className={`text-sm font-bold tabular-nums ${area.excedido ? 'text-rose-500' : 'text-dim'}`}>{area.consumo} kWh</span>
                            </div>
                            <div className="w-full h-3 bg-surface rounded-full overflow-hidden">
                                <div className="h-full rounded-full transition-all duration-700 ease-out relative"
                                    style={{ width: `${area.porcentaje}%`, background: `linear-gradient(90deg, ${area.color}aa, ${area.color})` }}>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
