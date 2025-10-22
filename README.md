# NGL-like (GitHub Pages) — Demo

Esta es una plantilla para crear un sitio tipo **NGL** (mensajes anónimos) alojado en **GitHub Pages**.

## Qué incluye
- `index.html` — página pública para dejar mensajes (ej: `https://usuario.github.io/juan`)
- `admin.html` — "buzón" para ver los mensajes
- `assets/` — CSS y JavaScript
- `firebase-config.js` — archivo con plantilla para conectar Firebase (opcional)
- `README.md` — este archivo

## Modos de funcionamiento
1. **Demo local (por defecto)** — guarda mensajes en `localStorage` del navegador. Funciona sin configuración y es ideal para pruebas locales o GitHub Pages cuando solo quieres diseño y flujo.
2. **Firebase (opcional)** — guarda mensajes en Realtime Database de Firebase. Requiere:
   - Crear proyecto en Firebase
   - Activar Realtime Database
   - Configurar `firebase-config.js` con `databaseURL`
   - (Opcional) Ajustar reglas de seguridad en Firebase

> ⚠️ Si usas Firebase con reglas públicas, cualquiera podrá leer/escribir. Cambia reglas antes de ponerlo en producción.

## Cómo usar
1. Sube estos archivos a un repositorio público en GitHub.
2. Activa GitHub Pages (branch `main` o `gh-pages`) desde Settings -> Pages.
3. Para probar localmente, abre `index.html` en el navegador.
4. Para usar Firebase, edita `firebase-config.js` y cambia `const mode='local'` a `const mode='firebase'` en `assets/app.js`.

## Mejoras posibles
- Añadir verificación por token para proteger el buzón.
- Usar Firestore o Supabase para funciones avanzadas.
- Implementar moderación/auto-bloqueo.

Si quieres que yo:
- **Genere una versión con Firebase ya configurada** (necesitarás darme el `databaseURL`), o
- **Cambie el modo por defecto a Firebase** con instrucciones paso a paso,
dímelo y lo incluyo en el ZIP.

