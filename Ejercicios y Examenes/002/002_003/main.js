var log = x => console.log(x);
var error = x => console.error(x);
var warn = x => console.warn(x);

var nombresPersonas = ["Victor", "Omar", "karen", "Ariel", "Omar", "David", "Esteban", "Matias", "Vlairner", "Lucy", "Ignacio", "Humberto", "Nestor", "Daniel", "Raymundo", "Fran"];

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generarNombreAleatorio() {
    return nombresPersonas[Math.floor(Math.random() * nombresPersonas.length)];
}

function generarArmasAleatorio() {
    var espadaCorta = new Arma("Espada corta", 25, 8);
    var espadaLarga = new Arma("Espada larga", 35, 7);
    var hacha = new Arma("Hacha", 40, 4);
    var maza = new Arma("Maza", 50, 3);
    var cuchillo = new Arma("Cuchillo", 20, 10);
    var baston1 = new Arma("Baston de sanador", 15, 30);
    var baston2 = new Arma("Baston de curandero", 15, 30);

    var armasDeCombate = [espadaCorta, espadaLarga, hacha, maza, cuchillo, baston1, baston2];

    return armasDeCombate[Math.floor(Math.random() * armasDeCombate.length)];
}

var EjercitoVikingo = function(vikingos, armas) {
    this.vikingos = vikingos;
    this.armas = armas;
};

EjercitoVikingo.prototype.revisarCuranderosDisponibles = function() {
    var curandero = null;
    for (var i = 0; i < this.vikingos.length; i++) {
        if (this.vikingos[i].resucitarRestantes != undefined && this.vikingos[i].resucitarRestantes > 0) {
            curandero = this.vikingos[i];
        }
        /*else if(this.vikingos[i].resucitarRestantes <= 0){
            log(this.vikingos[i].nombre + " no puede lanzar mas -Resucitar-");
            log(this.vikingos[i].nombre + " arranca de la batalla...");
            this.vikingos.splice(this.vikingos.indexOf(this.vikingos[i]), 1);
        }*/
    }
    return curandero;
};

EjercitoVikingo.prototype.asignarArmasASoldados = function() {
    var ejercito = this;
    this.vikingos.forEach(function(soldado) {
        var armaAsignada1 = ejercito.armas.pop();
        soldado.addArma(armaAsignada1);
        var armaAsignada2 = ejercito.armas.pop();
        soldado.addArma(armaAsignada2);
    })
};

EjercitoVikingo.prototype.formarPor = function(atributo) {
    if (atributo == "velocidad") {
        this.vikingos.sort((a, b) => b.velocidad - a.velocidad);
    } else if (atributo == "aleatorio") {
        this.vikingos.sort((a, b) => 0.5 - Math.random());
    }
};

var SoldadoVikingo = function() {};

var CuranderoVikingo = function() {
    this.resucitarRestantes = 5;
    this.resucitarVikingo = function(vikingo) {
        this.resucitarRestantes--;
        warn("Resucitando a " + vikingo.nombre);
        log("-Resucitar- restantes: " + this.resucitarRestantes);
        vikingo.salud = vikingo.saludMaxima;
    };
};

var Vikingo = function(nombre = generarNombreAleatorio(), salud = getRandomInteger(100, 300), potenciaAtaque = getRandomInteger(1, 30), velocidad = getRandomInteger(1, 100), armas = []) {
    this.nombre = nombre;
    this.salud = salud;
    this.potenciaAtaque = potenciaAtaque;
    this.velocidad = velocidad;
    this.armas = armas;
    this.armaActual = null;
    this.saludMaxima = salud;
};

Vikingo.prototype.armaMasPotente = function(arrayArmas) {
    return arrayArmas.sort((x, y) => y.potencia - x.potencia)[0];
};

Vikingo.prototype.addArma = function(arma) {
    this.armas.push(arma);
};

Vikingo.prototype.abandonarArma = function(arma) {
    this.armas.splice(this.armas.indexOf(arma), 1);
    this.armaActual = null;
};

Vikingo.prototype.ataca = function(vikingo) {
    log("Ataca: " + this.nombre);
    if (this.armas.length > 0) {
        var arma = this.armaActual || this.armaMasPotente(this.armas);
        this.armaActual = arma;
        if (arma.ataquesRestantes > 0) {
            log("Usando " + arma.tipo + " para atacar - Potencia: " + arma.potencia);
            vikingo.salud -= arma.potencia;
            arma.restarAtaquesRestantes();
            warn("Ataques restantes de " + arma.tipo + ": " + arma.ataquesRestantes);
            if (arma.ataquesRestantes == 0) {
                error("Abandonando " + arma.tipo);
                this.abandonarArma(arma);
            }
        } else {
            log("Eligiendo nueva arma...")
            this.abandonarArma(arma);
        }
    } else {
        error("Sin armas disponible, atacando con puños!!!")
        vikingo.salud -= this.potenciaAtaque;
    }
    if (vikingo.salud < 0) vikingo.salud = 0;
    log("Salud " + vikingo.nombre + ": " + vikingo.salud);
    log("Salud " + this.nombre + ": " + this.salud);
};

var Arma = function(tipo = "Espada rota", potencia = 20, ataquesRestantes = 1) {
    this.tipo = tipo;
    this.potencia = potencia;
    this.ataquesRestantes = ataquesRestantes;
}

Arma.prototype.restarAtaquesRestantes = function() {
    this.ataquesRestantes--;
};

var Batalla = function(ejercito1, ejercito2) {
    this.ejercito1 = ejercito1;
    this.ejercito2 = ejercito2;
}

Batalla.prototype.enfrentarEjercitos = function() {
    log("Iniciando batalla de ejercitos!!!!...");
    var contadorEjercito1 = 24;
    var contadorEjercito2 = 24;
    while (contadorEjercito1 >= 0 && contadorEjercito2 >= 0) {
        this.iniciarBatalla(this.ejercito1.vikingos[contadorEjercito1], this.ejercito2.vikingos[contadorEjercito2]);
        if (this.ejercito1.vikingos[contadorEjercito1].salud == 0) {
            contadorEjercito1--;
        } else {
            contadorEjercito2--;
        }
        warn("Cantidad de Soldados vivos ejercito 1: " + (contadorEjercito1 + 1));
        warn("Cantidad de Soldados vivos ejercito 2: " + (contadorEjercito2 + 1));
    }
};

Batalla.prototype.iniciarBatalla = function(vikingo1, vikingo2) {
    log("Iniciando batalla...");
    var turno = 1;
    var vik1 = vikingo1;
    var vik2 = vikingo2;
    var atacaEnTurno = (vik1.velocidad > vik2.velocidad) ? 1 : 2;
    while (vik1.salud > 0 && vik2.salud > 0) {
        log("------------------");
        log("Round " + turno);
        if (atacaEnTurno == 1) {
            vik1.ataca(vik2);
            atacaEnTurno = 2;
        } else {
            vik2.ataca(vik1);
            atacaEnTurno = 1;
        }
        turno++;
    }
    if (vik1.salud == 0) {
        log("Gana la batalla: " + vik2.nombre);
        // busca curandero para tratar de resucitar al vikingo muerto
        var buscarCuranderoDisponible = ejercito2.revisarCuranderosDisponibles();
        if (buscarCuranderoDisponible != null) {
            buscarCuranderoDisponible.resucitarVikingo(vik1);
            this.iniciarBatalla(vik1, vik2);
        }
    } else {
        log("Gana la batalla: " + vik1.nombre);
        // busca curandero para tratar de resucitar al vikingo muerto
        var buscarCuranderoDisponible = ejercito1.revisarCuranderosDisponibles();
        if (buscarCuranderoDisponible != null) {
            buscarCuranderoDisponible.resucitarVikingo(vik2);
            this.iniciarBatalla(vik1, vik2);
        }
    }
};

var setDeVikingos1 = [];
var setDeVikingos2 = [];
var setDeArmas1 = [];
var setDeArmas2 = [];

for (var i = 0; i < 5; i++) {
    CuranderoVikingo.prototype = new Vikingo();
    var vikingoCurandero1 = new CuranderoVikingo();

    CuranderoVikingo.prototype = new Vikingo();
    var vikingoCurandero2 = new CuranderoVikingo();

    setDeVikingos1.push(vikingoCurandero1);
    setDeVikingos2.push(vikingoCurandero2);
}

for (var i = 0; i < 20; i++) {
    SoldadoVikingo.prototype = new Vikingo();
    var vikingo1 = new SoldadoVikingo();

    SoldadoVikingo.prototype = new Vikingo();
    var vikingo2 = new SoldadoVikingo();

    setDeVikingos1.push(vikingo1);
    setDeVikingos2.push(vikingo2);
}

for (var i = 0; i < 50; i++) {
    setDeArmas1.push(generarArmasAleatorio());
    setDeArmas2.push(generarArmasAleatorio());
}

// ejercitos
var ejercito1 = new EjercitoVikingo(setDeVikingos1, setDeArmas1);
var ejercito2 = new EjercitoVikingo(setDeVikingos2, setDeArmas2);

ejercito1.asignarArmasASoldados();
ejercito2.asignarArmasASoldados();

ejercito1.formarPor("aleatorio");
ejercito2.formarPor("velocidad");

var batalla = new Batalla(ejercito1, ejercito2);

batalla.enfrentarEjercitos();