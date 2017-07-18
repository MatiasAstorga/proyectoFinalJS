function getPersonajes() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', 'https://ironhack-characters.herokuapp.com/characters');
    var callback = function(response) {
        if (httpRequest.readyyState == 4) {
            console.log(httpRequest.responseText);
        }
    }
    httpRequest.onreadystatechange = callback;
    httpRequest.send();
}

function getPersonajesFetch() {
    var url = 'https://ironhack-characters.herokuapp.com/characters';
    var misCabeceras = new Headers();

    var miInit = {
        method: 'GET',
        headers: misCabeceras
    };

    fetch(url, miInit).then(
        (response) => {
            console.log(response);
            response.json().then((dataEnJson) => console.log(dataEnJson));
        }
    );
}

function getPersonajesFetch2() {
    var url = 'https://ironhack-characters.herokuapp.com/characters';
    var misCabeceras = new Headers();

    var miInit = {
        method: 'GET',
        headers: misCabeceras
    };

    fetch(url, miInit).then(
        (response) => response.json()
    ).then(
        (dataEnJson) => console.log(dataEnJson)
    );
}