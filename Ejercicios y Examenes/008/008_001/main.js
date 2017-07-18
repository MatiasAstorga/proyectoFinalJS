/*

Realiza una agenda de contactos que se persista en el navegador.

Trata de realizar la mayor abstracción posib​le: en el HTML no puede haber nada más que la importación del script JS. Los botones de acciones no pueden hacer referencia a ningún objeto (deberás añadir las acciones con addEventListener de arrow functions o funciones bindeadas). Haz que la agenda se pinte haciendo llamadas a pintar de cada contacto.

Pasos:

1) Crea la clase contacto que almacenará los datos básicos de una persona:

- Nombre
- Apellidos
- Email
- URL fotografía

2) Crea la clase Agenda que almacene los contactos de un usuario.

3) Maqueta la agenda de contactos. Puedes hacer uso de una tabla o si lo quieres hacer más visual puedes usar divs y darles el estilo que quieras.

4) Crea un botón que al ser pulsado muestre un formulario que permita la creación de un contacto en la agenda. El formulario tendrá los campos necesarios para la creación y además los botones "Guardar" y "Cerrar". Guardar se encargará de guardar el contacto y cerrar ocultará de nuevo el formulario. Cuando se cree un contacto se deberá mostrar en el listado de contactos de la agenda.

5) Haz que la agenda completa se guarde en LocalStorage de manera que cada vez que abramos la página web se muestre la agenda completa.

BONUS:

6) Añade un botón eliminar en cada contacto que permita el borrado de este.

7) Añade un botón modificar que haga editable la información de un usuario. 

8) Permite la ordenación de la agenda por Nombre o por apellido​

*/

const LOG = x => console.log(x);
const WARN = x => console.warn(x);
const ERROR = x => console.error(x);

var nombresPersonas = ["Victor", "Omar", "karen", "Ariel", "Omar", "David", "Esteban", "Matias", "Vlairner", "Lucy", "Ignacio", "Humberto", "Nestor", "Daniel", "Raymundo", "Fran"];

var generarNumeroAleatorio = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
var generarElementoAleatorio = elemento => elemento[Math.floor(Math.random() * elemento.length)];
var generaryEliminarElementoAleatorio = elemento => elemento.splice(Math.floor(Math.random() * elemento.length), 1);

var crearBoton = (txt, nodoPadre, clase, id) => {
    var btn = document.createElement("button");
    var text = document.createTextNode(txt);
    btn.appendChild(text);
    var att1 = document.createAttribute("class");
    att1.value = clase;
    btn.setAttributeNode(att1);
    var att2 = document.createAttribute("id");
    att2.value = id;
    btn.setAttributeNode(att2);
    if (nodoPadre != undefined)
        document.getElementById(nodoPadre).appendChild(btn);
    return btn;
}

var reiniciarCampos = () => {
    document.getElementById("nombre").value = "";
    document.getElementById("apellidos").value = "";
    document.getElementById("email").value = "";
    document.getElementById("urlFoto").value = "";
}

class Contacto {
    constructor(nombre = generarElementoAleatorio(nombresPersonas), apellidos = generarElementoAleatorio(nombresPersonas), email = nombre + "@gmail.com", urlFoto = null) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.urlFoto = urlFoto;
    }

    pintarContactoHTML() {
        var data = `
        <tr>
            <th>${this.nombre}</th>
            <th>${this.apellidos}</th>
            <th>${this.email}</th>
            <th><img class=imgPos src=${this.urlFoto}></th>
            <th> </th>
        </tr>`;
        return data;
    }
}

class Agenda {
    constructor() {
        this.contactos = [];

        // this.agregarContactosAleatorios();
        this.pintarEstructuraBase();
        this.pintarAgenda();
        this.pintarModalNuevoContacto();
    }

    agregarContactosAleatorios() {
        for (let i = 0; i < 5; i++) {
            let contacto = new Contacto();
            this.contactos.push(contacto);
        }
    }

    pintarEstructuraBase() {
        document.body.innerHTML = `
        <div id="agendaContactos">
            <header>
                <div id="acciones"></div>
            </header>
            <div id="contactos"></div>
            <div id="modal" class="modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <div id="formularioNuevoContacto"></div>
                </div>
            </div>
        </div>`;

        var modal = document.getElementById("modal");
        crearBoton("Nuevo Contacto", "acciones", "button", "nuevoContacto").addEventListener("click", () => modal.style.display = "block");
    }


    pintarModalNuevoContacto() {
        var data = `
                <h3> Añadir contacto: </h3> 
                <label>Nombre: </label>
                <input type="text" id="nombre">
                <label>Apellidos: </label>
                <input type="text" id="apellidos">
                <label>Email: </label> 
                <input type="text" id="email">
                <label>URL Foto: </label>
                <input type="text" id="urlFoto">`;

        document.getElementById("formularioNuevoContacto").innerHTML = data;
        crearBoton("Añadir Contacto", "formularioNuevoContacto", "button2", "añadirContacto").addEventListener("click", () => this.añadirContacto());
    }

    pintarAgenda() {
        var data = `<h2>Contactos: </h2>
                    <table>
                        <tr>
                            <td> Nombre </td>
                            <td> Apellidos </td>
                            <td> Email </td>
                            <td> Foto </td>
                            <td> Acciones </td>
                        </tr>`;
        this.contactos.forEach((contacto) => data += contacto.pintarContactoHTML());
        data += "</table>";
        document.getElementById("contactos").innerHTML = data;

        document.querySelectorAll("tr>th:last-child").forEach((elemento) => {
            elemento.insertBefore(crearBoton("Borrar", undefined, "button", "borrarContacto"), null);
            elemento.insertBefore(crearBoton("Modificar", undefined, "button", "modificarContacto"), null);
        })

        document.querySelectorAll("#borrarContacto").forEach((elemento) => {
            elemento.addEventListener("click", () => LOG("BORRAR"));
        })

        document.querySelectorAll("#modificarContacto").forEach((elemento) => {
            elemento.addEventListener("click", () => LOG("MODIFICAR"));
        })
    }

    añadirContacto() {
        var nombre = document.getElementById("nombre").value;
        var apellidos = document.getElementById("apellidos").value;
        var email = document.getElementById("email").value;
        var urlFoto = document.getElementById("urlFoto").value;

        var contacto = new Contacto(nombre, apellidos, email, urlFoto);
        this.contactos.push(contacto);
        this.pintarAgenda();

        reiniciarCampos();
        setAgendaAtLocalStorage(this);
        document.getElementById("modal").style.display = "none";
    }

    setParamsDeAgendaConObjeto(objeto){
        var contactosguardados = [];
        objeto["contactos"].forEach((contacto) => {
            var nombre = contacto.nombre;
            var apellidos = contacto.apellidos;
            var email = contacto.email;
            var urlFoto = contacto.urlFoto;
            var contacto = new Contacto(nombre, apellidos, email, urlFoto);
            contactosguardados.push(contacto);
        })

        this.contactos = contactosguardados;
        this.pintarAgenda();
    }
}

function getAgendaFromLocalStorage(){
    let agendaAsString = localStorage.getItem("agenda");
    let agenda = JSON.parse(agendaAsString);
    return agenda;
}

function setAgendaAtLocalStorage(agenda){
    let agendaAsString = JSON.stringify(agenda);
    localStorage.setItem("agenda", agendaAsString);
}

var agenda;

window.onload = () => {
    if(!getAgendaFromLocalStorage()){
        agenda = new Agenda();
        setAgendaAtLocalStorage(agenda);
    }else{
        let objeto = getAgendaFromLocalStorage();
        agenda = new Agenda();
        agenda.setParamsDeAgendaConObjeto(objeto);
    }
    
    var modal = document.getElementById("modal");
    var carro = document.getElementById("carrito");
    var span = document.getElementsByClassName("close")[0];

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
};