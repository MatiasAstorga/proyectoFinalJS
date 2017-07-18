/*

Vamos a hacer un restaurante:

1) Modela la clase persona (haz uso de clases de ES6). Haz que las clases Cliente y Camarero hereden de Persona.
Una Persona deberá tener:

- Nombre (Generar aleatorio)
- Edad (Aleatorio entre 20 y 60)

Un Camarero deberá tener:

- Cargo (Aleatorio: encargado/mozo)

Un Cliente deberá tener: 

- Dinero (Aleatorio: entre 0 y 1500)

2) Modela la clase Mesa que deberá tener:

- Capacidad (aleatorio entre 2 y 10)
- Un ID
- Un booleano ocupada: true/false
- Un array de personas que estén sentadas
- Un array de órdenes realizadas (ya crearemos las órdenes después)

3) Modela una clase Producto que tendrá:

- Número de existencias
- Calorías
- Precio

La clase Bebida y la clase Comida heredarán de Producto. 

Bebida tendrá:

- Booleano esAlcoholica: true/false
- Grados de alcohol

Comida tendrá:

Tipo: Entrante/Principal/Postre

4) Modela la clase Restaurante que deberá tener:

- Nombre
- Array de mesas (30 mesas)
- Array de camareros (5 camareros)
- Carta de productos (Al menos 5 bebidas y 5 Comidas)


5) Crea una instancia de Restaurante y comprueba que contiene todo lo necesario.



*/

const LOG = x => console.log(x);
const WARN = x => console.warn(x);
const ERROR = x => console.error(x);

var nombresPersonas = ["Victor", "Omar", "karen", "Ariel", "Omar", "David", "Esteban", "Matias", "Vlairner", "Lucy", "Ignacio", "Humberto", "Nestor", "Daniel", "Raymundo", "Fran"];
var cargos = ["Mozo", "Encargado"];
var tipoComida = ["Entrante", "Principal", "Postre"];
var nombrebebidasAlcoholicas = ["Vino", "Whisky", "Pisco", "Ron", "Cerveza clara", "Cerveza oscura", "Tequila"];
var nombrebebidasNormales = ["Coca-Cola", "Fanta", "Sprite", "Pepsi", "Jugo de naranja", "Jugo de piña", "Limonada", "Agua mineral"];
var comidasEntrada = ["Bruschetta", "Pionono", "Huevos rellenos", "Sopas", "Vasitos salados", "Ensaladas fáciles", "Ciruelas con Panceta de Matu", "Tomates rellenos con panceta y verdeo", "Terrine de vegetales", "Champignones al escabeche", "Palta rellena con centolla"];
var comidasPrincipal = ["Lentejas a la Primavera", "Papas rellenas con prieta", "Lasaña con boloñesa de pavo y tocino", "Pasta con calabacín", "Lasaña de Berenjenas", "Gratín de papas con queso chanco", "Penne a la romana", "Tallarines con camarones", "Paella", "Pizza 4 estaciones"];
var comidasPostre = ["Gelatina de La Lechera y Naranja", "Pastel Tres Leches", "Delicia cremosa de gelatina con duraznos", "Flan de Calabaza y Caramelo", "Arroz con leche", "Mousse de chocolate", "Tarta de elote", "Helado", "Panqueques"];

var generarNumeroAleatorio = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
var generarElementoAleatorio = (elemento) => elemento[Math.floor(Math.random() * elemento.length)];
var generaryEliminarElementoAleatorio = (elemento) => elemento.splice(Math.floor(Math.random() * elemento.length), 1);

function elegirNombre(tipo) {
    var nombre;
    if (tipo == "Entrante")
        nombre = generaryEliminarElementoAleatorio(comidasEntrada);
    if (tipo == "Principal")
        nombre = generaryEliminarElementoAleatorio(comidasPrincipal);
    if (tipo == "Postre")
        nombre = generaryEliminarElementoAleatorio(comidasPostre);
    return nombre;
}

class Persona {
    constructor(nombre = generarElementoAleatorio(nombresPersonas), edad = generarNumeroAleatorio(20, 60)) {
        this.nombre = nombre;
        this.edad = edad;
    }
}

class Camarero extends Persona {
    constructor(cargo = generarElementoAleatorio(cargos)) {
        super();
        this.cargo = cargo;
    }
}

class Cliente extends Persona {
    constructor(dinero = generarNumeroAleatorio(1, 1500)) {
        super();
        this.dinero = dinero;
    }
}

class Mesa {
    constructor(id, capacidad = generarNumeroAleatorio(2, 10)) {
        this.id = id;
        this.capacidad = capacidad;
        this.estaOcupada = false;
        this.ocupantes = [];
        this.ordenes = [];
    }
}

class Producto {
    constructor(nombre, numeroExistencias = generarNumeroAleatorio(20, 100), calorias = generarNumeroAleatorio(50, 500), precio = generarNumeroAleatorio(10, 1000)) {
        this.nombre = nombre;
        this.numeroExistencias = numeroExistencias;
        this.calorias = calorias;
        this.precio = precio;
    }
}

class Bebida extends Producto {
    constructor(esAlcoholica = (generarNumeroAleatorio(1, 2) == 1) ? true : false, gradosAlcohol = (esAlcoholica) ? generarNumeroAleatorio(10, 50) : 0, nombre = (esAlcoholica) ? generaryEliminarElementoAleatorio(nombrebebidasAlcoholicas) : generaryEliminarElementoAleatorio(nombrebebidasNormales)) {
        super(nombre);
        this.esAlcoholica = esAlcoholica;
        this.gradosAlcohol = gradosAlcohol;
    }
}

class Comida extends Producto {
    constructor(tipo = generarElementoAleatorio(tipoComida), nombre = elegirNombre(tipo)) {
        super(nombre);
        this.tipo = tipo;
    }
}

class Restaurante {
    constructor(nombre = "Restaurante de Matias") {
        this.nombre = nombre;
        this.idMesas = 0;
        this.mesas = [];
        this.camareros = [];
        this.cartaProductos = [];
    }

    agregarMesas(cantidad) {
        for (let i = 0; i < cantidad; i++) {
            this.mesas.push(new Mesa(this.idMesas++));
        }
    }

    agregarCamareros(cantidad) {
        for (let i = 0; i < cantidad; i++) {
            this.camareros.push(new Camarero());
        }
    }

    agregarCartaDeProductos(cantidadBebidas, cantidadComida) {
        for (let i = 0; i < cantidadBebidas; i++) {
            this.cartaProductos.push(new Bebida());
        }

        for (let i = 0; i < cantidadComida; i++) {
            this.cartaProductos.push(new Comida());
        }
    }

    inicializarRestaurante(){
        this.agregarMesas(30);
        this.agregarCamareros(5);
        this.agregarCartaDeProductos(5, 5);
    }
}

var restaurante = new Restaurante();
restaurante.inicializarRestaurante();
LOG(restaurante);