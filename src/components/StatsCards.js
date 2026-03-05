'use client'
import { Zap, DollarSign, AlertTriangle, Factory, Leaf } from 'lucide-react'

const cardConfigs = [
    {
        key: 'costo',
        label: 'Costo Total',
        icon: DollarSign,
        format: (m) => `$ ${m.totalCosto} MXN`,
        gradient: 'from-emerald-500/20 to-emerald-900/20',
        border: 'border-emerald-500/30',
        iconColor: 'text-emerald-400',
        glow: 'shadow-emerald-500/10',
        featured: true,
    },
    {
        key: 'kwh',
        label: 'Consumo Total',
        icon: Zap,
        format: (m) => `${m.totalKwh} kWh`,
        gradient: 'from-sky-500/20 to-sky-900/20',
        border: 'border-sky-500/30',
        iconColor: 'text-sky-400',
        glow: 'shadow-sky-500/10',
    },
    {
        key: 'alertas',
        label: 'Alertas Activas',
        icon: AlertTriangle,
        format: (m) => m.totalAlertas,
        gradient: 'from-rose-500/20 to-rose-900/20',
        border: 'border-rose-500/30',
        iconColor: 'text-rose-400',
        glow: 'shadow-rose-500/10',
    },
    {
        key: 'area',
        label: 'Área Crítica',
        icon: Factory,
        format: (m) => m.areaMasActiva,
        gradient: 'from-amber-500/20 to-amber-900/20',
        border: 'border-amber-500/30',
        iconColor: 'text-amber-400',
        glow: 'shadow-amber-500/10',
    },
    {
        key: 'co2',
        label: 'Huella CO₂',
        icon: Leaf,
        format: (m) => `${m.huellaCO2} kg`,
        gradient: 'from-teal-500/20 to-teal-900/20',
        border: 'border-teal-500/30',
        iconColor: 'text-teal-400',
        glow: 'shadow-teal-500/10',
    },
]

export default function StatsCards({ metricas }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {cardConfigs.map((card) => {
                const Icon = card.icon
                return (
                    <div
                        key={card.key}
                        className={`
              relative overflow-hidden rounded-2xl border ${card.border}
              bg-gradient-to-br ${card.gradient}
              backdrop-blur-xl p-5 transition-all duration-500
              hover:scale-[1.03] hover:shadow-2xl ${card.glow}
              ${card.featured ? 'ring-1 ring-emerald-400/20 col-span-2 md:col-span-1' : ''}
            `}
                    >
                        {/* Decoración de fondo */}
                        <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white/5 blur-xl" />

                        <div className="flex items-center gap-3 mb-3">
                            <div className={`p-2.5 rounded-xl bg-white/5 ${card.iconColor}`}>
                                <Icon size={card.featured ? 24 : 20} strokeWidth={2} />
                            </div>
                            <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                                {card.label}
                            </span>
                        </div>
                        <p className={`font-bold text-white tracking-tight ${card.featured ? 'text-3xl' : 'text-2xl'}`}>
                            {card.format(metricas)}
                        </p>
                    </div>
                )
            })}
        </div>
    )
}
