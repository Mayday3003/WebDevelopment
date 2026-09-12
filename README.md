Un espacio personal donde comparto proyectos, intereses, experiencias y momentos importantes, y donde las personas que han formado parte de ellos pueden aportar contenido.



                    MI ESPACIO PERSONAL
                            │
        ┌───────────────────┼───────────────────┐
        ↓                   ↓                   ↓
    PROYECTOS            EXPERIENCIAS        INTERESES
        │                   │                   │
   Investigación        Viajes              Deporte
   Universidad          Eventos             Música
   Proyectos            Momentos             Libros



                       PERSONAS
                           │
                           │ participan
                           ↓
                    ACTIVIDADES
                     /    |     \
                    /     |      \
             investigación viaje deporte
                    │       │       │
                    └───────┼───────┘
                            │
                       experiencias

"Compartir un recuerdo"

Y una persona podría enviar:

Nombre
[________________]

¿Qué compartimos?
[ Investigación ▼ ]

Título
[________________]

Cuéntame sobre este momento
[___________________________]

Imagen
[ Seleccionar imagen ]

[Enviar]


¿Qué compartimos?

○ Investigación
○ Viaje
○ Deporte
○ Evento
○ Proyecto
○ Otro


"Personas que estuvieron ahí"


Persona
   │
   ├── participa en → Investigación
   ├── participa en → Viaje
   ├── participa en → Evento
   └── participa en → Actividad


                    ┌─────────────────────┐
                    │     MI ESPACIO      │
                    │                     │
                    │  Sobre mí           │
                    │  Mi historia       │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼─────────────────┐
             ↓                 ↓                 ↓
       INVESTIGACIÓN        DEPORTE         EXPERIENCIAS
             │                 │                 │
             └─────────────────┼─────────────────┘
                               ↓
                         ACTIVIDADES
                               │
                  ┌────────────┼────────────┐
                  ↓            ↓            ↓
               Personas     Recuerdos    Imágenes
                  │            │
                  └────────────┘
                       ↑
                       │
                  MIS AMIGOS
                       │
                       ↓
                "Comparte algo"
                       │
                       ↓
                  FORMULARIO




 # Mi espacio personal — Bitácora interactiva

## 1. Descripción del proyecto

Este proyecto consiste en la creación de un espacio web personal e interactivo que permita mostrar diferentes aspectos de mi vida, mis intereses y las actividades en las que participo.

La idea no es construir únicamente un blog tradicional, sino una especie de **bitácora personal**, en la que pueda organizar y compartir diferentes experiencias. Entre ellas se encuentran proyectos de investigación, actividades deportivas, viajes, experiencias universitarias, proyectos personales y otros intereses.

El sitio también tendrá un componente colaborativo. Las personas con las que he compartido alguna de estas experiencias podrán aportar recuerdos, comentarios o información relacionada mediante un único formulario.

De esta manera, el sitio no solamente cuenta cosas sobre mí, sino que permite representar las relaciones entre las actividades que realizo y las personas que han participado en ellas.

---

## 2. ¿Por qué escogí este proyecto?

Escogí este proyecto porque quería desarrollar algo que tuviera relación con mi vida real y que pudiera continuar creciendo durante el curso.

En lugar de realizar una página genérica sobre una tienda, una cafetería o cualquier otro ejemplo, decidí utilizar como dominio mis propias experiencias, intereses y actividades.

Esto permite que el contenido sea real y propio, y que las decisiones tomadas durante el desarrollo tengan relación directa con el proyecto.

Además, la estructura del sitio permite que posteriormente pueda evolucionar hacia una API REST, ya que existen diferentes tipos de información que pueden relacionarse entre sí.

---

## 3. ¿Cómo cumple el proyecto con los requisitos?

El proyecto cumple las tres condiciones principales solicitadas para escoger el dominio.

### 3.1 Dos tipos de cosas relacionables

El proyecto tendrá principalmente dos tipos de entidades:

* **Actividades:** proyectos de investigación, viajes, actividades deportivas, eventos y otras experiencias.
* **Personas:** personas que participaron o estuvieron relacionadas con esas actividades.

Por ejemplo:

```text
Proyecto de investigación
        │
        ├── Persona 1
        ├── Persona 2
        └── Persona 3
```

O:

```text
Viaje
   │
   ├── Persona 1
   └── Persona 2
```

Una misma persona puede participar en diferentes actividades.

Esto hace que exista una relación natural entre los datos y permite que posteriormente puedan convertirse en recursos de una API.

### 3.2 Catálogo o listado

Las actividades se mostrarán mediante un catálogo de tarjetas.

Cada tarjeta podrá contener:

* Imagen.
* Nombre.
* Categoría.
* Fecha.
* Descripción corta.
* Personas relacionadas.
* Botón para conocer más información.

Las actividades podrán clasificarse, por ejemplo, en:

* Investigación.
* Deporte.
* Viajes.
* Universidad.
* Proyectos.
* Otros.

El catálogo será generado dinámicamente mediante un arreglo de objetos en TypeScript, en lugar de escribir todas las tarjetas directamente en HTML.

Esto permitirá que posteriormente el arreglo pueda ser reemplazado por información obtenida desde una API.

### 3.3 Formulario

El proyecto tendrá **un único formulario** llamado, por ejemplo:

**"Comparte un recuerdo"**

La decisión de utilizar solamente un formulario busca evitar formularios innecesarios y darle una función real a la interacción.

Una persona podrá utilizarlo para compartir información sobre alguna actividad en la que haya participado conmigo.

El formulario tendrá campos como:

* Nombre.
* Actividad relacionada.
* Tipo de experiencia.
* Título del recuerdo.
* Descripción.
* Imagen opcional.

El formulario será validado mediante JavaScript/TypeScript antes de ser enviado.

Los errores aparecerán junto al campo correspondiente y no mediante `alert`.

---

# 4. Estructura general del sitio

El sitio estará organizado de la siguiente manera:

```text
MI ESPACIO PERSONAL
│
├── Inicio
│
├── Sobre mí
│
├── Actividades
│   ├── Investigación
│   ├── Deporte
│   ├── Viajes
│   ├── Universidad
│   └── Otros
│
├── Personas
│
└── Comparte un recuerdo
```

No se pretende que cada categoría sea una página completamente independiente.

La sección de actividades funcionará como un catálogo que puede filtrarse según la categoría.

---

# 5. Secciones del sitio

## 5.1 Inicio

La página de inicio será la presentación principal.

Debe transmitir inmediatamente la idea del proyecto.

Contendrá:

* Una introducción personal.
* Una frase corta que represente el concepto del sitio.
* Una imagen principal.
* Un botón para explorar las actividades.
* Una pequeña selección de actividades destacadas.

Ejemplo conceptual:

```text
-----------------------------------------
              MI ESPACIO

        "Las cosas que hago,
         las personas que conozco
         y las experiencias que comparto."

             [Explorar]
-----------------------------------------
```

La página debe ser visualmente limpia y tener una identidad propia.

---

## 5.2 Sobre mí

Esta sección explicará brevemente quién soy y qué representa el proyecto.

Puede contener:

* Una presentación.
* Intereses.
* Áreas académicas.
* Actividades.
* Una fotografía o imagen representativa.

No debe convertirse en un currículum completo.

La idea es que funcione como contexto para comprender las actividades que aparecen posteriormente.

---

# 6. Actividades

Esta será una de las partes principales del proyecto.

Las actividades serán mostradas mediante un catálogo de tarjetas.

Ejemplo:

```text
                MIS ACTIVIDADES

 [Todas] [Investigación] [Deporte] [Viajes]

 ┌───────────────┐  ┌───────────────┐
 │     FOTO      │  │     FOTO      │
 │               │  │               │
 │ Investigación │  │ Cartagena     │
 │ 2026          │  │ 2026          │
 │               │  │               │
 │ [Ver más]     │  │ [Ver más]     │
 └───────────────┘  └───────────────┘
```

---

# 7. Categorías

Las categorías iniciales serán:

### 🔬 Investigación

Proyectos, investigaciones, actividades académicas y experiencias relacionadas con investigación.

### 🏃 Deporte

Actividades deportivas, entrenamientos, competencias y experiencias relacionadas con el deporte.

### ✈️ Viajes

Viajes, lugares visitados y experiencias relacionadas con ellos.

### 🎓 Universidad

Experiencias académicas, proyectos, eventos y actividades universitarias.

### 💡 Proyectos

Proyectos personales o actividades que no pertenezcan directamente a las categorías anteriores.

### ✨ Otros

Experiencias que no encajen en las categorías anteriores.

Estas categorías pueden modificarse durante el desarrollo si se descubre que alguna no representa correctamente el contenido.

---

# 8. Modelo de datos inicial

Antes de utilizar una API se utilizarán datos locales.

Por ejemplo:

```typescript
interface Actividad {
    id: number;
    titulo: string;
    categoria: string;
    fecha: string;
    descripcion: string;
    imagen: string;
    personas: number[];
}
```

Las personas tendrán una estructura independiente:

```typescript
interface Persona {
    id: number;
    nombre: string;
    descripcion: string;
    imagen?: string;
}
```

Y los recuerdos enviados mediante el formulario podrían tener:

```typescript
interface Recuerdo {
    id: number;
    nombre: string;
    actividadId: number;
    titulo: string;
    descripcion: string;
    imagen?: string;
}
```

La relación principal sería:

```text
Actividad
    │
    ├── personas[]
    │
    └── recuerdos[]
```

Esto permitirá que la estructura pueda convertirse posteriormente en una API.

---

# 9. Uso de Grid

CSS Grid será utilizado principalmente para el **catálogo de actividades**.

Esto se debe a que el catálogo tiene una estructura bidimensional: existen filas y columnas de tarjetas.

Por ejemplo:

```css
.catalogo {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
}
```

La cantidad de columnas cambiará automáticamente dependiendo del ancho disponible.

En escritorio podrían aparecer varias tarjetas por fila.

En tablet podrían aparecer menos.

En móvil las tarjetas podrían ocupar una sola columna.

Por eso Grid resulta adecuado para esta parte del proyecto.

---

# 10. Uso de Flexbox

Flexbox se utilizará principalmente para elementos que necesiten organizarse en una sola dimensión.

Por ejemplo:

* Barra de navegación.
* Botones.
* Elementos internos de las tarjetas.
* Alineación del contenido del encabezado.
* Distribución de elementos dentro del formulario.
* Secciones pequeñas donde los elementos se organizan horizontal o verticalmente.

Ejemplo:

```css
.nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
```

La diferencia principal que se tendrá en cuenta será:

```text
GRID
↓
organización en filas y columnas

FLEXBOX
↓
organización principalmente en una dirección
```

No se utilizará Grid y Flexbox arbitrariamente. Cada uno se utilizará donde su modelo de distribución tenga sentido.

---

# 11. Diseño responsive

El sitio deberá funcionar correctamente en:

* Móvil.
* Tablet.
* Escritorio.

El catálogo será una de las principales partes responsive.

Ejemplo conceptual:

```text
MÓVIL

┌─────────────┐
│   tarjeta   │
└─────────────┘

┌─────────────┐
│   tarjeta   │
└─────────────┘
```

```text
TABLET

┌───────────┐ ┌───────────┐
│ tarjeta   │ │ tarjeta   │
└───────────┘ └───────────┘
```

```text
ESCRITORIO

┌─────────┐ ┌─────────┐ ┌─────────┐
│ tarjeta │ │ tarjeta │ │ tarjeta │
└─────────┘ └─────────┘ └─────────┘
```

Se debe evitar que el contenido se desborde horizontalmente.

---

# 12. JavaScript / TypeScript

El comportamiento interactivo será implementado con TypeScript, siempre que el uso de TypeScript sea aprobado para esta entrega.

No se utilizarán frameworks como:

* React.
* Vue.
* Angular.
* Bootstrap.
* Tailwind.

La lógica estará directamente relacionada con el DOM.

---

# 13. Interacciones JavaScript

El proyecto tendrá al menos tres interacciones diferentes.

## Interacción 1 — Catálogo dinámico

Las tarjetas de actividades no estarán escritas manualmente en HTML.

Se generarán desde un arreglo de objetos.

Conceptualmente:

```text
Array de actividades
        ↓
TypeScript
        ↓
recorre los objetos
        ↓
crea las tarjetas
        ↓
las inserta en el DOM
```

Esto permitirá practicar manipulación del DOM y preparar el proyecto para la futura API.

---

## Interacción 2 — Filtro por categoría

El usuario podrá seleccionar:

```text
[Todos]
[Investigación]
[Deporte]
[Viajes]
[Universidad]
[Proyectos]
```

TypeScript filtrará el arreglo y actualizará las tarjetas mostradas.

Por ejemplo:

```text
Usuario selecciona "Investigación"
                ↓
filtrar actividades
                ↓
mostrar solamente Investigación
```

Esto constituye una interacción real con el catálogo.

---

## Interacción 3 — Formulario

El formulario "Comparte un recuerdo" tendrá validación.

Se comprobará, como mínimo:

* Que el nombre no esté vacío.
* Que el título tenga una longitud mínima.
* Que la descripción tenga una longitud mínima.
* Que se haya seleccionado una actividad.
* Que los datos cumplan las condiciones establecidas.

Los errores aparecerán junto al campo.

Ejemplo:

```text
Nombre
[                   ]
El nombre es obligatorio.
```

En lugar de:

```text
alert("Error");
```

---

# 14. Eventos

Se utilizará `addEventListener` para responder a acciones del usuario.

Por ejemplo:

```text
click
submit
input
```

Algunos eventos serán:

```text
Click en categoría
        ↓
filtrar catálogo
```

```text
Submit del formulario
        ↓
validar información
        ↓
mostrar resultado
```

Los eventos serán utilizados para conectar las acciones del usuario con la lógica del sitio.

---

# 15. Un único formulario

Se utilizará deliberadamente **un solo formulario**.

No se crearán formularios independientes para viajes, investigación, deporte, contacto, etc.

La razón es que todas esas situaciones pueden representarse mediante una misma acción:

> **Compartir un recuerdo relacionado con una actividad.**

El usuario seleccionará la actividad y podrá indicar qué quiere compartir.

Esto hace que el formulario tenga una función coherente con el propósito general del proyecto.

Posteriormente, este mismo formulario podrá conectarse con la API REST.

---

# 16. Posible flujo del formulario

```text
Usuario entra a:
"Comparte un recuerdo"

        ↓

Escribe su nombre

        ↓

Selecciona una actividad

        ↓

Escribe un título

        ↓

Escribe su recuerdo

        ↓

Opcionalmente agrega una imagen

        ↓

Presiona "Compartir"

        ↓

TypeScript valida

        ↓
   ┌───────────────┐
   │ ¿Es válido?   │
   └───────┬───────┘
           │
       ┌───┴───┐
       ↓       ↓
      NO       SÍ
       │       │
       ↓       ↓
    errores   procesar
```

---

# 17. Estructura de archivos

La estructura inicial del proyecto será aproximadamente:

```text
mi-espacio-personal/
│
├── index.html
│
├── styles.css
│
├── src/
│   ├── main.ts
│   ├── data.ts
│   ├── types.ts
│   └── components.ts
│
├── dist/
│
├── images/
│   ├── actividades/
│   └── perfil/
│
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

La estructura puede cambiar durante el desarrollo si se encuentra una organización más sencilla.

La prioridad será mantener el proyecto comprensible, especialmente porque todavía estoy aprendiendo TypeScript.

---

# 18. Orden de desarrollo

No se debe intentar construir todo el sitio de una sola vez.

El proyecto se desarrollará progresivamente.

## Paso 1 — Crear el repositorio

Crear un repositorio público en GitHub.

Nombre sugerido:

```text
mi-espacio-personal
```

No utilizar nombres genéricos como:

```text
proyecto-web
pagina
tarea
```

El repositorio debe representar el dominio del proyecto.

---

# 19. Paso 2 — Crear la estructura HTML

Primero construir únicamente la estructura.

Utilizar HTML semántico:

```html
<header>
<nav>
<main>
<section>
<article>
<footer>
```

No utilizar `<div>` para absolutamente todo.

La página debe tener un único `<h1>`.

La jerarquía debe seguir una estructura lógica:

```text
h1
 ├── h2
 │    └── h3
 └── h2
      └── h3
```

Antes de avanzar se debe comprobar que el HTML sea válido.

---

# 20. Paso 3 — Crear la identidad visual

Definir:

* Tipografía.
* Colores.
* Espaciado.
* Bordes.
* Sombras.
* Tamaños.
* Estilo de botones.
* Estilo de tarjetas.

Utilizar variables CSS.

Ejemplo:

```css
:root {
    --color-background: ...;
    --color-text: ...;
    --color-primary: ...;
    --color-card: ...;
    --spacing-md: ...;
}
```

La página debe tener una identidad visual coherente.

---

# 21. Paso 4 — Construir el Header

Primero diseñar:

```text
Logo / nombre
       |
Inicio
Sobre mí
Actividades
Personas
Participa
```

Aquí se utilizará principalmente **Flexbox**, porque los elementos se organizan en una dirección horizontal.

Posteriormente se añadirá el comportamiento móvil.

---

# 22. Paso 5 — Construir el Hero

La primera pantalla debe ser visualmente atractiva.

Debe contener:

* Título.
* Descripción.
* Imagen.
* Botón de acción.

El objetivo es que una persona entienda rápidamente qué es el sitio.

---

# 23. Paso 6 — Construir el catálogo

Primero crear una tarjeta visual.

Después crear varias tarjetas utilizando datos temporales.

Finalmente reemplazar esas tarjetas escritas manualmente por datos almacenados en TypeScript.

La evolución será:

```text
HTML manual
      ↓
Array de objetos
      ↓
TypeScript
      ↓
DOM
      ↓
tarjetas dinámicas
```

Este paso es especialmente importante porque prepara el proyecto para la API.

---

# 24. Paso 7 — Implementar Grid

El catálogo debe utilizar CSS Grid.

Se debe comprobar:

* Que las tarjetas tengan tamaños razonables.
* Que exista separación entre ellas.
* Que cambien de columnas.
* Que no haya desbordamiento.
* Que funcione en móvil.

---

# 25. Paso 8 — Implementar el filtro

Agregar botones:

```text
Todos
Investigación
Deporte
Viajes
Universidad
Proyectos
Otros
```

Cada botón debe cambiar el contenido del catálogo.

La información debe venir del mismo arreglo de actividades.

No se deben crear catálogos diferentes para cada categoría.

---

# 26. Paso 9 — Crear la sección Personas

Mostrar las personas relacionadas con las actividades.

No es necesario tener una enorme cantidad de personas.

Se pueden utilizar algunos datos reales o representativos para demostrar la relación.

La idea es:

```text
Persona
   ↓
participa en
   ↓
Actividad
```

---

# 27. Paso 10 — Crear el formulario

Crear solamente:

**"Comparte un recuerdo"**

Diseñarlo visualmente para que tenga coherencia con el resto de la página.

El formulario debe tener:

* Labels correctamente asociados.
* Campos claros.
* Indicaciones.
* Botón.
* Mensajes de error.

---

# 28. Paso 11 — Validar el formulario

Implementar validación mediante TypeScript.

Primero comprobar campos vacíos.

Después:

* Longitud mínima.
* Formato de correo si se utiliza correo.
* Actividad seleccionada.
* Descripción suficientemente larga.

Los errores deben aparecer junto al campo correspondiente.

---

# 29. Paso 12 — Responsive

Probar específicamente:

```text
Móvil
Tablet
Escritorio
```

No asumir que porque se vea bien en el computador funciona en móvil.

Revisar especialmente:

* Header.
* Menú.
* Hero.
* Tarjetas.
* Formulario.
* Imágenes.
* Botones.

---

# 30. Paso 13 — Accesibilidad

Revisar:

* `alt` descriptivos.
* Labels en formularios.
* Contraste suficiente.
* Navegación mediante teclado.
* Botones claramente identificables.
* Estructura semántica.

La accesibilidad también puede aportar puntos adicionales en la entrega.

---

# 31. Paso 14 — Detalles visuales

Una vez terminada la funcionalidad, mejorar:

* Transiciones.
* Hover de tarjetas.
* Hover de botones.
* Animaciones pequeñas.
* Espaciado.
* Tipografía.
* Jerarquía visual.

Las animaciones deben ser sutiles.

No se debe sacrificar usabilidad por efectos visuales.

---

# 32. Paso 15 — Modo oscuro

Como mejora opcional, se puede agregar un botón:

```text
☀ / 🌙
```

El estado puede guardarse utilizando `localStorage`.

De esta forma, si el usuario vuelve a entrar al sitio, se conserva su preferencia.

Esto corresponde a una de las bonificaciones propuestas por el profesor.

---

# 33. Paso 16 — Pruebas

Antes de publicar:

### HTML

Validar el documento.

### CSS

Comprobar que no existan estilos innecesarios o duplicados.

### TypeScript

Comprobar que no existan errores de compilación.

### JavaScript

Probar todas las interacciones.

### Responsive

Probar diferentes tamaños.

### Formulario

Probar:

```text
Formulario vacío
Email incorrecto
Texto demasiado corto
Actividad sin seleccionar
Formulario correcto
```

---

# 34. Paso 17 — Git

El proyecto debe desarrollarse mediante commits progresivos.

No se debe hacer un único commit con todo el proyecto.

El profesor exige como mínimo seis commits repartidos en el tiempo y con mensajes descriptivos.

Una posible evolución:

```text
1. estructura inicial del proyecto
2. estructura HTML de la página principal
3. estilos base y variables CSS
4. diseño responsive del header
5. catálogo de actividades con Grid
6. generación dinámica de tarjetas
7. filtro por categorías
8. formulario de recuerdos
9. validación del formulario
10. mejoras responsive y accesibilidad
11. animaciones y detalles visuales
12. preparación para despliegue
```

Los commits deben reflejar el proceso real de construcción.

---

# 35. Paso 18 — Vercel

El sitio debe publicarse en Vercel y estar conectado al repositorio de GitHub.

El flujo esperado es:

```text
GitHub
   ↓
push a main
   ↓
Vercel
   ↓
nuevo despliegue
   ↓
sitio actualizado
```

Esto corresponde al requisito de despliegue de la entrega.

---

# 36. Paso 19 — README definitivo

El README final debe explicar:

### Qué es el proyecto

Explicar el concepto y para quién está pensado.

### Por qué escogí este dominio

Explicar por qué decidí convertir mis experiencias personales en el proyecto.

### Qué entidades existen

Explicar:

```text
Actividades
Personas
Recuerdos
```

### Cómo se relacionan

Explicar:

```text
Personas ↔ Actividades
Personas → Recuerdos
Recuerdos → Actividades
```

### Decisiones técnicas

Explicar:

* Dónde se utilizó Flexbox.
* Dónde se utilizó Grid.
* Por qué se utilizó cada uno.
* Qué hace TypeScript.
* Cómo se genera el catálogo.
* Cómo funciona el filtro.
* Cómo funciona la validación.

### Lo más difícil

Explicar un problema real que haya ocurrido durante el desarrollo y cómo fue solucionado.

### Uso de IA

Explicar honestamente:

* Para qué se utilizó.
* Qué explicaciones se solicitaron.
* Qué código se modificó.
* Qué decisiones fueron propias.

El profesor solicita explícitamente que esta información aparezca en el README.

---

# 37. Evolución hacia la Entrega 2

Una de las razones para escoger este proyecto es que puede crecer hacia una API REST.

La primera entrega tendrá datos locales:

```text
TypeScript
    ↓
arrays
    ↓
DOM
    ↓
HTML
```

La segunda entrega podría evolucionar hacia:

```text
Frontend
    ↓
API REST
    ↓
Base de datos
```

Con recursos como:

```text
GET /actividades
GET /personas
GET /recuerdos

POST /recuerdos
```

Más adelante podrían existir relaciones como:

```text
/actividades/1
/personas/3
/actividades/1/personas
/actividades/1/recuerdos
```

La estructura exacta se definirá cuando se conozcan los requisitos de la segunda entrega.

---

# 38. Objetivo final

El resultado final debe sentirse como un sitio personal real y no como una página creada únicamente para cumplir una lista de requisitos.

Debe ser:

* Personal.
* Visualmente atractivo.
* Responsive.
* Fácil de navegar.
* Semánticamente correcto.
* Interactivo.
* Fácil de ampliar.
* Preparado para evolucionar hacia una API.

La prioridad será primero conseguir una base funcional y comprensible y posteriormente mejorar el diseño.

---

# 39. Checklist final

## Contenido

* [ ] El proyecto tiene una temática personal clara.
* [ ] Existen dos tipos de información relacionables.
* [ ] Existe un catálogo.
* [ ] El catálogo tiene contenido real.
* [ ] Existe un único formulario con una función real.
* [ ] Las imágenes tienen `alt` descriptivos.

## HTML

* [ ] Se utiliza HTML semántico.
* [ ] Existe un único `h1`.
* [ ] La jerarquía de encabezados es correcta.
* [ ] El HTML es válido.

## CSS

* [ ] CSS externo.
* [ ] Variables CSS.
* [ ] Flexbox utilizado donde corresponde.
* [ ] Grid utilizado para el catálogo.
* [ ] Diseño responsive.
* [ ] No hay desbordamiento horizontal.

## TypeScript

* [ ] Los datos están representados mediante objetos.
* [ ] El catálogo se genera dinámicamente.
* [ ] El filtro funciona.
* [ ] Existen eventos mediante `addEventListener`.
* [ ] El formulario se valida.
* [ ] Los errores aparecen junto a los campos.

## Git

* [ ] Repositorio público.
* [ ] Más de seis commits.
* [ ] Commits progresivos.
* [ ] Mensajes descriptivos.
* [ ] `.gitignore` apropiado.

## Vercel

* [ ] Sitio publicado.
* [ ] GitHub conectado.
* [ ] Push a `main` genera actualización.
* [ ] URL incluida en README.

