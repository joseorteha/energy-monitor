'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
    Zap, Building2, User, Mail, Lock, Briefcase, ArrowRight, AlertCircle
} from 'lucide-react'
import { INDUSTRIAS } from '../../lib/empresasStore'
import { useEmpresa } from '../../hooks/useEmpresa'

export default function RegistroPage() {
    const router = useRouter()
    const { registrar } = useEmpresa()

    const [form, setForm] = useState({
        nombre: '', industria: 'Manufactura', contacto: '', email: '', password: '',
    })
    const [error, setError] = useState('')
    const [cargando, setCargando] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')

        if (!form.nombre.trim() || !form.email.trim() || !form.password || !form.contacto.trim()) {
            setError('Todos los campos son obligatorios')
            return
        }

        setCargando(true)
        // Simular delay de red
        setTimeout(() => {
            const resultado = registrar(form)
            if (resultado.error) {
                setError(resultado.error)
                setCargando(false)
            } else {
                router.push('/dashboard')
            }
        }, 800)
    }

    const set = (field) => (e) => setForm({ ...form, [field]: e.target.value })

    return (
        <div className="min-h-screen bg-grid flex items-center justify-center p-4">
            {/* Decoración */}
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl" />

            <div className="w-full max-w-md relative">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-3 group">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-sky-500 to-violet-600 shadow-lg shadow-sky-500/20">
                            <Zap size={24} className="text-white" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                            Energy Monitor
                        </span>
                    </Link>
                    <p className="text-slate-400 text-sm mt-3">Registra tu empresa para comenzar a monitorear</p>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 space-y-4 shadow-2xl">
                    <h2 className="text-xl font-bold text-white mb-2">Crear Cuenta</h2>

                    {error && (
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm">
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    {/* Nombre Empresa */}
                    <div>
                        <label className="text-xs text-slate-400 mb-1.5 block">Nombre de la Empresa</label>
                        <div className="relative">
                            <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Ej: Industrias del Norte S.A."
                                value={form.nombre}
                                onChange={set('nombre')}
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/50"
                            />
                        </div>
                    </div>

                    {/* Industria */}
                    <div>
                        <label className="text-xs text-slate-400 mb-1.5 block">Industria</label>
                        <div className="relative">
                            <Briefcase size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                            <select
                                value={form.industria}
                                onChange={set('industria')}
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/40 appearance-none cursor-pointer"
                            >
                                {INDUSTRIAS.map(i => (
                                    <option key={i} value={i}>{i}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Contacto */}
                    <div>
                        <label className="text-xs text-slate-400 mb-1.5 block">Nombre de Contacto</label>
                        <div className="relative">
                            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Ej: Carlos Méndez"
                                value={form.contacto}
                                onChange={set('contacto')}
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/50"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-xs text-slate-400 mb-1.5 block">Correo Electrónico</label>
                        <div className="relative">
                            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type="email"
                                placeholder="empresa@correo.com"
                                value={form.email}
                                onChange={set('email')}
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/50"
                            />
                        </div>
                    </div>

                    {/* Contraseña */}
                    <div>
                        <label className="text-xs text-slate-400 mb-1.5 block">Contraseña</label>
                        <div className="relative">
                            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={form.password}
                                onChange={set('password')}
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/50"
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={cargando}
                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-violet-600 text-white font-bold hover:from-sky-400 hover:to-violet-500 transition-all disabled:opacity-60 cursor-pointer"
                    >
                        {cargando ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>
                                Registrar Empresa
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>

                    <p className="text-center text-sm text-slate-500">
                        ¿Ya tienes cuenta?{' '}
                        <Link href="/login" className="text-sky-400 hover:text-sky-300 font-medium">
                            Inicia sesión
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
