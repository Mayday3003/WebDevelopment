// EJERCICIO 1
// Crear un array con 5 nombres de estudiantes
// y mostrar cada nombre en consola usando un ciclo.

let estudiantes = ["Juan", "Maria", "Carlos", "Ana", "Pedro"];

for (let estudiante of estudiantes) {
    console.log(estudiante);
}


// EJERCICIO 2
// Imprimir cuantos estudiantes hay en el arreglo.

console.log("Cantidad de estudiantes:", estudiantes.length);


// EJERCICIO 3
// Crear un array de números y calcular la suma total.

let numeros = [10, 20, 30, 40, 60];

let suma = 0;

for (let numero of numeros) {
    suma = suma + numero;
}

console.log("Suma total:", suma);


// EJERCICIO 4
// Crear un array de mínimo 1500 números aleatorios
// y calcular la suma total.

let numerosAleatorios: number[] = [];

for (let i = 0; i < 1500; i++) {
    let numero = Math.round(Math.random() * 100);
    numerosAleatorios.push(numero);
}

let sumaAleatorios = 0;

for (let numero of numerosAleatorios) {
    sumaAleatorios = sumaAleatorios + numero;
}

console.log("Cantidad de números aleatorios:", numerosAleatorios.length);
console.log("Suma de números aleatorios:", sumaAleatorios);


// EJERCICIO 5
// Calcular el promedio de los números del punto 3.

let promedio = suma / numeros.length;

console.log("Promedio:", promedio);


// EJERCICIO 6
// Imprimir los números mayores a 50 del punto 3.

console.log("Números mayores a 50:");

for (let numero of numeros) {
    if (numero > 50) {
        console.log(numero);
    }
}


// EJERCICIO 7
// Crear un objeto de persona con nombre, edad y ciudad
// e imprimir sus valores.

let persona = {
    nombre: "Carlos",
    edad: 20,
    ciudad: "Medellín"
};

console.log("Nombre:", persona.nombre);
console.log("Edad:", persona.edad);
console.log("Ciudad:", persona.ciudad);


// EJERCICIO 8
// Crear un array de productos (nombre y precio)
// e imprimirlos.

let productos = [
    {
        nombre: "Laptop",
        precio: 2500000,
        cantidad: 5
    },
    {
        nombre: "Mouse",
        precio: 80000,
        cantidad: 10
    },
    {
        nombre: "Teclado",
        precio: 150000,
        cantidad: 8
    },
    {
        nombre: "Monitor",
        precio: 900000,
        cantidad: 3
    }
];

for (let producto of productos) {
    console.log(
        "Producto:",
        producto.nombre,
        "- Precio:",
        producto.precio
    );
}


// EJERCICIO 9
// Encontrar el producto con mayor precio del array
// e imprimirlo.

let productoMasCaro = productos[0]!;

for (let producto of productos) {
    if (producto.precio > productoMasCaro.precio) {
        productoMasCaro = producto;
    }
}

console.log("Producto más caro:", productoMasCaro);

// EJERCICIO 10
// Agregar la cantidad de unidades disponibles a cada
// producto y calcular el valor total del inventario.

let valorInventario = 0;

for (let producto of productos) {
    let valorProducto = producto.precio * producto.cantidad;

    console.log(
        "Producto:",
        producto.nombre,
        "- Precio:",
        producto.precio,
        "- Cantidad:",
        producto.cantidad,
        "- Valor:",
        valorProducto
    );

    valorInventario = valorInventario + valorProducto;
}

console.log("Valor total del inventario:", valorInventario);


// EJERCICIO 11
// Crear un array de estudiantes donde cada estudiante
// tiene nombre, semestre y un array de materias.
// Cada materia tiene nombre y nota.
//
// Calcular el promedio de cada estudiante y el promedio
// de todos los estudiantes.

let estudiantesUniversidad = [
    {
        nombre: "Juan",
        semestre: 3,
        materias: [
            {
                nombre: "Matemáticas",
                nota: 4.0
            },
            {
                nombre: "Programación",
                nota: 4.5
            },
            {
                nombre: "Inglés",
                nota: 3.5
            }
        ]
    },

    {
        nombre: "Maria",
        semestre: 4,
        materias: [
            {
                nombre: "Matemáticas",
                nota: 4.5
            },
            {
                nombre: "Programación",
                nota: 4.0
            },
            {
                nombre: "Inglés",
                nota: 4.8
            }
        ]
    },

    {
        nombre: "Pedro",
        semestre: 2,
        materias: [
            {
                nombre: "Matemáticas",
                nota: 3.0
            },
            {
                nombre: "Programación",
                nota: 3.5
            },
            {
                nombre: "Inglés",
                nota: 3.2
            }
        ]
    }
];

let sumaPromedios = 0;

for (let estudiante of estudiantesUniversidad) {

    let sumaNotas = 0;

    for (let materia of estudiante.materias) {
        sumaNotas = sumaNotas + materia.nota;
    }

    let promedioEstudiante =
        sumaNotas / estudiante.materias.length;

    console.log(
        "Estudiante:",
        estudiante.nombre,
        "- Promedio:",
        promedioEstudiante
    );

    sumaPromedios = sumaPromedios + promedioEstudiante;
}

let promedioTodos =
    sumaPromedios / estudiantesUniversidad.length;

console.log(
    "Promedio de todos los estudiantes:",
    promedioTodos
);


// EJERCICIO 12
// Imprimir el nombre de los estudiantes que tienen
// promedio mayor a 3.5.

console.log("Estudiantes con promedio mayor a 3.5:");

for (let estudiante of estudiantesUniversidad) {

    let sumaNotas = 0;

    for (let materia of estudiante.materias) {
        sumaNotas = sumaNotas + materia.nota;
    }

    let promedioEstudiante =
        sumaNotas / estudiante.materias.length;

    if (promedioEstudiante > 3.5) {
        console.log(estudiante.nombre);
    }
}