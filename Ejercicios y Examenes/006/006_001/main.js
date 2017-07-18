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
    att1.value = "button";
    btn.setAttributeNode(att1);
    if (nodoPadre != undefined)
        document.getElementById(nodoPadre).appendChild(btn);
    return btn;
}

class Personaje {
    constructor(nombre, arma, ocupacion, deuda) {
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

    getPersonajes(callback) {
        var url = this.urlBase.concat("/characters");

        var traduccionCallback = respuesta => {
            let arrayPersonajes = [];

            for (let i = 0; i < respuesta.length; i++) {
                let elem = respuesta[i];
                let personaje = new Personaje(elem.name, elem.weapon, elem.occupation, elem.debt);
                arrayPersonajes.push(personaje);
            }

            callback(arrayPersonajes);
        }
        this.apiClient.get(url, callback);
    }

    postPersonaje(personaje, callback) {
        var url = this.urlBase.concat("/characters");
        this.apiClient.post(personaje, url, callback);
    }

    deletePersonaje(id, callback){
    	var url = this.urlBase.concat("/characters/").concat(id);
        this.apiClient.delete(url, callback);
    }
}

class APIClient {
    constructor() {

    }

    get(url, callback) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.open('GET', url);
        httpRequest.onreadystatechange = (response) => {
            if (httpRequest.readyState === 4 || httpRequest.readyState === 200) {
                var objetoRespuesta = JSON.parse(httpRequest.responseText);
                callback(objetoRespuesta);
            }
        }
        httpRequest.send();
    };

    post(data, url, callback) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.open("POST", url);
        httpRequest.onreadystatechange = (response) => {
            if (httpRequest.readyState === 4 || httpRequest.readyState === 200) {
                var objetoRespuesta = JSON.parse(httpRequest.responseText);
                callback(objetoRespuesta);
            }
        }

        var datos = new FormData();
        for (var propiedad in data) {
            datos.append(propiedad, data[propiedad]);
        }

        httpRequest.send(datos);
    }

    delete(url, callback){
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
        		<table id=personajesPintados>
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
		            	<th> <button class=button2 onclick=almacen.eliminarPersonaje(${personaje.id})>Borrar personaje</button></th>
		            </tr>`;
            }
            data += "</table>";
            document.getElementById("personajes").innerHTML = data;
        }
        this.personajeClient.getPersonajes(pintarPersonajesHTML);
    }

    pintarFormulario() {
        document.getElementById("acciones").innerHTML = `
    	<h3> Añadir Personaje: </h3> 
    	<label>Nombre: </label>
		<input type="text" id="nombre">
		<label>Arma: </label>
		<input type="text" id="arma">
		<label>Ocupación: </label> 
		<input type="text" id="ocupacion">
		<label>Deuda: </label> 
		<select id="deuda">
			<option value=true>Si</option>
  			<option value=false>No</option>
		</select>
		`;
    }

    pintarAcciones() {
        crearBoton("Añadir Personaje", "acciones").addEventListener("click", () => this.añadirPersonaje());
    }

    pintarEstructuraBase() {
        document.body.innerHTML = `
        <div id="main">
            <header>
                <div id="acciones"></div>
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

        var personaje = new Personaje(nombre, arma, ocupacion, (deuda == "true") ? true : false);
        let miCallback = data => {
            this.pintarPersonajes();
            bottom();
            reiniciarCampos();
        }
        this.personajeClient.postPersonaje(personaje, miCallback);
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