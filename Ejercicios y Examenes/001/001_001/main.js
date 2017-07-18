function calculoDNI(numeroDNI){
	var arr = ["T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"];
	return arr[numeroDNI % 23];
}

console.log("La letra del DNI 12312312K es: " + calculoDNI(12312312));
console.log("La letra del DNI 78163312C es: " + calculoDNI(78163312));
console.log("La letra del DNI 12345678Z es: " + calculoDNI(12345678));
