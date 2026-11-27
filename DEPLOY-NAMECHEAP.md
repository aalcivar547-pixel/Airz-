# Despliegue de airz (Astro) en Namecheap vía FTP

Este proyecto es un sitio **100% estático**: Astro lo compila a archivos HTML/CSS/JS planos
que funcionan en cualquier hosting tradicional (cPanel + FTP), exactamente como tu hosting
de Namecheap. No usa Node.js en producción ni necesita Vercel/Netlify.

## 1. Generar los archivos finales

En una máquina con Node.js 18+ instalado:

```bash
npm install
npm run build
```

Esto crea la carpeta `dist/` con el sitio ya compilado (HTML, CSS, JS e imágenes). Esa carpeta
es lo único que se sube al hosting.

## 2. Subir por FTP a Namecheap

1. Entra a cPanel → **FTP Accounts** (o usa las credenciales FTP que ya tengas) y conéctate con
   FileZilla u otro cliente FTP.
2. Si el sitio va en la raíz del dominio (ej. `tudominio.com/`): sube **el contenido** de `dist/`
   (no la carpeta `dist` en sí) directamente dentro de `public_html/`.
3. Si el sitio va en una subcarpeta (ej. `tudominio.com/airz/`): crea esa carpeta dentro de
   `public_html/` y sube el contenido de `dist/` ahí. En ese caso, antes de compilar, abre
   `astro.config.mjs` y descomenta la línea `base: '/airz'` (ajusta el nombre si usas otra
   subcarpeta), luego vuelve a correr `npm run build`.
4. Confirma que `index.html`, la carpeta `assets/` y la carpeta `images/` quedaron todos al
   mismo nivel dentro de `public_html/` (o `public_html/airz/`).

No hace falta subir `node_modules/`, `src/`, ni los archivos de configuración: eso es solo para
desarrollo. Lo único que el hosting necesita es el contenido de `dist/`.

## 3. Actualizar contenido más adelante

Para cambiar textos, imágenes o estilos:

1. Edita los archivos `.astro` dentro de `src/components/` y `src/pages/`.
2. Corre `npm run build` de nuevo.
3. Vuelve a subir por FTP el contenido actualizado de `dist/` (sobrescribiendo los archivos
   anteriores).

## 4. Cosas del contenido original que conviene revisar

Durante la migración se respetó el contenido real del sitio en WordPress, pero se detectaron
estas inconsistencias que ya existían ahí (no se "corrigieron" solas para no inventar datos):

- El nombre del fundador aparece escrito de dos formas distintas en el mismo párrafo:
  "Juan **Ludeña**" y "Juan **Ludueña**" (y el usuario de YouTube es `@juanludena-i8o`).
  Habría que confirmar cuál es la ortografía correcta y dejarla igual en todo el sitio.
- La sección de estadísticas dice "24/7 Response Readiness", pero el FAQ dice que el horario
  de atención es "Monday to Friday, from 7:00 AM to 6:00 PM". Son dos mensajes contradictorios.
- En las reseñas (Reviews), cada cita está firmada con un nombre dentro del texto (ej. "- Alex R.
  in Stamford") pero la tarjeta muestra debajo un nombre y empresa distintos (ej. "James Clark /
  Bridgeport Holdings, CT"). Parecen datos de dos campos distintos que quedaron cruzados.
- La franja de marcas bajo "Why Choose Us" solo repite "Arctic Breeze" / "Crystalline Air" cuatro
  veces, sin logos reales — probablemente texto de relleno (placeholder) del tema original que
  nunca se reemplazó con los socios/productos reales.

Estos puntos se dejaron tal cual estaban en el sitio original para no decidir por ti; dime qué
versión es la correcta y lo ajusto.

## 5. Imágenes

Las fotos de fondo del hero y las fotos decorativas circulares se extrayeron directamente del
sitio en vivo y ya están incluidas en `public/images/`. El logo del header se reconstruyó como
texto + ícono (en vez de la imagen pequeña original) para que se vea nítido en pantallas de alta
resolución; los colores y la tipografía son una réplica exacta de los que usa el sitio actual.
