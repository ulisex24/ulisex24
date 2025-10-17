# Mini sitio - 3 apartados

Estructura de archivos:

- `index.html` - Página principal con botones a cada apartado.
- `mi-info.html` - Página con información personal (protegida por login).
- `videojuegos.html` - Artículo sobre videojuegos.
- `contacto.html` - Información de contacto y ayuda.
- `login.html` / `register.html` - Login y registro (almacenamiento simple en localStorage).
- `styles.css` - Estilos mínimos, sin colores.

Cómo probarlo localmente:

1. Coloca todos los archivos en el mismo directorio (por ejemplo `c:/AppServ/www/proyect9/`).
2. Abre `index.html` en el navegador (o accede vía tu servidor local si usas Apache).
3. Para ver la información personal pulsa el botón 1: serás redirigido a `login.html`.
4. Si no tienes cuenta, crea una en `register.html`. El registro guarda la cuenta en `localStorage` del navegador.
5. Inicia sesión con la cuenta creada; al entrar verás `mi-info.html`.

Limitaciones y seguridad:

- Este sistema de login/registro es solo para demostración y usa `localStorage`. No es seguro para producción.
- Para producción necesitarás un backend con almacenamiento seguro, hash de contraseñas y sesiones.
