# **INSTRUCCIONES PARA EL AGENTE IA: DESARROLLO FRONTEND (NEXT.JS)**

## **📌 Rol y Objetivo**

Actúa como un Desarrollador Frontend Senior experto en React, Next.js (App Router) y Tailwind CSS. Tu objetivo es construir un Dashboard de Monitoreo Energético para un MVP de Hackathon (desarrollo rápido, alto impacto visual).

## **🛠️ Stack Tecnológico y Librerías UI**

Debes utilizar las siguientes herramientas para construir la interfaz:

1. **Next.js 14+** (App Router) y **React 18+**.  
2. **Tailwind CSS** para todo el estilizado (usa un tema oscuro/dark mode por defecto).  
3. **Recharts** para la visualización de datos en tiempo real (gráficas de líneas fluidas).  
4. **Librerías de Componentes (Diseño de Alta Calidad):**  
   * **Radix UI** (https://www.radix-ui.com/): Utiliza sus primitivas para accesibilidad.  
   * **Headless UI** (https://headlessui.com/): Para componentes interactivos sin estilo base (modales, menús de usuario).  
   * **Magic UI** (https://magicui.design/): Incorpora animaciones sutiles o efectos de "resplandor" (glow) para los estados de alerta o picos de energía. ¡Necesitamos el efecto "WOW"\!  
   * **Park UI** (https://park-ui.com/): Úsalo como inspiración para la estructura de tarjetas y botones modernos.

## **🏗️ Requisitos de Componentes**

Debes generar los siguientes componentes interactivos:

1. StatsCards: 4 tarjetas KPI (Total kWh, Costo $ MXN, Alertas Activas, Área Crítica). Usa íconos atractivos (Lucide-react).  
2. ConsumoChart: Una gráfica de línea (Recharts) que reciba un array de datos y se anime fluidamente cada vez que entra un dato nuevo. Los puntos con alerta: true deben pintarse de rojo.  
3. RankingAreas: Barras de progreso horizontales (Tailwind) ordenadas de mayor a menor consumo.  
4. AlertasTable: Una tabla de estilo moderno. Las filas nuevas deben tener una breve animación de aparición (fase in).

## **⚡ Efectos Especiales para la Demo**

* Si el estado global detecta una nueva "alerta/anomalía", el fondo de la pantalla debe hacer un ligero parpadeo rojo (efecto pulse de Tailwind) por 1 segundo para causar impacto en el jurado.  
* La UI debe ser 100% responsiva, priorizando la vista de escritorio (pantalla de presentación).