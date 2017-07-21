class Login {
    constructor(user = null, pass = null) {
        this.username = user;
        this.password = pass;
        this.loginClient = new LoginClient();
    }

    verificarLogin() {
        if (this.getLoginFromLocalStorage()) {
            this.setParamsDeLoginConObjeto(this.getLoginFromLocalStorage());

            return this.loginClient.getLoginInico(this).then(data => {
                if (data.status == 404 || data.status == 401) {
                    return false;
                } else {
                    data.json().then(usuario => {
                        main.user.modificarUser(usuario);
                    });
                    return true;
                }
            });
        } else {
            return false
        }
    }

    setParamsDeLoginConObjeto(objeto) {
        this.username = objeto.username;
        this.password = objeto.password;
    }

    getLoginFromLocalStorage() {
        return JSON.parse(localStorage.getItem("loginProyFinal"));
    }

    setLoginAtLocalStorage() {
        localStorage.setItem("loginProyFinal", JSON.stringify(this));
    }

    modificarDatosLogin(user, pass) {
        this.username = document.getElementById(user).value;
        this.password = document.getElementById(pass).value;
    }
}

class Producto {
    constructor(id, nombre, numeroExistencias, calorias, precio) {
        this._id = id;
        this.nombre = nombre;
        this.existencias = numeroExistencias;
        this.calorias = calorias;
        this.precio = precio;
    }
}

class Bebida extends Producto {
    constructor(id, nombre, numeroExistencias, calorias, precio, esAlcoholica, gradosAlcohol) {
        super(id, nombre, numeroExistencias, calorias, precio);
        this.esAlcoholica = esAlcoholica;
        this.grados = gradosAlcohol;
    }
}

class Comida extends Producto {
    constructor(id, nombre, numeroExistencias, calorias, precio, tipo) {
        super(id, nombre, numeroExistencias, calorias, precio);
        this.tipo = tipo;
    }
}

class Usuario {
    constructor(email = null, apellidos = null, nombre = null, username = null, password = null, id = null) {
        this._id = id;
        this.email = email;
        this.apellidos = apellidos;
        this.nombre = nombre;
        this.username = username;
        this.password = password;
    }
}

class UsersSession {
    constructor() {
        this.user = null;
    }

    modificarUser(obj) {
        this.user = new Usuario(obj.email, obj.apellidos, obj.nombre, obj.username, obj.password, obj._id);
    }
}