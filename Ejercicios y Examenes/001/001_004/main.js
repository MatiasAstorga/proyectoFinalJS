var log = x => console.log(x);

function test(arr){
	return arr.map(x => x.length).sort((a, b) => b - a)[0];
}

function media(arr){
	return arr.reduce((x, y) => (x + y)) / arr.length;

}

var resultados = [];

resultados.push(test(["Richie", "Joanie", "Greg", "Marcia", "Bobby"]));
resultados.push(test(["Blanka", "Zangief", "Chun Lis", "Guile"]));
resultados.push(test(["Red", "Blue", "Green"]));
resultados.push(test(["Hola", "Frase corta", "Frase normalita", "Frase muy muy larga"]));

log("La media es: " + media(resultados));