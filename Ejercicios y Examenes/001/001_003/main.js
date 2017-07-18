var log = x => console.log(x);

function test(arr){
	var result;

	if(arr.every(x => (typeof(x) == "string")))
		result = arr.map(x => ({num: x.length, string: x})).sort((a, b) => b.num - a.num)[0];
	else
		result = "Ingrese un arreglo solo de strings";
	return result;
}

log(test(["Richie", "Joanie", "Greg es grande", "Marcia", "Bobby"]));
log(test(["Richie", 12, "Greg", "Marcia", "Bobby"]));




