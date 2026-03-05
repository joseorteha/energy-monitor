'use client'
import { useState } from 'react'
import { Plus, Pencil, Trash2, X, Check, Settings } from 'lucide-react'
import { getIcono } from '../lib/iconMap'
import { ICONOS_DISPONIBLES, COLORES_DISPONIBLES } from '../lib/iconMap'

export default function GestionAreas({
    areas, onAgregar, onEditar, onEliminar, onCerrar, soloLectura
}) {
    const [agregando, setAgregando] = useState(false)
    const [editandoId, setEditandoId] = useState(null)
    const [form, setForm] = useState({ nombre: '', limite_kwh: '', color: '#38bdf8', icon: 'Factory' })

    const resetForm = () => {
        setForm({ nombre: '', limite_kwh: '', color: '#38bdf8', icon: 'Factory' })
        setAgregando(false)
        setEditandoId(null)
    }

    const handleGuardar = () => {
        if (!form.nombre.trim() || !form.limite_kwh) return
        const datos = {
            nombre: form.nombre.trim(),
            limite_kwh: parseFloat(form.limite_kwh),
            color: form.color,
            icon: form.icon,
        }
        if (editandoId !== null) {
            onEditar(editandoId, datos)
        } else {
            onAgregar(datos)
        }
        resetForm()
    }

    const iniciarEdicion = (area) => {
        setForm({
            nombre: area.nombre,
            limite_kwh: area.limite_kwh.toString(),
            color: area.color,
            icon: area.icon,
        })
        setEditandoId(area.id)
        setAgregando(true)
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-xl bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-violet-500/20 text-violet-400">
                            <Settings size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">Gestión de Áreas</h2>
                            <p className="text-xs text-slate-400">{areas.length} área{areas.length !== 1 ? 's' : ''} registrada{areas.length !== 1 ? 's' : ''}</p>
                        </div>
                    </div>
                    <button onClick={onCerrar} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer">
                        <X size={20} />
                    </button>
                </div>

                {/* Lista de Áreas */}
                <div className="p-4 max-h-[320px] overflow-y-auto space-y-2">
                    {areas.length === 0 && (
                        <div className="text-center py-8 text-slate-500">
                            <Settings size={32} className="mx-auto mb-2 opacity-30" />
                            <p className="text-sm">No hay áreas registradas</p>
                            <p className="text-xs mt-1">Agrega una nueva área para comenzar el monitoreo</p>
                        </div>
                    )}

                    {areas.map(area => {
                        const IconComp = getIcono(area.icon)
                        return (
                            <div
                                key={area.id}
                                className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/30 group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-white/5" style={{ color: area.color }}>
                                        <IconComp size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">{area.nombre}</p>
                                        <p className="text-xs text-slate-500">Límite: {area.limite_kwh} kWh</p>
                                    </div>
                                </div>
                                {!soloLectura && (
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => iniciarEdicion(area)}
                                            className="p-1.5 rounded-lg hover:bg-sky-500/20 text-slate-500 hover:text-sky-400 transition-colors cursor-pointer"
                                        >
                                            <Pencil size={14} />
                                        </button>
                                        <button
                                            onClick={() => onEliminar(area.id)}
                                            className="p-1.5 rounded-lg hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* Formulario de Agregar/Editar */}
                {!soloLectura && (
                    <div className="p-4 border-t border-slate-800">
                        {!agregando ? (
                            <button
                                onClick={() => setAgregando(true)}
                                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
                  bg-gradient-to-r from-violet-500/10 to-sky-500/10
                  border border-dashed border-violet-500/30
                  text-violet-400 text-sm font-semibold
                  hover:from-violet-500/20 hover:to-sky-500/20
                  transition-all duration-200 cursor-pointer"
                            >
                                <Plus size={16} />
                                Agregar nueva área
                            </button>
                        ) : (
                            <div className="space-y-3">
                                <div className="flex gap-3">
                                    <input
                                        type="text"
                                        placeholder="Nombre del área"
                                        value={form.nombre}
                                        onChange={e => setForm({ ...form, nombre: e.target.value })}
                                        className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700
                      text-white text-sm placeholder-slate-500
                      focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                                        autoFocus
                                    />
                                    <input
                                        type="number"
                                        placeholder="kWh"
                                        step="0.5"
                                        min="0.5"
                                        value={form.limite_kwh}
                                        onChange={e => setForm({ ...form, limite_kwh: e.target.value })}
                                        className="w-24 px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700
                      text-white text-sm placeholder-slate-500
                      focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                                    />
                                </div>

                                {/* Selector de Icono */}
                                <div>
                                    <p className="text-xs text-slate-500 mb-2">Icono</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {ICONOS_DISPONIBLES.map(ic => {
                                            const Ic = getIcono(ic.nombre)
                                            return (
                                                <button
                                                    key={ic.nombre}
                                                    onClick={() => setForm({ ...form, icon: ic.nombre })}
                                                    title={ic.etiqueta}
                                                    className={`p-2 rounded-lg transition-all cursor-pointer ${form.icon === ic.nombre
                                                            ? 'bg-violet-500/20 text-violet-400 ring-1 ring-violet-500/30'
                                                            : 'bg-slate-800 text-slate-500 hover:text-slate-300 hover:bg-slate-700'
                                                        }`}
                                                >
                                                    <Ic size={16} />
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* Selector de Color */}
                                <div>
                                    <p className="text-xs text-slate-500 mb-2">Color</p>
                                    <div className="flex gap-2">
                                        {COLORES_DISPONIBLES.map(c => (
                                            <button
                                                key={c}
                                                onClick={() => setForm({ ...form, color: c })}
                                                className={`w-7 h-7 rounded-full transition-all cursor-pointer ${form.color === c ? 'ring-2 ring-white/50 scale-110' : 'hover:scale-105'
                                                    }`}
                                                style={{ backgroundColor: c }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={handleGuardar}
                                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                      bg-violet-500 text-white text-sm font-semibold
                      hover:bg-violet-400 transition-colors cursor-pointer"
                                    >
                                        <Check size={16} />
                                        {editandoId !== null ? 'Guardar Cambios' : 'Agregar Área'}
                                    </button>
                                    <button
                                        onClick={resetForm}
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
