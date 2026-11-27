import { defineConfig } from 'astro/config';

// Static site, deployable as plain files to any traditional host (Namecheap cPanel via FTP).
//
// BASE_PATH controla en qué subcarpeta vive el sitio:
// - En Namecheap (vía GitHub Actions) por ahora estamos probando en /airz-astro/,
//   así que ese es el valor por defecto abajo.
// - En Netlify (donde solo vive el panel /admin para editar contenido, no el
//   sitio "real"), se define la variable de entorno BASE_PATH=/ en la
//   configuración del sitio de Netlify, para que las imágenes/CSS carguen
//   bien desde la raíz de ese dominio de prueba.
// Cuando decidas la ubicación final en Namecheap (reemplazar /airz/, dominio
// raíz, etc.), cambia el valor por defecto aquí y en el secret FTP_SERVER_DIR
// de GitHub.
const base = process.env.BASE_PATH || '/airz-astro';

export default defineConfig({
  site: 'https://sprezet.digital',
  base,
  output: 'static',
  build: {
    assets: 'assets',
  },
});
