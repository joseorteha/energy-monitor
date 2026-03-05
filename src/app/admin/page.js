'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
    Zap, Building2, Users, MapPin, AlertTriangle,
    LogOut, ChevronRight, Factory, Calendar,
    BarChart3, Shield
} from 'lucide-react'
import { useEmpresa } from '../../hooks/useEmpresa'
import { getIcono } from '../../lib/iconMap'

export default function AdminPage() {
    const router = useRouter()
    const { sesion, empresas, isAdmin, isLoggedIn, cargado, logout } = useEmpresa()

    // Solo admin puede acceder
    useEffect(() => {
        if (cargado && (!isLoggedIn || !isAdmin)) {
            router.push('/login')
        }
    }, [cargado, isLoggedIn, isAdmin, router])

    const handleLogout = () => {
        logout()
        router.push('/')
    }

    if (!cargado || !isAdmin) {
        return (
            <div className="min-h-screen bg-grid flex items-center justify-center">
                <div className="flex items-center gap-3 text-slate-400">
                    <div className="w-5 h-5 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
                    <span>Cargando panel admin...</span>
                </div>
            </div>
        )
    }

    // Estadísticas globales
    const totalAreas = empresas.reduce((s, e) => s + e.areas.length, 0)
    const totalEmpresas = empresas.length

    return (
        <div className="min-h-screen bg-grid">
            {/* Header Admin */}
            <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-gradient-to-br from-rose-500 to-orange-600 shadow-lg shadow-rose-500/20">
                                <Shield size={24} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                                    Energy Monitor
                                </h1>
                                <p className="text-xs text-rose-400 font-medium">Panel de Administración</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer border border-slate-700/50"
                        >
                            <LogOut size={16} />
                            <span className="hidden sm:inline">Cerrar Sesión</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 space-y-6">
                {/* KPIs Globales */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-500/10 to-sky-900/10 border border-sky-500/20 backdrop-blur-xl">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
                                <Building2 size={20} />
                            </div>
                            <span className="text-sm text-slate-400 uppercase tracking-wider">Empresas Registradas</span>
                        </div>
                        <p className="text-4xl font-bold text-white">{totalEmpresas}</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 to-violet-900/10 border border-violet-500/20 backdrop-blur-xl">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400">
                                <MapPin size={20} />
                            </div>
                            <span className="text-sm text-slate-400 uppercase tracking-wider">Total Áreas</span>
                        </div>
                        <p className="text-4xl font-bold text-white">{totalAreas}</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-900/10 border border-emerald-500/20 backdrop-blur-xl">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                                <BarChart3 size={20} />
                            </div>
                            <span className="text-sm text-slate-400 uppercase tracking-wider">Estado</span>
                        </div>
                        <p className="text-2xl font-bold text-emerald-400">Activo</p>
                        <p className="text-xs text-slate-500 mt-1">Monitoreo 24/7</p>
                    </div>
                </div>

                {/* Lista de Empresas */}
                <div className="rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl overflow-hidden">
                    <div className="p-6 border-b border-slate-700/50">
                        <h2 className="text-lg font-bold text-white">Empresas Clientes</h2>
                        <p className="text-sm text-slate-400 mt-1">Gestión y monitoreo de clientes registrados</p>
                    </div>

                    <div className="divide-y divide-slate-700/30">
                        {empresas.map(empresa => (
                            <div
                                key={empresa.id}
                                className="p-5 hover:bg-slate-800/30 transition-colors group"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400">
                                            <Factory size={22} />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-semibold text-white group-hover:text-sky-300 transition-colors">
                                                {empresa.nombre}
                                            </h3>
                                            <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                                                <span className="flex items-center gap-1">
                                                    <Users size={12} />
                                                    {empresa.contacto || 'Sin contacto'}
                                                </span>
                                                <span>·</span>
                                                <span>{empresa.industria}</span>
                                                <span>·</span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar size={12} />
                                                    {new Date(empresa.creadaEn).toLocaleDateString('es-MX')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        {/* Áreas de la empresa */}
                                        <div className="hidden md:flex items-center gap-1.5">
                                            {empresa.areas.slice(0, 4).map(area => {
                                                const Ic = getIcono(area.icon)
                                                return (
                                                    <div
                                                        key={area.id}
                                                        className="p-1.5 rounded-lg bg-slate-700/50"
                                                        style={{ color: area.color }}
                                                        title={`${area.nombre} (${area.limite_kwh} kWh)`}
                                                    >
                                                        <Ic size={14} />
                                                    </div>
                                                )
                                            })}
                                            {empresa.areas.length > 4 && (
                                                <span className="text-xs text-slate-500 ml-1">+{empresa.areas.length - 4}</span>
                                            )}
                                        </div>

                                        <div className="text-right">
                                            <span className="text-sm font-medium text-slate-300">
                                                {empresa.areas.length} área{empresa.areas.length !== 1 ? 's' : ''}
                                            </span>
                                        </div>

                                        <ChevronRight size={16} className="text-slate-600 group-hover:text-white transition-colors" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {empresas.length === 0 && (
                        <div className="p-12 text-center text-slate-500">
                            <Building2 size={40} className="mx-auto mb-3 opacity-30" />
                            <p className="text-sm">No hay empresas registradas aún</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-800/50 py-4 mt-8">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 flex items-center justify-between text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                        <Shield size={14} className="text-rose-500" />
                        <span>Panel Admin · Energy Monitor</span>
                    </div>
                    <span>© 2026 Energy Monitor</span>
                </div>
            </footer>
        </div>
    )
}
