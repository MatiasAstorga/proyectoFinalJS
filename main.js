const LOG = x => console.log(x);
const WARN = x => console.warn(x);
const ERROR = x => console.error(x);
const TO_TOP = () => window.setTimeout(() => document.getElementById('top').scrollIntoView(), 500);
const TO_BOTTOM = () => window.setTimeout(() => document.getElementById('bottom').scrollIntoView(), 500);

var generarNumeroAleatorio = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

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

var plusSlides = (n, sh, d) =>{
  showSlides(slideIndex += n, sh, d);
}

var currentSlide = (n, sh, d) =>{
  showSlides(slideIndex = n, sh, d);
}

var slideIndex = 1;
var showSlides = (n, sh, d) =>{
  var i;
  var slides = document.getElementsByClassName(sh);
  var dots = document.getElementsByClassName(d);
  if (n > slides.length) {slideIndex = 1} 
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; 
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block"; 
  dots[slideIndex-1].className += " active";
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

class UsersSession {
    constructor() {
        this.user = null;
    }

    modificarUser(obj) {
        this.user = new Usuario(obj.email, obj.apellidos, obj.nombre, obj.username, obj.password, obj._id);
    }
}

class Header {
    constructor(navController) {
        this.pintarPaginaHTML();
        this.navController = navController;
    }

    pintarPaginaHTML() {
        var data = `
        
            <a class="dropbtn" id=homeIcon><img src=homeIcon.png class=imgPos></img></a>
                 
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

    irAHome(){
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
                                <img src="comida1.jpg" style="width:100%">
                              </div>

                              <div class="mySlides sh1 fade">
                                <img src="comida6.jpg" style="width:100%">
                              </div>

                              <div class="mySlides sh1 fade">
                                <img src="comida7.jpg" style="width:100%">
                              </div>

                              <div class="mySlides sh1 fade">
                                <img src="comida8.jpg" style="width:100%">
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
                                <img src="bebida1.jpg" style="width:100%">
                              </div>

                              <div class="mySlides sh2 fade">
                                <img src="bebida2.jpg" style="width:100%">
                              </div>

                              <div class="mySlides sh2 fade">
                                <img src="bebida3.jpg" style="width:100%">
                              </div>

                              <div class="mySlides sh2 fade">
                                <img src="bebida4.jpg" style="width:100%">
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

    pintarSubDashboardComidas(){
        let pintarSubDashboardComidasHTML = (data) => {
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

        }

        this.comidaClient.getComidas().then(data =>  {
            pintarSubDashboardComidasHTML(data);
        });
    }

    pintarSubDashboardBebidas(){
        let pintarSubDashboardBebidasHTML = (data) => {
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

        }

        this.bebidaClient.getBebidas().then(data =>  {
            pintarSubDashboardBebidasHTML(data);
        });
    }

    irAComidas(){
        this.navController.navigateToUrl("gestionComidas");
    }

    irABebidas(){
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
                <div class="alert" id="loginIncorrecto">Login Incorrecto!!!</div>
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
            <div id="snackbar"></div>`;

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
        super("modificarUsuario", header, footer, navController);
        this.usuarioClient = new UsuarioClient();
        this.login = new Login();
    }

    pintarPaginaHTML() {
        document.getElementById('main').innerHTML = "";
        var data = `
            <label class=likeTitle> Modificar Usuario </label>
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
            <div id="snackbar"></div>
            <div id="myModal" class="modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <div id="editarPerfilModal">
                        <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <label> Para confirmar sus cambios, debe introducir su contraseña actual: </>
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
        crearElemento("button", "Actualizar", "divButtonActualizarPerfil", "form-control btn btn-primary", "ButtonActualizarPerfil").addEventListener("click", () => this.modalContraseña());

        crearElemento("button", "Confirmar", "divButtonConfirmarActualizarPerfil", "form-control btn btn-primary buttonMTop", "ButtonConfirmarActualizarPerfil").addEventListener("click", () => this.usuarioClient.updateUsuario(main.user.user).then(data => {
            mostrarPantallaDeCarga(true);
            var x = document.getElementById("snackbar");
            if (data.status == 200) {
                x.innerHTML = "Actualización Completada";
                data.json().then(usuario => {
                    main.user.modificarUser(usuario);
                });
                // this.login.modificarDatosLogin(editarUser, confirmarContraseña);
                // this.login.setLoginAtLocalStorage();
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

        this.pintarOtros();
    }

    modalContraseña() {
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

        modal.style.display = "block";
    }
}

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

class PaginaGestionComidas extends Pagina {
    constructor(navController) {
        super("gestionComidas", true, true, navController);
        this.comidaClient = new ComidaClient();
        this.comidas = [];
    }

    pintarPaginaHTML() {
        let pintarComidasHTML = comidas => {
            this.comidas = [];
            var data = `
            <div class=inLine id=nuevaComidaHeader>
                <label class=likeTitle> Gestión de Comidas:</label>
            </div>
            <div class='table-responsive tbackground'> 
            <table class='table centerTable' id=tablaComidas>
                <thead> 
                    <tr> 
                        <td> Nombre </td> 
                        <td> Tipo </td> 
                        <td> Existencias </td> 
                        <td> Calorias </td>
                        <td> Precio </td>
                        <td> Acciones </td>
                    </tr>
                </thead>
                <tbody>`;

            for (var i = 0; i < comidas.length; i++) {
                var comida = comidas[i];
                this.comidas.push(comida);
                data += `
                    <tr>
                        <th> ${comida.nombre}</th>
                        <th> ${comida.tipo}</th>
                        <th> ${comida.existencias}</th>
                        <th> ${comida.calorias}</th>
                        <th> ${comida.precio}</th>
                        <th> </th>
                    </tr>`;
            }
            data += "</tbody> </table> </div>";
            data += `
            <div id="myModal" class="modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <div id="ComidaModal"></div>
                </div>
            </div>

        `;
            document.getElementById("main").innerHTML = data;
            this.pintarOtros();
            this.pintarAcciones();
        }
        document.getElementById("main").innerHTML = "";
        mostrarPantallaDeCarga(true);
        this.comidaClient.getComidas().then(data => window.setTimeout(() => {
            pintarComidasHTML(data);
            mostrarPantallaDeCarga(false);
        }, 1000));

    }

    pintarAcciones() {
        crearElemento("button", "Nueva Comida", "nuevaComidaHeader", "butonRigth btn-default", "nuevaComidaBtn").addEventListener("click", () => this.añadirComida());

        document.querySelectorAll("tr>th:last-child").forEach((elemento) => {
            elemento.insertBefore(crearElemento("button", "Borrar", undefined, "btn btn-primary borrarComida", "borrarComida"), null);
            elemento.insertBefore(crearElemento("button", "Editar", undefined, "btn btn-primary editarComida", "editarComida"), null);
        })

        document.querySelectorAll(".borrarComida").forEach((elemento, index) => {
            elemento.addEventListener("click", () => this.eliminarComida(index));
        })

        document.querySelectorAll(".editarComida").forEach((elemento, index) => {
            elemento.addEventListener("click", () => this.editarComida(index));
        })
    }

    añadirComida() {
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
        document.getElementById('ComidaModal').innerHTML = "";
        var data = `
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="form-group">
                        <label>Nombre: </label>
                        <input type="text" id="nombreComida" tabindex="1" class="form-control" value="">
                    </div>
                    <div class="form-group">
                        <label>Tipo: </label>
                        <input type="text" id="tipoComida" tabindex="1" class="form-control" value="">
                    </div>
                    <div class="form-group">
                        <label>Existencias: </label>
                        <input type="text" id="existenciasComida" tabindex="1" class="form-control" value="">
                    </div>
                    <div class="form-group">
                        <label>Calorias: </label>
                        <input type="text" id="caloriasComida" tabindex="1" class="form-control" value="">
                    </div>
                    <div class="form-group">
                        <label>Precio: </label>
                        <input type="text" id="precioComida" tabindex="1" class="form-control" value="">
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-sm-6 col-sm-offset-3" id="divButtonAñadirComida"></div>
                        </div>
                    </div>
                </div>
            </div>`;
        document.getElementById('ComidaModal').innerHTML = data;

        crearElemento("button", "Añadir", "divButtonAñadirComida", "form-control btn btn-primary", "ButtonAñadirComida").addEventListener("click", () => this.comidaClient.postComida().then(data => this.pintarPaginaHTML(data)));

        modal.style.display = "block";
    }

    eliminarComida(index) {
        this.comidaClient.deleteComida(this.comidas[index]._id).then(data => this.pintarPaginaHTML(data));
    }

    editarComida(index) {
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
        document.getElementById('ComidaModal').innerHTML = "";
        var data = `
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="form-group">
                        <label>Nombre: </label>
                        <input type="text" id="editarNombre" tabindex="1" class="form-control" value=${this.comidas[index].nombre}>
                    </div>
                    <div class="form-group">
                        <label>Tipo: </label>
                        <input type="text" id="editarTipo" tabindex="1" class="form-control" value=${this.comidas[index].tipo}>
                    </div>
                    <div class="form-group">
                        <label>Existencias: </label>
                        <input type="text" id="editarExistencias" tabindex="1" class="form-control" value=${this.comidas[index].existencias}>
                    </div>
                    <div class="form-group">
                        <label>Calorias: </label>
                        <input type="text" id="editarCalorias" tabindex="1" class="form-control" value=${this.comidas[index].calorias}>
                    </div>
                    <div class="form-group">
                        <label>Precio: </label>
                        <input type="text" id="editarPrecio" tabindex="1" class="form-control" value=${this.comidas[index].precio}>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-sm-6 col-sm-offset-3" id="divButtonEditarComida"></div>
                        </div>
                    </div>
                </div>
            </div>`;

        document.getElementById('ComidaModal').innerHTML = data;
        crearElemento("button", "Guardar", "divButtonEditarComida", "form-control btn btn-primary", "ButtonEditarComida").addEventListener("click", () => this.comidaClient.updateComida(this.comidas[index]).then(data => this.pintarPaginaHTML(data)));

        modal.style.display = "block";
    }
}

class PaginaGestionBebidas extends Pagina {
    constructor(navController) {
        super("gestionBebidas", true, true, navController);
        this.bebidasClient = new BebidaClient();
        this.bebidas = [];
    }

    pintarPaginaHTML() {
        let pintarBebidasHTML = bebidas => {
            this.bebidas = [];
            var data = `
            <div class=inLine id=nuevaBebidaHeader>
                <label class=likeTitle> Gestión de Bebidas:</label>
            </div>
            <div class='table-responsive tbackground'> 
            <table class='table centerTable' id=tablaBebidas>
                <thead> 
                    <tr> 
                        <td> Nombre </td> 
                        <td> Existencias </td> 
                        <td> Calorias </td>
                        <td> Precio </td>
                        <td> ¿Es Alcoholica? </td>
                        <td> Grados Alcohol </td>
                        <td> Acciones </td>
                    </tr>
                </thead>
                <tbody>`;

            for (var i = 0; i < bebidas.length; i++) {
                var bebida = bebidas[i];
                this.bebidas.push(bebida);
                var aux = (bebida.esAlcoholica) ? "Si" : "No";
                data += `
                    <tr>
                        <th> ${bebida.nombre}</th>
                        <th> ${bebida.existencias}</th>
                        <th> ${bebida.calorias}</th>
                        <th> ${bebida.precio}</th>
                        <th> ${aux}</th>
                        <th> ${bebida.grados}</th>
                        <th> </th>
                    </tr>`;
            }
            data += "</tbody> </table> </div>";
            data += `
            <div id="myModal" class="modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <div id="BebidaModal"></div>
                </div>
            </div>

        `;
            document.getElementById("main").innerHTML = data;
            this.pintarOtros();
            this.pintarAcciones();
        }
        document.getElementById("main").innerHTML = "";
        mostrarPantallaDeCarga(true);
        this.bebidasClient.getBebidas().then(data => window.setTimeout(() => {
            pintarBebidasHTML(data);
            mostrarPantallaDeCarga(false);
        }, 1000));

    }

    pintarAcciones() {
        crearElemento("button", "Nueva Bebida", "nuevaBebidaHeader", "butonRigth btn-default", "nuevaBebidaBtn").addEventListener("click", () => this.añadirBebida());

        document.querySelectorAll("tr>th:last-child").forEach((elemento) => {
            elemento.insertBefore(crearElemento("button", "Borrar", undefined, "btn btn-primary borrarBebida", "borrarBebida"), null);
            elemento.insertBefore(crearElemento("button", "Editar", undefined, "btn btn-primary editarBebida", "editarBebida"), null);
        })

        document.querySelectorAll(".borrarBebida").forEach((elemento, index) => {
            elemento.addEventListener("click", () => this.eliminarBebida(index));
        })

        document.querySelectorAll(".editarBebida").forEach((elemento, index) => {
            elemento.addEventListener("click", () => this.editarBebida(index));
        })
    }

    añadirBebida() {
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
        document.getElementById('BebidaModal').innerHTML = "";
        var data = `
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="form-group">
                        <label>Nombre: </label>
                        <input type="text" id="nombreBebida" tabindex="1" class="form-control" value="">
                    </div>
                    <div class="form-group">
                        <label>Existencias: </label>
                        <input type="text" id="existenciasBebida" tabindex="1" class="form-control" value="">
                    </div>
                    <div class="form-group">
                        <label>Calorias: </label>
                        <input type="text" id="caloriasBebida" tabindex="1" class="form-control" value="">
                    </div>
                    <div class="form-group">
                        <label>Precio: </label>
                        <input type="text" id="precioBebida" tabindex="1" class="form-control" value="">
                    </div>
                    <div class="form-group">
                        <label>¿Es Alcoholica? : </label>
                        <select id="esAlcoholicaBebida">
                            <option value=true>Si</option>
                            <option value=false>No</option>
                        </select>
                    </div>
                    <div class="form-group" id=divGradosBebida>
                        <label>Grados Alcohol: </label>
                        <input type="text" id="gradosBebida" tabindex="1" class="form-control" value="">
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-sm-6 col-sm-offset-3" id="divButtonAñadirBebida"></div>
                        </div>
                    </div>
                </div>
            </div>`;

        document.getElementById('BebidaModal').innerHTML = data;

        var esAlcoholicaID = document.getElementById('esAlcoholicaBebida');

        var checkBebidaAlcoholica = () => {
            if (esAlcoholicaID.value == "true") {
                document.getElementById('divGradosBebida').style.display = 'block';
            } else {
                document.getElementById('divGradosBebida').style.display = 'none';
                document.getElementById('gradosBebida').value = 0;
            }
        }

        esAlcoholicaID.addEventListener("change", checkBebidaAlcoholica);

        crearElemento("button", "Añadir", "divButtonAñadirBebida", "form-control btn btn-primary", "ButtonAñadirBebida").addEventListener("click", () => this.bebidasClient.postBebida().then(data => this.pintarPaginaHTML(data)));

        modal.style.display = "block";
    }

    eliminarBebida(index) {
        this.bebidasClient.deleteBebida(this.bebidas[index]._id).then(data => this.pintarPaginaHTML(data));
    }

    editarBebida(index) {
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
        document.getElementById('BebidaModal').innerHTML = "";
        var data = `
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="form-group">
                        <label>Nombre: </label>
                        <input type="text" id="editarNombre" tabindex="1" class="form-control" value=${this.bebidas[index].nombre}>
                    </div>
                    <div class="form-group">
                        <label>Existencias: </label>
                        <input type="text" id="editarExistencias" tabindex="1" class="form-control" value=${this.bebidas[index].existencias}>
                    </div>
                    <div class="form-group">
                        <label>Calorias: </label>
                        <input type="text" id="editarCalorias" tabindex="1" class="form-control" value=${this.bebidas[index].calorias}>
                    </div>
                    <div class="form-group">
                        <label>Precio: </label>
                        <input type="text" id="editarPrecio" tabindex="1" class="form-control" value=${this.bebidas[index].precio}>
                    </div>
                    <div class="form-group">
                        <label>¿Es Alcoholica? : </label>
                        <select id="editarEsAlcoholicaBebida">
                            <option value=true>Si</option>
                            <option value=false>No</option>
                        </select>
                    </div>
                    <div class="form-group" id=divEditarGradosBebida>
                        <label>Grados Alcohol: </label>
                        <input type="text" id="editarGradosBebida" tabindex="1" class="form-control" value=${this.bebidas[index].grados}>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-sm-6 col-sm-offset-3" id="divButtonEditarBebida"></div>
                        </div>
                    </div>
                </div>
            </div>`;

        document.getElementById('BebidaModal').innerHTML = data;

        var esAlcoholicaID = document.getElementById('editarEsAlcoholicaBebida')
        esAlcoholicaID.value = this.bebidas[index].esAlcoholica;

        var checkBebidaAlcoholica = () => {
            if (esAlcoholicaID.value == "true") {
                document.getElementById('divEditarGradosBebida').style.display = 'block';
            } else {
                document.getElementById('divEditarGradosBebida').style.display = 'none';
                document.getElementById('editarGradosBebida').value = 0;
            }
        }

        checkBebidaAlcoholica();

        esAlcoholicaID.addEventListener("change", checkBebidaAlcoholica);

        crearElemento("button", "Guardar", "divButtonEditarBebida", "form-control btn btn-primary", "ButtonEditarBebida").addEventListener("click", () => this.bebidasClient.updateBebida(this.bebidas[index]).then(data => this.pintarPaginaHTML(data)));

        modal.style.display = "block";
    }
}

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

        var loginObj = {"username": user, "password": pass};

        return this.apiClient.post(url, loginObj);
    }

    getLoginInico(login) {
        var url = this.urlBase + "/users/login";
        var loginObj = {"username": login.username, "password": login.password};
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

    deleteUsuario(id, pass) {
        var url = this.urlBase + "/" + id;
        return this.apiClient.deleteConBody(url, pass);
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

    post(url, data) {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        var init = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data)
        };

        return fetch(url, init)
    }

    delete(url) {
        var myHeaders = new Headers();

        var init = {
            method: 'DELETE',
            headers: myHeaders
        };

        return fetch(url, init);
    }

    deleteConBody(url, data) {
        var myHeaders = new Headers();

        var init = {
            method: 'DELETE',
            headers: myHeaders,
            body: {
                "password": data
            }
        };

        return fetch(url, init);
    }

    update(url, data) {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        var init = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(data)
        };

        return fetch(url, init);
    }
}

var main;

window.onload = () => {
    main = new Main();
    main.iniciarAPP();
};