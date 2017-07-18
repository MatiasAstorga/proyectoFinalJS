const LOG = x => console.log(x);
const WARN = x => console.warn(x);
const ERROR = x => console.error(x);

var bottom = () => window.setTimeout(() => document.getElementById('bottom').scrollIntoView(), 1000);

var reiniciarCampos = () => {
    document.getElementById("nombre").value = "";
    document.getElementById("arma").value = "";
    document.getElementById("ocupacion").value = "";
    document.getElementById("deuda").value = "";
}

var crearBoton = (txt, nodoPadre) => {
    var btn = document.createElement("button");
    var text = document.createTextNode(txt);
    btn.appendChild(text);
    var att1 = document.createAttribute("class");
    att1.value = "btn-primary";
    btn.setAttributeNode(att1);
    if (nodoPadre != undefined)
        document.getElementById(nodoPadre).appendChild(btn);
    return btn;
}

class Personaje {
    constructor(id, nombre, arma, ocupacion, deuda) {
        this.id = id;
        this.name = nombre;
        this.weapon = arma;
        this.occupation = ocupacion;
        this.debt = deuda;
    }
}

class PersonajeClient {
    constructor() {
        this.urlBase = 'https://ironhack-characters.herokuapp.com';
        this.apiClient = new APIClient();
    }

    getPersonajesFetch() {
        var url = this.urlBase + '/characters';
        var misCabeceras = new Headers();

        var miInit = {
            method: 'GET',
            headers: misCabeceras
        };

        return this.apiClient.getFetch(url).then(
            (dataEnJson) => {
                let arrayPersonajes = [];

                for (let i = 0; i < dataEnJson.length; i++) {
                    let elem = dataEnJson[i];
                    let personaje = new Personaje(elem.id, elem.name, elem.weapon, elem.occupation, elem.debt);
                    arrayPersonajes.push(personaje);
                }
                return arrayPersonajes;
            }
        );
    }

    postPersonajeFetch(personaje) {
        var url = this.urlBase + "/characters";
        return this.apiClient.postFetch(personaje, url);
    }

    deletePersonaje(id, callback) {
        var url = this.urlBase + "/characters/" + id;
        this.apiClient.delete(url, callback);
    }
}

class APIClient {
    constructor() {

    }

    getFetch(url) {
        var misCabeceras = new Headers();

        var miInit = {
            method: 'GET',
            headers: misCabeceras
        };

        return fetch(url, miInit).then((response) => response.json());
    }

    postFetch(data, url) {
        var misCabeceras = new Headers();
        var datos = new FormData();
        for (var propiedad in data) {
            datos.append(propiedad, data[propiedad]);
        }

        var miInit = {
            method: 'POST',
            headers: misCabeceras,
            body: datos
        };

        return fetch(url, miInit);
    }

    delete(url, callback) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.open("DELETE", url);
        httpRequest.onreadystatechange = (response) => {
            if (httpRequest.readyState === 4 || httpRequest.readyState === 200) {
                callback(httpRequest.responseText);
            }
        }
        httpRequest.send();
    }
}

class AlmacenPersonajes {
    constructor() {
        this.personajes = [];
        this.personajeClient = new PersonajeClient();

        window.setTimeout(() => {
            this.pintarEstructuraBase();
            this.pintarFormulario();
            this.pintarAcciones();
            this.pintarPersonajes();
        }, 1);
    }

    pintarPersonajes() {
        let pintarPersonajesHTML = personajes => {
            var data = `
        	<h3>Personajes:</h3>
                <div class=table-responsive> 
        		<table class='table' id=personajesPintados>
        			<thead> 
	        			<tr> 
	        				<td> ID </td>
	        				<td> Nombres </td> 
	        				<td> Arma </td> 
	        				<td> Ocupación </td> 
	        				<td> Deuda </td>
	        				<td> Accion </td>
	        			</tr>
	        		</thead>
	        		<tbody>`;

            for (var i = 0; i < personajes.length; i++) {
                var personaje = personajes[i];
                this.personajes.push(personaje);
                data += `
		        	<tr>
		        		<th> ${personaje.id}</th>
		            	<th> ${personaje.name}</th>
		            	<th> ${personaje.weapon}</th>
		            	<th> ${personaje.occupation}</th>
		            	<th> ${personaje.debt}</th>
		            	<th> <button class=btn-primary onclick=almacen.eliminarPersonaje(${personaje.id})>Borrar</button></th>
		            </tr>`;
            }
            data += "</table> </div>";
            document.getElementById("personajes").innerHTML = data;
        }
        this.personajeClient.getPersonajesFetch().then(data => pintarPersonajesHTML(data));
    }

    pintarFormulario() {
        document.getElementById("acciones").innerHTML = `
        <h3>Añadir Personaje</h3>
    	<div class='col-xs-12 col-sm-6 col-md-3 col-lg-3'>
        	<label>Nombre: </label>
            <input type="text" id="nombre">
        </div>
        <div class='col-xs-12 col-sm-6 col-md-3 col-lg-3'>
    		<label>Arma: </label>
    		<input type="text" id="arma">
        </div>
        <div class='col-xs-12 col-sm-6 col-md-4 col-lg-3'>
    		<label>Ocupación: </label> 
    		<input type="text" id="ocupacion">
        </div>
        <div class='col-xs-8 col-sm-3 col-md-3 col-lg-1'>
    		<label>Deuda: </label> 
    		<select id="deuda">
    			<option value=true>Si</option>
      			<option value=false>No</option>
    		</select>
        </div>
		`;
    }

    pintarAcciones() {
        crearBoton("Añadir Personaje", "acciones").addEventListener("click", () => this.añadirPersonaje());
    }

    pintarEstructuraBase() {
        document.body.innerHTML = `
        <div class=container>
            <header>
                <div class=row id="acciones"></div>
            </header>
            <div id="personajes"></div>
            <div id="bottom"></div>
        </div>`;
    }

    añadirPersonaje() {
        var nombre = document.getElementById("nombre").value;
        var arma = document.getElementById("arma").value;
        var ocupacion = document.getElementById("ocupacion").value;
        var deuda = document.getElementById("deuda").value;

        var personaje = new Personaje(1, nombre, arma, ocupacion, (deuda == "true") ? true : false);

        this.personajeClient.postPersonajeFetch(personaje).then(
            () => {
                this.pintarPersonajes();
                bottom();
                reiniciarCampos();
            }
        );
    }

    eliminarPersonaje(id) {
        let miCallback = data => {
            WARN(data);
            WARN("ID BORRADO: " + id);
            this.pintarPersonajes();
        }
        this.personajeClient.deletePersonaje(id, miCallback);
    }
}

var almacen = new AlmacenPersonajes();