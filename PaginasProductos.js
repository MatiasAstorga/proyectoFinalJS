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
        crearElemento("button", "Nueva Comida", "nuevaComidaHeader", "butonRigth btn btn-default", "nuevaComidaBtn").addEventListener("click", () => this.añadirComida());

        document.querySelectorAll("tr>th:last-child").forEach((elemento) => {
            elemento.insertBefore(crearElemento("button", "Ver", undefined, "btn btn-primary verDetallesComida", "verDetallesComida"), null);
            elemento.insertBefore(crearElemento("button", "Editar", undefined, "btn btn-primary editarComida", "editarComida"), null);
            elemento.insertBefore(crearElemento("button", "Borrar", undefined, "btn btn-primary borrarComida", "borrarComida"), null);
        })

        document.querySelectorAll(".borrarComida").forEach((elemento, index) => {
            elemento.addEventListener("click", () => this.eliminarComida(index));
        })

        document.querySelectorAll(".editarComida").forEach((elemento, index) => {
            elemento.addEventListener("click", () => this.editarComida(index));
        })

        document.querySelectorAll(".verDetallesComida").forEach((elemento, index) => {
            elemento.addEventListener("click", () => this.verDetallesComida(index));
        })
    }

    añadirComida() {
        this.mostrarModal();

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
                        <input type="number" id="existenciasComida" tabindex="1" class="form-control" value="">
                    </div>
                    <div class="form-group">
                        <label>Calorias: </label>
                        <input type="number" id="caloriasComida" tabindex="1" class="form-control" value="">
                    </div>
                    <div class="form-group">
                        <label>Precio: </label>
                        <input type="number" id="precioComida" tabindex="1" class="form-control" value="">
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-sm-6 col-sm-offset-3" id="divButtonAñadirComida"></div>
                        </div>
                    </div>
                </div>
            </div>`;
        document.getElementById('ComidaModal').innerHTML = data;

        crearElemento("button", "Añadir", "divButtonAñadirComida", "form-control btn btn-primary", "ButtonAñadirComida").addEventListener("click", () => this.comidaClient.postComida().then(data => this.gestionPromesas(data, "Comida Añadida")));
    }

    eliminarComida(index) {
        this.comidaClient.deleteComida(this.comidas[index]._id).then(data => this.gestionPromesas(data, "Comida Eliminada"));
    }

    editarComida(index) {
        this.mostrarModal();

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
                        <input type="number" id="editarExistencias" tabindex="1" class="form-control" value=${this.comidas[index].existencias}>
                    </div>
                    <div class="form-group">
                        <label>Calorias: </label>
                        <input type="number" id="editarCalorias" tabindex="1" class="form-control" value=${this.comidas[index].calorias}>
                    </div>
                    <div class="form-group">
                        <label>Precio: </label>
                        <input type="number" id="editarPrecio" tabindex="1" class="form-control" value=${this.comidas[index].precio}>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-sm-6 col-sm-offset-3" id="divButtonEditarComida"></div>
                        </div>
                    </div>
                </div>
            </div>`;

        document.getElementById('ComidaModal').innerHTML = data;
        crearElemento("button", "Guardar", "divButtonEditarComida", "form-control btn btn-primary", "ButtonEditarComida").addEventListener("click", () => this.comidaClient.updateComida(this.comidas[index]).then(data => this.gestionPromesas(data, "Comida Editada")));
    }

    verDetallesComida(index) {
        this.mostrarModal();

        document.getElementById('ComidaModal').innerHTML = "";
        var data = `
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="form-group">
                        <label>ID: </label>
                        <input disabled type="text" tabindex="1" class="form-control" value=${this.comidas[index]._id}>
                    </div>
                    <div class="form-group">
                        <label>Nombre: </label>
                        <input disabled type="text" tabindex="1" class="form-control" value=${this.comidas[index].nombre}>
                    </div>
                    <div class="form-group">
                        <label>Tipo: </label>
                        <input disabled type="text" tabindex="1" class="form-control" value=${this.comidas[index].tipo}>
                    </div>
                    <div class="form-group">
                        <label>Existencias: </label>
                        <input disabled type="number" tabindex="1" class="form-control" value=${this.comidas[index].existencias}>
                    </div>
                    <div class="form-group">
                        <label>Calorias: </label>
                        <input disabled type="number" tabindex="1" class="form-control" value=${this.comidas[index].calorias}>
                    </div>
                    <div class="form-group">
                        <label>Precio: </label>
                        <input disabled type="number" tabindex="1" class="form-control" value=${this.comidas[index].precio}>
                    </div>
                </div>
            </div>`;

        document.getElementById('ComidaModal').innerHTML = data;
    }

    mostrarModal() {
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

    gestionPromesas(data, msg) {
        mostrarPantallaDeCarga(true);
        var x = document.getElementById("snackbar");
        if (data.status == 200) {
            x.innerHTML = msg;
        } else {
            x.innerHTML = "Error: datos incorrectos, intente mas tarde.";
        }
        x.className = "show";
        window.setTimeout(() => {
            if (data.status == 200)
                this.pintarPaginaHTML(data);
            else
                mostrarPantallaDeCarga(false);
            x.className = x.className.replace("show", "");
        }, 1500);
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
        crearElemento("button", "Nueva Bebida", "nuevaBebidaHeader", "butonRigth btn btn-default", "nuevaBebidaBtn").addEventListener("click", () => this.añadirBebida());

        document.querySelectorAll("tr>th:last-child").forEach((elemento) => {
            elemento.insertBefore(crearElemento("button", "Ver", undefined, "btn btn-primary verDetallesBebida", "verDetallesBebida"), null);
            elemento.insertBefore(crearElemento("button", "Editar", undefined, "btn btn-primary editarBebida", "editarBebida"), null);
            elemento.insertBefore(crearElemento("button", "Borrar", undefined, "btn btn-primary borrarBebida", "borrarBebida"), null);
        })

        document.querySelectorAll(".borrarBebida").forEach((elemento, index) => {
            elemento.addEventListener("click", () => this.eliminarBebida(index));
        })

        document.querySelectorAll(".editarBebida").forEach((elemento, index) => {
            elemento.addEventListener("click", () => this.editarBebida(index));
        })

        document.querySelectorAll(".verDetallesBebida").forEach((elemento, index) => {
            elemento.addEventListener("click", () => this.verDetallesBebida(index));
        })
    }

    añadirBebida() {
        this.mostrarModal();

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
                        <input type="number" id="existenciasBebida" tabindex="1" class="form-control" value="">
                    </div>
                    <div class="form-group">
                        <label>Calorias: </label>
                        <input type="number" id="caloriasBebida" tabindex="1" class="form-control" value="">
                    </div>
                    <div class="form-group">
                        <label>Precio: </label>
                        <input type="number" id="precioBebida" tabindex="1" class="form-control" value="">
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
                        <input type="number" id="gradosBebida" tabindex="1" class="form-control" value="">
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

        crearElemento("button", "Añadir", "divButtonAñadirBebida", "form-control btn btn-primary", "ButtonAñadirBebida").addEventListener("click", () => this.bebidasClient.postBebida().then(data => this.gestionPromesas(data, "Bebida Añadida")));
    }

    eliminarBebida(index) {
        this.bebidasClient.deleteBebida(this.bebidas[index]._id).then(data => this.gestionPromesas(data, "Bebida Eliminada"));
    }

    editarBebida(index) {
        this.mostrarModal();

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
                        <input type="number" id="editarExistencias" tabindex="1" class="form-control" value=${this.bebidas[index].existencias}>
                    </div>
                    <div class="form-group">
                        <label>Calorias: </label>
                        <input type="number" id="editarCalorias" tabindex="1" class="form-control" value=${this.bebidas[index].calorias}>
                    </div>
                    <div class="form-group">
                        <label>Precio: </label>
                        <input type="number" id="editarPrecio" tabindex="1" class="form-control" value=${this.bebidas[index].precio}>
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
                        <input type="number" id="editarGradosBebida" tabindex="1" class="form-control" value=${this.bebidas[index].grados}>
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

        crearElemento("button", "Guardar", "divButtonEditarBebida", "form-control btn btn-primary", "ButtonEditarBebida").addEventListener("click", () => this.bebidasClient.updateBebida(this.bebidas[index]).then(data => this.gestionPromesas(data, "Bebida Editada")));
    }

    verDetallesBebida(index) {
        this.mostrarModal();

        document.getElementById('BebidaModal').innerHTML = "";
        var data = `
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="form-group">
                        <label>ID: </label>
                        <input disabled type="text" tabindex="1" class="form-control" value=${this.bebidas[index]._id}>
                    </div>
                    <div class="form-group">
                        <label>Nombre: </label>
                        <input disabled type="text" tabindex="1" class="form-control" value=${this.bebidas[index].nombre}>
                    </div>
                    <div class="form-group">
                        <label>Existencias: </label>
                        <input disabled type="number" tabindex="1" class="form-control" value=${this.bebidas[index].existencias}>
                    </div>
                    <div class="form-group">
                        <label>Calorias: </label>
                        <input disabled type="number" tabindex="1" class="form-control" value=${this.bebidas[index].calorias}>
                    </div>
                    <div class="form-group">
                        <label>Precio: </label>
                        <input disabled type="number" tabindex="1" class="form-control" value=${this.bebidas[index].precio}>
                    </div>
                    <div class="form-group">
                        <label>¿Es Alcoholica? : </label>
                        <select disabled id="editarEsAlcoholicaBebida">
                            <option value=true>Si</option>
                            <option value=false>No</option>
                        </select>
                    </div>
                    <div class="form-group" id=divEditarGradosBebida>
                        <label>Grados Alcohol: </label>
                        <input disabled type="number" tabindex="1" class="form-control" value=${this.bebidas[index].grados}>
                    </div>
                </div>
            </div>`;

        document.getElementById('BebidaModal').innerHTML = data;
    }

    mostrarModal() {
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

    gestionPromesas(data, msg) {
        mostrarPantallaDeCarga(true);
        var x = document.getElementById("snackbar");
        if (data.status == 200) {
            x.innerHTML = msg;
        } else {
            x.innerHTML = "Error: datos incorrectos, intente mas tarde.";
        }
        x.className = "show";
        window.setTimeout(() => {
            if (data.status == 200)
                this.pintarPaginaHTML(data);
            else
                mostrarPantallaDeCarga(false);
            x.className = x.className.replace("show", "");
        }, 1500);
    }
}