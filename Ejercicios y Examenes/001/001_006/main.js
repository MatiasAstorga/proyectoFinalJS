var log = x => console.log(x);

function vaciarPapelera(array) {
	return array.filter(x => x != "*");
}

function agruparElementos(array) {
	return array.sort();
}

function ponerBonitasLasLetras(array) {
	return array.map(function(x) {
		if(typeof(x) == "string" && x.match(/[aeiouAEIOU]/)){
			return x.toUpperCase();
		}else if (typeof(x) == "string"){
			return x.toLowerCase();
		}else{
			return x;
		}
	})
}


function ponerBonitosLosNumeros(array) {
	return array.map(function(x){
		if(typeof(x) == "number"){
			while(x > 9){
				var aux = x.toString().split("");
				var val = aux.reduce((x,y) => +x + +y);
				x = +val;
			}
		}
		return x;
	})
}

function ordenarArray(array) {
	return array.sort();
}


function arrayToString(array) {
	return array.join("");
}

// Tests

function transformacionCompletaDelArray(array) {
	array = vaciarPapelera(array);
	log(array);
	array = agruparElementos(array);
	log(array);
	array = ponerBonitasLasLetras(array);
	log(array);
	array = ponerBonitosLosNumeros(array);
	log(array);
	array = ordenarArray(array);
	log(array);
	array = arrayToString(array);
	log(array);

	return array;
}

log(transformacionCompletaDelArray(["a", 6, "B", "F", "*", 8, 78, "J"]) === "668Abfj");
log(transformacionCompletaDelArray(["*", "j", 6, "A", "F", "*", 8, "C", "b", "a", 78, "J", 43523, 1111, "r", "q", "y"]) === "46688AAbcfjjqry");
