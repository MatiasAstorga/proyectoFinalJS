var log = x => console.log(x);

function test(a) {
	var response = [];
	for(var i = 0; i < a.length ; i++) {
		for(var j = i ; j < a.length ; j++) {
			if(a[i] + a[j] == 0)
				response.push(i + "," + j);

		} 
	}
	return response;
}

var array = [2, -5, 10, 5, 4, -10, 0, -5];

log(test(array));