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
            </div>
            <div id="snackbar"></div>`;

        var header = new Header(this.navController);
        var footer = new Footer(this.navController);
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

class Header {
    constructor(navController) {
        this.pintarPaginaHTML();
        this.navController = navController;
    }

    pintarPaginaHTML() {
        var data = `
        
            <a class="dropbtn" id=homeIcon><img src=resources/homeIcon.png class=imgPos></img></a>
                 
            <div class="dropdown">
              <button class="dropbtn">Perfil</button>
              <div class="dropdown-content" id=perfilUsuarioHeaderAcciones>
              </div>
            </div> 

            <div class="dropdown">
              <button class="dropbtn">Gestión de Productos</button>
              <div class="dropdown-content" id=gestionProductosHeaderAcciones>
              </div>
            </div>            
        `;

        document.getElementById('header').innerHTML = data;

        crearElemento("a", "Modificar perfil", "perfilUsuarioHeaderAcciones", "", "perfilUsuarioBtn").addEventListener("click", () => this.irAPerfilUsuario());
        crearElemento("a", "Cerrar sesión", "perfilUsuarioHeaderAcciones", "", "loginButton").addEventListener("click", () => this.deslogearse());
        crearElemento("a", "Gestión de Comidas", "gestionProductosHeaderAcciones", "", "gestionComidasBtn").addEventListener("click", () => this.irAGestionComidas());
        crearElemento("a", "Gestión de Bebidas", "gestionProductosHeaderAcciones", "", "gestionBebidasBtn").addEventListener("click", () => this.irAGestionBebidas());

        document.querySelector("#homeIcon").addEventListener("click", () => this.irAHome());
    }

    irAHome() {
        mostrarPantallaDeCarga(true);
        window.setTimeout(() => {
            this.navController.navigateToUrl("home");
            mostrarPantallaDeCarga(false);
        }, 400);
    }

    irAPerfilUsuario() {
        mostrarPantallaDeCarga(true);
        window.setTimeout(() => {
            this.navController.navigateToUrl("modificarUsuario");
            mostrarPantallaDeCarga(false);
        }, 300);
    }

    irAGestionComidas() {
        this.navController.navigateToUrl("gestionComidas");
    }

    irAGestionBebidas() {
        this.navController.navigateToUrl("gestionBebidas");
    }

    deslogearse() {
        mostrarPantallaDeCarga(true);
        window.setTimeout(() => {
            localStorage.removeItem("loginProyFinal");
            this.navController.navigateToUrl("login");
            mostrarPantallaDeCarga(false);
        }, 300);
    }
}

class Footer {
    constructor(navController) {
        this.pintarPaginaHTML();
        this.navController = navController;
    }

    pintarPaginaHTML() {
        document.getElementById('footer').innerHTML = `
            <div class=footerText>
            <label>Curso Javascript 2017</label>
            </div>  
        `;
    }
}