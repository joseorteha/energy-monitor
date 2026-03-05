# **INSTRUCCIONES PARA EL AGENTE IA: CONTEXTO DEL NEGOCIO Y PITCH**

## **📌 Contexto del Proyecto**

Eres un consultor de producto ayudando a un equipo a ganar un Hackathon de 9 horas. El código que generes debe estar alineado con resolver un problema de negocio real y ser espectacular durante una demo en vivo de 2 minutos.

## **🔴 El Problema (Punto Ciego Energético)**

* Las empresas industriales sufren de facturas eléctricas altísimas sin justificación clara.  
* No tienen datos segmentados; solo saben el total mensual, pero no saben si el "Cuarto de Máquinas" o la "Línea de Producción" está desperdiciando energía a las 3:00 AM.  
* Consecuencia: Decisiones tomadas a ciegas y entre un 15% y 30% de desperdicio energético continuo y silencioso.

## **🟢 La Solución (MVP a construir)**

Un Dashboard de Monitoreo Energético que actúa como "el Google Analytics del consumo eléctrico".

* Traduce los datos técnicos de sensores (Watts/kWh) a lenguaje de negocios (Costo en Pesos $ MXN).  
* Detecta picos anómalos automáticamente y alerta antes de que termine el mes.

## **🎯 Enfoque para el Código Generado**

1. **El Dinero Manda:** Los KPIs más grandes en la UI deben ser los Costos en Pesos ($ MXN). Al jurado le importa el retorno de inversión (ROI).  
2. **Cero Tolerancia a Fallas:** Por eso usamos un JSON Simulator en lugar de una Base de Datos real. La presentación no puede fallar por problemas de Wi-Fi o CORS.  
3. **Efecto Demostración:** Todo debe estar diseñado para reaccionar de forma exagerada (pero profesional) cuando se presiona el botón "Simular Emergencia". Queremos que los jueces vean exactamente cómo el sistema salva dinero al instante.

*Nota para la IA: Mantén este contexto en mente al diseñar la UI y prioriza el código funcional sobre configuraciones complejas.*