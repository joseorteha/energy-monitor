'use client'
import { AlertTriangle, Clock, MapPin, Zap, DollarSign } from 'lucide-react'

export default function AlertasTable({ alertas }) {
    if (!alertas.length) {
        return (
            <div className="rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Alertas de Anomalías</h3>
                <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                    <AlertTriangle size={40} className="mb-3 opacity-30" />
                    <p className="text-sm">Sin anomalías detectadas</p>
                    <p className="text-xs mt-1 text-slate-600">El sistema está funcionando dentro de los parámetros normales</p>
                </div>
            </div>
        )
    }

    return (
        <div className="rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h3 className="text-lg font-bold text-white">Alertas de Anomalías</h3>
                    <p className="text-sm text-slate-400 mt-1">Últimos picos detectados</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    <span className="text-xs font-semibold text-rose-400">{alertas.length} alertas</span>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-slate-400 border-b border-slate-700/50">
                            <th className="pb-3 pl-3 font-medium">
                                <div className="flex items-center gap-1.5">
                                    <Clock size={14} /> Hora
                                </div>
                            </th>
                            <th className="pb-3 font-medium">
                                <div className="flex items-center gap-1.5">
                                    <MapPin size={14} /> Área
                                </div>
                            </th>
                            <th className="pb-3 font-medium">
                                <div className="flex items-center gap-1.5">
                                    <Zap size={14} /> Consumo
                                </div>
                            </th>
                            <th className="pb-3 font-medium">
                                <div className="flex items-center gap-1.5">
                                    <DollarSign size={14} /> Costo
                                </div>
                            </th>
                            <th className="pb-3 pr-3 font-medium">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alertas.map((alerta, i) => (
                            <tr
                                key={alerta.id}
                                className={`
                  border-b border-slate-700/30 transition-all duration-300
                  ${i === 0 ? 'animate-fadeIn bg-rose-500/10' : 'hover:bg-slate-700/20'}
                `}
                            >
                                <td className="py-3 pl-3 text-slate-300 tabular-nums font-mono text-xs">
                                    {alerta.hora}
                                </td>
                                <td className="py-3">
                                    <span className="font-medium text-white">{alerta.area_nombre}</span>
                                </td>
                                <td className="py-3 text-rose-400 font-bold tabular-nums">
                                    {alerta.consumo_kwh} kWh
                                </td>
                                <td className="py-3 text-emerald-400 font-semibold tabular-nums">
                                    $ {alerta.costo_estimado}
                                </td>
                                <td className="py-3 pr-3">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-400 text-xs font-semibold">
                                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                                        Pico
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
