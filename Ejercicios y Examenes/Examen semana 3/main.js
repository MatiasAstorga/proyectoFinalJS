const LOG = x => console.log(x);
const WARN = x => console.warn(x);
const ERROR = x => console.error(x);

var paginaCalculadaConOffset = x => (x - 1) * 20;
var toTop = () => window.setTimeout(() => document.getElementById('top').scrollIntoView(), 500);

var crearElemento = (tipo, texto, nodoPadre, clase, id) => {
    var element = document.createElement(tipo);
    var text = document.createTextNode(texto);
    element.appendChild(text);
    var att1 = document.createAttribute("class");
    att1.value = clase;
    element.setAttributeNode(att1);
    var att2 = document.createAttribute("id");
    att2.value = id;
    element.setAttributeNode(att2);
    if (nodoPadre != undefined)
        document.getElementById(nodoPadre).appendChild(element);
    return element;
}

class Pokedex {
    constructor() {
        this.pokemons = [];
        this.paginaActual = 1;
        this.numeroTotalPokemons = 0;
        this.PokemonApi = new PokemonApi();

        this.pintarEstructuraBase();
        this.pintarPagina();
    }

    pintarEstructuraBase() {
        document.body.innerHTML = `
        <div id="pokedex">
        	<div id="top"></div>
            <header>
                <div id="acciones"></div>
            </header>
            <div class="col-xs-11 col-sm-4 col-md-4 col-lg-4" id="pokemons"></div>
         	<div class="col-xs-11 col-sm-7 col-md-7 col-lg-6" id="detallePokemon"></div>
        </div>`;

        crearElemento("h1", "La pokedex xanxa!", "acciones", "", "titulo")
        crearElemento("button", "< Anterior", "acciones", "btn btn-primary", "paginaAnterior").addEventListener("click", () => this.otraPagina(-1));
        crearElemento("label", "Página actual: 1", "acciones", "inLine", "labelPaginaActual");
        crearElemento("button", "Siguiente >", "acciones", "btn btn-primary", "paginaSiguiente").addEventListener("click", () => this.otraPagina(+1));
    }

    pintarPagina() {
        this.PokemonApi.getPokemonsAtPage(0).then(data => this.pintarPaginaHTML(data));
    }

    pintarPaginaHTML(pokemons) {
        var data = `<h3>Listado de Pokemons: </h3>
                    <table class="table table-condensed">
                        <tr>
                            <td> Nombre </td>
                            <td> Acciones </td>                        
                        </tr>`;

        for (var i = 0; i < pokemons.length; i++) {
            var pokemon = pokemons[i];
            this.pokemons.push(pokemon);
            data += `
        				<tr>
				            <th>${pokemon.nombre}</th>
				            <th></th>  
				        </tr>`;
        }
        data += "</table>";
        document.getElementById("pokemons").innerHTML = data;

        document.querySelectorAll("tr>th:last-child").forEach((elemento) => {
            elemento.insertBefore(crearElemento("button", "Ver Detalles", undefined, "btn btn-primary", "verDetalles"), null);
        })

        document.querySelectorAll(".verDetalles").forEach((elemento, index) => {
            elemento.addEventListener("click", () => this.pintarDetalles(index));
        })
    }

    pintarDetalles(indice) {
        var pokemon = this.pokemons[indice];
        this.PokemonApi.getPokemonByUrl(pokemon.urlDetalle).then(data => pokemon.pintarDetallesHTML(data));
        toTop();
    }

    otraPagina(incremento) {
        this.PokemonApi.getPokemonsAtPage(paginaCalculadaConOffset(this.modificarPaginaActual(incremento))).then(data => this.pintarPaginaHTML(data));
    }

    modificarPaginaActual(index) {
        this.paginaActual += index;
        if (this.paginaActual < 1)
            this.paginaActual = 1;

        document.getElementById('labelPaginaActual').innerHTML = "Página actual: " + this.paginaActual;
        this.pokemons = [];

        return this.paginaActual;
    }

}

class Pokemon {
    constructor(nombre, urlDetalles) {
        this.nombre = nombre;
        this.urlDetalle = urlDetalles;
    }

    pintarDetallesHTML(datos) {
        var data = `<h3>Detalle del pokemon: </h3>
    				<img class= imgPos src= ${datos.sprites.front_default}>
    				<img class= imgPos src= ${datos.sprites.back_default}>
    				<img class= imgPos src= ${datos.sprites.front_shiny}>
    				<img class= imgPos src= ${datos.sprites.back_shiny}>
               		<label><b>Nombre:</b> ${datos.name}</label>
                	<label><b>Peso:</b> ${datos.weight/10} kg.</label>
                	<label><b>Altura:</b> ${datos.height/10} m</label>
                	<label><b>Tipo: </b>`;

        for (let i = 0; i < datos.types.length; i++)
            (i == datos.types.length - 1) ? data += datos.types[i].type.name + "</label>" : data += datos.moves[i].move.name + " - ";

        data += "<label><b>Ataques:</b> ";
        for (let i = 0; i < datos.moves.length; i++)
            (i == datos.moves.length - 1) ? data += datos.moves[i].move.name + "</label>" : data += datos.moves[i].move.name + ", ";

        document.getElementById("detallePokemon").innerHTML = data;
    }
}

class APIClient {
    constructor() {

    }

    get(url) {
        var misCabeceras = new Headers();

        var miInit = {
            method: 'GET',
            headers: misCabeceras
        };

        return fetch(url, miInit).then((response) => response.json());
    }
}

class PokemonApi {
    constructor() {
        this.urlBase = 'http://pokeapi.co/api/v2/pokemon';
        this.apiClient = new APIClient();
    }

    getPokemonsAtPage(numeroPagina) {
        var url = this.urlBase + '/?offset=' + numeroPagina;
        var misCabeceras = new Headers();

        var miInit = {
            method: 'GET',
            headers: misCabeceras
        };

        return this.apiClient.get(url).then(
            (dataEnJson) => {
                let arrayPokemons = [];
                for (let i = 0; i < dataEnJson.results.length; i++) {
                    let elem = dataEnJson.results[i];
                    let pokemon = new Pokemon(elem.name, elem.url);
                    arrayPokemons.push(pokemon);
                }
                return arrayPokemons;
            }
        );
    }

    getPokemonByUrl(urlDePokemon) {
        var url = urlDePokemon;
        var misCabeceras = new Headers();

        var miInit = {
            method: 'GET',
            headers: misCabeceras
        };

        return this.apiClient.get(url).then((dataEnJson) => dataEnJson);
    }
}

var pokedex;

window.onload = () => {
    pokedex = new Pokedex();
};