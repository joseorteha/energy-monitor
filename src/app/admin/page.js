'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Zap, Building2, Users, MapPin, LogOut, ChevronRight, Factory, Calendar, BarChart3, Shield } from 'lucide-react'
import { useEmpresa } from '../../hooks/useEmpresa'
import { getIcono } from '../../lib/iconMap'
import ThemeToggle from '../../components/ThemeToggle'
import Image from 'next/image'

export default function AdminPage() {
    const router = useRouter()
    const { sesion, empresas, isAdmin, isLoggedIn, cargado, logout } = useEmpresa()

    useEffect(() => {
        if (cargado && (!isLoggedIn || !isAdmin)) router.push('/login')
    }, [cargado, isLoggedIn, isAdmin, router])

    const handleLogout = () => { logout(); router.push('/') }

    if (!cargado || !isAdmin) {
        return (
            <div className="min-h-screen bg-base bg-grid flex items-center justify-center">
                <div className="flex items-center gap-3 text-dim">
                    <div className="w-5 h-5 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
                    <span>Cargando panel admin...</span>
                </div>
            </div>
        )
    }

    const totalAreas = empresas.reduce((s, e) => s + e.areas.length, 0)

    return (
        <div className="min-h-screen bg-base bg-grid">
            <header className="sticky top-0 z-50 header-bg">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Image src="/logo.png" alt="Energy Monitor" width={200} height={60} className="h-12 w-auto" />
                        <div>
                            <p className="text-xs text-rose-500 font-semibold uppercase tracking-wider">Panel Admin</p>
                        </div>            </div>
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-dim hover:text-base hover:bg-surface-hover transition-all cursor-pointer border border-default">
                            <LogOut size={16} /><span className="hidden sm:inline">Cerrar Sesión</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { icon: Building2, label: 'Empresas Registradas', valor: empresas.length, color: 'sky' },
                        { icon: MapPin, label: 'Total Áreas', valor: totalAreas, color: 'violet' },
                        { icon: BarChart3, label: 'Estado', valor: 'Activo', sub: 'Monitoreo 24/7', color: 'emerald' },
                    ].map(kpi => (
                        <div key={kpi.label} className={`card p-6 border-${kpi.color}-500/20`}>
                            <div className="flex items-center gap-3 mb-3">
                                <div className={`p-2 rounded-xl bg-${kpi.color}-500/10`}>
                                    <kpi.icon size={20} className={`text-${kpi.color}-500`} />
                                </div>
                                <span className="text-sm text-mute uppercase tracking-wider">{kpi.label}</span>
                            </div>
                            <p className={`text-4xl font-bold ${kpi.color === 'emerald' ? 'text-emerald-500' : 'text-base'}`}>{kpi.valor}</p>
                            {kpi.sub && <p className="text-xs text-mute mt-1">{kpi.sub}</p>}
                        </div>
                    ))}
                </div>

                <div className="card overflow-hidden">
                    <div className="p-6 border-b border-default">
                        <h2 className="text-lg font-bold text-base">Empresas Clientes</h2>
                        <p className="text-sm text-dim mt-1">Gestión y monitoreo de clientes registrados</p>
                    </div>
                    <div className="divide-y divide-[var(--border-subtle)]">
                        {empresas.map(empresa => (
                            <div key={empresa.id} className="p-5 hover:bg-surface-hover transition-colors group">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-xl bg-sky-500/10 text-sky-500">
                                            <Factory size={22} />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-semibold text-base group-hover:text-sky-500 transition-colors">{empresa.nombre}</h3>
                                            <div className="flex items-center gap-3 mt-1 text-xs text-mute">
                                                <span className="flex items-center gap-1"><Users size={12} />{empresa.contacto || 'Sin contacto'}</span>
                                                <span>·</span><span>{empresa.industria}</span>
                                                <span>·</span><span className="flex items-center gap-1"><Calendar size={12} />{new Date(empresa.creadaEn).toLocaleDateString('es-MX')}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="hidden md:flex items-center gap-1.5">
                                            {empresa.areas.slice(0, 4).map(area => {
                                                const Ic = getIcono(area.icon)
                                                return <div key={area.id} className="p-1.5 rounded-lg bg-surface" style={{ color: area.color }} title={area.nombre}><Ic size={14} /></div>
                                            })}
                                            {empresa.areas.length > 4 && <span className="text-xs text-mute ml-1">+{empresa.areas.length - 4}</span>}
                                        </div>
                                        <span className="text-sm font-medium text-dim">{empresa.areas.length} área{empresa.areas.length !== 1 ? 's' : ''}</span>
                                        <ChevronRight size={16} className="text-mute group-hover:text-base transition-colors" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <footer className="border-t border-default py-4 mt-8">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 flex items-center justify-between text-xs text-mute">
                    <div className="flex items-center gap-2"><Shield size={14} className="text-rose-500" /><span>Panel Admin · Energy Monitor</span></div>
                    <span>© 2026 Energy Monitor</span>
                </div>
            </footer>
        </div>
    )
}
