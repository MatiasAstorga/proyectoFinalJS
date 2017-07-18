/*

1) añade ejecutar ciclo al restaurante

2) Crea la clase recepcion y grupo de personas

3) Crear boton traer cliente, que genera un grupo de clientes en la recepcion

4) pintar recepcion

5) Crear boton recibir grupo, que sentara a las personas del 1er grupo que esté esperando en recepcion

6) Cada ciclo los clientes que estan sentados en mesas, generaran ordenes nuevas. Crear un boton "Tomar Nota" que al ser pulsado hara que restaurante de la carta a cada uno de los clientes, estos escogeran 2 productos y generaran una nueva orden. La orden sera asociada a la mesa.

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

function crearBoton(txt) {
    var btn = document.createElement("button");
    var text = document.createTextNode(txt);
    btn.appendChild(text);
    var att1 = document.createAttribute("class");
    att1.value = "button";
    btn.setAttributeNode(att1);
    document.getElementById("acciones").appendChild(btn);
    return btn;
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

    ejecutarCiclo() {

    }
}

class Cliente extends Persona {
    constructor(dinero = generarNumeroAleatorio(1, 1500)) {
        super();
        this.dinero = dinero;
        this.mesaID = null;
        this.orden = [];
    }

    elegirProductosCarta(carta) {
        var orden1 = carta[0].bebidas[generarNumeroAleatorio(0, 4)];
        if (orden1.verificarNumeroExistencias())
            this.orden.push(orden1)


        var orden2 = carta[0].comidas[generarNumeroAleatorio(0, 4)];
        if (orden2.verificarNumeroExistencias())
            this.orden.push(orden2)
    }

    imprimirOrdenes() {
        LOG(this.orden);
    }

    ejecutarCiclo() {

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
        var data = `
        <hr>
        <p>Ocupantes: </p>`;
        this.ocupantes.forEach(() => data += " 😃 ");
        return data;
    }

    agregarOrdenes(orden) {
        if (orden != undefined) {
            LOG("Un cliente de la mesa " + this.id + " ha pedido: " + orden.nombre);
            this.ordenes.push(orden);
        }
    }

    agregarOcupantes(clientes) {
        clientes.forEach((cliente) => this.ocupantes.push(cliente));
        this.estaOcupada = true;
        WARN("Un grupo de " + clientes.length + " personas se han sentado en la mesa " + this.id);
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
        var money = new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR'
        }).format(this.precio);
        var data = `
        <tr>
            <th>${this.nombre}</th>
            <th>${this.numeroExistencias}</th>
            <th>${money}</th>
        </tr>`;
        return data;
    }

    verificarNumeroExistencias() {
        if (this.numeroExistencias > 0) {
            this.disminuirNumeroExistencias();
            return true;
        } else {
            ERROR("Un cliente ha pedido " + this.nombre + " pero ya no quedan en stock");
            return false;
        }
    }

    disminuirNumeroExistencias() {
        this.numeroExistencias--;
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

class Carta {
    constructor() {
        this.bebidas = [];
        this.comidas = [];
    }

    generarCartaProductos(cantidadBebidas, cantidadComida) {
        for (let i = 0; i < cantidadBebidas; i++) {
            this.bebidas.push(new Bebida());
        }

        for (let i = 0; i < cantidadComida; i++) {
            this.comidas.push(new Comida());
        }
    }

    pintarBebidasCarta() {
        var data = `<h3>Bebidas: </h3>
                <table>
                    <tr>
                        <td> Nombre </td>
                        <td> Existencias </td>
                        <td> Precio </td>
                    </tr>`;
        this.bebidas.forEach((bebida) => data += bebida.pintarProductoHTML());
        data += "</table>";
        return data;
    }

    pintarComidasCarta() {
        var data = `<h3>Comidas: </h3>
                <table>
                    <tr>
                        <td> Nombre </td>
                        <td> Existencias </td>
                        <td> Precio </td>
                    </tr>`;
        this.comidas.forEach((comida) => data += comida.pintarProductoHTML());
        data += "</table>";
        return data;
    }
}

class Restaurante {
    constructor(recepcion, nombre = "Restaurante de Matias") {
        this.nombre = nombre;
        this.idMesas = 1;
        this.mesas = [];
        this.camareros = [];
        this.cartaProductos = [];
        this.recepcion = recepcion;
        this.dinero = 0;

        this.agregarMesas(30);
        this.agregarCamareros(5);
        this.agregarCartaDeProductos(5, 5);
        this.pintarEstructuraPrincipalConBotones();
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

    agregarCartaDeProductos(cantidadBebidas, cantidadComidas) {
        var carta = new Carta();
        carta.generarCartaProductos(cantidadBebidas, cantidadComidas);
        this.cartaProductos.push(carta);
    }

    agregarGrupoClientesARecepcion(grupo) {
        this.recepcion.agregarGrupoDePersonas(new GrupoPersonas(grupo));
    }

    pintarCarta() {
        var data = "<h2>Carta de productos:</h2>";
        data += this.cartaProductos[0].pintarBebidasCarta() + this.cartaProductos[0].pintarComidasCarta();
        document.getElementById("carta").innerHTML = data;
    }

    pintarMesas() {
        var data = "<h2>" + this.nombre + "</h2>";
        this.mesas.forEach((mesa) => data += mesa.pintarMesaHTML());
        document.getElementById("mesas").innerHTML = data;
    }

    pintarRecepcion() {
        this.recepcion.pintarRecepcionHTML();
    }

    pintarEstructuraPrincipalConBotones() {
        document.body.innerHTML = `
        <div id="restaurant">
            <header>
                <div id="acciones"></div>
            </header>
            <div id="recepcion"></div>
            <div id="carta"></div>
            <div id="mesas"><div>
        </div>`;

        crearBoton("Traer Clientes").addEventListener("click", () => this.grupoClientesNuevos());
        crearBoton("Recibir Grupo").addEventListener("click", () => this.recibirGrupo());
        crearBoton("Tomar Nota").addEventListener("click", () => this.tomarNota());
        crearBoton("Cancelar ciclo").addEventListener("click", () => this.cerrarCiclo());
    }

    iniciarIntervalo() {
        intervalID = setInterval(() => this.ejecutarCiclo(), 2000);
    }

    ejecutarCiclo() {
        this.pintarCarta();
        this.pintarMesas();
        this.pintarRecepcion();
    }

    grupoClientesNuevos() {
        var personas = new GrupoPersonas();
        var grupo = personas.generarGrupoDePersonas();
        WARN("Un nuevo grupo de " + grupo.length + " personas a llegado al restaurant");
        this.agregarGrupoClientesARecepcion(grupo);
    }

    recibirGrupo() {
        if (this.recepcion.grupoPersonas.length > 0) {
            var mesa = null;
            var grupoClientes = this.recepcion.grupoPersonas.shift();
            for (let i = 0; i < this.mesas.length; i++) {
                if (!this.mesas[i].estaOcupada && grupoClientes.clientes.length <= this.mesas[i].capacidad) {
                    mesa = this.mesas[i];
                    break;
                }
            };
            if (mesa != null)
                mesa.agregarOcupantes(grupoClientes.clientes);
            else
                ERROR("No se pudo encontrar mesa disponible para el grupo de " + grupoClientes.clientes.length + " personas");
        } else
            ERROR("No hay mas clientes en la entrada!!!");
    }

    tomarNota() {
        for (let i = 0; i < this.mesas.length; i++) {
            if (this.mesas[i].estaOcupada) {
                var mesa = this.mesas[i];
                for (let j = 0; j < mesa.ocupantes.length; j++) {
                    if (mesa.ocupantes[j].orden.length <= 1) {
                        var ocupante = mesa.ocupantes[j];
                        ocupante.elegirProductosCarta(this.cartaProductos);
                        mesa.agregarOrdenes(ocupante.orden[0]);
                        mesa.agregarOrdenes(ocupante.orden[1]);
                    }
                }
            }
        }
    }

    cerrarCiclo() {
        ERROR("Cancelar ciclo...");
        clearInterval(intervalID);
    }
}

class Recepcion {
    constructor() {
        this.grupoPersonas = [];
    }

    pintarRecepcionHTML() {
        var data = "<h2 class=inline>Recepción:</h2>";
        this.grupoPersonas.forEach((grupo) => {
            data += `<span class=inline>
                       [ ${grupo.pintarGrupoPersonasHTML()} ] 
                    </span>`;
        });
        document.getElementById("recepcion").innerHTML = data;
    }

    agregarGrupoDePersonas(grupo) {
        this.grupoPersonas.push(grupo);
    }
}

class GrupoPersonas {
    constructor(grupo) {
        this.clientes = grupo;
    }

    generarGrupoDePersonas() {
        var grupo = [];
        for (let i = 0; i < generarNumeroAleatorio(1, 20); i++) {
            grupo.push(new Cliente());
        }
        return grupo;
    }

    pintarGrupoPersonasHTML() {
        var data = "";
        this.clientes.forEach((cliente) => data += "🤤")
        return data;
    }
}

let restaurante = null;
let recepcion = null;
var intervalID;

window.onload = () => {
    recepcion = new Recepcion();
    restaurante = new Restaurante(recepcion);
    restaurante.iniciarIntervalo();
};