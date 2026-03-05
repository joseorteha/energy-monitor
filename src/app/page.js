'use client'
import { useState, useEffect } from 'react'
import { Activity, AlertTriangle, Play, Pause, Zap } from 'lucide-react'
import { useMotorDatos } from '../hooks/useMotorDatos'
import StatsCards from '../components/StatsCards'
import ConsumoChart from '../components/ConsumoChart'
import RankingAreas from '../components/RankingAreas'
import AlertasTable from '../components/AlertasTable'

export default function Dashboard() {
  const {
    lecturas, alertas, corriendo, setCorriendo,
    dispararEmergencia, ultimaAlerta, metricas
  } = useMotorDatos()

  const [showEmergency, setShowEmergency] = useState(false)

  // Efecto pulse rojo al detectar anomalía
  useEffect(() => {
    if (ultimaAlerta) {
      setShowEmergency(true)
      const timer = setTimeout(() => setShowEmergency(false), 2400)
      return () => clearTimeout(timer)
    }
  }, [ultimaAlerta])

  return (
    <div
      className={`min-h-screen bg-grid transition-all duration-300 ${showEmergency ? 'animate-emergency' : ''
        }`}
    >
      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo y título */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-sky-500 to-violet-600 shadow-lg shadow-sky-500/20">
                <Zap size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                  Energy Monitor
                </h1>
                <p className="text-xs text-slate-500 hidden sm:block">Dashboard de Monitoreo Energético</p>
              </div>
              {/* Badge EN VIVO */}
              {corriendo && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 ml-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-live" />
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    En Vivo
                  </span>
                </div>
              )}
            </div>

            {/* Controles */}
            <div className="flex items-center gap-3">
              {/* Botón Pausar/Reanudar */}
              <button
                onClick={() => setCorriendo(!corriendo)}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold
                  transition-all duration-300 cursor-pointer
                  ${corriendo
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                    : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30'
                  }
                `}
              >
                {corriendo ? <Pause size={16} /> : <Play size={16} />}
                <span className="hidden sm:inline">{corriendo ? 'Pausar' : 'Reanudar'}</span>
              </button>

              {/* ===== BOTÓN DE EMERGENCIA ===== */}
              <button
                onClick={dispararEmergencia}
                className="
                  flex items-center gap-2 px-5 py-2.5 rounded-xl
                  bg-gradient-to-r from-rose-600 to-red-700
                  text-white text-sm font-bold
                  hover:from-rose-500 hover:to-red-600
                  active:scale-95 transition-all duration-200
                  animate-emergency-glow cursor-pointer
                  border border-rose-500/50
                "
              >
                <AlertTriangle size={18} className="animate-pulse" />
                <span className="hidden sm:inline">🚨 Simular Emergencia</span>
                <span className="sm:hidden">🚨</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ===== CONTENIDO PRINCIPAL ===== */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Fila 1: KPIs */}
        <StatsCards metricas={metricas} />

        {/* Fila 2: Gráfica principal */}
        <ConsumoChart lecturas={lecturas} />

        {/* Fila 3: Ranking + Alertas lado a lado */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RankingAreas consumoPorArea={metricas.consumoPorArea} />
          <AlertasTable alertas={alertas} />
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-slate-800/50 py-4 mt-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Activity size={14} />
            <span>Intervalo: 3s · Ventana: 50 lecturas</span>
          </div>
          <span>Energy Monitor · MVP Hackathon 2026</span>
        </div>
      </footer>
    </div>
  )
}
