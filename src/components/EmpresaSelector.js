'use client'
import { useState } from 'react'
import {
    Building2, Plus, ChevronRight, Shield, Briefcase, Eye,
    Trash2, Factory as FactoryIcon, X
} from 'lucide-react'
import { ROLES, INDUSTRIAS } from '../lib/empresasStore'

const rolIcons = {
    admin: Shield,
    empresa: Briefcase,
    operador: Eye,
}

export default function EmpresaSelector({
    empresas, empresaActiva, rol, permisos,
    onSeleccionar, onCambiarRol, onCrearEmpresa, onEliminarEmpresa, onCerrar
}) {
    const [creando, setCreando] = useState(false)
    const [nombre, setNombre] = useState('')
    const [industria, setIndustria] = useState('Manufactura')

    const handleCrear = () => {
        if (!nombre.trim()) return
        const nueva = onCrearEmpresa(nombre.trim(), industria)
        if (nueva) {
            onSeleccionar(nueva.id)
            setCreando(false)
            setNombre('')
        }
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-slate-800">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-gradient-to-br from-sky-500 to-violet-600">
                                <Building2 size={22} className="text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">Energy Monitor</h2>
                                <p className="text-sm text-slate-400">Selecciona una empresa para monitorear</p>
                            </div>
                        </div>
                        {onCerrar && (
                            <button onClick={onCerrar} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer">
                                <X size={20} />
                            </button>
                        )}
                    </div>

                    {/* Selector de Rol */}
                    <div className="mt-4">
                        <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider font-medium">Tu rol</p>
                        <div className="flex gap-2">
                            {ROLES.map(r => {
                                const RolIcon = rolIcons[r.id]
                                return (
                                    <button
                                        key={r.id}
                                        onClick={() => onCambiarRol(r.id)}
                                        className={`
                      flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold
                      transition-all duration-200 cursor-pointer
                      ${rol === r.id
                                                ? 'bg-white/10 border-white/20 text-white ring-1'
                                                : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                                            } border
                    `}
                                        style={rol === r.id ? { ringColor: r.color, borderColor: r.color + '50' } : {}}
                                    >
                                        <RolIcon size={14} style={rol === r.id ? { color: r.color } : {}} />
                                        {r.nombre}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Lista de Empresas */}
                <div className="p-4 max-h-[400px] overflow-y-auto space-y-2">
                    {empresas.map(empresa => (
                        <button
                            key={empresa.id}
                            onClick={() => { onSeleccionar(empresa.id); onCerrar?.() }}
                            className={`
                w-full flex items-center justify-between p-4 rounded-xl
                transition-all duration-200 group cursor-pointer
                ${empresaActiva?.id === empresa.id
                                    ? 'bg-sky-500/10 border border-sky-500/30 ring-1 ring-sky-500/20'
                                    : 'bg-slate-800/50 border border-slate-700/30 hover:bg-slate-800 hover:border-slate-600/50'
                                }
              `}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${empresaActiva?.id === empresa.id ? 'bg-sky-500/20 text-sky-400' : 'bg-slate-700/50 text-slate-400'}`}>
                                    <FactoryIcon size={18} />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-semibold text-white">{empresa.nombre}</p>
                                    <p className="text-xs text-slate-500">
                                        {empresa.industria} · {empresa.areas.length} área{empresa.areas.length !== 1 ? 's' : ''}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {permisos.puedeEliminarEmpresa && !empresa.id.startsWith('demo') && (
                                    <span
                                        onClick={(e) => { e.stopPropagation(); onEliminarEmpresa(empresa.id) }}
                                        className="p-1.5 rounded-lg hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <Trash2 size={14} />
                                    </span>
                                )}
                                <ChevronRight size={16} className="text-slate-500 group-hover:text-white transition-colors" />
                            </div>
                        </button>
                    ))}
                </div>

                {/* Crear Nueva Empresa */}
                {(permisos.puedeCrearEmpresa || permisos.puedeGestionarAreas) && (
                    <div className="p-4 border-t border-slate-800">
                        {!creando ? (
                            <button
                                onClick={() => setCreando(true)}
                                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
                  bg-gradient-to-r from-sky-500/10 to-violet-500/10
                  border border-dashed border-sky-500/30
                  text-sky-400 text-sm font-semibold
                  hover:from-sky-500/20 hover:to-violet-500/20
                  transition-all duration-200 cursor-pointer"
                            >
                                <Plus size={16} />
                                Registrar nueva empresa
                            </button>
                        ) : (
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    placeholder="Nombre de la empresa"
                                    value={nombre}
                                    onChange={e => setNombre(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700
                    text-white text-sm placeholder-slate-500
                    focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/50"
                                    autoFocus
                                />
                                <select
                                    value={industria}
                                    onChange={e => setIndustria(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700
                    text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/40 appearance-none cursor-pointer"
                                >
                                    {INDUSTRIAS.map(i => (
                                        <option key={i} value={i}>{i}</option>
                                    ))}
                                </select>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleCrear}
                                        className="flex-1 py-2.5 rounded-xl bg-sky-500 text-white text-sm font-semibold
                      hover:bg-sky-400 transition-colors cursor-pointer"
                                    >
                                        Crear Empresa
                                    </button>
                                    <button
                                        onClick={() => { setCreando(false); setNombre('') }}
                                        className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-400 text-sm
                      hover:bg-slate-700 transition-colors cursor-pointer"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
