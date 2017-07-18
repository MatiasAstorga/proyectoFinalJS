var log = x => console.log(x);

function media(str){
	var aux = str.split(":");
	aux = eliminarRepetidos(aux);
	return aux.reduce((x, y) => (+x + +y)) / aux.length;
}

function eliminarRepetidos(arr){
	return arr.filter((value, index) => arr.indexOf(value) == index)
}

log(media("80:70:90:100:100:100:80"));

