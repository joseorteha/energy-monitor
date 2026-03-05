'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
    Activity, AlertTriangle, Play, Pause, Zap,
    Building2, Settings, LogOut
} from 'lucide-react'
import { useMotorDatos } from '../../hooks/useMotorDatos'
import { useEmpresa } from '../../hooks/useEmpresa'
import StatsCards from '../../components/StatsCards'
import ConsumoChart from '../../components/ConsumoChart'
import RankingAreas from '../../components/RankingAreas'
import AlertasTable from '../../components/AlertasTable'
import GestionAreas from '../../components/GestionAreas'
import ThemeToggle from '../../components/ThemeToggle'

export default function DashboardPage() {
    const router = useRouter()
    const {
        sesion, empresaActiva, areasEmpresa, isLoggedIn, isAdmin, cargado,
        logout, agregarArea, editarArea, eliminarArea,
    } = useEmpresa()

    const { lecturas, alertas, corriendo, setCorriendo, dispararEmergencia, ultimaAlerta, metricas } = useMotorDatos(areasEmpresa)

    const [showEmergency, setShowEmergency] = useState(false)
    const [showGestion, setShowGestion] = useState(false)

    useEffect(() => {
        if (cargado && !isLoggedIn) router.push('/login')
        if (cargado && isAdmin) router.push('/admin')
    }, [cargado, isLoggedIn, isAdmin, router])

    useEffect(() => {
        if (ultimaAlerta) {
            setShowEmergency(true)
            const t = setTimeout(() => setShowEmergency(false), 2400)
            return () => clearTimeout(t)
        }
    }, [ultimaAlerta])

    const handleLogout = () => { logout(); router.push('/') }

    if (!cargado || !empresaActiva) {
        return (
            <div className="min-h-screen bg-base bg-grid flex items-center justify-center">
                <div className="flex items-center gap-3 text-dim">
                    <div className="w-5 h-5 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
                    <span>Cargando dashboard...</span>
                </div>
            </div>
        )
    }

    return (
        <div className={`min-h-screen bg-base bg-grid transition-all duration-300 ${showEmergency ? 'animate-emergency' : ''}`}>
            {showGestion && (
                <GestionAreas areas={areasEmpresa} onAgregar={agregarArea} onEditar={editarArea} onEliminar={eliminarArea} onCerrar={() => setShowGestion(false)} soloLectura={false} />
            )}

            <header className="sticky top-0 z-50 header-bg">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-gradient-to-br from-sky-500 to-violet-600 shadow-lg shadow-sky-500/20">
                                <Zap size={24} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl sm:text-2xl font-bold text-base">Energy Monitor</h1>
                                <p className="text-xs text-mute flex items-center gap-1"><Building2 size={11} />{empresaActiva.nombre}</p>
                            </div>
                            {corriendo && (
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 ml-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-live" />
                                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">En Vivo</span>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3">
                            <ThemeToggle />
                            <button onClick={() => setShowGestion(true)}
                                className="flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-sm font-semibold bg-violet-500/10 text-violet-600 dark:text-violet-400 hover:bg-violet-500/20 border border-violet-500/30 transition-all cursor-pointer">
                                <Settings size={16} /><span className="hidden sm:inline">Áreas</span>
                            </button>
                            <button onClick={() => setCorriendo(!corriendo)}
                                className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer
                  ${corriendo ? 'bg-surface text-dim hover:bg-surface-hover border border-default' : 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30'}`}>
                                {corriendo ? <Pause size={16} /> : <Play size={16} />}
                                <span className="hidden sm:inline">{corriendo ? 'Pausar' : 'Reanudar'}</span>
                            </button>
                            <button onClick={dispararEmergencia}
                                className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-700 text-white text-sm font-bold hover:from-rose-500 hover:to-red-600 active:scale-95 transition-all animate-emergency-glow cursor-pointer border border-rose-500/50">
                                <AlertTriangle size={18} className="animate-pulse" />
                                <span className="hidden sm:inline">Simular Emergencia</span>
                            </button>
                            <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-mute hover:text-base hover:bg-surface-hover transition-all cursor-pointer" title="Cerrar sesión">
                                <LogOut size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 space-y-6">
                <div className="flex items-center gap-3 text-sm text-mute">
                    <Building2 size={14} /><span>{empresaActiva.nombre}</span><span>·</span><span>{empresaActiva.industria}</span><span>·</span><span>{areasEmpresa.length} área{areasEmpresa.length !== 1 ? 's' : ''}</span><span>·</span><span className="text-dim">{sesion?.email}</span>
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
                        <div className="p-4 rounded-2xl bg-violet-500/10 mb-4"><Settings size={40} className="text-violet-500" /></div>
                        <h2 className="text-xl font-bold text-base mb-2">Configura tus áreas</h2>
                        <p className="text-dim text-sm mb-6 max-w-md">Para comenzar a monitorear, agrega las áreas de tu empresa.</p>
                        <button onClick={() => setShowGestion(true)} className="px-6 py-3 rounded-xl bg-violet-500 text-white font-semibold hover:bg-violet-400 transition-colors cursor-pointer">Configurar Áreas</button>
                    </div>
                )}
            </main>
            <footer className="border-t border-default py-4 mt-8">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 flex items-center justify-between text-xs text-mute">
                    <div className="flex items-center gap-2"><Activity size={14} /><span>Intervalo: 3s · Ventana: 50 lecturas</span></div>
                    <span>Energy Monitor · Monitoreo Energético</span>
                </div>
            </footer>
        </div>
    )
}
