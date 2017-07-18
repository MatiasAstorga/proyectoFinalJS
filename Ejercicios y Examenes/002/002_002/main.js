var log = x => console.log(x);
var error = x => console.error(x);
var warn = x => console.warn(x);

var Vikingo = function(nombre="Un vikingo cualquiera", salud = 500, potenciaAtaque = 10, velocidad = 20, armas = []) {
    this.nombre = nombre;
    this.salud = salud;
    this.potenciaAtaque = potenciaAtaque;
    this.velocidad = velocidad;
    this.armas = armas;
    this.armaActual = null;
}

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
        log("Usando " + arma.tipo + " para atacar - Potencia: " + arma.potencia);
        if (arma.ataquesRestantes > 0) {
            vikingo.salud -= arma.potencia;
            arma.restarAtaquesRestantes();
            warn("Ataques restantes de " + arma.tipo + ": " + arma.ataquesRestantes);
            if (arma.ataquesRestantes == 0) {
                error("Abandonando " + arma.tipo);
                this.abandonarArma(arma);
            }
        } else {
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

var Batalla = function(vikingo1, vikingo2) {
    this.vikingo1 = vikingo1;
    this.vikingo2 = vikingo2;
}

Batalla.prototype.iniciarBatalla = function() {
    log("Iniciando batalla...");
    var turno = 1;
    var vik1 = this.vikingo1;
    var vik2 = this.vikingo2;
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
    (vik1.salud == 0) ? log("Gana la batalla: " + vik2.nombre): log("Gana la batalla: " + vik1.nombre);
    log("Ha terminado la batalla...");
};

// armas
var espadaCorta = new Arma("Espada corta", 25, 8);
var espadaLarga = new Arma("Espada larga", 35, 6);
var hacha = new Arma("Hacha", 40, 4);
var maza = new Arma("Maza", 50, 2);
var cuchillo = new Arma("Cuchillo", 20, 10);

// vikingos
var vikingo1 = new Vikingo("Olaf", 500, 12, 30);
var vikingo2 = new Vikingo("Thor", 500, 15, 25);

// asignacion de armas
vikingo1.addArma(espadaLarga);
vikingo1.addArma(cuchillo)
vikingo1.addArma(maza);
vikingo2.addArma(hacha);
vikingo2.addArma(espadaCorta);


var batalla = new Batalla(vikingo1, vikingo2);

batalla.iniciarBatalla();