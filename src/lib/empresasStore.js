// ============================================
// Empresas Store — CRUD simulado con localStorage
// Gestión de empresas y sus áreas de monitoreo
// ============================================

const STORAGE_KEY = 'energy_monitor_empresas'
const ACTIVE_KEY = 'energy_monitor_empresa_activa'
const ROL_KEY = 'energy_monitor_rol'

// Empresas de demo predefinidas
const EMPRESAS_DEMO = [
    {
        id: 'demo-1',
        nombre: 'Industrias del Norte S.A.',
        industria: 'Manufactura',
        creadaEn: new Date().toISOString(),
        areas: [
            { id: 1, nombre: 'Línea de Producción', limite_kwh: 8.0, color: '#38bdf8', icon: 'Factory' },
            { id: 2, nombre: 'Cuarto de Máquinas', limite_kwh: 10.0, color: '#a78bfa', icon: 'Cog' },
            { id: 3, nombre: 'Oficinas', limite_kwh: 3.0, color: '#34d399', icon: 'Building2' },
            { id: 4, nombre: 'Comedor', limite_kwh: 2.0, color: '#fbbf24', icon: 'UtensilsCrossed' },
        ],
    },
    {
        id: 'demo-2',
        nombre: 'Textiles Veracruz',
        industria: 'Textil',
        creadaEn: new Date().toISOString(),
        areas: [
            { id: 1, nombre: 'Telares', limite_kwh: 12.0, color: '#f472b6', icon: 'Factory' },
            { id: 2, nombre: 'Tintorería', limite_kwh: 7.0, color: '#fb923c', icon: 'FlaskConical' },
            { id: 3, nombre: 'Almacén', limite_kwh: 2.5, color: '#2dd4bf', icon: 'Warehouse' },
        ],
    },
    {
        id: 'demo-3',
        nombre: 'Alimentos del Golfo',
        industria: 'Alimentaria',
        creadaEn: new Date().toISOString(),
        areas: [
            { id: 1, nombre: 'Producción', limite_kwh: 9.0, color: '#38bdf8', icon: 'Factory' },
            { id: 2, nombre: 'Cámaras Frías', limite_kwh: 15.0, color: '#818cf8', icon: 'Thermometer' },
            { id: 3, nombre: 'Empaquetado', limite_kwh: 5.0, color: '#a3e635', icon: 'Box' },
            { id: 4, nombre: 'Oficinas Admin', limite_kwh: 3.0, color: '#34d399', icon: 'Building2' },
            { id: 5, nombre: 'Comedor', limite_kwh: 2.0, color: '#fbbf24', icon: 'UtensilsCrossed' },
        ],
    },
]

// --- Helpers de localStorage ---

function leerStorage(key, fallback) {
    if (typeof window === 'undefined') return fallback
    try {
        const data = localStorage.getItem(key)
        return data ? JSON.parse(data) : fallback
    } catch {
        return fallback
    }
}

function escribirStorage(key, value) {
    if (typeof window === 'undefined') return
    localStorage.setItem(key, JSON.stringify(value))
}

// --- CRUD de Empresas ---

export function getEmpresas() {
    const empresas = leerStorage(STORAGE_KEY, null)
    if (!empresas) {
        // Primera vez: inicializar con empresas de demo
        escribirStorage(STORAGE_KEY, EMPRESAS_DEMO)
        return EMPRESAS_DEMO
    }
    return empresas
}

export function crearEmpresa(nombre, industria) {
    const empresas = getEmpresas()
    const nueva = {
        id: `emp-${Date.now()}`,
        nombre,
        industria,
        creadaEn: new Date().toISOString(),
        areas: [],
    }
    empresas.push(nueva)
    escribirStorage(STORAGE_KEY, empresas)
    return nueva
}

export function eliminarEmpresa(id) {
    let empresas = getEmpresas()
    empresas = empresas.filter(e => e.id !== id)
    escribirStorage(STORAGE_KEY, empresas)
    return empresas
}

// --- CRUD de Áreas ---

export function agregarArea(empresaId, area) {
    const empresas = getEmpresas()
    const empresa = empresas.find(e => e.id === empresaId)
    if (!empresa) return null
    const nuevaArea = {
        ...area,
        id: empresa.areas.length > 0 ? Math.max(...empresa.areas.map(a => a.id)) + 1 : 1,
    }
    empresa.areas.push(nuevaArea)
    escribirStorage(STORAGE_KEY, empresas)
    return nuevaArea
}

export function editarArea(empresaId, areaId, datos) {
    const empresas = getEmpresas()
    const empresa = empresas.find(e => e.id === empresaId)
    if (!empresa) return null
    const idx = empresa.areas.findIndex(a => a.id === areaId)
    if (idx === -1) return null
    empresa.areas[idx] = { ...empresa.areas[idx], ...datos }
    escribirStorage(STORAGE_KEY, empresas)
    return empresa.areas[idx]
}

export function eliminarArea(empresaId, areaId) {
    const empresas = getEmpresas()
    const empresa = empresas.find(e => e.id === empresaId)
    if (!empresa) return
    empresa.areas = empresa.areas.filter(a => a.id !== areaId)
    escribirStorage(STORAGE_KEY, empresas)
}

// --- Empresa Activa y Rol ---

export function getEmpresaActiva() {
    return leerStorage(ACTIVE_KEY, null)
}

export function setEmpresaActiva(empresaId) {
    escribirStorage(ACTIVE_KEY, empresaId)
}

export function getRol() {
    return leerStorage(ROL_KEY, 'empresa')
}

export function setRol(rol) {
    escribirStorage(ROL_KEY, rol)
}

// Roles disponibles
export const ROLES = [
    { id: 'admin', nombre: 'Administrador', descripcion: 'Acceso total a todas las empresas', color: '#f43f5e' },
    { id: 'empresa', nombre: 'Empresa', descripcion: 'Gestiona áreas y ve su dashboard', color: '#38bdf8' },
    { id: 'operador', nombre: 'Operador', descripcion: 'Solo visualización del dashboard', color: '#34d399' },
]

// Industrias disponibles para selector
export const INDUSTRIAS = [
    'Manufactura', 'Textil', 'Alimentaria', 'Automotriz',
    'Farmacéutica', 'Tecnología', 'Construcción', 'Logística', 'Otra'
]
