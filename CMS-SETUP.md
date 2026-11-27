# Cómo activar el panel de edición de contenido

Esto se configura **una sola vez**. Después de esto, para cambiar texto o fotos del sitio
no necesitas pedírmelo a mí ni tocar código: entras a una página web, editas, le das a
"Publicar", y en 1-2 minutos el cambio aparece solo en tu hosting de Namecheap.

Ningún paso de aquí requiere que me des a mí ninguna contraseña, token o dato sensible:
todo se configura directamente en las páginas de GitHub/Netlify/cPanel, en tu propia cuenta.

## Paso 1 — Crear el repositorio en GitHub

1. Entra a [github.com](https://github.com) y crea una cuenta gratis si no tienes.
2. Click en **New repository**. Nómbralo, por ejemplo, `airz-astro`. Puede ser privado.
3. Entra al repo recién creado → **Add file → Upload files**.
4. Del proyecto que te envié (descomprimido), arrastra **todo el contenido de la carpeta
   `airz-astro`** a esa página, **menos** las carpetas `node_modules` y `dist` (si existen) —
   esas no se suben, se regeneran solas. El archivo `.gitignore` ya las ignora si usas Git
   normal, pero si subes arrastrando manualmente, asegúrate de no incluirlas.
5. Dale "Commit changes" para que quede guardado en la rama `main`.

## Paso 2 — Crear el sitio en Netlify (aquí vive el panel, no tu sitio real)

Netlify aquí no sirve para alojar tu sitio de verdad (ese sigue siendo Namecheap) — solo
aloja la páginita del panel de edición, gratis.

1. Entra a [netlify.com](https://netlify.com) y crea una cuenta gratis (puedes usar tu
   cuenta de GitHub para entrar, es un botón directo).
2. **Add new site → Import an existing project → Deploy with GitHub**.
3. Elige el repositorio `airz-astro` que acabas de subir.
4. Netlify detecta solo la configuración (ya viene en el archivo `netlify.toml`). Dale
   **Deploy site**.
5. Espera a que termine (1-2 minutos). Te da una URL tipo `algo-al-azar.netlify.app`.

## Paso 3 — Activar Identity y Git Gateway (esto es lo que te deja entrar al panel)

1. Dentro del sitio en Netlify → **Site configuration → Identity → Enable Identity**.
2. En "Registration", elige **Invite only** (para que solo tú puedas entrar al panel).
3. Baja a **Services → Git Gateway → Enable Git Gateway**. Esto es lo que conecta el panel
   con tu repositorio de GitHub de forma segura, sin que tengas que crear ningún token tú
   mismo.

## Paso 4 — Invitarte a ti mismo como usuario del panel

1. En la misma sección de Identity, pestaña **Users → Invite users**.
2. Pon tu propio correo. Te llega un email de Netlify con un link para poner una
   contraseña.

## Paso 5 — Entrar al panel y editar

1. Ve a `https://TU-SITIO.netlify.app/admin/`.
2. Inicia sesión con el correo/contraseña que acabas de crear.
3. Verás un formulario con cada sección del sitio (Portada, Por qué elegirnos, Servicios,
   Sobre nosotros, Reseñas, FAQ, Pie de página, etc.) — cambias el texto o subes una foto
   nueva, y le das **Publish**.

Cada vez que publicas algo ahí, se guarda como un cambio en tu repositorio de GitHub.

## Paso 6 — Conectar la publicación automática a Namecheap

Para que esos cambios realmente lleguen a tu hosting sin que tengas que subir nada por
FTP a mano:

1. En GitHub, entra al repo → **Settings → Secrets and variables → Actions**.
2. Click **New repository secret** y crea estos 4, uno por uno:
   - `FTP_SERVER` → el host FTP de tu hosting (lo encuentras en cPanel → **FTP Accounts**,
     normalmente algo como `ftp.sprezet.digital`).
   - `FTP_USERNAME` → el usuario FTP (de esa misma pantalla de cPanel).
   - `FTP_PASSWORD` → la contraseña de esa cuenta FTP.
   - `FTP_SERVER_DIR` → la carpeta remota donde debe quedar el sitio. Mientras estamos
     probando, usa `/public_html/airz-astro/`. Cuando decidamos la ubicación final,
     cambias este valor aquí (no hace falta tocar código).
3. Listo. Desde ahora, cualquier publicación que hagas en el panel (`/admin`) dispara
   automáticamente: compilar el sitio → subirlo por FTP a esa carpeta de Namecheap.
4. Puedes ver el progreso de cada publicación en la pestaña **Actions** del repositorio en
   GitHub (tarda 1-2 minutos).

## Resumen de lo que queda viviendo dónde

- **Namecheap**: tu sitio real, el que ve el público.
- **GitHub**: el código y el contenido (la "fuente de la verdad"), con historial de cada
  cambio.
- **Netlify**: solo aloja la páginita `/admin` para que puedas editar desde el navegador.
  No es donde vive tu sitio público.

Si en algún momento quieres que yo haga un cambio más grande (una sección nueva, un
cambio de diseño), lo seguimos haciendo por aquí como hasta ahora — el panel es solo para
los cambios de texto/foto del día a día.
