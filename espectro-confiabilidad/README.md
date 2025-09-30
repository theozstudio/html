# Espectro de Confiabilidad Informativa - POSVERDAD

Aplicación web interactiva diseñada para la conferencia **Los Medios y las Formas** del proyecto POSVERDAD. Permite entrenar a participantes en la detección de desinformación utilizando el espectro de 8 niveles de confiabilidad informativa.

## Características

- Flujo guiado por pantallas: inicio, instrucciones, evaluación y resultados.
- 13 casos reales con retroalimentación detallada y puntaje adaptativo (+3/+1).
- Diseño responsive y mobile-first sin dependencias externas.
- Progreso guardado automáticamente en LocalStorage para continuar más tarde.
- Botón de compartir compatible con Web Share API y portapapeles.

## Estructura de archivos

```
espectro-confiabilidad/
├── index.html        # Marcado principal y secciones de la app
├── styles.css        # Estilos globales y responsive design
├── script.js         # Lógica de navegación, puntaje y almacenamiento
├── data.js           # Casos, explicaciones y rangos de clasificación
└── README.md         # Este documento
```

## Requisitos

- Navegador moderno con soporte para LocalStorage y ES6 (Chromium, Firefox, Safari, Edge).
- No se necesitan dependencias ni instalación adicional.

## Uso

1. Abre `index.html` en tu navegador o despliega la carpeta en un servidor estático (por ejemplo, GitHub Pages).
2. Ingresa tu nombre y selecciona **Comenzar Evaluación**.
3. Lee las instrucciones y pulsa **Entendido, comenzar** para iniciar.
4. Analiza cada caso, elige un nivel del espectro y confirma tu respuesta.
5. Revisa la retroalimentación y continúa hasta completar los 13 casos.
6. Observa tu puntaje final, clasificación y mensaje personalizado.
7. Comparte tu resultado o reinicia para practicar de nuevo.

## Personalización y mantenimiento

### Modificar o agregar casos

1. Edita `data.js` y localiza el arreglo `CASES`.
2. Cada caso requiere:
   - `id`: número único.
   - `prompt`: enunciado del caso.
   - `correctOption`: valor numérico de 1 a 8.
   - `correctExplanation`: texto mostrado cuando se responde correctamente.
   - `incorrectExplanations`: objeto con mensajes específicos por opción y una clave `default` opcional.
3. Mantén el total de preguntas consistente con el valor `TOTAL_QUESTIONS` (se actualiza automáticamente al contar el arreglo).
4. Guarda el archivo y recarga la página para ver los cambios.

### Ajustar rangos de evaluación

- Dentro de `data.js`, edita el arreglo `CLASSIFICATION` para modificar rangos, títulos o mensajes.
- Asegúrate de que los rangos cubran de 0 a 39 sin traslapes.

### Cambiar textos o estilos

- **Textos**: Modifica `index.html` o las cadenas en `script.js`/`data.js`.
- **Colores y tipografía**: Actualiza variables CSS en `styles.css`.
- **Breakpoints**: Ajusta las media queries (`768px`, `1024px`) según tus necesidades.

## LocalStorage

El progreso se guarda bajo la clave `posverdad_espectro_progress_v1` con la siguiente estructura:

```json
{
  "name": "Nombre del participante",
  "currentIndex": 0,
  "score": 0,
  "completed": false
}
```

Al finalizar la evaluación, `completed` se marca como `true` y el puntaje final permanece almacenado hasta que el usuario reinicie o borre su historial.

## Desarrollo

- El código JavaScript está comentado y utiliza funciones modulares para facilitar la comprensión.
- No se emplean frameworks; todo está construido con HTML5, CSS3 y JavaScript vanilla para máxima compatibilidad offline.

## Licencia

Distribución interna para fines educativos del proyecto POSVERDAD.
