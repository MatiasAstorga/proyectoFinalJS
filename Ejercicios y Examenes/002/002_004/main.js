/*
1) Define una clase Persona que tenga los siguientes atributos:

Nombre: 
Edad:
Nacionalidad:
Altura: 
Peso:
Enfermo: true/false

2) Definir la clase Jugador que herede de persona y tenga los siguientes atributos:

Posición: (portero/defensa/mediocentro/delantero)
Numero: 
Calidad: (0-100)

3) Definir la clase Equipo que tenga:

- Array de jugadores
- Entrenador 


4) Definir la clase Entrenador que herede de Persona y tenga los siguientes métodos:

- elegirPlantillaParaPartido() que elegirá de sus jugadores a los mejores para un partido:
    1 portero
    4 defensas
    4 mediocentros
    2 delanteros

​Un equipo tendrá 22 jugadores creados aleatoriamente

--------------------------------------------------------------------------

Lógica del partido:

Cada equipo hará 10 ataques que funcionarán de la siguiente manera

Por ejemplo:

Si ataca el equipo 1 se calculará:

A = (Suma de calidad de medio centros equipo 1) - (Suma de calidad de medio centros equipo 1)
B = (Suma de calidad de delanteros 1) - (Suma de calidad de defensas equipo 2)
C = A + B - (Suma de calidad de portero equipo B)
Fortuna = numero aleatorio entre 0 y 100

Para cada jugador que no esté en su puesto del equipo 1: 
C = C - 10

Para cada jugador que no esté en su puesto del equipo 2: 
C = C + 10

TOTAL = C + Fortuna

Si total es mayor que cero -> GOOOOOOOL
Si total es igual a cero -> PALO !!!
Si total es menor que cero -> Ná de ná​ 


*/

var nombresPersonas = ["Victor", "Omar", "karen", "Ariel", "Omar", "David", "Esteban", "Matias", "Vlairner", "Lucy", "Ignacio", "Humberto", "Nestor", "Daniel", "Raymundo", "Fran"];
var nacionalidades = ["Chile", "Mexico", "España", "Peru", "Francia", "Inglaterra", "Italia"];
var nombreEquipos = ["Real Madrid", "Barcelona", "Juventus", "Bayern Munich", "Milan", "PSG", "Manchester United", "Manchester City", "Chelsea", "Atletico de Madrid", "Arsenal", "Lyon", "Monaco", "Benfica"];
var posiciones = ["Portero", "Defensa", "Mediocentro", "Delantero"]

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generarNombreAleatorio() {
    return nombresPersonas[Math.floor(Math.random() * nombresPersonas.length)];
}

function generarNacionalidadAleatorio() {
    return nacionalidades[Math.floor(Math.random() * nacionalidades.length)];
}

function generarFormacionAleatorio() {
    return formaciones[Math.floor(Math.random() * formaciones.length)];
}

function generarNombreEquipoAleatorio() {
    return nombreEquipos[Math.floor(Math.random() * nombreEquipos.length)];
}

var log = x => console.log(x);
var error = x => console.error(x);
var warn = x => console.warn(x);

var Persona = function(nombre = generarNombreAleatorio(), edad = getRandomInteger(17, 38), nacionalidad = generarNacionalidadAleatorio(), altura = getRandomInteger(158, 200), peso = getRandomInteger(50, 90)) {
    this.nombre = nombre;
    this.edad = edad;
    this.nacionalidad = nacionalidad;
    this.altura = altura;
    this.peso = peso;
    this.enfermo = (getRandomInteger(1, 10) == 1);
}

var Jugador = function(posicion, numero, calidad = getRandomInteger(0, 100)) {
    this.posicion = posicion;
    this.numero = numero;
    this.calidad = calidad;
};

var Entrenador = function() {
    //this.initPersona();
}

Entrenador.prototype = new Persona();

Entrenador.prototype.elegirPlantillaParaPartido = function(jugadores, formacion, equipo) {
    error(equipo + ": ");
    var alineacion = {
        portero: [],
        defensas: [],
        mediocentro: [],
        delanteros: []
    };

    jugadores.forEach(function(jugador, indice) {
        if (jugador.enfermo == true) {
            warn(jugador.nombre + " no ha sido convovado al partido por lesión");
            jugadores.splice(indice, 1);
        }
    });

    var jugadoresOrdenadosPorCalidad = jugadores.sort((a, b) => b.calidad - a.calidad);
    var porteroOK = 0;
    var defensasOK = 0;
    var mediocentroOK = 0;
    var delanterosOK = 0;

    for (var i = 0; i < jugadoresOrdenadosPorCalidad.length; i++) {
        if (jugadoresOrdenadosPorCalidad[i].posicion == posiciones[0] && porteroOK < 1) {
            alineacion.portero.push(jugadoresOrdenadosPorCalidad[i]);
            jugadoresOrdenadosPorCalidad.splice(jugadoresOrdenadosPorCalidad[i], 1);
            porteroOK = 1;
        } else if (jugadoresOrdenadosPorCalidad[i].posicion == posiciones[1] && defensasOK < formacion[0]) {
            alineacion.defensas.push(jugadoresOrdenadosPorCalidad[i]);
            jugadoresOrdenadosPorCalidad.splice(jugadoresOrdenadosPorCalidad[i], 1);
            defensasOK++;
        } else if (jugadoresOrdenadosPorCalidad[i].posicion == posiciones[2] && mediocentroOK < formacion[1]) {
            alineacion.mediocentro.push(jugadoresOrdenadosPorCalidad[i]);
            jugadoresOrdenadosPorCalidad.splice(jugadoresOrdenadosPorCalidad[i], 1);
            mediocentroOK++;
        } else if (jugadoresOrdenadosPorCalidad[i].posicion == posiciones[3] && delanterosOK < formacion[2]) {
            alineacion.delanteros.push(jugadoresOrdenadosPorCalidad[i]);
            jugadoresOrdenadosPorCalidad.splice(jugadoresOrdenadosPorCalidad[i], 1);
            delanterosOK++;
        }
    }
    var jugadorForzado;
    if (alineacion.portero.length == 0) {
        jugadorForzado = jugadoresOrdenadosPorCalidad.shift();
        alineacion.portero.push(jugadorForzado);
        log(jugadorForzado.nombre + " ha sido obligado a jugar como portero");
    }
    while (alineacion.defensas.length < formacion[0]) {
        jugadorForzado = jugadoresOrdenadosPorCalidad.shift();
        alineacion.defensas.push(jugadorForzado);
        log(jugadorForzado.nombre + " ha sido obligado a jugar como defensa");
    }
    while (alineacion.mediocentro.length < formacion[1]) {
        jugadorForzado = jugadoresOrdenadosPorCalidad.shift();
        alineacion.mediocentro.push(jugadorForzado);
        log(jugadorForzado.nombre + " ha sido obligado a jugar como mediocentro");
    }
    while (alineacion.delanteros.length < formacion[2]) {
        jugadorForzado = jugadoresOrdenadosPorCalidad.shift();
        alineacion.delanteros.push(jugadorForzado);
        log(jugadorForzado.nombre + " ha sido obligado a jugar como delantero");
    }

    return alineacion;
};

function sumaCalidad(posicion) {
    var suma = 0;
    posicion.forEach(function(jugador, indice) {
        suma += jugador.calidad;
    });
    return suma;
}

function jugadoresPosicionForzada(posicionEquipo, posicionNatural, incremento) {
    var aux = 0;
    posicionEquipo.forEach(function(jugador, indice) {
        if (jugador.posicion != posicionNatural) {
            aux += incremento;
        }
    });
    return aux;
}

var seleccionarJugadorMasHabilidoso = function(equipo){
    var mvp = 0;
    equipo["defensas"].forEach(function(jugador){
        mvp = (mvp > jugador.calidad) ? mvp : jugador.calidad;
    });
    equipo["mediocentro"].forEach(function(jugador){
        mvp = (mvp > jugador.calidad) ? mvp : jugador.calidad;
    });
    equipo["delanteros"].forEach(function(jugador){
        mvp = (mvp > jugador.calidad) ? mvp : jugador.calidad;
    });
    return mvp;
}

var Equipo = function(entrenador, formacion = [4, 4, 2], nombre) {
    this.jugadores = [];
    this.entrenador = entrenador;
    this.formacion = formacion;
    this.nombre = nombre;
}

Equipo.prototype.ataca = function(equipo) {
    var calidadMedioCentrosEquipo1 = sumaCalidad(this.jugadores[0].mediocentro);
    var calidadMedioCentrosEquipo2 = sumaCalidad(equipo.jugadores[0].mediocentro);
    var calidadDelanterosEquipo1 = sumaCalidad(this.jugadores[0].delanteros);
    var calidadDefensasEquipo2 = sumaCalidad(equipo.jugadores[0].defensas);
    var calidadPorteroEquipo2 = sumaCalidad(equipo.jugadores[0].portero);
    var C = 0;

    C += jugadoresPosicionForzada(this.jugadores[0].portero, "Portero", -10);
    C += jugadoresPosicionForzada(this.jugadores[0].defensas, "Defensa", -10);
    C += jugadoresPosicionForzada(this.jugadores[0].mediocentro, "Mediocentro", -10);
    C += jugadoresPosicionForzada(this.jugadores[0].delanteros, "Delantero", -10);
    C += jugadoresPosicionForzada(equipo.jugadores[0].portero, "Portero", 10);
    C += jugadoresPosicionForzada(equipo.jugadores[0].portero, "Defensa", 10);
    C += jugadoresPosicionForzada(equipo.jugadores[0].portero, "Mediocentro", 10);
    C += jugadoresPosicionForzada(equipo.jugadores[0].portero, "Delantero", 10);

    var A = calidadMedioCentrosEquipo1 - calidadMedioCentrosEquipo2;
    var B = calidadDelanterosEquipo1 - calidadDefensasEquipo2;
    C += A + B - calidadPorteroEquipo2;
    var Fortuna = getRandomInteger(-200, 200);

    var TOTAL = C + Fortuna;

    if (TOTAL >= 100) {
        error("GOOOOOOOL");
    } else if (TOTAL > 10 && TOTAL < 100) {
        warn("El portero rival ataja la pelota!");
    } else if (TOTAL > 0 && TOTAL <= 10) {
        warn("PALOOOOOOOO!!!!!!");
    } else if (TOTAL < 0 && TOTAL < -140) {
        warn("El ataque no generó ningún peligro");
    } else {
        if(getRandomInteger(1,20) > 18){
            warn("Falta en defensa, se declara PENAL!!!");
            var pateador = seleccionarJugadorMasHabilidoso(this.jugadores[0]);
            var portero = calidadPorteroEquipo2;
            if(pateador > portero){
                if(getRandomInteger(1,10) != 1){
                    error("GOOOOOOL de PENAL!!!!");
                    TOTAL = 100;
                }else{
                    warn("El disparo de penal se eleva a las nubes!!!");
                }
                
            } else{
                warn("El portero para el penal!!!!!!");
            }
        }else{
            warn("Falta en ataque, se anula la jugada");
        }
    }
    return TOTAL;
}

function imprimirEquipo(equipo) {
    equipo.jugadores[0].portero.forEach(function(jugador) {
        log("Portero: " + jugador.nombre + " | Camiseta: " + jugador.numero);
    })
    equipo.jugadores[0].defensas.forEach(function(jugador) {
        log("Defensa: " + jugador.nombre + " | Camiseta: " + jugador.numero);
    })
    equipo.jugadores[0].mediocentro.forEach(function(jugador) {
        log("Mediocentro: " + jugador.nombre + " | Camiseta: " + jugador.numero);
    })
    equipo.jugadores[0].delanteros.forEach(function(jugador) {
        log("Delantero: " + jugador.nombre + " | Camiseta: " + jugador.numero);
    })
    log("Entrenador: " + equipo.entrenador.nombre);
    log("Formacion: " + equipo.formacion);
}

var Partido = function(equipo1, equipo2) {
    this.equipo1 = equipo1;
    this.equipo2 = equipo2;
}

Partido.prototype.iniciaPartido = function() {
    error("Plantilla " + this.equipo1.nombre);
    imprimirEquipo(this.equipo1);
    error("Plantilla " + this.equipo2.nombre);
    imprimirEquipo(this.equipo2);
    warn("Empieza el partido!!!");
    var numeroAtaquesEquipos = 10;
    var golesEquipo1 = 0;
    var golesEquipo2 = 0;

    while (numeroAtaquesEquipos > 0) {
        log("Ataca " + this.equipo1.nombre + ": ");
        var ataqueEquipo1 = this.equipo1.ataca(this.equipo2);
        log("Ataca " + this.equipo2.nombre + ": ");
        var ataqueEquipo2 = this.equipo2.ataca(this.equipo1);
        numeroAtaquesEquipos--;
        if (ataqueEquipo1 >= 100)
            golesEquipo1++;
        if (ataqueEquipo2 >= 100)
            golesEquipo2++;
    }
    log("Termina el partido");
    error(this.equipo1.nombre + ": " + golesEquipo1 + " - " + this.equipo2.nombre + ": " + golesEquipo2);
};

var formacionSoloDefensas = [8, 1, 1];
var formacionTodosAlAtaque = [1, 1, 8];
var formacionSoloMedioCentro = [1, 8, 1];
var formacion442 = [4, 4, 2];
var formacion334 = [3, 3, 4];
var formacion532 = [5, 3, 2];
var formacion433 = [4, 3, 3];
var formacion525 = [5, 2, 5];

var formaciones = [formacion442, formacion334, formacion532, formacion433, formacion525];

var entrenador1 = new Entrenador();
var entrenador2 = new Entrenador();

var equipo1 = new Equipo(entrenador1, generarFormacionAleatorio(), generarNombreEquipoAleatorio());
var equipo2 = new Equipo(entrenador2, generarFormacionAleatorio(), generarNombreEquipoAleatorio());

//generando jugadores para equipo 1
for (var i = 1; i < 23; i++) {
    Jugador.prototype = new Persona();
    equipo1.jugadores.push(new Jugador(posiciones[getRandomInteger(0, 3)], i));
}

//generando jugadores para equipo 2
for (var i = 1; i < 23; i++) {
    Jugador.prototype = new Persona();
    equipo2.jugadores.push(new Jugador(posiciones[getRandomInteger(0, 3)], i));
}

var plantillaEquipo1 = entrenador1.elegirPlantillaParaPartido(equipo1.jugadores, equipo1.formacion, equipo1.nombre);
var plantillaEquipo2 = entrenador2.elegirPlantillaParaPartido(equipo2.jugadores, equipo2.formacion, equipo2.nombre);

equipo1.jugadores = [];
equipo1.jugadores.push(plantillaEquipo1);

equipo2.jugadores = [];
equipo2.jugadores.push(plantillaEquipo2);

var partido = new Partido(equipo1, equipo2);

partido.iniciaPartido();
