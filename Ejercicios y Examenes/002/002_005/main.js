/*

1) Realiza la modelización de un parque natural. Empieza con el siguiente código.

var parqueNatural = {
areas = [],
parqueDeBomberos = {}
}

En cada una de las áreas (añade 10 áreas) encontraremos un array de árboles (100 por área) y un array de visitantes (100 en todo el parque).
En el parque de bomberos encontraremos un array de bomberos (10) y posiblemente más propiedades que se te puedan ocurrir.
Los bomberos y los visitantes deberán heredar de la clase Persona.

2) Añade un método ejecutar ciclo que represente el paso de 1h en el parque.
Cada ciclo que pase debemos llamar a ejecutar ciclo de los visitantes que se irán cambiando de recinto de forma aleatoria.
Haz que el método se ejecute cada segundo.

3) En cada paso de un ciclo se puede originar un fuego (probabilidad del 5%) que empezaría quemando un arbol aleatorio dentro del parque.
Cada ciclo que pase el fuego se extenderá al arbol al arbol siguiente, si no hay arbol siguiente, deberá saltar al primer arbol del área siguiente.
Asi sucesivamente hasta expandirse por todo el parque. Cada ciclo que pase el fuego en los arboles, estos estarán un 10% más quemados.
Cuando lleguen al 100% de quemados, se habrá perdido el arbol. (Quitarlo del área).​

BONUS para el ejercicio 002__005


1) Añade un objeto viento​ (de clase viento), con el siguiente atributo:

Velocidad: Nula/Media/Alta

En cada ejecución el viento tendrá una velocidad aleatoria

Si la velocidad es nula el incendio se expandirá 1 arbol, si la velocidad es media: dos árboles, si la dirección es alta: 3 árboles.

2) Los incendios ya no se originan de forma aleatoria en cualquier parte del bosque.

Los incendios los pueden originar los visitantes que sean fumadores (2 de cada 10). En cada ciclo hay una probabilidad del 10% de que un visitante fumador tire una colilla en el área en el que está y provoque un incendio.


*/

var nombresPersonas = ["Victor", "Omar", "karen", "Ariel", "Omar", "David", "Esteban", "Matias", "Vlairner", "Lucy", "Ignacio", "Humberto", "Nestor", "Daniel", "Raymundo", "Fran"];
var nacionalidades = ["Chile", "Mexico", "España", "Peru", "Francia", "Inglaterra", "Italia"];

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generarNombreAleatorio() {
    return nombresPersonas[Math.floor(Math.random() * nombresPersonas.length)];
}

function generarNacionalidadAleatorio() {
    return nacionalidades[Math.floor(Math.random() * nacionalidades.length)];
}

var log = x => console.log(x);
var error = x => console.error(x);
var warn = x => console.warn(x);

var Viento = function() {
    this.velocidad = 1; //1 = nula; 2 = media; 3 = alta
}

Viento.prototype.velocidadAleatoria = function() {
    this.velocidad = getRandomInteger(1, 3);
    return this.velocidad;
};

var Parque = function() {
    this.areas = [];
    this.parqueDeBomberos = [];
    this.enIncendio = false;
    this.numeroVisitantes = 0;
}

Parque.prototype.añadirVisitantes = function(visitante) {
    var randomArea = getRandomInteger(0, this.areas[0].length - 1);
    // log("Se ha añadido 1 visitante al area: " + randomArea);
    this.areas[0][randomArea].visitantes.push(visitante);
    this.numeroVisitantes++;
}

Parque.prototype.inicioNuevoIncendioParque = function() {
    if (getRandomInteger(1, 20) == 20) {
        var randomArea = getRandomInteger(0, this.areas[0].length - 1);
        var randomTree = getRandomInteger(0, this.areas[0][randomArea].arboles[0].length - 1);
        var arbolSeleccionado = this.areas[0][randomArea].arboles[0][randomTree];
        if (arbolSeleccionado != undefined && !arbolSeleccionado.estaQuemado) {
            error("Ha empezado un nuevo foco de incendio!!!");
            this.enIncendio = true;
            arbolSeleccionado.inicioDeArbolQuemado();
            //arbolSeleccionado.incrementoPorcentajeQuemado(+10);
        }
    }
};

Parque.prototype.inicioNuevoIncendioParquePorFumadores = function(area) {
    if (getRandomInteger(1, 10) == 1) {
        var randomTree = getRandomInteger(0, this.areas[0][area].arboles[0].length - 1);
        var arbolSeleccionado = this.areas[0][area].arboles[0][randomTree];
        if (arbolSeleccionado != undefined && !arbolSeleccionado.estaQuemado) {
            error("Ha empezado un nuevo foco de incendio por culpa de un fumador en el area " + area);
            this.enIncendio = true;
            arbolSeleccionado.inicioDeArbolQuemado();
            //arbolSeleccionado.incrementoPorcentajeQuemado(+10);
        }
    }

};

Parque.prototype.incrementarPorcentajeQuemadoDeArboles = function() {
    if (this.enIncendio) {
        for (var i = 0; i < this.areas[0].length; i++) {
            var area = this.areas[0][i];
            for (var j = 0; j < this.areas[0][i].arboles[0].length; j++) {
                var arbol = area.arboles[0][j];
                if (arbol.estaQuemado) {
                    arbol.incrementoPorcentajeQuemado(+10);
                }
                if (arbol.porcentajeQuemado == 100) {
                    // error("Arbol " + arbol.id + " quemado completamente...");
                    area.arboles[0].splice(area.arboles[0].indexOf(arbol), 1);
                }
            }
        }
    }
};

Parque.prototype.expansionIncendio = function(velocidadViento) {
    if (this.enIncendio) {
        for (var i = 0; i < this.areas[0].length; i++) {
            var area = this.areas[0];
            for (var j = this.areas[0][i].arboles[0].length - 1; j >= 0; j--) {
                var arbol = area[i].arboles[0][j];
                if (arbol.estaQuemado) {
                    if (j == this.areas[0][i].arboles[0].length - 1) {
                        if (i == this.areas[0].length - 1) {
                            this.propagarIncendioAreaYArbolSiguiente(velocidadViento, -1, 0);
                        } else {
                            this.propagarIncendioAreaYArbolSiguiente(velocidadViento, i, 0);
                        }
                    } else
                        this.propagarIncendioAreaYArbolSiguiente(velocidadViento, i - 1, j);
                }
            }
        }
    }
}

Parque.prototype.propagarIncendioAreaYArbolSiguiente = function(velocidadViento, area, arbol) {
    if (velocidadViento == 1) {
        var arbolSiguiente1 = this.areas[0][area + 1].arboles[0][arbol];
    } else if (velocidadViento == 2) {
        var arbolSiguiente1 = this.areas[0][area + 1].arboles[0][arbol];
        var arbolSiguiente2 = this.areas[0][area + 1].arboles[0][arbol + 1];
    } else if (velocidadViento == 3) {
        var arbolSiguiente1 = this.areas[0][area + 1].arboles[0][arbol];
        var arbolSiguiente2 = this.areas[0][area + 1].arboles[0][arbol + 1];
        var arbolSiguiente3 = this.areas[0][area + 1].arboles[0][arbol + 2];
    }

    if (arbolSiguiente1 != undefined && !arbolSiguiente1.estaQuemado) {
        arbolSiguiente1.inicioDeArbolQuemado();
    }
    if (arbolSiguiente2 != undefined && !arbolSiguiente2.estaQuemado) {
        arbolSiguiente2.inicioDeArbolQuemado();
    }
    if (arbolSiguiente3 != undefined && !arbolSiguiente3.estaQuemado) {
        arbolSiguiente3.inicioDeArbolQuemado();
    }
};

var Area = function(id) {
    this.id = id;
    this.arboles = [];
    this.visitantes = [];
    this.isOnFire = false;
}

Area.prototype.imprimirEstadoArea = function() {
    var estadoArea = "";
    this.isOnFire = false;
    for (var i = 0; i < this.arboles[0].length; i++) {
        var estadoArbol = "🌲";

        if (this.arboles[0][i].estaQuemado) {
            estadoArbol = "🔥";
            this.isOnFire = true;
        }
        estadoArea += estadoArbol + "";
    }

    estadoArea += "\n";

    for (var i = 0; i < this.visitantes.length; i++) {
        var estadoVisitante = (this.visitantes[i].esFumador == false) ? "😃" : "😈";
        if (this.isOnFire){
            if(this.visitantes[i].esFumador == true)
                estadoVisitante = "😈";
            else
                estadoVisitante = "😱";
        }
        if (this.arboles[0].length == 0)
            estadoVisitante = "😐";

        estadoArea += estadoVisitante;
    }
    log("Estado del área " + this.id);
    log(estadoArea);
    log("======================");
}

Area.prototype.buscarFumadores = function() {
    for (var i = 0; i < this.visitantes.length; i++) {
        if (this.visitantes[i].esFumador == true && this.arboles[0].length > 0) {
            parque.inicioNuevoIncendioParquePorFumadores(this.id);
        }
    }
};

var ParqueDeBomberos = function() {
    this.bomberos = [];
}

var Arbol = function(id) {
    this.id = id;
    this.estaQuemado = false;
    this.porcentajeQuemado = 0;
}

Arbol.prototype.incrementoPorcentajeQuemado = function(incremento) {
    if (this.estaQuemado) {
        this.porcentajeQuemado += incremento;
        //warn("Arbol: " + this.id + " - Porcentaje de quemado: " + this.porcentajeQuemado + "%");
    }
    if (this.porcentajeQuemado > 100) {
        this.porcentajeQuemado = 100;
    }
};

Arbol.prototype.inicioDeArbolQuemado = function() {
    this.estaQuemado = true;
    //warn("El arbol " + this.id + " se ha empezado a quemar!!!");
};

var Persona = function(nombre = generarNombreAleatorio(), edad = getRandomInteger(17, 38), nacionalidad = generarNacionalidadAleatorio(), altura = getRandomInteger(158, 200), peso = getRandomInteger(50, 90)) {
    this.nombre = nombre;
    this.edad = edad;
    this.nacionalidad = nacionalidad;
    this.altura = altura;
    this.peso = peso;
    this.esFumador = (getRandomInteger(1, 5) == 1) ? true : false;
}

var Visitante = function() {

}

var Bombero = function() {

}

var parque = new Parque();
var areasParque = [];

for (var i = 0; i < 10; i++) {
    var arboles = [];
    for (var j = 0; j < 100; j++) {
        arboles.push(new Arbol(i + "_" + j));
    }
    var areas = new Area(i);
    areas.arboles.push(arboles);
    areasParque.push(areas);
}

var parqueBomberos = new ParqueDeBomberos();

for (var i = 0; i < 10; i++) {
    Bombero.prototype = new Persona();
    parqueBomberos.bomberos.push(new Bombero())
}

parque.areas.push(areasParque);
parque.parqueDeBomberos.push(parqueBomberos);

log(parque);

var viento = new Viento();

function ejecutarCiclo() {

    var velocidadViento = viento.velocidadAleatoria();
    //warn("Velocidad del viento: " + velocidadViento);  

    Visitante.prototype = new Persona();
    visitante = new Visitante();

    (parque.numeroVisitantes < 100) ? parque.añadirVisitantes(visitante) : error("Parque Lleno!")

    for (var i = 0; i < parque.areas[0].length; i++) {
        var area = parque.areas[0][i];
        area.buscarFumadores();
        area.imprimirEstadoArea();
    }

    parque.incrementarPorcentajeQuemadoDeArboles();

    // parque.inicioNuevoIncendioParque();

    parque.expansionIncendio(velocidadViento);

}

function abrirParque() {
    intervalID = setInterval(ejecutarCiclo, 1000);
}

function cerrarParque() {
    clearInterval(intervalID);
}