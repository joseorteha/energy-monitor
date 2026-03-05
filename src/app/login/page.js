'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Zap, Mail, Lock, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react'
import { useEmpresa } from '../../hooks/useEmpresa'
import ThemeToggle from '../../components/ThemeToggle'

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
        if (!email.trim() || !password) { setError('Ingresa tu correo y contraseña'); return }
        setCargando(true)
        setTimeout(() => {
            const resultado = login(email.trim(), password)
            if (resultado.error) { setError(resultado.error); setCargando(false) }
            else router.push(resultado.sesion.tipo === 'admin' ? '/admin' : '/dashboard')
        }, 600)
    }

    const loginDemo = (demoEmail) => {
        setEmail(demoEmail)
        setPassword(demoEmail === 'admin@energymonitor.mx' ? 'admin123' : '123456')
    }

    return (
        <div className="min-h-screen bg-base bg-grid flex items-center justify-center p-4">
            <div className="absolute top-4 right-4"><ThemeToggle /></div>
            <div className="absolute top-20 right-1/3 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl" />

            <div className="w-full max-w-md relative">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-sky-500 to-violet-600 shadow-lg shadow-sky-500/20">
                            <Zap size={24} className="text-white" />
                        </div>
                        <span className="text-2xl font-bold text-base">Energy Monitor</span>
                    </Link>
                    <p className="text-dim text-sm mt-3">Accede al monitoreo de tu empresa</p>
                </div>

                <form onSubmit={handleSubmit} className="card p-8 space-y-5">
                    <h2 className="text-xl font-bold text-base mb-1">Iniciar Sesión</h2>
                    {error && (
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-sm">
                            <AlertCircle size={16} />{error}
                        </div>
                    )}
                    <div>
                        <label className="text-xs text-mute mb-1.5 block">Correo Electrónico</label>
                        <div className="relative">
                            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-mute" />
                            <input type="email" placeholder="empresa@correo.com" value={email} onChange={e => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl input-themed text-sm" />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs text-mute mb-1.5 block">Contraseña</label>
                        <div className="relative">
                            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-mute" />
                            <input type={showPass ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)}
                                className="w-full pl-10 pr-12 py-3 rounded-xl input-themed text-sm" />
                            <button type="button" onClick={() => setShowPass(!showPass)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-mute hover:text-dim cursor-pointer">
                                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>
                    <button type="submit" disabled={cargando}
                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-violet-600 text-white font-bold hover:from-sky-400 hover:to-violet-500 transition-all disabled:opacity-60 cursor-pointer">
                        {cargando ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><>Entrar</><ArrowRight size={18} /></>}
                    </button>
                    <p className="text-center text-sm text-mute">¿No tienes cuenta?{' '}<Link href="/registro" className="text-sky-500 hover:text-sky-400 font-medium">Registra tu empresa</Link></p>
                </form>

                <div className="mt-6 card p-5">
                    <p className="text-xs text-mute mb-3 font-medium uppercase tracking-wider">Acceso rápido (demo)</p>
                    <div className="space-y-2">
                        {[
                            { label: 'Admin', email: 'admin@energymonitor.mx', color: 'text-rose-500' },
                            { label: 'Industrias del Norte', email: 'carlos@industriasnorte.mx', color: 'text-sky-500' },
                            { label: 'Textiles Veracruz', email: 'maria@textilesveracruz.mx', color: 'text-sky-500' },
                        ].map(d => (
                            <button key={d.email} onClick={() => loginDemo(d.email)}
                                className="w-full text-left px-4 py-2.5 rounded-xl bg-surface border border-subtle text-sm hover:bg-surface-hover transition-colors cursor-pointer">
                                <span className={`${d.color} font-medium`}>{d.label}</span>
                                <span className="text-mute ml-2">{d.email.split('@')[0]}@...</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
