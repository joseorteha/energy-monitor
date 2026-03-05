'use client'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer
} from 'recharts'
import { Clock, Zap, DollarSign, AlertTriangle } from 'lucide-react'

function CustomDot(props) {
    const { cx, cy, payload } = props
    if (!cx || !cy) return null

    if (payload.alerta_anomalia) {
        return (
            <g>
                <circle cx={cx} cy={cy} r={6} fill="#f43f5e" opacity={0.3}>
                    <animate attributeName="r" values="6;12;6" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0.1;0.3" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <circle cx={cx} cy={cy} r={4} fill="#f43f5e" stroke="#fff" strokeWidth={1.5} />
            </g>
        )
    }
    return <circle cx={cx} cy={cy} r={3} fill="#38bdf8" stroke="#1e3a5f" strokeWidth={1} />
}

function CustomTooltip({ active, payload }) {
    if (!active || !payload?.length) return null
    const data = payload[0].payload
    return (
        <div className="bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 shadow-2xl">
            <p className="text-sm text-slate-400 mb-1 flex items-center gap-1.5">
                <Clock size={13} /> {data.hora}
            </p>
            <p className="text-white font-semibold">{data.area_nombre}</p>
            <div className="mt-2 space-y-1">
                <p className="text-sky-400 text-sm flex items-center gap-1.5">
                    <Zap size={13} /> {data.consumo_kwh} kWh
                </p>
                <p className="text-emerald-400 text-sm font-bold flex items-center gap-1.5">
                    <DollarSign size={13} /> $ {data.costo_estimado} MXN
                </p>
            </div>
            {data.alerta_anomalia && (
                <p className="mt-2 text-rose-400 text-xs font-semibold animate-pulse flex items-center gap-1.5">
                    <AlertTriangle size={13} /> ¡ANOMALÍA DETECTADA!
                </p>
            )}
        </div>
    )
}

export default function ConsumoChart({ lecturas }) {
    // Preparar datos para la gráfica (últimas 20 lecturas)
    const datosGrafica = lecturas.slice(-20).map((l, i) => ({
        ...l,
        index: i,
        label: l.hora,
    }))

    return (
        <div className="relative rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-6">
            {/* Decoración de fondo */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-sky-500/5 rounded-full blur-3xl" />

            <div className="flex items-center justify-between mb-5">
                <div>
                    <h3 className="text-lg font-bold text-white">Consumo en Tiempo Real</h3>
                    <p className="text-sm text-slate-400 mt-1">Últimas 20 lecturas · Actualización cada 3s</p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                        Normal
                    </span>
                    <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                        Anomalía
                    </span>
                </div>
            </div>

            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={datosGrafica} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                        <defs>
                            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#38bdf8" />
                                <stop offset="100%" stopColor="#818cf8" />
                            </linearGradient>
                            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.15} />
                                <stop offset="100%" stopColor="#38bdf8" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                        <XAxis
                            dataKey="hora"
                            tick={{ fill: '#94a3b8', fontSize: 11 }}
                            axisLine={{ stroke: '#334155' }}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fill: '#94a3b8', fontSize: 11 }}
                            axisLine={{ stroke: '#334155' }}
                            tickLine={false}
                            label={{ value: 'kWh', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 12 }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                            type="monotone"
                            dataKey="consumo_kwh"
                            stroke="url(#lineGradient)"
                            strokeWidth={2.5}
                            dot={<CustomDot />}
                            activeDot={{ r: 6, fill: '#38bdf8', stroke: '#fff', strokeWidth: 2 }}
                            animationDuration={500}
                            animationEasing="ease-in-out"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
