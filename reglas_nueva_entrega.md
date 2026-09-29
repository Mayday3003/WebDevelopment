Entrega 3 — Tu sitio web, ahora full-stack

Curso: Desarrollo Web · Semestre 2026-2 Modalidad: Individual Valor: 10 % de la nota final (Nota 2.3 · cierre del Seguimiento 2) Fecha límite: jueves 29 de octubre de 2026, antes del inicio de la clase de tu grupo Escala: 0–100 puntos, reportados sobre 5.0

    nota = (puntos / 100) × 5.0 — Ejemplo: 84 pts → 4.2 / 5.0

De dónde partimos

Entrega 1 (sitio web en HTML/CSS/JS)  →  Entrega 3 (el mismo sitio en Next.js + API + PostgreSQL + JWT)

Vas a tomar el mismo sitio de tu Entrega 1 —mismo dominio, mismo contenido, misma identidad visual— y llevarlo a nivel profesional:
En la Entrega 1 	En la Entrega 3
HTML, CSS y JavaScript puro 	Next.js (App Router) + TypeScript + Tailwind
El catálogo era un arreglo en app.js 	El catálogo vive en PostgreSQL y llega desde tu API
El formulario validaba y mostraba un JSON 	El formulario guarda de verdad en la base de datos
Cualquiera veía todo 	Hay usuarios con roles: registro, login y rutas protegidas con JWT

    ⚠️ Es obligatorio continuar tu dominio de la Entrega 1. Cambiarlo sin autorización del docente descuenta 10 puntos.

Sobre el uso de inteligencia artificial

Igual que en la Entrega 1, puedes usar IA. Y, igual que en la Entrega 1, la entrega está diseñada para que pegar el resultado no alcance.

Una lección de la calificación de la Entrega 1: el historial se revisa con las fechas de push en GitHub y los despliegues de Vercel, no solo con las fechas de los commits. Commits antedatados, historiales reescritos o un README que describe funciones que no existen en el código se notan, y bajan la nota en Git y README.
1. Backend — API REST

Un repositorio propio: Node.js + Express + TypeScript + Prisma + PostgreSQL, con las cuatro capas de clase (domain, application, infrastructure, interface).
Datos

    [ ] Tabla users con al menos nombre, email único, password (hash) y role (admin | user).
    [ ] La tabla del catálogo de tu Entrega 1 (productos, cursos, destinos…), con los datos reales que tenías en tu arreglo, cargados con un seed.
    [ ] Una tabla de interacción que relacione un usuario con el catálogo: lo que hacía el formulario de tu Entrega 1 (pedido, reserva, inscripción, solicitud…). Relación con llaves foráneas hacia users y hacia el catálogo.

Endpoints mínimos
Método 	Ruta 	Acceso
POST 	/api/auth/register 	Público
POST 	/api/auth/login 	Público
GET 	/api/<catalogo> 	Público, con paginación { pagination, data }
GET 	/api/<catalogo>/:id 	Público
POST · PUT · DELETE 	/api/<catalogo> 	Solo admin
POST 	/api/<interaccion> 	Usuario autenticado (queda a nombre del usuario del token)
GET 	/api/<interaccion>/mias 	Usuario autenticado: solo las suyas
GET 	/api/<interaccion> 	Solo admin: todas
Autenticación (JWT)

    [ ] Contraseñas guardadas con bcrypt. Nunca en texto plano, nunca devueltas en una respuesta.
    [ ] login responde un JWT firmado con JWT_SECRET leído de variables de entorno y con expiración (expiresIn).
    [ ] El payload lleva solo lo necesario: id y role. Nada de contraseñas ni datos sensibles, porque el payload se puede leer sin la clave.
    [ ] Registrar un email ya existente responde 409; credenciales inválidas responden 401 con un mensaje que no revela si falló el email o la contraseña.

Autorización

    [ ] Un middleware de autenticación centralizado que lee Authorization: Bearer <token>, lo verifica y deja el usuario disponible en la petición. Se aplica en los routers, no se copia en cada controlador.
    [ ] Un middleware de rol (por ejemplo soloAdmin).
    [ ] Sin token o token inválido/expirado → 401. Token válido pero sin permiso → 403.
    [ ] El id del usuario que crea una interacción se toma del token, nunca del body (si no, cualquiera crearía pedidos a nombre de otro).

Lo demás del backend

    [ ] Validaciones de body, params y query con 400; 404 cuando no existe; errores de Prisma capturados; sin stack trace.
    [ ] CORS configurado con la URL de tu frontend en Vercel (no *).
    [ ] .env.example con DATABASE_URL, JWT_SECRET, JWT_EXPIRES_IN, PORT. El .env real no se sube.

2. Frontend — Next.js

Un repositorio propio: Next.js (App Router) + TypeScript + Tailwind, con la organización por features que usamos en clase:

app/                          → rutas (page.tsx): solo componen
src/features/
├── common/
│   ├── config.ts             → API_BASE_URL desde NEXT_PUBLIC_API_HOST
│   ├── http.ts               → cliente HTTP: agrega el token y maneja el 401
│   └── components/           → Pagination, Button, Input, ...
├── auth/
│   ├── domain/               → tipos: User, LoginRequest, AuthResponse
│   ├── services/             → login, register
│   ├── hooks/                → useAuth (sesión actual, login, logout)
│   └── components/           → LoginForm, RegisterForm
├── <catalogo>/
│   ├── domain/ services/ hooks/ components/
└── <interaccion>/
    ├── domain/ services/ hooks/ components/

Migración del sitio

    [ ] El mismo contenido e identidad de tu Entrega 1, reconstruido con componentes y Tailwind. Responsive en móvil, tablet y escritorio.
    [ ] El catálogo se carga desde tu API, con estados visibles de cargando, vacío y error, y paginación por URL (?page=2) como en clase.
    [ ] El formulario de tu Entrega 1 ahora crea la interacción en la API (requiere sesión).

Consumo de la API

    [ ] Ningún componente llama a fetch directamente: todo pasa por services/, y los componentes usan hooks/.
    [ ] Un cliente HTTP centralizado (http.ts) que agrega Authorization: Bearer <token> automáticamente a cada petición.
    [ ] Si la API responde 401, el cliente cierra la sesión y lleva al usuario a /login.

Sesión

    [ ] Registro y login con formularios validados; los errores del backend se muestran junto al campo, no en un alert.
    [ ] La sesión sobrevive al refrescar la página. Logout borra el token.
    [ ] La barra de navegación cambia según la sesión: invitado ve "Ingresar"; usuario ve su nombre y "Salir"; admin ve además "Administración".

Rutas protegidas

    [ ] /mis-<interacciones> (o similar): solo usuarios con sesión; sin sesión → redirige a /login.
    [ ] /admin: solo rol admin; un usuario normal que escriba la URL es redirigido.
    [ ] Con sesión activa, /login y /registro redirigen al inicio.
    [ ] Página 404 propia (not-found.tsx).

    Ocultar un botón no es proteger una ruta. La protección real está en el backend (401/403); la del frontend es experiencia de usuario. Se evalúan las dos.

3. Despliegue

    [ ] Frontend en Vercel, con NEXT_PUBLIC_API_HOST apuntando a tu API en producción.
    [ ] Backend en Render o Railway, con sus variables de entorno configuradas en la plataforma.
    [ ] Ambos conectados a GitHub: un push a main actualiza el despliegue.

4. README (uno por repositorio)

    [ ] Qué es el proyecto, con los links de ambos despliegues.
    [ ] Cómo correrlo en local y qué variables de entorno necesita.
    [ ] Credenciales de prueba de un usuario admin y uno user creados por el seed (solo para el ambiente de la entrega).
    [ ] Decisiones técnicas en tus palabras:
        Explica el flujo completo de un login: desde que envías el formulario hasta que una ruta protegida responde.
        ¿Dónde guardas el token en el frontend y qué riesgo tiene esa decisión?
        ¿En qué caso tu API responde 401 y en cuál 403? Da un ejemplo real de tu proyecto.
        Si usaste IA, ¿para qué la usaste y qué tuviste que corregir?
    [ ] Una captura de la pestaña Network del navegador mostrando una petición protegida con el header Authorization.

5. Cómo lo va a probar el docente

Estas son las pruebas que se harán sobre tus despliegues. Pruébalas tú primero.

    Abrir el sitio sin sesión: el catálogo carga desde la API y la paginación funciona.
    Registrar un usuario nuevo; intentar registrarlo otra vez → error visible junto al campo.
    Iniciar sesión, refrescar la página → la sesión sigue activa.
    Crear una interacción desde el formulario → aparece en "mis …".
    Como user, escribir /admin en la URL → redirige.
    Como user, enviar DELETE /api/<catalogo>/:id con su token → 403.
    Enviar la misma petición sin token → 401.
    Como admin, crear, editar y borrar un ítem del catálogo desde /admin.
    Cerrar sesión y volver a una ruta privada → redirige a /login.

6. Rúbrica · 100 puntos
# 	Criterio 	Pts
1 	Backend: API REST en capas, CRUD y paginación 	15
2 	Backend: PostgreSQL, Prisma y modelo de datos 	10
3 	Backend: autenticación JWT 	15
4 	Backend: autorización por middleware y roles 	10
5 	Backend: validaciones y errores 	5
6 	Frontend: migración del sitio a Next.js y Tailwind 	10
7 	Frontend: organización por features y consumo de la API 	10
8 	Frontend: sesión (registro, login, logout, token, 401) 	10
9 	Frontend: rutas protegidas y por rol 	5
10 	Despliegue de ambos lados 	5
11 	Git y README con decisiones 	5
  	TOTAL 	100
Niveles de logro
  	Nivel 	Puntos del criterio
🟢 	Excelente 	100 %
🔵 	Bueno 	75 %
🟡 	Aceptable 	50 %
🔴 	Insuficiente 	0–25 %
Detalle por criterio

1. API REST en capas, CRUD y paginación · 15 pts 🟢 Cuatro capas limpias; CRUD del catálogo e interacción completos; { pagination, data }; códigos correctos. · 🔵 Funciona, con lógica en algún controlador o algún código incorrecto. · 🟡 Endpoints incompletos o sin paginación. · 🔴 La API no inicia o no expone el catálogo.

2. PostgreSQL, Prisma y modelo de datos · 10 pts 🟢 Tres tablas (users, catálogo, interacción) con llaves foráneas; seed con el contenido real de la Entrega 1; tipos apropiados. · 🟡 Faltan relaciones o el catálogo tiene datos de relleno. · 🔴 Sin base de datos real.

3. Autenticación JWT · 15 pts 🟢 bcrypt; JWT con expiración y JWT_SECRET en variables de entorno; payload mínimo; 409 en email repetido; 401 genérico en credenciales inválidas; la contraseña nunca sale en una respuesta. · 🔵 Funciona, pero sin expiración o con el secreto escrito en el código. · 🟡 Login emite token pero la contraseña no tiene hash. · 🔴 Sin autenticación.

4. Autorización por middleware y roles · 10 pts 🟢 Middleware centralizado; 401 sin token o con token inválido; 403 por rol; el autor de la interacción sale del token. · 🔵 Middleware presente, pero alguna ruta de escritura queda abierta o el userId viene del body. · 🟡 Verificación del token copiada en cada controlador, sin roles. · 🔴 Todas las rutas son públicas.

5. Validaciones y errores · 5 pts 🟢 Body, params y query validados; 400/404/409; errores de Prisma capturados; sin stack trace. · 🟡 Solo campos requeridos. · 🔴 Sin validaciones.

6. Migración del sitio a Next.js y Tailwind · 10 pts 🟢 Mismo dominio, contenido e identidad de la Entrega 1; componentes reutilizables; Tailwind; responsive; estados de cargando, vacío y error. · 🟡 Sitio genérico que ya no se parece a la Entrega 1, o sin estados de UI. · 🔴 No es Next.js o no carga.

7. Organización por features y consumo de la API · 10 pts 🟢 domain/services/hooks/components por feature; config.ts con NEXT_PUBLIC_API_HOST; ningún fetch en componentes; tipos definidos. · 🔵 Estructura presente con algún fetch suelto. · 🟡 Todo en las páginas. · 🔴 No consume tu API.

8. Sesión · 10 pts 🟢 Registro, login y logout; sesión persistente; token inyectado por el cliente HTTP; 401 redirige a login; errores junto al campo; navbar según la sesión. · 🔵 Falta el manejo automático del 401 o algún error no se muestra. · 🟡 La sesión se pierde al refrescar o el token se pasa a mano en cada llamada. · 🔴 Sin autenticación en el frontend.

9. Rutas protegidas y por rol · 5 pts 🟢 Ruta privada, ruta de admin, redirección desde login con sesión y página 404. · 🟡 Solo se ocultan botones; las rutas se abren escribiendo la URL. · 🔴 Sin protección.

10. Despliegue · 5 pts 🟢 Vercel y Render/Railway funcionando juntos; CORS con la URL de Vercel; variables en la plataforma. · 🟡 Solo un lado desplegado. · 🔴 Nada desplegado.

11. Git y README · 5 pts 🟢 Historial progresivo en ambos repos (verificado con fechas de push); README con credenciales de prueba, decisiones en palabras propias y captura de Network. · 🟡 Historial concentrado al final o README genérico. · 🔴 Uno o dos commits con todo, o sin README.
7. Penalizaciones
Situación 	Descuento
Dominio distinto al de tu Entrega 1 sin autorización 	−10 pts
Frontend con datos quemados en lugar de consumir tu API 	−20 pts
Backend o frontend sin TypeScript 	−15 pts cada uno
.env con credenciales reales o JWT_SECRET subido al repositorio 	−10 pts
Contraseñas en texto plano en la base de datos 	−10 pts
Uso de any generalizado 	−5 pts
Sin credenciales de prueba en el README (no se pueden probar los roles) 	−5 pts
Plagio 	Nota 0 y reporte académico
8. Bonificaciones (hasta +10 pts, sin pasar de 100)
Bonus 	Pts
Subida de imágenes para el catálogo (archivo, no solo URL) 	+4
Protección de rutas en el servidor con proxy.ts de Next.js y el token en una cookie 	+3
Filtros combinados en el catálogo (texto, categoría, rango de precio) 	+2
Pruebas automatizadas de los middlewares de autenticación y rol 	+3
Confirmación antes de eliminar en el panel de administración 	+1
9. Cómo entregar

Subir por UVirtual (Moodle) y enviar por correo al docente, ambos con cuatro links:

    Repositorio del backend.
    Repositorio del frontend.
    URL de la API desplegada.
    URL del sitio en Vercel.

10. Checklist antes de entregar

Backend

    [ ] Cuatro capas, Prisma solo en infrastructure/
    [ ] Tablas users, catálogo e interacción, con llaves foráneas y seed real
    [ ] register y login con bcrypt y JWT con expiración
    [ ] Middleware de auth y de rol aplicados en los routers
    [ ] Sin token → 401; user borrando el catálogo → 403
    [ ] CORS con la URL de Vercel; .env.example presente; .env ausente

Frontend

    [ ] Mismo sitio de la Entrega 1 en Next.js + Tailwind, responsive
    [ ] Features con domain, services, hooks, components
    [ ] Cliente HTTP que agrega el token y maneja el 401
    [ ] Sesión persistente al refrescar; logout funcional
    [ ] /admin y rutas privadas protegidas; página 404

Entrega

    [ ] Ambos lados desplegados y conectados
    [ ] Las nueve pruebas de la sección 5 pasan en producción
    [ ] README con credenciales de prueba, decisiones y captura de Network
    [ ] Links enviados por UVirtual y por correo
