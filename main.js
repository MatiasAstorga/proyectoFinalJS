class Main {
    constructor() {
        this.login = new Login();
        this.navController = new NavigationController();
        this.user = new UsersSession();
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
        this.navController.pages = [];
        this.navController.pages.push(new PaginaLogin(false, false, this.navController));
        this.navController.pages.push(new PaginaHome(this.navController));
        this.navController.pages.push(new PaginaGestionComidas(this.navController));
        this.navController.pages.push(new PaginaGestionBebidas(this.navController));
        this.navController.pages.push(new PaginaCrearUsuario(false, false, this.navController));
        this.navController.pages.push(new PaginaModificarUsuario(this.navController));
    }
}

class NavigationController {
    constructor() {
        this.pages = [];
    }

    navigateToUrl(url) {
        this.pages.find((elem) => elem.url == url).pintarPaginaHTML();
    }
}

var main;

window.onload = () => {
    main = new Main();
    main.iniciarAPP();
};