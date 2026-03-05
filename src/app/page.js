'use client'
import Link from 'next/link'
import {
  Zap, Shield, TrendingDown, Leaf, ArrowRight,
  BarChart3, Bell, Clock, CheckCircle2, ChevronRight,
  Factory, Building2, Gauge
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-grid">
      {/* ===== NAV ===== */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-sky-500 to-violet-600 shadow-lg shadow-sky-500/20">
              <Zap size={22} className="text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Energy Monitor
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/registro"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-violet-600 text-white text-sm font-semibold hover:from-sky-400 hover:to-violet-500 transition-all shadow-lg shadow-sky-500/20"
            >
              Registrar Empresa
            </Link>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-28 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-medium mb-8">
            <Zap size={14} />
            Plataforma de Monitoreo Energético en Tiempo Real
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 max-w-4xl mx-auto">
            Deja de pagar facturas{' '}
            <span className="bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">
              a ciegas
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Monitorea el consumo eléctrico de tu empresa en tiempo real.
            Detecta anomalías, reduce costos y toma decisiones basadas en datos.
            <strong className="text-emerald-400"> Ahorra entre 15% y 30%</strong> en tu factura mensual.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/registro"
              className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-violet-600 text-white text-lg font-bold hover:from-sky-400 hover:to-violet-500 transition-all shadow-2xl shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-105"
            >
              Registra tu empresa gratis
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-slate-300 text-lg font-medium hover:bg-white/10 hover:text-white transition-all"
            >
              Ya tengo cuenta
            </Link>
          </div>

          {/* Métricas de confianza */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { valor: '50+', label: 'Empresas monitoreadas', icon: Building2 },
              { valor: '200+', label: 'Áreas protegidas', icon: Shield },
              { valor: '30%', label: 'Ahorro promedio', icon: TrendingDown },
              { valor: '24/7', label: 'Monitoreo continuo', icon: Clock },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon size={20} className="text-sky-400" />
                </div>
                <p className="text-2xl font-bold text-white">{stat.valor}</p>
                <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROBLEMA ===== */}
      <section className="py-20 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              El <span className="text-rose-400">Punto Ciego</span> Energético
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Las empresas industriales pagan facturas altísimas sin saber cuál área
              está desperdiciando energía a las 3:00 AM.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Gauge,
                title: 'Sin visibilidad',
                desc: 'Solo conoces el total mensual. No sabes si el Cuarto de Máquinas o el Comedor está quemando presupuesto.',
                color: 'rose',
              },
              {
                icon: Clock,
                title: 'Detección tardía',
                desc: 'Las anomalías se detectan al llegar el recibo, semanas después. El daño económico ya está hecho.',
                color: 'amber',
              },
              {
                icon: TrendingDown,
                title: '15-30% de desperdicio',
                desc: 'Equipos encendidos innecesariamente, horarios sin optimizar, fugas de energía silenciosas y continuas.',
                color: 'orange',
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`p-6 rounded-2xl bg-slate-800/50 border border-slate-700/30 hover:border-${item.color}-500/30 transition-all duration-300`}
              >
                <div className={`p-3 rounded-xl bg-${item.color}-500/10 w-fit mb-4`}>
                  <item.icon size={24} className={`text-${item.color}-400`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CÓMO FUNCIONA ===== */}
      <section className="py-20 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              ¿Cómo funciona?
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              En 3 simples pasos tu empresa estará monitoreada en tiempo real.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                paso: '01',
                titulo: 'Registra tu empresa',
                desc: 'Crea tu cuenta gratuita y define las áreas que deseas monitorear: producción, oficinas, almacén, etc.',
                icon: Building2,
                color: 'sky',
              },
              {
                paso: '02',
                titulo: 'Instalamos sensores',
                desc: 'Nuestro equipo instala sensores IoT (PZEM-004T) en cada área. Sin cables complicados, plug & play.',
                icon: Factory,
                color: 'violet',
              },
              {
                paso: '03',
                titulo: 'Monitorea y ahorra',
                desc: 'Accede a tu dashboard en tiempo real. Recibe alertas de anomalías y reduce tu factura hasta un 30%.',
                icon: BarChart3,
                color: 'emerald',
              },
            ].map((item) => (
              <div key={item.paso} className="relative group">
                <div className={`p-8 rounded-2xl bg-gradient-to-br from-${item.color}-500/5 to-${item.color}-900/5 border border-${item.color}-500/20 hover:border-${item.color}-500/40 transition-all duration-300`}>
                  <div className={`text-5xl font-extrabold text-${item.color}-500/20 mb-4`}>{item.paso}</div>
                  <div className={`p-3 rounded-xl bg-${item.color}-500/10 w-fit mb-4`}>
                    <item.icon size={24} className={`text-${item.color}-400`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.titulo}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-20 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Todo lo que necesitas
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: BarChart3, title: 'Dashboard en tiempo real', desc: 'Datos cada 3 segundos', color: 'sky' },
              { icon: Bell, title: 'Alertas automáticas', desc: 'Detección instant de picos', color: 'rose' },
              { icon: TrendingDown, title: 'Costos en $ MXN', desc: 'ROI claro y medible', color: 'emerald' },
              { icon: Leaf, title: 'Huella de CO₂', desc: 'Métricas sustentables', color: 'teal' },
              { icon: Shield, title: 'Múltiples áreas', desc: 'Monitoreo segmentado', color: 'violet' },
              { icon: Factory, title: 'Cualquier industria', desc: 'Manufactura, textil, alimentos...', color: 'amber' },
              { icon: Clock, title: 'Historial completo', desc: 'Registro de lecturas', color: 'indigo' },
              { icon: CheckCircle2, title: 'Cero fallos', desc: '100% disponibilidad', color: 'green' },
            ].map((f) => (
              <div key={f.title} className="p-5 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800/50 transition-all group">
                <f.icon size={20} className={`text-${f.color}-400 mb-3`} />
                <h4 className="text-sm font-semibold text-white mb-1">{f.title}</h4>
                <p className="text-xs text-slate-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="py-20 border-t border-slate-800/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="p-10 rounded-3xl bg-gradient-to-br from-sky-500/10 to-violet-500/10 border border-sky-500/20">
            <h2 className="text-3xl font-bold text-white mb-4">
              ¿Listo para dejar de pagar de más?
            </h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              Registra tu empresa ahora y comienza a monitorear tu consumo eléctrico en tiempo real.
              Sin compromisos, sin costos ocultos.
            </p>
            <Link
              href="/registro"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-violet-600 text-white text-lg font-bold hover:from-sky-400 hover:to-violet-500 transition-all shadow-2xl shadow-sky-500/25"
            >
              Comenzar ahora
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-slate-800/50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-sky-500" />
            <span className="font-medium text-slate-400">Energy Monitor</span>
            <span>· Monitoreo energético inteligente</span>
          </div>
          <span>© 2026 Energy Monitor · MVP Hackathon</span>
        </div>
      </footer>
    </div>
  )
}
