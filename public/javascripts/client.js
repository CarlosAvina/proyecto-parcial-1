var socket = io('http://localhost:3000'); //Aqui va la ip del servidor

var canvas;
var canvasContext;

var slider = document.getElementById('myRange');

var figuraActual = "";

window.onload = function(){
    canvas = document.getElementById('canvasId');
    canvasContext = canvas.getContext('2d');

    graficar();

    canvas.addEventListener('click', function(evt){
        var mousePosition = calculatePaddlePosition(evt);

        hipotenusa(mousePosition.x, mousePosition.y);
    });
}

socket.on('figura', function(data) {
    console.log(String(data));
    graficar(String(data));
    figuraActual += data;
});

function Edificios(){
    var datos = new Filtro();
    socketemit(datos.EDIFICIOS());
    //console.log(json);
}

function Facultades(){
    var datos = new Filtro();
    socketemit(datos.FACULTADES());
}

function aulas(){
    var datos = new Filtro();
    socketemit(datos.AULASCOMUN());
}

function entretenimiento(){
    var datos = new Filtro();
    socketemit(datos.ENTRETENIMIENTO());
}

function socketemit(data){
    var json = JSON.stringify(data);
    socket.emit('action', json);
}

function calculatePaddlePosition(evt){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft - .5;
    var mouseY = evt.clientY - rect.top - root.scrollTop;

    return {
        x: mouseX,
        y: mouseY
    };
}

function createRectangle(x, y, width, height, color){
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
}

function graficar(data){

    var figura = String(data);
    console.log(figura);

    var numero = '';
    var x = 0, y = 0;

    canvasContext.beginPath();

    for(i = 0;i < figura.length;i++){
        if(figura[i] != ',' && figura[i] != ';'){
            numero += figura[i];
        } else if (figura[i] == ',') {
            x = parseInt(numero) * (slider.value * .1);
            numero = '';
        } else if (figura[i] == ';'){
            y = parseInt(numero) * (slider.value * .1);
            numero = '';

            if(i == 0) {
                canvasContext.moveTo(x, y);
            } else {
                canvasContext.lineTo(x, y);
                canvasContext.stroke();
            }
        }
    }
}

slider.oninput = function() {
    createRectangle(0, 0, canvas.width, canvas.height, 'ghostwhite');
    graficar(figuraActual);
}