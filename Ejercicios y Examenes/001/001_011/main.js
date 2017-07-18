var log = x => console.log(x);

var zoo = {
	nombre: "El último zoológico",
	ubicacion: {},
	areas: [],
	aforo: 70,
	numeroVisitantes: 0,
	caja: 50000,
	enfermeria: []
};

var ubicacion = {
	direccion: "Calle de los animalitos 123",
	ciudad: "Ciudad de México",
	pais: "México",
	telefono: 999888777
}

function area(nombre, aforo, recintos, animales){
	return {
		nombre: nombre,
		aforoMaximo: aforo,
		recintos: recintos,
	};
}

function recintoDetalles(nombre, animales, capacidad, detalle){
	return {
		nombre: nombre,
		animales: animales,
		capacidad: capacidad,
		detalle: detalle,
		visitantes: []
	};
}

function animales(nombre, especie, salud, hambre, pais){
	return {
		nombre: nombre,
		especie: especie,
		salud: salud,
		hambre: hambre,
		pais: pais
	};
}

var nombresPersonas = ["Victor", "Omar", "karen", "Ariel", "Omar", "David", "Esteban", "Matias", "Vlairner", "Lucy", "Ignacio", "Humberto", "Nestor", "Daniel", "Raymundo", "Fran"];

var tigreBlanco = animales("Tigre Blanco", "Felino", 30, 80, "Egipto");
var tigreNormal = animales("Tigre", "Felino", 90, 60, "Africa");

var paloma = animales("Paloma", "Avis Chilensis", 60, 100, "Chile");
var flamenco = animales("Flamenco", "Phoenicopteridae", 10, 0, "Colombia");

var tigres = [];
tigres.push(tigreBlanco, tigreNormal);

var aves = [];
aves.push(paloma, flamenco);

var recinto1 = recintoDetalles("Jaula de tigres", tigres, 10, "Jaula super reforzada con titanium");
var recinto2 = recintoDetalles("Baños", [], 50, "Baños para hombres y mujeres, aptos para personas con discapacidad");
var recinto3 = recintoDetalles("Jaula para aves", aves, 10, "Algunas aves que se pelean a seguido");

var recintoMamiferos = [];
recintoMamiferos.push(recinto1, recinto2);

var recintoAves = [];
recintoAves.push(recinto3);

var area1 = area("Mamíferos", 5000, recintoMamiferos);
var area2 = area("Aves", 200, recintoAves);

zoo.ubicacion = ubicacion;
zoo.areas.push(area1, area2);

log(zoo);

//representa el paso de 1 hora en el zoo
function ejecutarCiclo(){
	addPersona();
	modificarSaludYHambreDeTodosLosAnimales();
	log("Ciclo ejecutado!!");
}

function addPersona(){
	if(zoo.numeroVisitantes < zoo.aforo){
		var persona = crearPersona(generarNombreAleatorio(), generaCarteraAleatoria(), generarEdadAleatoria(), esEstudianteAleatorio());
		if (cobrarEntrada(persona) == "OK"){
			var recintoLibre = primerRecintoLibre();
			recintoLibre.visitantes.push(persona);
			zoo.numeroVisitantes++;
		}
	}else{
		cerrarZOO()}

	}

function crearPersona(nombre, dinero, edad, esEstudiante){
	return {
		nombre: nombre,
		cartera: dinero,
		edad: edad,
		estudiante: esEstudiante
	}
}

function generarNombreAleatorio(){
	return nombresPersonas[Math.floor(Math.random() * nombresPersonas.length)];
}

function generarEdadAleatoria(){
	return Math.floor(Math.random() * 99) + 1;
}

function esEstudianteAleatorio(){
	return Math.round(Math.random());
}

function generaCarteraAleatoria(){
	return Math.floor(Math.random() * 100);
}

function cobrarEntrada(persona){
	var importeEntrada = 5;
	if(persona.edad > 65 || persona.edad < 14){
		importeEntrada = 0;
	}else if(persona.esEstudiante){
		importeEntrada = 3;
	}
	// Bonus: que el importe de las personas sea aleatorio y haya una funcion que verifique que tenga dinero

	if(persona.cartera >= importeEntrada){
		persona.cartera -= importeEntrada;
		zoo.caja += importeEntrada;
		return "OK";
	}else{
		console.error(persona.nombre + " no tiene dinero para pagar la entrada al zoológico");
		return false;
	}
	
}

function primerRecintoLibre(){
	var recintoLibre = null;

	for(var a = 0; a < zoo.areas.length; a++){
		var area = zoo.areas[a];

		for(var r = 0; r < area.recintos.length; r++){
			var recinto = area.recintos[r];
			if(!recintoLibre && recinto.visitantes.length < recinto.capacidad){
				recintoLibre = recinto;
			}
		}
	}
	return recintoLibre;
}

var intervalID = setInterval(ejecutarCiclo, 1000);

/* 

1 - crear funcion cerrar zoo:

parar el intervalo
sacar a todas las personas del zoo

2 - crear funcion aleatoria (modificarSaludAleatoria(animal)) que sume o reste salud a un animal entre -20 y 20 (maxima salud 100)

3 - en cada ciclo ejecutar la funcion modificarSaludAleatoria para todos los animales, si alguno baja de 50 de salud, debera ir a enfermeria

4 - En la enfermeria en cada ciclo los animales recuperan 10 de salud

5 - Si el animal llega a 100 de salud deberá volver a su area (debemos saber a que area pertenecia)

6 - crear funcion addhambre() que en cada ciclo sume 10 al hambre de un animal. Cuando llegue a 100 el animal estará muy hambriento y deberá ser alimentado. Al alimentar un animal su hambre pasa a 0 y al zoo le cuesta 1000$

7 - si el zoo no tiene dinero para alimentar a los animales, no podrá hacerlo. Cuando un animal tenga mas de 150 de hambre, se comerá un visitante. El zoo se quedara con su cartera.

8 - En cada ciclo los visitantes deberan cambiar al siguiente recinto. Cuando hayan visitado todos, deberan abandonar el parque.

*/

function cerrarZOO(){
	log("Sacando a las personas del ZOO...");
	zoo.numeroVisitantes = 0;
	window.clearInterval(intervalID);
}

function modificarSaludAleatoria(animal){
	var salud = Math.floor(Math.random() * 41) - 20;
	var result = animal.salud += salud;
	if (result <= 100){
		if(result > 0)
			return result;
		else
			return 0;
	}
	else{
		return 100;
	}
}

function animalAEnfermeria(recinto, animal, indice){
	sacarAnimalDelRecinto(recinto, animal, indice);
	animal.salud += 10;
	return animal.salud;
}

function sacarAnimalDelRecinto(recinto, animal, indice){
	//zoo.enfermeria.push([recinto, animal]);
	//zoo.recinto.animales.splice(indice, 1);
	log("Animal: " + animal.nombre + " saliendo de " + recinto.nombre);
}

function devolverAnimalAlRecinto(recinto, animal){
	//zoo.enfermeria.splice(0, 1);
	//recinto.animales.push(animal);
	log("Animal: " + animal.nombre + " volviendo a " + recinto.nombre);
}

function addhambre(animal, recinto){
	animal.hambre += 10;
	var hambre = animal.hambre;
	if(hambre >= 100){
		return alimentarAnimales(hambre, recinto);
	}else{
		return hambre;
	}
}

function alimentarAnimales(hambre, recinto){
	if(zoo.caja > 5000 && hambre < 150){
		zoo.caja -= 5000;
	}else{
		comerseVisitante(recinto);
	}
	return 0;
}

function comerseVisitante(recinto){
	if(zoo.numeroVisitantes > 0){
		var aux = eliminarVisitanteAleatorio(recinto);
		zoo.caja += aux;
		if(aux == 0){
			console.warn("No hay visitantes en el recinto, el animalito se alimenta de aire para sobrevivir");
		}else{
			console.warn("Visitante muerto - recuperado: $" + aux);
			console.warn("Caja del zoo = $" + zoo.caja);
		}
		
	}
}

function eliminarVisitanteAleatorio(recinto){
	var visitantes = recinto.visitantes.length;
	if(visitantes > 0){
		zoo.numeroVisitantes--;
		var rand = Math.random() * visitantes;
		var aux = recinto.visitantes.splice(rand, 1);
		return aux[0].cartera;
	}else
		return 0;
}


function modificarSaludYHambreDeTodosLosAnimales(){
	for(var a = 0; a < zoo.areas.length; a++){
		var area = zoo.areas[a];
		for(var r = 0; r < area.recintos.length; r++){
			var recinto = area.recintos[r];
			for(var z = 0; z < recinto.animales.length; z++){
				var animal = recinto.animales[z];
				animal.salud = modificarSaludAleatoria(animal);
				animal.hambre = addhambre(animal, recinto);
				log("Animal: " + animal.nombre + " - Salud: " + animal.salud);
				if(animal.salud < 50){
					log("Animal: " + animal.nombre + " a enfermeria.");
					animal.salud = animalAEnfermeria(recinto, animal, z);
				}else{
					if(animal.salud >= 100){
						devolverAnimalAlRecinto(recinto, animal);
					}
				}
			}
		}
	}
}






