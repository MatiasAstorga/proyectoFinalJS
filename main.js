const LOG = x => console.log(x);
const WARN = x => console.warn(x);
const ERROR = x => console.error(x);
const TO_TOP = () => window.setTimeout(() => document.getElementById('top').scrollIntoView(), 500);
const TO_BOTTOM = () => window.setTimeout(() => document.getElementById('bottom').scrollIntoView(), 500);

var mostrarPantallaDeCarga = (value) => {
    value ? document.getElementById("pantallaCarga").style.display = "block" : document.getElementById("pantallaCarga").style.display = "none"
}

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

class Pagina {
    constructor(url, header, footer, navController) {
        this.navController = navController;
        this.url = url;
        this.header = header;
        this.footer = footer;

        this.pintarEstructuraBase();
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
    }

    mostrarHeader() {
        this.header ? document.getElementById("header").style.display = "block" : document.getElementById("header").style.display = "none";
    }

    mostrarFooter() {
        this.footer ? document.getElementById("footer").style.display = "block" : document.getElementById("footer").style.display = "none";
    }

    pintarUrl(nuevaURL) {
        window.history.pushState("", "", nuevaURL);
    }

    pintarOtros() {
        this.mostrarHeader();
        this.mostrarFooter();
        this.pintarUrl(this.url);
    }
}

class PaginaHome extends Pagina {
    constructor(navController) {
        super("home", true, true, navController);
    }

    pintarPaginaHTML() {
        document.getElementById('main').innerHTML = "";
        crearElemento("button", "Cerrar sesión", "main", "form-control btn btn-primary", "loginButton").addEventListener("click", () => this.deslogearse());
        crearElemento("button", "Otra pagina", "main", "form-control btn", "otherPageButton").addEventListener("click", () => this.irPagina2());
        this.pintarOtros();
    }

    irPagina2() {
        this.navController.navigateToUrl("pagina2");
    }

    deslogearse() {
        localStorage.removeItem("loginProyFinal");
        this.navController.navigateToUrl("login");
    }
}

class PaginaLogin extends Pagina {
    constructor(header, footer, navController) {
        super("login", header, footer, navController);
        this.login = new Login();
    }

    pintarPaginaHTML() {
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
                            <input type="checkbox" checked=true tabindex="3" name="remember" id="remember">
                            <label for="remember"> Recordarme </label>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-sm-6 col-sm-offset-3" id="divButtonLogin"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="alert" id="loginIncorrecto">Login Incorrecto!!!</div>
            </div>`;

        crearElemento("button", "Login", "divButtonLogin", "form-control btn btn-primary", "loginButton").addEventListener("click", () => this.login.logearse(this.navController));
        this.pintarOtros();
    }
}

class Login {
    constructor(user = null, pass = null) {
        this.user = user;
        this.pass = pass;
    }

    verificarLogin() {
        if (this.getLoginFromLocalStorage()) {
            this.setParamsDeLoginConObjeto(this.getLoginFromLocalStorage());
        }

        return (this.user == "1234" && this.pass == "1234");
    }

    setParamsDeLoginConObjeto(objeto) {
        this.user = objeto.user;
        this.pass = objeto.pass;
    }

    getLoginFromLocalStorage() {
        return JSON.parse(localStorage.getItem("loginProyFinal"));
    }

    setLoginAtLocalStorage() {
        localStorage.setItem("loginProyFinal", JSON.stringify(this));
    }

    logearse(navController) {
        this.user = document.getElementById('username').value;
        this.pass = document.getElementById('password').value;

        if (this.verificarLogin()) {
            if (document.getElementById('remember').checked) {
                this.setLoginAtLocalStorage();
            }

            mostrarPantallaDeCarga(true);
            window.setTimeout(() => {
                navController.navigateToUrl("home");
                mostrarPantallaDeCarga(false);
            }, 1000);
        } else {
            var elem = document.getElementById('loginIncorrecto');
            setTimeout(() => {elem.style.opacity = "100"; elem.style.display = "block"}, 500);
            setTimeout(() => elem.style.opacity = "0", 3500);
            setTimeout(() => elem.style.display = "none", 4000);
        }
    }
}

class PaginaInterior extends Pagina {
    constructor() {
        super();
    }
}

class Pagina2 extends Pagina {
    constructor(navController) {
        super("pagina2", true, true, navController);
    }

    pintarPaginaHTML() {
        document.getElementById('main').innerHTML = "";
        crearElemento("button", "volver a home", "main", "form-control btn btn-primary", "goToHomeButton").addEventListener("click", () => this.volverACasa());
        this.pintarOtros();
    }

    volverACasa() {
        this.navController.navigateToUrl("home");
    }
}

class Main {
    constructor() {
        this.login = new Login();
        this.navController = new NavigationController();
        this.agregarPaginasANavController();
    }

    iniciarAPP() {
        if (this.login.verificarLogin()) {
            this.navController.navigateToUrl("home");
        } else {
            this.navController.navigateToUrl("login");
        }
    }

    agregarPaginasANavController() {
        this.navController.pages.push(new PaginaLogin(false, false, this.navController));
        this.navController.pages.push(new PaginaHome(this.navController));
        this.navController.pages.push(new Pagina2(this.navController));
        //TODO: agregar resto de paginas
    }
}

class NavigationController {
    constructor() {
        this.pages = [];
    }

    navigateToUrl(url) {
        this.pages.find((elem) => elem.url == url).pintarPaginaHTML(this);
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
    main = new Main();
    main.iniciarAPP();
};