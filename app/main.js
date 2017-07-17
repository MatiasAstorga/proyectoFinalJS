const LOG = x => console.log(x);
const WARN = x => console.warn(x);
const ERROR = x => console.error(x);

const NEW_URL = (datos, titulo, nuevaURL) => window.history.pushState(datos, titulo, nuevaURL);
const LOADING_SCREEN = x => x ? document.getElementById("pantallaCarga").style.display = "block": document.getElementById("pantallaCarga").style.display = "none";

class Pagina{
	constructor(){

	}

	pintarEstructuraBase(){

	}

	pintarPagina(){

	}
}

class Login extends Pagina{
	constructor(){
		super();

	}
}

class Main{
	constructor(){

	}


}

class APIClient {
    constructor() {}

    get(url) {
        var myHeaders = new Headers();

        var init = {
            method: 'GET',
            headers: myHeaders
        };

        return fetch(url, init).then((response) => response.json());
    }
}

class XApi {
    constructor() {
        this.urlBase = '';
        this.apiClient = new APIClient();
    }

    getX(param) {
        var url = this.urlBase + param;

        return this.apiClient.get(url).then(
            (dataEnJson) => {
                let array = [];
                // for (let i = 0; i < dataEnJson.results.length; i++) {
                //     let elem = dataEnJson.results[i];
                //     let pokemon = new Pokemon(elem.name, elem.url);
                //     arrayPokemons.push(pokemon);
                // }
                return array;
            }
        );
    }
}

function getLoginFromLocalStorage(){
    // let agendaAsString = localStorage.getItem("agenda");
    // let agenda = JSON.parse(agendaAsString);
    // return agenda;
}

function setLoginAtLocalStorage(){
    // let login = JSON.stringify(agenda);
    // localStorage.setItem("login", agendaAsString);
}

window.onload = () => {
    paginaPrincipal = new Pagina();
};
