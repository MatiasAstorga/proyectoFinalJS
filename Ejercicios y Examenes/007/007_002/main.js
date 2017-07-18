/*

En primer lugar vamos a olvidar la parte de Motocicleta: usaremos solo la clase Coche. Puedes eliminar las imágenes de las motocicletas.

Realiza un formulario para recoger los datos de un coche. Añade al formulario un botón añadir que creará un nuevo coche a partir de los datos del formulario y lo añadirá a nuestro objeto carrera.

El formulario tendrá:
3 selects: Marca, Modelo, Imagen. 
1 input: VelocidadMaxima
2 Botones: AñadirVehículo e IniciarCarrera

Haz que se puedan añadir tantos vehículos como se deseen (no solo dos).

Añade un botón IniciarCarrera que hará que la carrera comience y se muevan todos los vehículos que se hayan añadido previamente. 

*/

var log = x => console.log(x);
var warn = x => console.warn(x);
var error = x => console.error(x);

var data = {
    "Honda": ['Accord', 'Civic', '2000'],
    "Ford": ['Mustang', 'Fusion', 'Fiesta'],
    "Nissan": ['Altima', 'Maxima', 'Versa'],
    "Kia": ['Optima', 'Cadenza', 'Cerato'],
    "Hyundai": ['Azera', 'Sonata', 'Elantra']
};

var marcas = Object.keys(data);

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generarMarcaAleatorio() {
    return marcas[Math.floor(Math.random() * marcas.length)];
}

function generarModeloAleatorio(marca) {
    return data[marca][Math.floor(Math.random() * data[marca].length)];
}

function getMetrosQueAvanzaCadaSegundo(velocidadEnKmh) {
    var metros = velocidadEnKmh * 1000 / 3600;
    return metros;
}

var Vehiculo = function(marca, modelo, velocidadMaxima) {
    this.initVehiculo(marca, modelo, velocidadMaxima);
}

Vehiculo.prototype.initVehiculo = function(marca = generarMarcaAleatorio(), modelo = generarModeloAleatorio(marca), velocidadMaxima = getRandomInteger(100, 200), imagen = "vehiculo" + getRandomInteger(1, 6) + ".png") {
    this.marca = marca;
    this.modelo = modelo;
    this.velocidadMaxima = velocidadMaxima;
    this.metrosRecorridos = 0;
    this.imagen = imagen;
};

Vehiculo.prototype.incrementarMetros = function(incremento) {
    this.metrosRecorridos += incremento;
};

var Coche = function(marca, modelo, velocidadMaxima) {
    this.initVehiculo(marca, modelo, velocidadMaxima);
}

Coche.prototype = new Vehiculo();

var Carrera = function(vehiculo) {
    this.vehiculos = [];
}

Carrera.prototype.iniciarCarrera = function() {
    var avance = [];
    var posiciones = [];
    for (var i = 0; i < this.vehiculos.length; i++) {
        avance[i] = getMetrosQueAvanzaCadaSegundo(this.vehiculos[i].velocidadMaxima);
        this.vehiculos[i].incrementarMetros(avance[i]);
        warn("Vehiculo" + i + ": " + this.vehiculos[i].metrosRecorridos + " mts.");
        var id = i + 1;
        var vehiculoID = document.getElementById("vehiculo" + id);
        var aux = +vehiculoID.style.left.replace("px", "") + avance[i] + 120;
        vehiculoID.style.left = aux + "px";
        if (this.vehiculos[i].metrosRecorridos >= 200) {
            posiciones.push(this.vehiculos[i]);
        }
    }

    if (this.vehiculos.length == posiciones.length) {
        var ganador = posiciones.sort((a, b) => b.metrosRecorridos - a.metrosRecorridos);
        finCarrera("Ganador " + ganador[0].marca + " " + ganador[0].modelo);
        pintarPosiciones(posiciones);
    }


};

function pintarPosiciones(posiciones) {
    var data = "<label>Listado de productos:</label><table> <tr> <td> Posicion </td> <td> Marca </td> <td> Modelo </td> <td> Imagen </td> </tr>";

    for (var i = 0; i < posiciones.length; i++) {
        var aux = i + 1;
        data += "<tr>";
        data += "<th>" + aux + "</th>";
        data += "<th>" + posiciones[i].marca + "</th>";
        data += "<th>" + posiciones[i].modelo + "</th>";
        data += "<th> <img class=imgPos src=" + posiciones[i].imagen + "></th>";
        data += "</tr>"
    }
    data += "</table>";

    document.getElementById("posiciones").innerHTML = data;
}

function finCarrera(msg) {
    error(msg);
    clearInterval(intervalID);
    document.getElementById("reiniciar").style.display = "block";
}

var carrera = new Carrera();

function crearVehiculo() {
    var marca = document.getElementById("marca").value;
    var modelo = document.getElementById("modelo").value;
    var imagen = document.getElementById("imagen").value;
    var velocidadMaxima = document.getElementById("velocidadMaxima").value;

    if (marca == "" || marca == "none") {
        alert("Elija una marca de auto");
    } else if (velocidadMaxima == "" || velocidadMaxima < 100 || velocidadMaxima > 200) {
        alert("Ingrese una potencia entre 100 y 200");

    } else {
        recargarCampos();

        var vehiculo = new Coche(marca, modelo, +velocidadMaxima, imagen);
        log(vehiculo);

        carrera.vehiculos.push(vehiculo);
        agregarVehiculoHTML(imagen);
        log(carrera);
        alert("Coche agregado satisfactoriamente a la carrera!");

        if (carrera.vehiculos.length > 1) {
            document.getElementById("empezar").style.display = "block";
        }
    }
}

function crearVehiculoRandom() {
    var vehiculoRandom = new Coche();
    carrera.vehiculos.push(vehiculoRandom);
    agregarVehiculoHTML(vehiculoRandom.imagen);
    if (carrera.vehiculos.length > 1) {
        document.getElementById("empezar").style.display = "block";
    }
}

function agregarVehiculoHTML(img) {
    var node1 = document.createElement("div");
    var att1 = document.createAttribute("class");
    att1.value = "nombres";
    node1.setAttributeNode(att1);

    var node2 = document.createElement("img");
    var att2 = document.createAttribute("src");
    var att3 = document.createAttribute("id");
    var att4 = document.createAttribute("class");
    att2.value = img;
    att3.value = "vehiculo" + carrera.vehiculos.length;
    att4.value = "vehiculo";
    node2.setAttributeNode(att2);
    node2.setAttributeNode(att3);
    node2.setAttributeNode(att4);

    document.getElementById("drawCarrera").appendChild(node1).appendChild(node2);
}

function recargarCampos() {
    document.getElementById("marca").value = "none";
    document.getElementById("modelo").innerHTML = "";
    document.getElementById("imagen").value = "vehiculo1.png";
    drawCar("vehiculo1.png");
    document.getElementById("velocidadMaxima").value = "";
}

function ejecutarCiclo() {
    carrera.iniciarCarrera();
}

function empezarCarrera() {
    log(carrera);
    document.getElementById("empezar").style.display = "none";
    document.getElementById("formulario").style.display = "none";
    document.getElementById("drawCarrera").style.display = "block";
    var arr = document.getElementsByClassName("nombres");
    for (var i = 0; i < arr.length; i++) {
        arr[i].style.display = "block";
    }
    intervalID = setInterval(ejecutarCiclo, 100);
}

function getModelos(marca) {
    document.getElementById("modelo").innerHTML = "";
    data[marca].forEach(function(modelo) {
        var node = document.createElement("option");
        var att1 = document.createAttribute("value");
        att1.value = modelo;
        node.setAttributeNode(att1);
        var textnode = document.createTextNode(modelo);
        node.appendChild(textnode);
        document.getElementById("modelo").appendChild(node);
    });

}

function drawCar(img) {
    document.getElementById("pintarImagen").innerHTML = "";
    var node = document.createElement("img");
    var att1 = document.createAttribute("src");
    att1.value = img;
    node.setAttributeNode(att1);

    document.getElementById("pintarImagen").appendChild(node);
}

window.onload = function() {
    for (var i = 1; i < 7; i++) {
        var node = document.createElement("option");
        var att1 = document.createAttribute("value");
        var att2 = document.createAttribute("id");
        att1.value = "vehiculo" + i + ".png";
        att2.value = "vehiculo" + i + ".png";
        node.setAttributeNode(att1);
        node.setAttributeNode(att2);

        var textnode = document.createTextNode("Tipo " + i);
        node.appendChild(textnode);
        document.getElementById("imagen").appendChild(node);
    }
}