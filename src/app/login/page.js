'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Zap, Mail, Lock, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react'
import { useEmpresa } from '../../hooks/useEmpresa'

export default function LoginPage() {
    const router = useRouter()
    const { login } = useEmpresa()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [cargando, setCargando] = useState(false)
    const [showPass, setShowPass] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')

        if (!email.trim() || !password) {
            setError('Ingresa tu correo y contraseña')
            return
        }

        setCargando(true)
        setTimeout(() => {
            const resultado = login(email.trim(), password)
            if (resultado.error) {
                setError(resultado.error)
                setCargando(false)
            } else {
                // Admin va a /admin, empresa va a /dashboard
                router.push(resultado.sesion.tipo === 'admin' ? '/admin' : '/dashboard')
            }
        }, 600)
    }

    // Acceso rápido demo
    const loginDemo = (demoEmail) => {
        setEmail(demoEmail)
        setPassword(demoEmail === 'admin@energymonitor.mx' ? 'admin123' : '123456')
    }

    return (
        <div className="min-h-screen bg-grid flex items-center justify-center p-4">
            <div className="absolute top-20 right-1/3 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl" />

            <div className="w-full max-w-md relative">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-sky-500 to-violet-600 shadow-lg shadow-sky-500/20">
                            <Zap size={24} className="text-white" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                            Energy Monitor
                        </span>
                    </Link>
                    <p className="text-slate-400 text-sm mt-3">Accede al monitoreo de tu empresa</p>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 space-y-5 shadow-2xl">
                    <h2 className="text-xl font-bold text-white mb-1">Iniciar Sesión</h2>

                    {error && (
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm">
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="text-xs text-slate-400 mb-1.5 block">Correo Electrónico</label>
                        <div className="relative">
                            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type="email"
                                placeholder="empresa@correo.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/50"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs text-slate-400 mb-1.5 block">Contraseña</label>
                        <div className="relative">
                            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type={showPass ? 'text' : 'password'}
                                placeholder="••••••••"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full pl-10 pr-12 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/50"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPass(!showPass)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
                            >
                                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={cargando}
                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-violet-600 text-white font-bold hover:from-sky-400 hover:to-violet-500 transition-all disabled:opacity-60 cursor-pointer"
                    >
                        {cargando ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>
                                Entrar
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>

                    <p className="text-center text-sm text-slate-500">
                        ¿No tienes cuenta?{' '}
                        <Link href="/registro" className="text-sky-400 hover:text-sky-300 font-medium">
                            Registra tu empresa
                        </Link>
                    </p>
                </form>

                {/* Acceso rápido para demo */}
                <div className="mt-6 p-5 bg-slate-900/50 border border-slate-800/50 rounded-2xl">
                    <p className="text-xs text-slate-500 mb-3 font-medium uppercase tracking-wider">Acceso rápido (demo)</p>
                    <div className="space-y-2">
                        <button
                            onClick={() => loginDemo('admin@energymonitor.mx')}
                            className="w-full text-left px-4 py-2.5 rounded-xl bg-slate-800/50 border border-slate-700/30 text-sm hover:bg-slate-800 transition-colors cursor-pointer group"
                        >
                            <span className="text-rose-400 font-medium">Admin</span>
                            <span className="text-slate-500 ml-2">admin@energymonitor.mx</span>
                        </button>
                        <button
                            onClick={() => loginDemo('carlos@industriasnorte.mx')}
                            className="w-full text-left px-4 py-2.5 rounded-xl bg-slate-800/50 border border-slate-700/30 text-sm hover:bg-slate-800 transition-colors cursor-pointer group"
                        >
                            <span className="text-sky-400 font-medium">Industrias del Norte</span>
                            <span className="text-slate-500 ml-2">carlos@...</span>
                        </button>
                        <button
                            onClick={() => loginDemo('maria@textilesveracruz.mx')}
                            className="w-full text-left px-4 py-2.5 rounded-xl bg-slate-800/50 border border-slate-700/30 text-sm hover:bg-slate-800 transition-colors cursor-pointer group"
                        >
                            <span className="text-sky-400 font-medium">Textiles Veracruz</span>
                            <span className="text-slate-500 ml-2">maria@...</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
