'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Zap, Building2, User, Mail, Lock, Briefcase, ArrowRight, AlertCircle } from 'lucide-react'
import { INDUSTRIAS } from '../../lib/empresasStore'
import { useEmpresa } from '../../hooks/useEmpresa'
import ThemeToggle from '../../components/ThemeToggle'
import Image from 'next/image'

export default function RegistroPage() {
    const router = useRouter()
    const { registrar } = useEmpresa()

    const [form, setForm] = useState({ nombre: '', industria: 'Manufactura', contacto: '', email: '', password: '' })
    const [error, setError] = useState('')
    const [cargando, setCargando] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')
        if (!form.nombre.trim() || !form.email.trim() || !form.password || !form.contacto.trim()) { setError('Todos los campos son obligatorios'); return }
        setCargando(true)
        setTimeout(() => {
            const resultado = registrar(form)
            if (resultado.error) { setError(resultado.error); setCargando(false) }
            else router.push('/dashboard')
        }, 800)
    }

    const set = (field) => (e) => setForm({ ...form, [field]: e.target.value })

    const fields = [
        { field: 'nombre', label: 'Nombre de la Empresa', icon: Building2, placeholder: 'Ej: Industrias del Norte S.A.', type: 'text' },
        { field: 'contacto', label: 'Nombre de Contacto', icon: User, placeholder: 'Ej: Carlos Méndez', type: 'text' },
        { field: 'email', label: 'Correo Electrónico', icon: Mail, placeholder: 'empresa@correo.com', type: 'email' },
        { field: 'password', label: 'Contraseña', icon: Lock, placeholder: '••••••••', type: 'password' },
    ]

    return (
        <div className="min-h-screen bg-base bg-grid flex items-center justify-center p-4">
            <div className="absolute top-4 right-4"><ThemeToggle /></div>
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl" />

            <div className="w-full max-w-md relative">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-3 group">
                        <Image src="/logo.png" alt="Energy Monitor" width={240} height={72} className="h-16 w-auto" priority />
                    </Link>
                    <p className="text-dim text-sm mt-3">Registra tu empresa para comenzar a monitorear</p>
                </div>

                <form onSubmit={handleSubmit} className="card p-8 space-y-4">
                    <h2 className="text-xl font-bold text-base mb-2">Crear Cuenta</h2>
                    {error && (
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-sm">
                            <AlertCircle size={16} />{error}
                        </div>
                    )}

                    {fields.map(f => (
                        <div key={f.field}>
                            <label className="text-xs text-mute mb-1.5 block">{f.label}</label>
                            <div className="relative">
                                <f.icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-mute" />
                                <input type={f.type} placeholder={f.placeholder} value={form[f.field]} onChange={set(f.field)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl input-themed text-sm" />
                            </div>
                        </div>
                    ))}

                    {/* Industria */}
                    <div>
                        <label className="text-xs text-mute mb-1.5 block">Industria</label>
                        <div className="relative">
                            <Briefcase size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-mute" />
                            <select value={form.industria} onChange={set('industria')}
                                className="w-full pl-10 pr-4 py-3 rounded-xl input-themed text-sm appearance-none cursor-pointer">
                                {INDUSTRIAS.map(i => <option key={i} value={i}>{i}</option>)}
                            </select>
                        </div>
                    </div>

                    <button type="submit" disabled={cargando}
                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-violet-600 text-white font-bold hover:from-sky-400 hover:to-violet-500 transition-all disabled:opacity-60 cursor-pointer">
                        {cargando ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><>Registrar Empresa</><ArrowRight size={18} /></>}
                    </button>
                    <p className="text-center text-sm text-mute">¿Ya tienes cuenta?{' '}<Link href="/login" className="text-sky-500 hover:text-sky-400 font-medium">Inicia sesión</Link></p>
                </form>
            </div>
        </div>
    )
}
