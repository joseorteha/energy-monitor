'use client'
import { useState, useEffect, useCallback, useMemo } from 'react'
import {
    getEmpresas, crearEmpresa as crearEmpresaStore,
    eliminarEmpresa as eliminarEmpresaStore,
    agregarArea as agregarAreaStore,
    editarArea as editarAreaStore,
    eliminarArea as eliminarAreaStore,
    getEmpresaActiva, setEmpresaActiva as setActivaStore,
    getRol, setRol as setRolStore,
} from '../lib/empresasStore'

export function useEmpresa() {
    const [empresas, setEmpresas] = useState([])
    const [empresaActivaId, setEmpresaActivaId] = useState(null)
    const [rol, setRolLocal] = useState('empresa')
    const [cargado, setCargado] = useState(false)

    // Cargar datos del localStorage al montar
    useEffect(() => {
        setEmpresas(getEmpresas())
        setEmpresaActivaId(getEmpresaActiva())
        setRolLocal(getRol())
        setCargado(true)
    }, [])

    // Empresa activa (objeto completo)
    const empresaActiva = useMemo(() => {
        return empresas.find(e => e.id === empresaActivaId) || null
    }, [empresas, empresaActivaId])

    // Áreas de la empresa activa
    const areasEmpresa = useMemo(() => {
        return empresaActiva?.areas || []
    }, [empresaActiva])

    // --- Acciones ---

    const seleccionarEmpresa = useCallback((id) => {
        setEmpresaActivaId(id)
        setActivaStore(id)
    }, [])

    const cambiarRol = useCallback((nuevoRol) => {
        setRolLocal(nuevoRol)
        setRolStore(nuevoRol)
    }, [])

    const crearEmpresa = useCallback((nombre, industria) => {
        const nueva = crearEmpresaStore(nombre, industria)
        setEmpresas(getEmpresas())
        return nueva
    }, [])

    const eliminarEmpresa = useCallback((id) => {
        eliminarEmpresaStore(id)
        setEmpresas(getEmpresas())
        if (empresaActivaId === id) {
            setEmpresaActivaId(null)
            setActivaStore(null)
        }
    }, [empresaActivaId])

    const agregarArea = useCallback((area) => {
        if (!empresaActivaId) return null
        const nueva = agregarAreaStore(empresaActivaId, area)
        setEmpresas(getEmpresas())
        return nueva
    }, [empresaActivaId])

    const editarArea = useCallback((areaId, datos) => {
        if (!empresaActivaId) return null
        editarAreaStore(empresaActivaId, areaId, datos)
        setEmpresas(getEmpresas())
    }, [empresaActivaId])

    const eliminarArea = useCallback((areaId) => {
        if (!empresaActivaId) return
        eliminarAreaStore(empresaActivaId, areaId)
        setEmpresas(getEmpresas())
    }, [empresaActivaId])

    // Permisos por rol
    const permisos = useMemo(() => ({
        puedeCrearEmpresa: rol === 'admin',
        puedeEliminarEmpresa: rol === 'admin',
        puedeGestionarAreas: rol === 'admin' || rol === 'empresa',
        puedeVerTodasEmpresas: rol === 'admin',
        soloLectura: rol === 'operador',
    }), [rol])

    return {
        empresas,
        empresaActiva,
        empresaActivaId,
        areasEmpresa,
        rol,
        permisos,
        cargado,
        seleccionarEmpresa,
        cambiarRol,
        crearEmpresa,
        eliminarEmpresa,
        agregarArea,
        editarArea,
        eliminarArea,
    }
}
