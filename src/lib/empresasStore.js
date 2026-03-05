// ============================================
// Empresas Store — Auth + CRUD simulado (localStorage)
// Plataforma SaaS Energy Monitor
// ============================================

const STORAGE_KEY = 'energy_monitor_empresas'
const SESSION_KEY = 'energy_monitor_sesion'
const VERSION_KEY = 'energy_monitor_version'
const CURRENT_VERSION = 3 // V3 = SaaS con auth

// ============================================
// Datos Simulados Predefinidos
// ============================================

const ADMIN_ACCOUNT = {
    email: 'admin@energymonitor.mx',
    password: 'admin123',
    nombre: 'Energy Monitor (Admin)',
    esAdmin: true,
}

const EMPRESAS_DEMO = [
    {
        id: 'demo-1',
        nombre: 'Industrias del Norte S.A.',
        industria: 'Manufactura',
        contacto: 'Carlos Méndez',
        email: 'carlos@industriasnorte.mx',
        password: '123456',
        creadaEn: '2026-01-15T10:00:00Z',
        areas: [
            { id: 1, nombre: 'Línea de Producción', limite_kwh: 8.0, color: '#38bdf8', icon: 'Factory' },
            { id: 2, nombre: 'Cuarto de Máquinas', limite_kwh: 10.0, color: '#a78bfa', icon: 'Cog' },
            { id: 3, nombre: 'Oficinas Admin', limite_kwh: 3.0, color: '#34d399', icon: 'Building2' },
            { id: 4, nombre: 'Comedor', limite_kwh: 2.0, color: '#fbbf24', icon: 'UtensilsCrossed' },
        ],
    },
    {
        id: 'demo-2',
        nombre: 'Textiles Veracruz',
        industria: 'Textil',
        contacto: 'María López',
        email: 'maria@textilesveracruz.mx',
        password: '123456',
        creadaEn: '2026-02-01T14:30:00Z',
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
        contacto: 'Roberto García',
        email: 'roberto@alimentosgolfo.mx',
        password: '123456',
        creadaEn: '2026-02-20T09:00:00Z',
        areas: [
            { id: 1, nombre: 'Producción', limite_kwh: 9.0, color: '#38bdf8', icon: 'Factory' },
            { id: 2, nombre: 'Cámaras Frías', limite_kwh: 15.0, color: '#818cf8', icon: 'Thermometer' },
            { id: 3, nombre: 'Empaquetado', limite_kwh: 5.0, color: '#a3e635', icon: 'Box' },
            { id: 4, nombre: 'Oficinas', limite_kwh: 3.0, color: '#34d399', icon: 'Building2' },
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
    } catch { return fallback }
}

function escribirStorage(key, value) {
    if (typeof window === 'undefined') return
    localStorage.setItem(key, JSON.stringify(value))
}

// ============================================
// CRUD de Empresas
// ============================================

export function getEmpresas() {
    const version = leerStorage(VERSION_KEY, 0)
    // Si la versión es vieja, resetear datos (V2 no tenía email/password)
    if (version < CURRENT_VERSION) {
        escribirStorage(STORAGE_KEY, EMPRESAS_DEMO)
        escribirStorage(VERSION_KEY, CURRENT_VERSION)
        // Limpiar sesión vieja también
        if (typeof window !== 'undefined') localStorage.removeItem(SESSION_KEY)
        return [...EMPRESAS_DEMO]
    }
    const empresas = leerStorage(STORAGE_KEY, null)
    if (!empresas) {
        escribirStorage(STORAGE_KEY, EMPRESAS_DEMO)
        return [...EMPRESAS_DEMO]
    }
    return empresas
}

export function getEmpresaPorId(id) {
    return getEmpresas().find(e => e.id === id) || null
}

export function registrarEmpresa({ nombre, industria, contacto, email, password }) {
    const empresas = getEmpresas()
    // Verificar email único
    if (empresas.some(e => e.email === email)) {
        return { error: 'Este correo ya está registrado' }
    }
    const nueva = {
        id: `emp-${Date.now()}`,
        nombre,
        industria,
        contacto,
        email,
        password,
        creadaEn: new Date().toISOString(),
        areas: [],
    }
    empresas.push(nueva)
    escribirStorage(STORAGE_KEY, empresas)
    return { empresa: nueva }
}

export function eliminarEmpresa(id) {
    let empresas = getEmpresas()
    empresas = empresas.filter(e => e.id !== id)
    escribirStorage(STORAGE_KEY, empresas)
    return empresas
}

// ============================================
// CRUD de Áreas
// ============================================

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

// ============================================
// Autenticación (Simulada)
// ============================================

export function login(email, password) {
    // Verificar admin
    if (email === ADMIN_ACCOUNT.email && password === ADMIN_ACCOUNT.password) {
        const sesion = { tipo: 'admin', email: ADMIN_ACCOUNT.email, nombre: ADMIN_ACCOUNT.nombre }
        escribirStorage(SESSION_KEY, sesion)
        return { sesion }
    }
    // Verificar empresa
    const empresas = getEmpresas()
    const empresa = empresas.find(e => e.email === email && e.password === password)
    if (empresa) {
        const sesion = { tipo: 'empresa', empresaId: empresa.id, email: empresa.email, nombre: empresa.nombre }
        escribirStorage(SESSION_KEY, sesion)
        return { sesion }
    }
    return { error: 'Correo o contraseña incorrectos' }
}

export function logout() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(SESSION_KEY)
    }
}

export function getSesion() {
    return leerStorage(SESSION_KEY, null)
}

// Industrias disponibles
export const INDUSTRIAS = [
    'Manufactura', 'Textil', 'Alimentaria', 'Automotriz',
    'Farmacéutica', 'Tecnología', 'Construcción', 'Logística',
    'Minería', 'Energía', 'Otra',
]
