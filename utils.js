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

var plusSlides = (n, sh, d) => {
    showSlides(slideIndex += n, sh, d);
}

var currentSlide = (n, sh, d) => {
    showSlides(slideIndex = n, sh, d);
}

var slideIndex = 1;
var showSlides = (n, sh, d) => {
    var i;
    var slides = document.getElementsByClassName(sh);
    var dots = document.getElementsByClassName(d);
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}