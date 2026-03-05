# **📋 Documentación Técnica y Especificaciones — Sistema de Monitoreo Energético**

### **Hackathon MVP · Next.js \+ Recharts · 9 horas**

**🤖 INSTRUCCIONES PARA EL AGENTE DE IA LEYENDO ESTE ARCHIVO:**

Actúa como un Tech Lead y Desarrollador Senior. Este documento es la "Fuente de la Verdad" para un MVP de un Hackathon que debemos terminar en menos de 9 horas.

**Tu objetivo:** Generar código limpio, moderno, espectacular a nivel visual (efecto "Wow" para los jueces) y 100% libre de fallos de conexión (por eso usamos un simulador de datos local). Prioriza el impacto visual, la velocidad de renderizado y las métricas de negocio (Costo en $ MXN).

## **Índice**

1. [Descripción del Proyecto](#bookmark=id.ft6ldbrvvgti)  
2. [Problema y Justificación (Contexto de Negocio)](#bookmark=id.i58g03wf7io2)  
3. [Solución Propuesta](#bookmark=id.uxdqi0vmmscl)  
4. [Arquitectura del Sistema](#bookmark=id.91hpenil9c2)  
5. [Stack Tecnológico y Librerías UI](#bookmark=id.pbm13m488u31)  
6. [Estructura de Carpetas](#bookmark=id.5lbnkyn6d8br)  
7. [Motor de Datos — Simulador Local](#bookmark=id.3ukff6e1icqs)  
8. [Hook Principal — useMotorDatos](#bookmark=id.ti5mqedvvo10)  
9. [Componentes del Dashboard](#bookmark=id.f7nnvglw1h73)  
10. [Página Principal](#bookmark=id.esiy95hjk5sx)  
11. [Guía de Demo para Jueces](#bookmark=id.3i4b4hdbkd3x)  
12. [Impacto y Escalabilidad](#bookmark=id.ls0gi18z86ho)

## **1\. Descripción del Proyecto**

**Energy Monitor** es un dashboard web de monitoreo energético en tiempo real. Actúa como el *"Google Analytics del consumo eléctrico"*, permitiendo a empresas visualizar el consumo por área, detectar anomalías automáticamente y tomar decisiones basadas en datos financieros para reducir su factura de luz.

| Campo | Detalle |
| :---- | :---- |
| Nombre del proyecto | Energy Monitor |
| Tipo | MVP — Hackathon |
| Tiempo de desarrollo | 9 horas (Prioridad máxima a la estabilidad de la demo) |
| Plataforma | Web (Next.js App Router) |
| Disponibilidad | 100% online vía Vercel |

## **2\. Problema y Justificación (Contexto de Negocio)**

### **2.1 Planteamiento: El "Punto Ciego Energético"**

Las empresas industriales sufren de facturas eléctricas altísimas sin justificación clara. Conocen el total mensual, pero no tienen datos segmentados; no saben si el "Cuarto de Máquinas" o la "Línea de Producción" está desperdiciando energía a las 3:00 AM.

### **2.2 Magnitud del Problema y ROI**

Una empresa mediana puede desperdiciar entre **15% y 30%** de su consumo energético en áreas de bajo uso o equipos con fallas. Sin monitoreo, este costo se vuelve invisible.

**Nota para IA:** El Dashboard debe resaltar siempre el **Costo Estimado en $ MXN**. Al jurado le importa el dinero salvado (ROI), no solo los kWh.

## **3\. Solución Propuesta**

Un **dashboard web interactivo** que simula la lectura de sensores energéticos por área.

### **3.1 Capacidades del Sistema (MVP)**

| Capacidad | Descripción |
| :---- | :---- |
| 📡 Recopilación continua | Lectura de consumo por área cada 3 segundos. |
| ⚡ Tiempo real | Gráficas reactivas que se actualizan sin recargar (Estado Local). |
| 🚨 Alertas automáticas | Detección de picos cuando el consumo supera el límite. |
| 📊 Indicadores clave | kWh totales, **costo en pesos MXN**, huella de CO2, área crítica. |
| 🔴 Efectos "Wow" | Parpadeo de pantalla en rojo (Pulse) al detectar un pico crítico. |

### **3.2 Áreas Monitoreadas**

| ID | Área | Límite de Consumo (kWh) |
| :---- | :---- | :---- |
| 1 | Línea de Producción | 8.0 |
| 2 | Cuarto de Máquinas | 10.0 |
| 3 | Oficinas Administrativas | 3.0 |
| 4 | Comedor | 2.0 |

## **4\. Arquitectura del Sistema (Sin Backend)**

**¿Por qué sin base de datos?**

Para un hackathon de 9 horas, eliminar el backend garantiza **cero errores de red en la demo frente a los jueces**. Simularemos el IoT inyectando JSONs cada 3 segundos directamente al estado de React.

┌─────────────────────────────────────────────────────┐  
│                   NEXT.JS APP                        │  
│                                                     │  
│  ┌─────────────────┐     ┌──────────────────────┐   │  
│  │  motorDatos.js  │────▶│  useMotorDatos.js    │   │  
│  │  (Generador JSON)     │  (Hook de estado)    │   │  
│  └─────────────────┘     │  lecturas, alertas   │   │  
│                          └──────────┬───────────┘   │  
│              ┌──────────────────────▼─────────────┐ │  
│              │         page.jsx (Dashboard)        │ │  
│              │                                    │ │  
│              │  StatsCards  │  ConsumoChart       │ │  
│              │  RankingAreas│  AlertasTable       │ │  
│              └────────────────────────────────────┘ │  
└─────────────────────────────────────────────────────┘

## **5\. Stack Tecnológico y Librerías UI**

| Capa | Tecnología | Propósito |
| :---- | :---- | :---- |
| Framework | **Next.js 14+ (App Router)** | Base del proyecto, routing |
| Estilos | **Tailwind CSS 3+** | Diseño rápido, modo oscuro obligatorio |
| Gráficas | **Recharts 2+** | Visualización fluida de datos IoT |
| UI Avanzada | **Radix UI / Magic UI** | Componentes accesibles y animaciones/glows para efecto "Wow" |
| Iconos | **Lucide React** | Íconos limpios y consistentes |
| Deploy | **Vercel** | Hosting inmediato con un clic |

## **6\. Estructura de Carpetas**

energy-dashboard/  
├── app/  
│   ├── layout.jsx          \# Layout global (Tema oscuro por defecto)  
│   ├── page.jsx            \# Dashboard principal  
│   └── globals.css         \# Tailwind base  
├── components/  
│   ├── StatsCards.jsx      \# 4 KPIs (Incluir cálculo de CO2)  
│   ├── ConsumoChart.jsx    \# Gráfica de línea (Recharts)  
│   ├── RankingAreas.jsx    \# Barras de progreso por área  
│   └── AlertasTable.jsx    \# Tabla de anomalías (Animación en nuevas filas)  
├── hooks/  
│   └── useMotorDatos.js    \# Lógica de simulación IoT  
├── lib/  
│   └── motorDatos.js       \# Generador de datos JSON  
└── package.json

## **7\. Motor de Datos — Simulador Local**

**Archivo:** lib/motorDatos.js

Genera el objeto JSON que simula la lectura de un sensor físico (como un PZEM-004T).

export const AREAS \= \[  
  { id: 1, nombre: 'Línea de Producción', limite\_kwh: 8.0 },  
  { id: 2, nombre: 'Cuarto de Máquinas', limite\_kwh: 10.0 },  
  { id: 3, nombre: 'Oficinas', limite\_kwh: 3.0 },  
  { id: 4, nombre: 'Comedor', limite\_kwh: 2.0 },  
\]

export const TARIFA\_KWH \= 1.35 // Pesos MXN

export function generarLectura(forzarPico \= false) {  
  const area \= AREAS\[Math.floor(Math.random() \* AREAS.length)\]  
  const esPico \= forzarPico || Math.random() \> 0.85 // 15% probabilidad de falla

  const consumo\_kwh \= esPico  
    ? \+(Math.random() \* 6 \+ area.limite\_kwh \* 1.5).toFixed(2)  
    : \+(Math.random() \* (area.limite\_kwh \* 0.7)).toFixed(2)

  return {  
    id: Date.now() \+ Math.random(),  
    hora: new Date().toLocaleTimeString('es-MX'),  
    area\_id: area.id,  
    area\_nombre: area.nombre,  
    consumo\_kwh,  
    costo\_estimado: \+(consumo\_kwh \* TARIFA\_KWH).toFixed(2),  
    alerta\_anomalia: esPico || consumo\_kwh \> area.limite\_kwh,  
  }  
}

## **8\. Hook Principal — useMotorDatos**

**Archivo:** hooks/useMotorDatos.js

*Nota para IA: El intervalo debe ser estricto (3000ms). Asegúrate de exponer la función dispararEmergencia para la demo de los jueces.*

'use client'  
import { useState, useEffect, useCallback } from 'react'  
import { generarLectura } from '../lib/motorDatos'

const INTERVALO\_MS \= 3000  
const MAX\_HISTORIAL \= 50

export function useMotorDatos() {  
  const \[lecturas, setLecturas\] \= useState(\[\])  
  const \[alertas, setAlertas\] \= useState(\[\])  
  const \[corriendo, setCorriendo\] \= useState(true)

  const agregarLectura \= useCallback((lectura) \=\> {  
    setLecturas(prev \=\> \[...prev.slice(-(MAX\_HISTORIAL \- 1)), lectura\])  
    if (lectura.alerta\_anomalia) {  
      setAlertas(prev \=\> \[lectura, ...prev\].slice(0, 10))  
    }  
  }, \[\])

  useEffect(() \=\> {  
    if (\!corriendo) return  
    setLecturas(Array.from({ length: 10 }, () \=\> generarLectura()))  
    const intervalo \= setInterval(() \=\> agregarLectura(generarLectura()), INTERVALO\_MS)  
    return () \=\> clearInterval(intervalo)  
  }, \[corriendo, agregarLectura\])

  const dispararEmergencia \= useCallback(() \=\> agregarLectura(generarLectura(true)), \[agregarLectura\])

  const totalKwh \= lecturas.reduce((s, l) \=\> s \+ Number(l.consumo\_kwh), 0\)  
  const totalCosto \= lecturas.reduce((s, l) \=\> s \+ Number(l.costo\_estimado), 0\)  
  const consumoPorArea \= lecturas.reduce((acc, l) \=\> {  
    acc\[l.area\_nombre\] \= (acc\[l.area\_nombre\] || 0\) \+ Number(l.consumo\_kwh)  
    return acc  
  }, {})

  return {  
    lecturas, alertas, corriendo, setCorriendo, dispararEmergencia,  
    metricas: {  
      totalKwh: totalKwh.toFixed(2),  
      totalCosto: totalCosto.toFixed(2),  
      huellaCO2: (totalKwh \* 0.42).toFixed(2), // 0.42 kg CO2 por kWh  
      totalAlertas: alertas.length,  
      consumoPorArea,  
      areaMasActiva: Object.entries(consumoPorArea).sort((a, b) \=\> b\[1\] \- a\[1\])\[0\]?.\[0\] ?? '—',  
    },  
  }  
}

## **9\. Componentes del Dashboard**

**Instrucciones de Diseño para IA:**

* **Tema:** Oscuro (Slate/Gray 900\) con acentos vibrantes (Sky 400, Emerald 400, Rose 500).  
* **StatsCards:** Incluye una tarjeta de "Huella de CO2" (Métrica sustentable).  
* **ConsumoChart:** En Recharts, renderiza los puntos normales en azul y los puntos con alerta\_anomalia \=== true en rojo brillante.  
* **RankingAreas:** Usa barras de progreso de Tailwind que se animen al cambiar el valor (transition-all duration-500).  
* **AlertasTable:** Cuando ingrese un registro nuevo, dale un fondo rojo sutil.

## **10\. Página Principal (app/page.jsx)**

Debe orquestar todo y contener los controles de la presentación.

**Requisito de la Demo:** El botón de "Simular Emergencia" debe ser rojo y llamativo. Al presionarlo, la pantalla debe tener un efecto visual (animate-pulse en los bordes) para impresionar al jurado.

## **11\. Guía de Demo para Jueces**

### **Guión del Pitch Sincronizado (2 minutos)**

1. *"El problema es un punto ciego energético: las empresas no saben en qué área están quemando su presupuesto."*  
2. *"Nuestra solución monitorea el consumo en tiempo real. Aquí ven el costo actualizado cada 3 segundos."*  
3. **\[ACCIÓN MIENTRAS SE HABLA\]**: Presionar el botón rojo **🚨 Simular Emergencia**.  
4. *"Y cuando un área supera su límite, el sistema detecta la anomalía al instante. De tardar semanas en leer un recibo, pasamos a detectarlo en segundos."*

## **12\. Impacto y Escalabilidad**

### **12.1 Impacto Directo**

* **Detección:** De días/semanas a **Segundos**.  
* **Ahorro:** Reducción proyectada del **15% al 30%** en facturación eléctrica mensual.

### **12.2 Roadmap Post-Hackathon**

MVP (Hackathon)           V2 (Mes 1\)                  V3 (Mes 3\)  
─────────────────────     ────────────────────────    ──────────────────────  
✅ Dashboard Tiempo Real  → Conexión a BD Supabase      → App Móvil (React Native)  
✅ Motor Simulado         → API REST para ESP32         → Modelos de Machine Learning  
✅ Alertas Automáticas    → Autenticación NextAuth      → Integración con API CFE  
