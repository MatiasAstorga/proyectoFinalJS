class PaginaHome extends Pagina {
    constructor(navController) {
        super("home", true, true, navController);
        this.comidaClient = new ComidaClient();
        this.bebidaClient = new BebidaClient();
    }

    pintarPaginaHTML() {
        document.getElementById('main').innerHTML = `
            <div class=row>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <div id=dashboardComidas class=dashboard>
                        <div >
                            <div class=subDashboard id=subDashboardComidas>
                            </div>
                            <div class="slideshow-container">
                              <div class="mySlides sh1 fade">
                                <img src="resources/comida1.jpg" style="width:100%">
                              </div>

                              <div class="mySlides sh1 fade">
                                <img src="resources/comida6.jpg" style="width:100%">
                              </div>

                              <div class="mySlides sh1 fade">
                                <img src="resources/comida7.jpg" style="width:100%">
                              </div>

                              <div class="mySlides sh1 fade">
                                <img src="resources/comida8.jpg" style="width:100%">
                              </div>

                              <a class="prev" onclick="plusSlides(-1, 'sh1', 'd1')">&#10094;</a>
                              <a class="next" onclick="plusSlides(1, 'sh1', 'd1')">&#10095;</a>
                            </div>
                            <br>

                            <div style="text-align:center">
                              <span class="dot d1" onclick="currentSlide(1, 'sh1', 'd1')"></span> 
                              <span class="dot d1" onclick="currentSlide(2, 'sh1', 'd1')"></span> 
                              <span class="dot d1" onclick="currentSlide(3, 'sh1', 'd1')"></span> 
                              <span class="dot d1" onclick="currentSlide(4, 'sh1', 'd1')"></span> 
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <div id=dashboardBebidas class=dashboard>
                        <div >
                            <div class=subDashboard id=subDashboardBebidas>
                            </div>
                            <div class="slideshow-container">
                              <div class="mySlides sh2 fade">
                                <img src="resources/bebida1.jpg" style="width:100%">
                              </div>

                              <div class="mySlides sh2 fade">
                                <img src="resources/bebida2.jpg" style="width:100%">
                              </div>

                              <div class="mySlides sh2 fade">
                                <img src="resources/bebida3.jpg" style="width:100%">
                              </div>

                              <div class="mySlides sh2 fade">
                                <img src="resources/bebida4.jpg" style="width:100%">
                              </div>

                              <a class="prev" onclick="plusSlides(-1, 'sh2', 'd2')">&#10094;</a>
                              <a class="next" onclick="plusSlides(1, 'sh2', 'd2')">&#10095;</a>
                            </div>
                            <br>

                            <div style="text-align:center">
                              <span class="dot d2" onclick="currentSlide(1, 'sh2', 'd2')"></span> 
                              <span class="dot d2" onclick="currentSlide(2, 'sh2', 'd2')"></span> 
                              <span class="dot d2" onclick="currentSlide(3, 'sh2', 'd2')"></span> 
                              <span class="dot d2" onclick="currentSlide(4, 'sh2', 'd2')"></span> 
                            </div>
                        </div>
                    </div>
                </div
        `;

        showSlides(slideIndex, "sh1", "d1");
        showSlides(slideIndex, "sh2", "d2");

        document.querySelector("#subDashboardComidas").addEventListener("click", () => this.irAComidas());
        document.querySelector("#subDashboardBebidas").addEventListener("click", () => this.irABebidas());
        this.pintarSubDashboardComidas();
        this.pintarSubDashboardBebidas();
        this.pintarOtros();
    }

    pintarSubDashboardComidas() {
        let pintarSubDashboardComidasHTML = (data) => {
            if (data.length > 0) {
                var cantidadDePostres = data.filter((elem) => elem.tipo.toLowerCase() == "postre").length;
                var cantidadDeEntradas = data.filter((elem) => elem.tipo.toLowerCase() == "entrada" || elem.tipo.toLowerCase() == "entrante").length;
                var cantidadDePrincipales = data.filter((elem) => elem.tipo.toLowerCase() == "principal").length;
                var comidaMasCalorica = data.sort((a, b) => b.calorias - a.calorias)[0];
                var comidaMasBarata = data.sort((a, b) => a.precio - b.precio)[0];
                var comidaConMayorExistencias = data.sort((a, b) => b.existencias - a.existencias)[0];
                document.getElementById('subDashboardComidas').innerHTML = `
                    <div>
                        <h3> Comidas: </h3>
                        <p> Cantidad de Entradas: ${cantidadDeEntradas} </p>
                        <p> Cantidad de Platos Principales: ${cantidadDePrincipales} </p>
                        <p> Cantidad de Postres: ${cantidadDePostres} </p>
                        <hr>
                        <p> Comida con mas calorias: ${comidaMasCalorica.nombre} - ${comidaMasCalorica.calorias} calorias</p>
                        <p> Comida mas barata: ${comidaMasBarata.nombre} - $${comidaMasBarata.precio}</p>
                        <p> Comida con mayor numero de existencias: ${comidaConMayorExistencias.nombre} - ${comidaConMayorExistencias.existencias} unidades</p>
                    </div>`;
            } else {
                document.getElementById('subDashboardComidas').innerHTML = `
                    <div>
                        <h3> Comidas: </h3>
                        <p> Sin productos </p>
                    </div>`;
            }
        }

        this.comidaClient.getComidas().then(data => {
            pintarSubDashboardComidasHTML(data);
        });
    }

    pintarSubDashboardBebidas() {
        let pintarSubDashboardBebidasHTML = (data) => {
            if (data.length > 0) {
                var cantidadDeBebidasNormales = data.filter((elem) => !elem.esAlcoholica).length;
                var cantidadDeBebidasAlcoholicas = data.filter((elem) => elem.esAlcoholica).length;
                var bebidaMasFuerte = data.sort((a, b) => b.grados - a.grados)[0];
                var bebidaMasCara = data.sort((a, b) => b.precio - a.precio)[0];
                var bebidaMasBarata = data.sort((a, b) => a.grados - b.grados)[0];
                var bebidaConMayorExistencias = data.sort((a, b) => b.existencias - a.existencias)[0];

                document.getElementById('subDashboardBebidas').innerHTML = `
                    <div>
                        <h3> Bebidas: </h3>
                        <p> Cantidad de Bebidas No Alcoholicas: ${cantidadDeBebidasNormales} </p>
                        <p> Cantidad de Bebidas Alcoholicas: ${cantidadDeBebidasAlcoholicas} </p>
                        <hr>

                        <p> Bebida Alcoholica mas fuerte: ${bebidaMasFuerte.nombre} - ${bebidaMasFuerte.grados}º</p>
                        <p> Bebida mas cara: ${bebidaMasCara.nombre} - $${bebidaMasCara.precio}</p>
                        <p> Bebida mas barata: ${bebidaMasBarata.nombre} - $${bebidaMasBarata.precio}</p>
                        <p> Bebida con mayor número de existencias: ${bebidaConMayorExistencias.nombre} - ${bebidaConMayorExistencias.existencias} unidades</p>
                    </div>`;
            } else {
                document.getElementById('subDashboardComidas').innerHTML = `
                    <div>
                        <h3> Bebidas: </h3>
                        <p> Sin productos </p>
                    </div>`;
            }

        }

        this.bebidaClient.getBebidas().then(data => {
            pintarSubDashboardBebidasHTML(data);
        });
    }

    irAComidas() {
        this.navController.navigateToUrl("gestionComidas");
    }

    irABebidas() {
        this.navController.navigateToUrl("gestionBebidas");
    }
}

class PaginaLogin extends Pagina {
    constructor(header, footer, navController) {
        super("login", header, footer, navController);
        this.login = new Login();
        this.loginClient = new LoginClient();
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
                            <label class=displayBlock id=labelCrearUsuario></label>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-sm-6 col-sm-offset-3" id="divButtonLogin"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="alert" id="loginIncorrecto">Usuario y/o Contraseña incorrectos.</div>
            </div>`;

        crearElemento("button", "Login", "divButtonLogin", "form-control btn btn-primary", "loginButton").addEventListener("click", () => this.getLogin());
        crearElemento("a", "Crear Usuario", "labelCrearUsuario", "pointer", "crearNuevoUsuarioBtn").addEventListener("click", () => this.navController.navigateToUrl("crearUsuario"));
        this.pintarOtros();
    }

    getLogin() {
        this.loginClient.getLogin().then(data => {
            mostrarPantallaDeCarga(true);
            window.setTimeout(() => {
                if (data.status == 404 || data.status == 401) {
                    var elem = document.getElementById('loginIncorrecto');
                    setTimeout(() => {
                        elem.style.opacity = "100";
                        elem.style.display = "block"
                    }, 100);
                    setTimeout(() => elem.style.opacity = "0", 3500);
                    setTimeout(() => elem.style.display = "none", 4000);
                } else {
                    data.json().then(usuario => {
                        main.user.modificarUser(usuario);
                    });
                    if (document.getElementById('remember').checked) {
                        this.login.modificarDatosLogin("username", "password");
                        this.login.setLoginAtLocalStorage();
                    }
                    this.navController.navigateToUrl("home");
                }
                mostrarPantallaDeCarga(false);
            }, 1000)
        });
    }
}

class PaginaCrearUsuario extends Pagina {
    constructor(header, footer, navController) {
        super("crearUsuario", header, footer, navController);
        this.usuarioClient = new UsuarioClient();
    }

    pintarPaginaHTML() {
        document.getElementById('main').innerHTML = "";
        document.getElementById('main').innerHTML = `
            <div id=login>
                <h2> Crear Nuevo Usuario</h2>
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="form-group">
                            <label>Nombre: </label>
                            <input type="text" id="nombreUser" tabindex="1" class="form-control" value="">
                        </div>
                        <div class="form-group">
                            <label>Apellidos: </label>
                            <input type="text" id="apellidosUser" tabindex="1" class="form-control" value="">
                        </div>
                        <div class="form-group">
                            <label>Email: </label>
                            <input type="text" id="emailUser" tabindex="1" class="form-control" value="">
                        </div>
                        <div class="form-group">
                            <label>Username: </label>
                            <input type="text" id="usernameUser" tabindex="1" class="form-control" value="">
                        </div>
                        <div class="form-group">
                            <label>Password: </label>
                            <input type="text" id="passwordUser" tabindex="1" class="form-control" value="">
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-sm-6 col-sm-offset-3" id="divButtonAñadirComida"></div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-sm-6 col-sm-offset-3" id="divButtonCrearUsuario"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id=volverALogin> </div>
            `;

        crearElemento("button", "Volver", "divButtonCrearUsuario", "form-control btn btn-success btnFixedVolver", "volverALoginBtn").addEventListener("click", () => this.navController.navigateToUrl("login"))
        crearElemento("button", "Crear Usuario", "divButtonCrearUsuario", "form-control btn btn-primary", "crearNuevoUsuariobtn").addEventListener("click", () => this.usuarioClient.postUsuario().then(data => {
            mostrarPantallaDeCarga(true);
            var x = document.getElementById("snackbar");
            if (data.status == 200) {
                x.innerHTML = "Usuario Creado Satisfactoriamente";
            } else {
                x.innerHTML = "Ha ocurrido un error, intente mas tarde.";
            }
            x.className = "show";
            window.setTimeout(() => {
                x.className = x.className.replace("show", "");
                if (data.status == 200)
                    this.navController.navigateToUrl("login");
                mostrarPantallaDeCarga(false);
            }, 3000)
        }));
        this.pintarOtros();
    }
}

class PaginaModificarUsuario extends Pagina {
    constructor(navController) {
        super("modificarUsuario", true, true, navController);
        this.usuarioClient = new UsuarioClient();
        this.login = new Login();
    }

    pintarPaginaHTML() {
        document.getElementById('main').innerHTML = "";
        var data = `
            <div class=inLine id=modificarPerfilHeader>
                <label class=likeTitle> Modificar Usuario </label>
            </div>
            <div id=modificarusuarioDiv>
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="form-group">
                            <label>Nombre: </label>
                            <input type="text" id="editarNombre" tabindex="1" class="form-control" value=${main.user.user.nombre}>
                        </div>
                        <div class="form-group">
                            <label>Apellidos: </label>
                            <input type="text" id="editarApellidos" tabindex="1" class="form-control" value=${main.user.user.apellidos}>
                        </div>
                        <div class="form-group">
                            <label>Email: </label>
                            <input type="text" id="editarEmail" tabindex="1" class="form-control" value=${main.user.user.email}>
                        </div>
                        <div class="form-group">
                            <label>User: </label>
                            <input type="text" id="editarUser" tabindex="1" class="form-control" value=${main.user.user.username}>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-sm-6 col-sm-offset-3" id="divButtonActualizarPerfil"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div id="myModal" class="modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <div id="editarPerfilModal">
                        <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <label id=dataModalTXT> Para confirmar sus cambios, debe introducir su contraseña actual: </label>
                                <div class="form-group">
                                    <input type="password" id="confirmarContraseña" tabindex="1" class="form-control buttonMTop" value="">
                                </div>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm-6 col-sm-offset-3" id="divButtonConfirmarActualizarPerfil"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

        document.getElementById('main').innerHTML = data;

        crearElemento("button", "Eliminar Cuenta", "modificarPerfilHeader", "butonRigth btn btn-default", "eliminarCuentaBtn").addEventListener("click", () => this.eliminarCuenta());
        crearElemento("button", "Actualizar", "divButtonActualizarPerfil", "form-control btn btn-primary", "ButtonActualizarPerfil").addEventListener("click", () => this.modalContraseña());

        crearElemento("button", "Confirmar", "divButtonConfirmarActualizarPerfil", "form-control btn btn-primary buttonMTop", "ButtonConfirmarActualizarPerfil").addEventListener("click", () => this.usuarioClient.updateUsuario(main.user.user).then(data => {
            mostrarPantallaDeCarga(true);
            var x = document.getElementById("snackbar");
            if (data.status == 200) {
                x.innerHTML = "Actualización Completada";
                data.json().then(usuario => {
                    main.user.modificarUser(usuario);
                });
                localStorage.removeItem("loginProyFinal");

            } else {
                x.innerHTML = "Error: verifique su contraseña o intente mas tarde.";
            }
            x.className = "show";
            window.setTimeout(() => {
                x.className = x.className.replace("show", "");
                mostrarPantallaDeCarga(false);
                document.getElementById("myModal").style.display = "none";
                document.getElementById("confirmarContraseña").value = "";
            }, 2000);
        }));

        crearElemento("button", "Confirmar", "divButtonConfirmarActualizarPerfil", "form-control btn btn-primary buttonMTop", "ButtonConfirmarEliminarPerfil").addEventListener("click", () => this.usuarioClient.deleteUsuario(main.user.user._id).then(data => {
            mostrarPantallaDeCarga(true);
            var x = document.getElementById("snackbar");
            if (data.status == 200) {
                x.innerHTML = "Eliminación Completada";
                localStorage.removeItem("loginProyFinal");

            } else {
                x.innerHTML = "Error: verifique su contraseña o intente mas tarde.";
            }
            x.className = "show";
            window.setTimeout(() => {
                if (data.status == 200)
                    this.navController.navigateToUrl("login");
                mostrarPantallaDeCarga(false);
                x.className = x.className.replace("show", "");
            }, 2000);
        }));

        this.pintarOtros();
    }

    eliminarCuenta() {
        this.pintarModal("block", "Para confirmar la eliminación de esta cuenta, introduzca su contraseña:", "none");
    }

    modalContraseña() {
        this.pintarModal("none", "Para confirmar sus cambios, debe introducir su contraseña actual:", "block");
    }

    pintarModal(displayE, msg, displayA) {
        var modal = document.getElementById("myModal");
        var spanClose = document.getElementsByClassName("close")[0];

        spanClose.onclick = function() {
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        document.getElementById('ButtonConfirmarEliminarPerfil').style.display = displayE;
        document.getElementById('dataModalTXT').innerHTML = msg;
        document.getElementById('ButtonConfirmarActualizarPerfil').style.display = displayA;
        modal.style.display = "block";
    }
}