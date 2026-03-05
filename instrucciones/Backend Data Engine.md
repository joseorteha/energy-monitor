# **INSTRUCCIONES PARA EL AGENTE IA: MOTOR DE DATOS (ESTADO LOCAL)**

## **📌 Rol y Objetivo**

Actúa como un Ingeniero de Software experto en manejo de estados complejos en React y Node.js. Para este MVP de Hackathon, **NO usaremos una base de datos externa**. Tu objetivo es construir un "Motor de Datos Simulado" robusto usando estado local (useState, useEffect) que inyecte JSONs periódicamente para simular un flujo de sensores IoT en tiempo real.

## **⚙️ Arquitectura del Motor (Simulador IoT)**

Crea la lógica separada en un hook personalizado llamado useMotorDatos.js.

### **1\. Diccionario de Áreas (Datos Base)**

Define las siguientes áreas de monitoreo:

* Línea de Producción (Límite: 8.0 kWh)  
* Cuarto de Máquinas (Límite: 10.0 kWh)  
* Oficinas Administrativas (Límite: 3.0 kWh)  
* Comedor (Límite: 2.0 kWh)  
* *Tarifa Eléctrica:* 1.35 MXN por kWh.

### **2\. Estructura del JSON (Lectura de Sensor)**

Cada lectura generada debe tener este formato:

{  
  "id": "timestamp\_unico",  
  "hora": "HH:MM:SS",  
  "area\_id": 1,  
  "area\_nombre": "Línea de Producción",  
  "consumo\_kwh": 4.5,  
  "costo\_estimado": 6.07,  
  "alerta\_anomalia": false  
}

### **3\. Lógica del Hook (useMotorDatos)**

* **Intervalo:** Usa setInterval para generar un nuevo objeto JSON cada **3000ms (3 segundos)**.  
* **Ventana Deslizante:** Mantén solo las últimas 50 lecturas en un array para evitar problemas de memoria.  
* **Aleatoriedad:** El consumo debe variar aleatoriamente por debajo del límite del área.  
* **Anomalías:** Hay un 10% de probabilidad de que una lectura supere por mucho su límite (alerta\_anomalia: true).  
* **Botón de Pánico (Importante):** Expón una función dispararEmergencia() que, al ser llamada, inyecte inmediatamente un JSON con una anomalía extrema. Esto se usará en vivo frente a los jueces.  
* **Métricas:** El hook debe retornar variables calculadas: total acumulado de kWh, costo total, y un diccionario con el consumo agrupado por área.