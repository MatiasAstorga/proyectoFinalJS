/*

1) Realiza una función dentro de Mesa que devuelva el HTML de una mesa. Una mesa puede estar representada por un div con sus datos.

2) Realiza una función dentro de Restaurante que se encargue de pedir a todas las mesas el HTML y pintarlo.

3) Realiza una función dentro de Carta que devuelva un HTML con la tabla de productos y sus existencias.

4) Asocia las funciones anteriores al pintado completo del restaurante.​

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
var generarElementoAleatorio = elemento => elemento[Math.floor(Math.random() * elemento.length)];
var generaryEliminarElementoAleatorio = elemento => elemento.splice(Math.floor(Math.random() * elemento.length), 1);

function elegirNombre(tipo) {
    var nombre;
    if (tipo == "Entrante") {
        nombre = generaryEliminarElementoAleatorio(comidasEntrada);
    } else if (tipo == "Principal") {
        nombre = generaryEliminarElementoAleatorio(comidasPrincipal);
    } else if (tipo == "Postre") {
        nombre = generaryEliminarElementoAleatorio(comidasPostre);
    }
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

    pintarMesaHTML() {
        var humanizarEstaOcupada = (this.estaOcupada) ? "Si" : "No";
        var ocupada = (this.estaOcupada) ? this.pintarOcupantesMesas() : "";
        var data = `
        <div class="mesa">
            <span class="mesaTextos">
                <p> ID: ${this.id} </p>
                <p> Ocupada: ${humanizarEstaOcupada}</p>
                <p> Capacidad: ${this.capacidad} personas</p>
                ${ocupada}
            </span>
        </div>`;
        return data;
    }

    pintarOcupantesMesas() {
        var data = "";
        data += "<hr>"
        data += "<p>Ocupantes: </p>"
        for (let i = 0; i < this.ocupantes.length; i++) {
            data += " 😃 ";
        }
        return data;
    }
}

class Producto {
    constructor(
        nombre,
        numeroExistencias = generarNumeroAleatorio(20, 100),
        calorias = generarNumeroAleatorio(50, 500),
        precio = generarNumeroAleatorio(3, 100)
    ) {
        this.nombre = nombre;
        this.numeroExistencias = numeroExistencias;
        this.calorias = calorias;
        this.precio = precio;
    }

    pintarProductoHTML() {
        var data = "";
        data += "<tr>";
        data += "<th>" + this.nombre + "</th>";
        data += "<th>" + this.numeroExistencias + "</th>";
        data += "<th>" + new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR'
        }).format(this.precio); + "</th>";
        data += "</tr>"
        return data;
    }
}

class Bebida extends Producto {
    constructor(
        esAlcoholica = (generarNumeroAleatorio(1, 2) == 1) ? true : false,
        gradosAlcohol = (esAlcoholica) ? generarNumeroAleatorio(10, 50) : 0,
        nombre = (esAlcoholica) ? generaryEliminarElementoAleatorio(nombrebebidasAlcoholicas) : generaryEliminarElementoAleatorio(nombrebebidasNormales)
    ) {
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

    inicializarRestaurante() {
        this.agregarMesas(30);
        this.agregarCamareros(5);
        this.agregarCartaDeProductos(5, 5);
    }

    pintarCarta() {
        var data = "<h2>Carta de productos:</h2>";
        data += this.pintarBebidas();
        data += this.pintarComidas();

        (this.cartaProductos.length == 0) ? document.getElementById("carta").innerHTML = "<p>Ningún producto agregado al restaurante</p>": document.getElementById("carta").innerHTML = data;
    }

    pintarBebidas() {
        var data = "";
        data += "<h3>Bebidas: </h3>"
        data += "<table> <tr> <td> Nombre </td> <td> Existencias </td> <td> Precio </td></tr>";

        for (let i = 0; i < this.cartaProductos.length / 2; i++) {
            data += this.cartaProductos[i].pintarProductoHTML();
        }
        data += "</table>";
        return data;
    }

    pintarComidas() {
        var data = "";
        data += "<h3>Comidas: </h3>"
        data += "<table> <tr> <td> Nombre </td> <td> Existencias </td> <td> Precio </td></tr>";

        for (let i = this.cartaProductos.length / 2; i < this.cartaProductos.length; i++) {
            data += this.cartaProductos[i].pintarProductoHTML();
        }
        data += "</table>";
        return data;
    }

    pintarMesas() {
        var data = "<h2>" + this.nombre + "</h2>";

        for (let i = 0; i < this.mesas.length; i++) {
            data += this.mesas[i].pintarMesaHTML();
        }
        (this.cartaProductos.length == 0) ? document.getElementById("mesas").innerHTML = "<p>Ninguna mesa agregada al restaurante</p>": document.getElementById("mesas").innerHTML = data;
    }


}

var restaurante = new Restaurante();
restaurante.inicializarRestaurante();
LOG(restaurante);

window.onload = function() {
    restaurante.pintarCarta();
    restaurante.pintarMesas();
}

function nuevoClienteMesa3() {
    restaurante.mesas[3].ocupantes.push(new Cliente);
    restaurante.mesas[3].estaOcupada = true;
    restaurante.pintarMesas();
}