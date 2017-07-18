var log = x => console.log(x);

function ponerTodasLasLetrasMayusculas(str){
	return str.toUpperCase();
}

function stringInverso(str){
	return str.split("").reverse().join("");
}

function eliminarEspacios(str){
	return str.trim().replace(/\s/g, "");
}

function esPalindromo(str){
	str = ponerTodasLasLetrasMayusculas(str);
	str = eliminarEspacios(str);
	return str === stringInverso(str);
}

var test1 = "Arde ya la yedra";
var test2 = "Ana lava lana";
var test3 = "Anita lava la tina";

log(esPalindromo(test1));
log(esPalindromo(test2));
log(esPalindromo(test3));