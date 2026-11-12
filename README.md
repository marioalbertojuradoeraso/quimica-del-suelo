# Química del Suelo · Del suelo y del sedimento

Recorrido interactivo para entender la química y la física del suelo y de los
sedimentos de río, sin necesitar conocimientos previos. 15 módulos con texto,
ilustración, simulador, pregunta y narración en voz alta.

## Cómo abrirlo

No hay nada que instalar.

- **En línea:** abre el enlace del sitio publicado (GitHub Pages).
- **Sin conexión o sin el enlace:** descarga la carpeta y haz doble clic en
  `index.html`. Funciona en Chrome, Edge y Firefox.

## Qué encontrarás

Cada módulo responde tres cosas, en ese orden:

1. **¿Qué es?** — la idea, explicada desde cero.
2. **¿Por qué hablamos de esto?** — qué problema real resuelve.
3. **¿Para qué se mide?** — qué dato te da y qué significa.

Y además:

- **Ilustración** generada para el módulo.
- **Un simulador** para mover variables con la mano y ver qué pasa.
- **Una pregunta** sin nota: si acertaste, te dicen por qué; si no, te lo
  explican de otra forma.
- **Narración en voz alta** (1–2 min) que puedes escuchar mientras lees.
- **Tamaño de texto** con los botones `A−` y `A+` de la cabecera: se guarda en tu
  dispositivo y agranda también títulos, tablas y botones.
- **Contador** «módulo N de 15» que avanza contigo y se guarda al terminar cada
  módulo.
- **Sonido de avance** desactivable con el icono 🔔.

## Contenido

| Grupo | Módulos |
|---|---|
| Fundamentos | 1. De la roca al suelo · 2. ¿Qué es exactamente el suelo? · 3. Suelo y sedimento de río no son lo mismo · 4. Los horizontes del suelo |
| Composición | 5. Textura · 6. Estructura |
| Parámetros físicos | 7. Porosidad, densidad y retención de agua |
| Parámetros químicos | 8. pH · 9. Capacidad de intercambio catiónico (CIC) · 10. Salinidad |
| Materia viva | 11. Materia orgánica · 12. Nutrientes del suelo |
| Problema y respuesta | 13. Contaminación del suelo · 14. Remediación · 15. Fertilidad y vulnerabilidad |

## Créditos

- Textos, diseño y código: material educativo abierto de uso libre.
- Ilustraciones: generadas con modelos de imagen (FLUX).
- Voces de los módulos: generadas con ElevenLabs, voz James (español de Colombia).
- Funciona sin servidor ni cuenta: todo se ejecuta en tu navegador.

## Estructura del sitio

```
index.html        estructura y cabecera
style.css         diseño, tamaños de texto y adaptación a pantallas
contenido.js      los 15 módulos: texto, datos, preguntas y guion de voz
app.js            navegación, simuladores, voz, progreso y avisos
assets/           ilustraciones
assets/audio/     narraciones en MP3
```

Si quieres publicar tu propia copia, sube esta carpeta a cualquier alojamiento
de páginas estáticas (GitHub Pages, Netlify, Vercel, Cloudflare Pages).
