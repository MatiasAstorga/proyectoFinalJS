var log = x => console.log(x);
var warn = x => console.warn(x);
var error = x => console.error(x);

class Tienda {
    constructor() {
        this.productos = [];
        this.nombre = "La tiendita de matias";
        this.ubicacion = "Calle noexiste 999";
        this.url = "www.tiendita.com";
        this.contadorProductos = 6;
    }

    pintarProductos() {
        var data = "<label>Listado de productos:</label> <table id=tablaProductosPintados> <tr> <td> Imagen </td> <td> Nombre </td> <td> Precio </td> <td> Descripción </td> <td> Acciones </td> </tr>";
        for (var i = 0; i < this.productos.length; i++) {
            data += "<tr>";
            data += "<th> <img class=imgPos src=" + this.productos[i].url + "></th>";
            data += "<th>" + this.productos[i].nombre + "</th>";
            data += "<th>" + new Intl.NumberFormat('es-ES', {
                style: 'currency',
                currency: 'EUR'
            }).format(this.productos[i].precio); + "</th>";
            data += "<th>" + this.productos[i].descripcion + "</th>";
            data += "<th> <button class=button onclick=tienda.borrarProductoPorId(" + this.productos[i].id + ")>Borrar Producto</button>"
            data += "<button class=button onclick=carroCompras.añadirAlCarrito(" + JSON.stringify(this.productos[i]) + ")>Añadir al carro</button></th>";
            data += "</tr>"
        }
        data += "</table>";

        (this.productos.length == 0) ? document.getElementById("pintarProductos").innerHTML = "<p>Ningún producto agregado a la tienda</p>": document.getElementById("pintarProductos").innerHTML = data;
    }

    recargarCampos() {
        document.getElementById("nombre").value = "";
        document.getElementById("precio").value = "";
        document.getElementById("descripcion").value = "";
        document.getElementById("url").value = "";
    }

    agregarProducto() {
        var nombre = document.getElementById("nombre").value;
        var precio = document.getElementById("precio").value;
        var descripcion = document.getElementById("descripcion").value;
        var url = document.getElementById("url").value;

        if (nombre == "") {
            alert("Ingrese Nombre");
        } else if (descripcion == "") {
            alert("Ingrese Descripción")
        } else {
            this.recargarCampos();

            var idProducto = this.contadorProductos;
            this.contadorProductos++;
            var producto = new Producto(+idProducto, nombre, +precio, descripcion, url);
            warn("Agregando producto: " + producto.nombre);

            this.productos.push(producto);
            warn("Cantidad de productos en la tienda: " + this.productos.length);
            this.pintarProductos();
        }
    };

    borrarProductoPorId(idProducto) {
        let producto = null;

        for (let i = 0; i < this.productos.length; i++) {
            if (this.productos[i].id == idProducto) {
                producto = this.productos[i];
            }
        }

        let indice = this.productos.indexOf(producto);
        this.borrarProductoPorIndice(indice);

    }

    borrarProductoPorIndice(indice) {
        error("Borrando producto...");
        this.productos.splice(indice, 1);
        warn("Cantidad de productos en la tienda: " + this.productos.length);
        this.pintarProductos();
    }
}

class Producto {
    constructor(id, nombre, precio, descripcion, url) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.url = url;
    }
}

class Carrito {
    constructor() {
        this.productos = [];
        this.precioPagar = 0;
    }

    añadirAlCarrito(producto) {
        this.productos.push(producto);
        document.getElementById('circle').style.display = "block";
        document.getElementById('circle').innerHTML = this.productos.length;
        this.pintarProductos();
    }

    obtenerTotal() {
        var total = 0;
        this.productos.forEach(function(producto) {
            total += producto.precio;
        });
        this.precioPagar = total;
        return total;
    }

    pintarProductos() {
        var data = "<label>Productos en carro de compra:</label> <table id=tablaProductosPintadosCarro> <tr> <td> Imagen </td> <td> Nombre </td> <td> Precio </td> <td> Acciones </td> </tr>";
        for (var i = 0; i < this.productos.length; i++) {
            data += "<tr>";
            data += "<th> <img class=imgPos src=" + this.productos[i].url + "></th>";
            data += "<th>" + this.productos[i].nombre + "</th>";
            data += "<th>$" + new Intl.NumberFormat('es-ES', {
                style: 'currency',
                currency: 'EUR'
            }).format(this.productos[i].precio); + "</th>";
            data += "<th> <button class=button onclick=carroCompras.borrarProducto(" + i + ")>Borrar del carro</button></th>";
            data += "</tr>"
        }

        data += "</table>";

        data += "<label class=pintarTotal>TOTAL: " + new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR'
        }).format(this.obtenerTotal()); + "</label>"
        if (this.productos.length == 0) {
            document.getElementById("pintarProductosCarrito").innerHTML = "<p> Ningún producto agregado al carro de compras.</p>";
            document.getElementById('circle').style.display = "none";
        } else
            document.getElementById("pintarProductosCarrito").innerHTML = data;
    }

    borrarProducto(id) {
        error("Borrando producto...");
        document.getElementById("tablaProductosPintadosCarro").deleteRow(id + 1);
        this.productos.splice(id, 1);
        warn("Cantidad de productos en el carrito: " + this.productos.length);
        document.getElementById('circle').innerHTML = this.productos.length;
        this.pintarProductos();
    }
}

var tienda = new Tienda();
var carroCompras = new Carrito();

function pagarProductos() {
    alert("Coming soon...");
}

window.onload = function() {

    document.getElementById("tienda").innerHTML = tienda.nombre;
    document.getElementById("direccion").innerHTML = tienda.ubicacion;

    tienda.productos.push(new Producto(0, "Camiseta1", 50, "Camiseta1", "https://upload.wikimedia.org/wikipedia/commons/8/81/Camiseta-negra.jpg"));
    tienda.productos.push(new Producto(1, "Camiseta2", 32.4, "Camiseta2", "https://http2.mlstatic.com/remera-lisa-surf-4-remeras-al-precio-de-3-jooks-originales-D_NQ_NP_964225-MLA25405022061_032017-F.jpg"));
    tienda.productos.push(new Producto(2, "Camiseta3", 99.99, "Camiseta3", "http://www.equipadeporte.com/11549-thickbox/camisetas-tecnicas-roly-camisetas-tecnicas-roly-montecarlo.jpg"));
    tienda.productos.push(new Producto(3, "Pantalon1", 41.2, "Pantalon1", "http://www.grisino.com/media/catalog/product/cache/8/base/459x459/9df78eab33525d08d6e5fb8d27136e95/g/r/grisino_g1pa03_zl_1.jpg"));
    tienda.productos.push(new Producto(4, "Zapatillas1", 80, "Zapatillas1", "http://static.vix.com/es/sites/default/files/styles/large/public/imj/imujer/T/Tacones-vs-zapatillas-3.jpg?itok=SeD9Pheb"));
    tienda.productos.push(new Producto(5, "Mochila1", 10, "Mochila1", "https://2.bp.blogspot.com/-t8XRjiCjNSg/V9LT9h6OcMI/AAAAAAAAFFI/vZtm85t4ZwoOj2WnNO2LI4zV-dKdsI-KACLcB/s1600/mochila-personalizada-discovery-verde.jpg"));

    tienda.pintarProductos();

    var modal = document.getElementById("myModal");
    var carro = document.getElementById("carrito");
    var span = document.getElementsByClassName("close")[0];

    carro.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}