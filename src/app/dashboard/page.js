'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
    Activity, AlertTriangle, Play, Pause, Zap,
    Building2, Settings, LogOut, ChevronRight
} from 'lucide-react'
import { useMotorDatos } from '../../hooks/useMotorDatos'
import { useEmpresa } from '../../hooks/useEmpresa'
import StatsCards from '../../components/StatsCards'
import ConsumoChart from '../../components/ConsumoChart'
import RankingAreas from '../../components/RankingAreas'
import AlertasTable from '../../components/AlertasTable'
import GestionAreas from '../../components/GestionAreas'

export default function DashboardPage() {
    const router = useRouter()
    const {
        sesion, empresaActiva, areasEmpresa, isLoggedIn, isAdmin, cargado,
        logout, agregarArea, editarArea, eliminarArea,
    } = useEmpresa()

    const {
        lecturas, alertas, corriendo, setCorriendo,
        dispararEmergencia, ultimaAlerta, metricas
    } = useMotorDatos(areasEmpresa)

    const [showEmergency, setShowEmergency] = useState(false)
    const [showGestion, setShowGestion] = useState(false)

    // Redirigir si no está logueado
    useEffect(() => {
        if (cargado && !isLoggedIn) {
            router.push('/login')
        }
        if (cargado && isAdmin) {
            router.push('/admin')
        }
    }, [cargado, isLoggedIn, isAdmin, router])

    // Efecto pulse rojo
    useEffect(() => {
        if (ultimaAlerta) {
            setShowEmergency(true)
            const timer = setTimeout(() => setShowEmergency(false), 2400)
            return () => clearTimeout(timer)
        }
    }, [ultimaAlerta])

    const handleLogout = () => {
        logout()
        router.push('/')
    }

    if (!cargado || !empresaActiva) {
        return (
            <div className="min-h-screen bg-grid flex items-center justify-center">
                <div className="flex items-center gap-3 text-slate-400">
                    <div className="w-5 h-5 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
                    <span>Cargando dashboard...</span>
                </div>
            </div>
        )
    }

    return (
        <div className={`min-h-screen bg-grid transition-all duration-300 ${showEmergency ? 'animate-emergency' : ''}`}>
            {/* Modal Gestión de Áreas */}
            {showGestion && (
                <GestionAreas
                    areas={areasEmpresa}
                    onAgregar={agregarArea}
                    onEditar={editarArea}
                    onEliminar={eliminarArea}
                    onCerrar={() => setShowGestion(false)}
                    soloLectura={false}
                />
            )}

            {/* ===== HEADER ===== */}
            <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-gradient-to-br from-sky-500 to-violet-600 shadow-lg shadow-sky-500/20">
                                <Zap size={24} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                                    Energy Monitor
                                </h1>
                                <p className="text-xs text-slate-500 flex items-center gap-1">
                                    <Building2 size={11} />
                                    {empresaActiva.nombre}
                                </p>
                            </div>
                            {corriendo && (
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 ml-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-live" />
                                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">En Vivo</span>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3">
                            <button
                                onClick={() => setShowGestion(true)}
                                className="flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-sm font-semibold bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 border border-violet-500/30 transition-all cursor-pointer"
                            >
                                <Settings size={16} />
                                <span className="hidden sm:inline">Áreas</span>
                            </button>

                            <button
                                onClick={() => setCorriendo(!corriendo)}
                                className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${corriendo
                                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                                        : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30'
                                    }`}
                            >
                                {corriendo ? <Pause size={16} /> : <Play size={16} />}
                                <span className="hidden sm:inline">{corriendo ? 'Pausar' : 'Reanudar'}</span>
                            </button>

                            <button
                                onClick={dispararEmergencia}
                                className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-700 text-white text-sm font-bold hover:from-rose-500 hover:to-red-600 active:scale-95 transition-all animate-emergency-glow cursor-pointer border border-rose-500/50"
                            >
                                <AlertTriangle size={18} className="animate-pulse" />
                                <span className="hidden sm:inline">Simular Emergencia</span>
                            </button>

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
                                title="Cerrar sesión"
                            >
                                <LogOut size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* ===== DASHBOARD ===== */}
            <main className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 space-y-6">
                {/* Info empresa */}
                <div className="flex items-center gap-3 text-sm text-slate-500">
                    <Building2 size={14} />
                    <span>{empresaActiva.nombre}</span>
                    <span className="text-slate-700">·</span>
                    <span>{empresaActiva.industria}</span>
                    <span className="text-slate-700">·</span>
                    <span>{areasEmpresa.length} área{areasEmpresa.length !== 1 ? 's' : ''}</span>
                    <span className="text-slate-700">·</span>
                    <span className="text-slate-400">{sesion?.email}</span>
                </div>

                {areasEmpresa.length > 0 ? (
                    <>
                        <StatsCards metricas={metricas} />
                        <ConsumoChart lecturas={lecturas} />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <RankingAreas consumoPorArea={metricas.consumoPorArea} areas={areasEmpresa} />
                            <AlertasTable alertas={alertas} />
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 text-center">
                        <div className="p-4 rounded-2xl bg-violet-500/10 mb-4">
                            <Settings size={40} className="text-violet-400" />
                        </div>
                        <h2 className="text-xl font-bold text-white mb-2">Configura tus áreas</h2>
                        <p className="text-slate-400 text-sm mb-6 max-w-md">
                            Para comenzar a monitorear, agrega las áreas de tu empresa (producción, oficinas, almacén, etc.)
                        </p>
                        <button
                            onClick={() => setShowGestion(true)}
                            className="px-6 py-3 rounded-xl bg-violet-500 text-white font-semibold hover:bg-violet-400 transition-colors cursor-pointer"
                        >
                            Configurar Áreas
                        </button>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-800/50 py-4 mt-8">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 flex items-center justify-between text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                        <Activity size={14} />
                        <span>Intervalo: 3s · Ventana: 50 lecturas</span>
                    </div>
                    <span>Energy Monitor · Monitoreo Energético</span>
                </div>
            </footer>
        </div>
    )
}
