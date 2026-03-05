'use client'
import { useState, useEffect } from 'react'
import {
  Activity, AlertTriangle, Play, Pause, Zap,
  Building2, Settings, ChevronDown
} from 'lucide-react'
import { useMotorDatos } from '../hooks/useMotorDatos'
import { useEmpresa } from '../hooks/useEmpresa'
import StatsCards from '../components/StatsCards'
import ConsumoChart from '../components/ConsumoChart'
import RankingAreas from '../components/RankingAreas'
import AlertasTable from '../components/AlertasTable'
import EmpresaSelector from '../components/EmpresaSelector'
import GestionAreas from '../components/GestionAreas'

export default function Dashboard() {
  const {
    empresas, empresaActiva, areasEmpresa, rol, permisos, cargado,
    seleccionarEmpresa, cambiarRol, crearEmpresa, eliminarEmpresa,
    agregarArea, editarArea, eliminarArea,
  } = useEmpresa()

  const {
    lecturas, alertas, corriendo, setCorriendo,
    dispararEmergencia, ultimaAlerta, metricas
  } = useMotorDatos(areasEmpresa)

  const [showEmergency, setShowEmergency] = useState(false)
  const [showSelector, setShowSelector] = useState(false)
  const [showGestion, setShowGestion] = useState(false)

  // Mostrar selector si no hay empresa seleccionada
  useEffect(() => {
    if (cargado && !empresaActiva) {
      setShowSelector(true)
    }
  }, [cargado, empresaActiva])

  // Efecto pulse rojo al detectar anomalía
  useEffect(() => {
    if (ultimaAlerta) {
      setShowEmergency(true)
      const timer = setTimeout(() => setShowEmergency(false), 2400)
      return () => clearTimeout(timer)
    }
  }, [ultimaAlerta])

  // Loading state
  if (!cargado) {
    return (
      <div className="min-h-screen bg-grid flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-400">
          <div className="w-5 h-5 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
          <span>Cargando Energy Monitor...</span>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen bg-grid transition-all duration-300 ${showEmergency ? 'animate-emergency' : ''
        }`}
    >
      {/* ===== MODALES ===== */}
      {showSelector && (
        <EmpresaSelector
          empresas={empresas}
          empresaActiva={empresaActiva}
          rol={rol}
          permisos={permisos}
          onSeleccionar={(id) => { seleccionarEmpresa(id); setShowSelector(false) }}
          onCambiarRol={cambiarRol}
          onCrearEmpresa={crearEmpresa}
          onEliminarEmpresa={eliminarEmpresa}
          onCerrar={empresaActiva ? () => setShowSelector(false) : undefined}
        />
      )}
      {showGestion && empresaActiva && (
        <GestionAreas
          areas={areasEmpresa}
          onAgregar={agregarArea}
          onEditar={editarArea}
          onEliminar={eliminarArea}
          onCerrar={() => setShowGestion(false)}
          soloLectura={permisos.soloLectura}
        />
      )}

      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo, título y empresa */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-sky-500 to-violet-600 shadow-lg shadow-sky-500/20">
                <Zap size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                  Energy Monitor
                </h1>
                {/* Nombre de empresa activa */}
                <button
                  onClick={() => setShowSelector(true)}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-sky-400 transition-colors cursor-pointer group"
                >
                  <Building2 size={12} />
                  <span>{empresaActiva?.nombre || 'Seleccionar empresa'}</span>
                  <ChevronDown size={12} className="group-hover:translate-y-0.5 transition-transform" />
                </button>
              </div>
              {/* Badge EN VIVO */}
              {corriendo && empresaActiva && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 ml-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-live" />
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    En Vivo
                  </span>
                </div>
              )}
            </div>

            {/* Controles */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Gestión de Áreas (Admin/Empresa) */}
              {permisos.puedeGestionarAreas && empresaActiva && (
                <button
                  onClick={() => setShowGestion(true)}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-sm font-semibold
                    bg-violet-500/10 text-violet-400 hover:bg-violet-500/20
                    border border-violet-500/30 transition-all duration-200 cursor-pointer"
                >
                  <Settings size={16} />
                  <span className="hidden sm:inline">Áreas</span>
                </button>
              )}

              {/* Botón Pausar/Reanudar */}
              {empresaActiva && (
                <button
                  onClick={() => setCorriendo(!corriendo)}
                  className={`
                    flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-sm font-semibold
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
              )}

              {/* ===== BOTÓN DE EMERGENCIA ===== */}
              {empresaActiva && (
                <button
                  onClick={dispararEmergencia}
                  className="
                    flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl
                    bg-gradient-to-r from-rose-600 to-red-700
                    text-white text-sm font-bold
                    hover:from-rose-500 hover:to-red-600
                    active:scale-95 transition-all duration-200
                    animate-emergency-glow cursor-pointer
                    border border-rose-500/50
                  "
                >
                  <AlertTriangle size={18} className="animate-pulse" />
                  <span className="hidden sm:inline">Simular Emergencia</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ===== CONTENIDO PRINCIPAL ===== */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 space-y-6">
        {empresaActiva ? (
          <>
            {/* Info de empresa */}
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <Building2 size={14} />
              <span>{empresaActiva.nombre}</span>
              <span className="text-slate-700">·</span>
              <span>{empresaActiva.industria}</span>
              <span className="text-slate-700">·</span>
              <span>{areasEmpresa.length} área{areasEmpresa.length !== 1 ? 's' : ''}</span>
              <span className="text-slate-700">·</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-xs capitalize">
                {rol}
              </span>
            </div>

            {/* KPIs */}
            <StatsCards metricas={metricas} />

            {/* Gráfica principal */}
            <ConsumoChart lecturas={lecturas} />

            {/* Ranking + Alertas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RankingAreas consumoPorArea={metricas.consumoPorArea} areas={areasEmpresa} />
              <AlertasTable alertas={alertas} />
            </div>
          </>
        ) : (
          /* Estado sin empresa seleccionada */
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="p-4 rounded-2xl bg-sky-500/10 mb-4">
              <Building2 size={40} className="text-sky-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Selecciona una empresa</h2>
            <p className="text-slate-400 text-sm mb-6 max-w-md">
              Para ver el dashboard de monitoreo energético, primero selecciona o registra una empresa.
            </p>
            <button
              onClick={() => setShowSelector(true)}
              className="px-6 py-3 rounded-xl bg-sky-500 text-white font-semibold
                hover:bg-sky-400 transition-colors cursor-pointer"
            >
              Seleccionar Empresa
            </button>
          </div>
        )}
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
