var log = x => console.log(x);

function calculoDNI(numeroDNI){
	var arr = ["T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"];
	var result;
	var aux = numeroDNI.toString();

	if(typeof(numeroDNI) != "number"){
		result = "Debes introducir un valor numérico";
	} else if (numeroDNI < 0){
		result =  "Debes introducir un valor positivo";
	} else if(aux.length != 8){
		if (aux.length > 8){
			result = "Debes introducir un número menor a 8 digitos";
		} else {
			while(aux.length < 8){
				aux = "0" + aux;
			}
			result = aux + arr[aux % 23];
		}
	} else{
		result = arr[numeroDNI % 23];
	}
	return result;
}

log("La letra del DNI 12312312K es: " + calculoDNI(12312312));
log("La letra del DNI 78163312C es: " + calculoDNI(78163312));
log("La letra del DNI 12345678Z es: " + calculoDNI(12345678));

log(calculoDNI("12312312"));
log(calculoDNI(7816331223523523));
log(calculoDNI(-12345678));
log(calculoDNI(678));