var log = x => console.log(x);
var error = x => console.error(x);
var warn = x => console.warn(x);

var Mensaje = function(id, mensaje) {
    this.id = id;
    this.datos = mensaje;
    this.fecha = new Date();
}

var Conversacion = function(emisor, mensaje, receptores) {
    this.emisor = emisor;
    this.mensaje = mensaje;
    this.receptores = receptores;
}

Conversacion.prototype.emitirMensajes = function() {
    var enviadoPor = this.emisor.id;
    var mensaje = new Mensaje(+new Date(), this.mensaje);
    pintarMensaje(enviadoPor, mensaje.datos.mensaje, true, null);
    for (var i = 0; i < this.receptores.length; i++) {
        pintarMensaje(this.receptores[i].id, mensaje.datos.mensaje, false, mensaje.datos.destinatario);
    }
};

var Smartphone = function(id, modelo) {
    this.id = id;
}

var enviarMensaje = function(idIphone) {
    var emisor = new Smartphone(idIphone, "Iphone");
    var mensaje = getMensaje(idIphone);
    var receptores = [];

    if (mensaje.destinatario == "TODOS") {
        for (var i = 1; i <= document.getElementsByClassName("iphone").length; i++) {
            var id = document.getElementById("iphone" + i).id;
            if (id != idIphone)
                receptores.push(new Smartphone(id));
        }
    } else {
        if (mensaje.destinatario != idIphone)
            receptores.push(new Smartphone(mensaje.destinatario));
    }
    if (mensaje.mensaje != "")
        pubsub.pub("mensaje", new Conversacion(emisor, mensaje, receptores));
}

var pubsub = (function() {
    var suscriptores = {};

    function subscribe(event, callback) {
        if (!suscriptores[event]) {
            var suscriptorArray = [callback];
            suscriptores[event] = suscriptorArray;
        } else {
            suscriptores[event].push(callback);
        }
    }

    function publish(event, data) {
        if (suscriptores[event]) {
            suscriptores[event].forEach(function(callback) {
                callback(data);
            });
        }
    }

    return {
        pub: publish,
        sub: subscribe
    };
}());

pubsub.sub("mensaje", function(e) {
    log("Comunicacion entre dispositivos");
    warn("EMISOR: " + e.emisor.id);
    warn("Mensaje: " + e.mensaje.mensaje);
    warn("CANTIDAD DE RECEPTORES: " + e.receptores.length);
    log("--------------------------------");
    e.emitirMensajes();
});