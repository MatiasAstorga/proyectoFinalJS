var log = x => console.log(x);

function contadorCaracteres(str){
	var response = {};
	var data = {};
	var error = null;

	if (typeof(str) != "string"){
		error = "No has enviado un string";
		alert(error);
	} else{
		var aux = str.split("");
		for (var i of aux){
			(data.hasOwnProperty(i)) ? data[i]++ : data[i] = 1;
		}
	}
	response.data = data;
	response.error = error;
	return response;
}

log(contadorCaracteres("holaa como estas"));
log(contadorCaracteres(123));
