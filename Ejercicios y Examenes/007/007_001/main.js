/*

1) Modela la clase Vehículo, con las siguientes propiedades:

Marca (aleatorio)
Modelo (aleatorio)
VelocidadMaxima (aleatorio entre 100kmh y 200kmh)
Realiza la clase Motocicleta y Coche que hereden de vehículo

2) Realiza la clase carrera que recibirá dos vehículos en su consctrucción. La clase carrera tendrá el método iniciarCarrera() que hará que los dos vehículos compitan.

Una carrera consistirá en ver qué vehículo recorre primero 200 metros. Para ser realista deberás hacer que los vehículos avancen cada segundo los metros correspondientes.

Ganará el que recorra antes los 200 metros. En caso de llegar a la vez, quedarán empatados e irán a penales. 

Naaaaaaaaah, no hay penales. Pero sí que pueden empatar.

3) Pinta en tu html la carrera. Haz uso de funciones de manejo del DOM, y haz uso de CSS para modificar su posición. Los coches deberán desplazarse desde la izquierda de la pantalla hasta la derecha donde se encontrará la meta.

*/

var log = x => console.log(x);
var warn = x => console.warn(x);
var error = x => console.error(x);

var marcasVehiculos = ["Nissan", "Honda"];
var modeloVehiculos = ["modelo1", "modelo2"];

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generarMarcaAleatorio() {
    return marcasVehiculos[Math.floor(Math.random() * marcasVehiculos.length)];
}

function generarModeloAleatorio() {
    return modeloVehiculos[Math.floor(Math.random() * modeloVehiculos.length)];
}

function getMetrosQueAvanzaCadaSegundo(velocidadEnKmh) {
    var metros = velocidadEnKmh * 1000 / 3600;
    return metros;
}

var Vehiculo = function(marca, modelo, velocidadMaxima) {
    this.initVehiculo(marca, modelo, velocidadMaxima);
}

Vehiculo.prototype.initVehiculo = function(marca = generarMarcaAleatorio(), modelo = generarModeloAleatorio(), velocidadMaxima = getRandomInteger(100, 200)) {
    this.marca = marca;
    this.modelo = modelo;
    this.velocidadMaxima = velocidadMaxima;
    this.metrosRecorridos = 0;
};
var Motocicleta = function() {
    this.initVehiculo(marca, modelo, velocidadMaxima);
}

Motocicleta.prototype = new Vehiculo();

var Coche = function(marca, modelo, velocidadMaxima) {
    this.initVehiculo(marca, modelo, velocidadMaxima);
}

Coche.prototype = new Vehiculo();

var Carrera = function(vehiculo1, vehiculo2) {
    this.vehiculo1 = vehiculo1;
    this.vehiculo2 = vehiculo2;
}

Carrera.prototype.incrementarMetros = function(incrementoV1, incrementoV2) {
    this.vehiculo1.metrosRecorridos += incrementoV1;
    this.vehiculo2.metrosRecorridos += incrementoV2;
};

Carrera.prototype.iniciarCarrera = function() {

    var avanceV1 = getMetrosQueAvanzaCadaSegundo(this.vehiculo1.velocidadMaxima);
    var avanceV2 = getMetrosQueAvanzaCadaSegundo(this.vehiculo2.velocidadMaxima);

    this.incrementarMetros(avanceV1, avanceV2);

    warn("Vehiculo 1: " + this.vehiculo1.metrosRecorridos + " mts.");
    warn("Vehiculo 2: " + this.vehiculo2.metrosRecorridos + " mts.");

    var v1 = document.getElementById("vehiculo1");
    var v2 = document.getElementById("vehiculo2");

    var aux1 = +v1.style.left.replace("px", "") + avanceV1 + 120;
    var aux2 = +v2.style.left.replace("px", "") + avanceV2 + 120;

    v1.style.left = aux1 + "px";
    v2.style.left = aux2 + "px";

    if (this.vehiculo1.metrosRecorridos >= 200 && this.vehiculo2.metrosRecorridos < this.vehiculo1.metrosRecorridos) {
        finCarrera("Gana Vehiculo 1");

    } else if (this.vehiculo2.metrosRecorridos >= 200 && this.vehiculo1.metrosRecorridos < this.vehiculo2.metrosRecorridos) {
        finCarrera("Gana Vehiculo 2");
    } else if (this.vehiculo1.metrosRecorridos >= 200 && this.vehiculo2.metrosRecorridos >= 200) {
        finCarrera("Empate");
    }
};

function finCarrera(msg) {
    error(msg);
    clearInterval(intervalID);
    document.getElementById("ganador").style.display = "block";
    document.getElementById("ganador").textContent = msg;
    document.getElementById("reiniciar").style.display = "block";
}

var vehiculo1 = new Coche();
var vehiculo2 = new Coche();

var carrera = new Carrera(vehiculo1, vehiculo2);

log(vehiculo1);
log(vehiculo2);

function ejecutarCiclo() {
    carrera.iniciarCarrera();
}

function empezarCarrera() {
    document.getElementById("empezar").style.display = "none";
    document.getElementsByClassName("nombres")[0].style.display = "block";
    document.getElementsByClassName("nombres")[1].style.display = "block";
    document.getElementById("vehiculo1").src = "vehiculo" + getRandomInteger(1, 6) + ".png";
    document.getElementById("vehiculo2").src = "vehiculo" + getRandomInteger(1, 6) + ".png";
    intervalID = setInterval(ejecutarCiclo, 100);
}

window.onload = function() {
}