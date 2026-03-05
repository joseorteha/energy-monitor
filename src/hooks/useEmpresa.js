'use client'
import { useState, useEffect, useCallback, useMemo } from 'react'
import {
    getEmpresas, getEmpresaPorId, registrarEmpresa,
    agregarArea as agregarAreaStore,
    editarArea as editarAreaStore,
    eliminarArea as eliminarAreaStore,
    login as loginStore, logout as logoutStore, getSesion,
} from '../lib/empresasStore'

export function useEmpresa() {
    const [sesion, setSesion] = useState(null)
    const [empresas, setEmpresas] = useState([])
    const [cargado, setCargado] = useState(false)

    // Cargar sesión y empresas al montar
    useEffect(() => {
        setSesion(getSesion())
        setEmpresas(getEmpresas())
        setCargado(true)
    }, [])

    // Empresa activa (del login)
    const empresaActiva = useMemo(() => {
        if (!sesion || sesion.tipo !== 'empresa') return null
        return getEmpresaPorId(sesion.empresaId)
    }, [sesion, empresas])

    const areasEmpresa = useMemo(() => empresaActiva?.areas || [], [empresaActiva])
    const isAdmin = sesion?.tipo === 'admin'
    const isLoggedIn = !!sesion

    // --- Auth ---
    const login = useCallback((email, password) => {
        const resultado = loginStore(email, password)
        if (resultado.sesion) {
            setSesion(resultado.sesion)
            setEmpresas(getEmpresas())
        }
        return resultado
    }, [])

    const logout = useCallback(() => {
        logoutStore()
        setSesion(null)
    }, [])

    const registrar = useCallback((datos) => {
        const resultado = registrarEmpresa(datos)
        if (resultado.empresa) {
            // Auto-login después de registrar
            const loginResult = loginStore(datos.email, datos.password)
            if (loginResult.sesion) setSesion(loginResult.sesion)
            setEmpresas(getEmpresas())
        }
        return resultado
    }, [])

    // --- CRUD Áreas ---
    const agregarArea = useCallback((area) => {
        if (!empresaActiva) return null
        const nueva = agregarAreaStore(empresaActiva.id, area)
        setEmpresas(getEmpresas())
        return nueva
    }, [empresaActiva])

    const editarArea = useCallback((areaId, datos) => {
        if (!empresaActiva) return null
        editarAreaStore(empresaActiva.id, areaId, datos)
        setEmpresas(getEmpresas())
    }, [empresaActiva])

    const eliminarArea = useCallback((areaId) => {
        if (!empresaActiva) return
        eliminarAreaStore(empresaActiva.id, areaId)
        setEmpresas(getEmpresas())
    }, [empresaActiva])

    return {
        sesion, empresas, empresaActiva, areasEmpresa,
        isAdmin, isLoggedIn, cargado,
        login, logout, registrar,
        agregarArea, editarArea, eliminarArea,
    }
}
