window.onload = function(){
    var header = document.querySelector("header");
    header.addEventListener("click", function(e){
        e.stopPropagation();
        console.log("Has clickeado en " + e.target.nodeName);
    });

    var body = document.querySelector("body");
    body.addEventListener("click", function(e){
        console.log("HAS CLIKEADO EN " + e.target.nodeName);
    });
}
