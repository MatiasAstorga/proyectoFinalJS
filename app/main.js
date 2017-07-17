const LOG = x => console.log(x);
const WARN = x => console.warn(x);
const ERROR = x => console.error(x);
const TO_TOP = () => window.setTimeout(() => document.getElementById('top').scrollIntoView(), 500);
const TO_BOTTOM = () => window.setTimeout(() => document.getElementById('bottom').scrollIntoView(), 500);
const NEW_URL = (datos, titulo, nuevaURL) => window.history.pushState(datos, titulo, nuevaURL);

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

var getLoginFromLocalStorage = () => {
    let loginAsString = localStorage.getItem("loginProyFinal");
    return JSON.parse(loginAsString);
}

var setLoginAtLocalStorage = login => {
    let loginAsString = JSON.stringify(login);
    localStorage.setItem("loginProyFinal", loginAsString);
}

var deleteLoginAtLocalStorage = () => {
    localStorage.removeItem("loginProyFinal");
    location.reload();
}

class Pagina {
    constructor(header, footer) {
        this.pintarEstructuraBase();
        this.mostrarHeader(header);
        this.mostrarFooter(footer);
    }

    pintarEstructuraBase() {
        document.body.innerHTML = `
            <div class="container">
                <div id="top"></div>
                <header>
                    <div id="header"></div>
                </header>
                <div id="main">
                
                </div>
                <footer>
                    <div id="footer"></div>
                </footer>
                <div id="pantallaCarga">
                    <div class="loader"></div>
                </div>
                <div id="bottom"></div>
            </div>`;

        crearElemento("button", "Cerrar sesión", "main", "form-control btn btn-primary", "loginButton").addEventListener("click", () => deleteLoginAtLocalStorage());
    }

    mostrarHeader(value) {
        value ? document.getElementById("header").style.display = "block" : document.getElementById("header").style.display = "none";
    }

    mostrarFooter(value) {
        value ? document.getElementById("footer").style.display = "block" : document.getElementById("footer").style.display = "none";
    }

    mostrarPantallaDeCarga(value) {
        value ? document.getElementById("pantallaCarga").style.display = "block" : document.getElementById("pantallaCarga").style.display = "none"
    }
}

class PaginaLogin extends Pagina {
    constructor(header, footer) {
        super(header, footer);
        this.login = new Login();
        this.pintarLoginHTML();
    }

    pintarLoginHTML() {
        document.getElementById('main').innerHTML = `
            <div id=login>
                <h2> Datos de Login </h2>
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="form-group">
                            <input type="text" name="username" id="username" tabindex="1" class="form-control" placeholder="Username" value="">
                        </div>
                        <div class="form-group">
                            <input type="password" name="password" id="password" tabindex="2" class="form-control" placeholder="Password">
                        </div>
                        <div class="form-group text-center">
                            <input type="checkbox" tabindex="3" name="remember" id="remember">
                            <label for="remember"> Recordarme </label>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-sm-6 col-sm-offset-3" id="divButtonLogin"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

        crearElemento("button", "Login", "divButtonLogin", "form-control btn btn-primary", "loginButton").addEventListener("click", () => this.logearse());
    }

    logearse() {
        let user = document.getElementById('username').value;
        let pass = document.getElementById('password').value;
        this.login = new Login(user, pass);
        if (this.login.verificarLogin()) {
            if (document.getElementById('remember').checked) {
                setLoginAtLocalStorage(this.login);
                location.reload();
            } else {
                alert("marcar Recordarme para continuar")
            }
            //TODO: mandar evento login OK
        } else {
            alert("Login Incorrecto!");
        }
    }
}

class Login {
    constructor(user = null, pass = null) {
        this.user = user;
        this.pass = pass;
    }

    verificarLogin() {
        if (this.user == "1234" && this.pass == "1234") {
            return true;
        } else {
            return false;
        }
    }
}

class Main {
    constructor() {
        this.login = new Login();
        this.home = new Pagina(true, true);
        this.paginaActual = "";
    }

    iniciarAPP() {
        if (this.login.verificarLogin()) {
            // PAGINA PRINCIPAL
        } else {
            this.home = new PaginaLogin(false, false);
        }
    }

    setParamsDeLoginConObjeto(objeto) {
        this.login = new Login(objeto.user, objeto.pass);
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

                return array;
            }
        );
    }
}

var main;

window.onload = () => {
    if (!getLoginFromLocalStorage()) {
        main = new Main();
        main.iniciarAPP();
    } else {
        let objeto = getLoginFromLocalStorage();
        main = new Main();
        main.setParamsDeLoginConObjeto(objeto);
        main.iniciarAPP();
    }
};