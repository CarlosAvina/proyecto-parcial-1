var canvas;
var canvasContext;

var slider = document.getElementById('myRange');

var mapa = "3:17,305.5;37,309.5;46,311.5;51,311.5;56,311.5;60,311.5;64,311.5;73,313.5;82,315.5;86,317.5;92,319.5;102,323.5;115,326.5;127,327.5;140,329.5;158,332.5;179,334.5;197,337.5;218,344.5;241,354.5;266,370.5;280,381.5;286,388.5;297,400.5;306,412.5;313,424.5;325,451.5;337,484.5;343,507.5;360,547.5;375,563.5;388,563.5;398,562.5;409,562.5;438,560.5;456,560.5;484,559.5;512,565.5;536,573.5;543,573.5;570,582.5;591,591.5;624,604.5;653,616.5;685,627.5;706,636.5;740,647.5;772,659.5;795,669.5;822,680.5;967,402.5;974,388.5;974,378.5;971,367.5;965,354.5;815,31.5;43,296.5;";

window.onload = function(){
    canvas = document.getElementById('canvasId');
    canvasContext = canvas.getContext('2d');

    graficar();

    canvas.addEventListener('click', function(evt){
        var mousePosition = calculatePaddlePosition(evt);

        hipotenusa(mousePosition.x, mousePosition.y);
    });
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

var Edificios = function(){
    readTextFile("file:///Users/juancarlosavinaluna/Documents/ISSC/Semestre\ 6/Sistemas\ Georeferenciados/proyecto-parcial-1/public/files/universum.dat");
}

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}

function graficar(){

    var numero = '';
    var x = 0, y = 0;

    canvasContext.beginPath();

    for(i = 0;i < mapa.length;i++){
        if(mapa[i] != ',' && mapa[i] != ';'){
            numero += mapa[i];
        } else if (mapa[i] == ',') {
            x = parseInt(numero) * (slider.value * .1);
            numero = '';
        } else if (mapa[i] == ';'){
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
    graficar();
}

/*
if((i + 1) % 2 == 1) {
                canvasContext.beginPath();
                canvasContext.moveTo(x, y);
            } else {
                canvasContext.lineTo(x, y);
                canvasContext.strokeStyle = 'red';
                canvasContext.stroke();
            }
*/