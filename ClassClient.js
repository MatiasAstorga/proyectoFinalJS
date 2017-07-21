class ComidaClient {
    constructor() {
        this.urlBase = 'http://formacion-indra-franlindebl.com/api/comidas';
        this.apiClient = new APIClient();
    }

    getComidas() {
        var url = this.urlBase

        return this.apiClient.get(url).then(
            (dataEnJson) => {
                let array = [];
                for (let i = 0; i < dataEnJson.length; i++) {
                    let elem = dataEnJson[i];
                    let comida = new Comida(elem._id, elem.nombre, elem.existencias, elem.calorias, elem.precio, elem.tipo);
                    array.push(comida);
                }
                return array;
            }
        );
    }

    postComida() {
        var url = this.urlBase;

        var nombre = document.getElementById("nombreComida").value;
        var tipo = document.getElementById("tipoComida").value;
        var existencias = document.getElementById("existenciasComida").value;
        var calorias = document.getElementById("caloriasComida").value;
        var precio = document.getElementById("precioComida").value;

        var comida = new Comida(0, nombre, existencias, calorias, precio, tipo);

        return this.apiClient.post(url, comida);
    }

    deleteComida(id) {
        var url = this.urlBase + "/" + id;
        return this.apiClient.delete(url);
    }

    updateComida(comida) {
        var nombre = document.getElementById("editarNombre").value;
        var tipo = document.getElementById("editarTipo").value;
        var existencias = document.getElementById("editarExistencias").value;
        var calorias = document.getElementById("editarCalorias").value;
        var precio = document.getElementById("editarPrecio").value;

        var comidaUpdate = new Comida(comida.id, nombre, existencias, calorias, precio, tipo);

        var url = this.urlBase + "/" + comida._id;
        return this.apiClient.update(url, comidaUpdate);
    }
}

class BebidaClient {
    constructor() {
        this.urlBase = 'http://formacion-indra-franlindebl.com/api/bebidas';
        this.apiClient = new APIClient();
    }

    getBebidas() {
        var url = this.urlBase
        return this.apiClient.get(url).then(
            (dataEnJson) => {
                let array = [];
                for (let i = 0; i < dataEnJson.length; i++) {
                    let elem = dataEnJson[i];
                    let bebida = new Bebida(elem._id, elem.nombre, elem.existencias, elem.calorias, elem.precio, elem.esAlcoholica, elem.grados);
                    array.push(bebida);
                }
                return array;
            }
        );
    }

    postBebida() {
        var url = this.urlBase;

        var nombre = document.getElementById("nombreBebida").value;
        var existencias = document.getElementById("existenciasBebida").value;
        var calorias = document.getElementById("caloriasBebida").value;
        var precio = document.getElementById("precioBebida").value;
        var esAlcoholica = document.getElementById("esAlcoholicaBebida").value;
        var grados = document.getElementById("gradosBebida").value;

        var bebida = new Bebida(0, nombre, existencias, calorias, precio, esAlcoholica, grados);
        return this.apiClient.post(url, bebida);
    }

    deleteBebida(id) {
        var url = this.urlBase + "/" + id;
        return this.apiClient.delete(url);
    }

    updateBebida(bebida) {
        var nombre = document.getElementById("editarNombre").value;
        var existencias = document.getElementById("editarExistencias").value;
        var calorias = document.getElementById("editarCalorias").value;
        var precio = document.getElementById("editarPrecio").value;
        var esAlcoholica = document.getElementById("editarEsAlcoholicaBebida").value;
        var grados = document.getElementById("editarGradosBebida").value;

        var bebidaUpdate = new Bebida(bebida.id, nombre, existencias, calorias, precio, esAlcoholica, grados);

        var url = this.urlBase + "/" + bebida._id;
        return this.apiClient.update(url, bebidaUpdate);
    }
}

class LoginClient {
    constructor() {
        this.urlBase = 'http://formacion-indra-franlindebl.com/api';
        this.apiClient = new APIClient();
    }

    getLogin() {
        var url = this.urlBase + "/users/login";

        var user = document.getElementById("username").value;
        var pass = document.getElementById("password").value;

        var loginObj = {
            "username": user,
            "password": pass
        };

        return this.apiClient.post(url, loginObj);
    }

    getLoginInico(login) {
        var url = this.urlBase + "/users/login";
        var loginObj = {
            "username": login.username,
            "password": login.password
        };
        return this.apiClient.post(url, loginObj);
    }
}

class UsuarioClient {
    constructor() {
        this.urlBase = 'http://formacion-indra-franlindebl.com/api/users';
        this.apiClient = new APIClient();
    }

    getUsuarios() {
        var url = this.urlBase

        return this.apiClient.get(url).then(
            (dataEnJson) => {
                let array = [];
                for (let i = 0; i < dataEnJson.length; i++) {
                    let elem = dataEnJson[i];
                    let comida = new Comida(elem._id, elem.nombre, elem.existencias, elem.calorias, elem.precio, elem.tipo);
                    array.push(comida);
                }
                return array;
            }
        );
    }

    getDetalleUsuario(id) {
        var url = this.urlBase + "/" + id;
        return this.apiClient.get(url);
    }

    postUsuario() {
        var url = this.urlBase;

        var nombre = document.getElementById("nombreUser").value;
        var apellidos = document.getElementById("apellidosUser").value;
        var email = document.getElementById("emailUser").value;
        var user = document.getElementById("usernameUser").value;
        var pass = document.getElementById("passwordUser").value;

        var usuario = new Usuario(email, apellidos, nombre, user, pass);

        return this.apiClient.post(url, usuario);
    }

    deleteUsuario(id) {
        var url = this.urlBase + "/" + id;
        var pass = {
            "password": document.getElementById("confirmarContraseña").value
        };

        return this.apiClient.delete(url, pass);
    }

    updateUsuario(usuario) {
        var nombre = document.getElementById("editarNombre").value;
        var apellidos = document.getElementById("editarApellidos").value;
        var email = document.getElementById("editarEmail").value;
        var user = document.getElementById("editarUser").value;
        var pass = document.getElementById("confirmarContraseña").value;

        var updateUsuario = new Usuario(email, apellidos, nombre, user, pass, usuario._id);

        var url = this.urlBase + "/" + usuario._id;
        return this.apiClient.update(url, updateUsuario);
    }
}