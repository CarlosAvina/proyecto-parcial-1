var canvas;
var canvasContext;

var slider = document.getElementById('myRange');

var mapa = "50,29;108,27;108,32;187,73;241,76;257,77;258,66;297,68;305,76;315,86;326,93;332,100;336,107;340,119;347,130;356,133;362,138;369,142;379,140;382,137;385,123;396,120;412,122;421,126;432,137;439,149;450,170;461,180;465,196;470,208;487,217;499,223;508,222;514,224;524,221;511,267;508,283;508,298;509,322;518,345;528,365;540,380;548,387;548,399;562,415;580,416;591,426;597,432;613,427;621,422;635,422;652,414;658,417;667,419;671,416;681,414;678,409;680,406;686,396;693,385;698,375;695,362;695,349;706,341;716,337;724,335;736,333;740,327;760,328;770,328;781,326;786,329;789,341;783,351;773,364;778,380;773,387;770,422;766,414;765,403;760,401;754,410;748,415;743,426;736,429;727,436;717,434;706,434;690,436;690,448;678,453;687,457;694,463;701,470;703,472;707,473;706,472;699,484;685,482;675,484;662,509;666,513;664,529;642,508;624,497;613,488;598,488;581,492;562,499;550,503;538,501;523,497;502,492;485,484;473,479;443,468;421,459;407,442;397,448;371,435;362,431;349,418;327,407;321,398;314,395;309,376;319,373;320,351;312,339;305,315;289,297;280,280;269,266;254,258;249,245;239,235;222,232;219,222;229,212;222,200;217,206;210,191;198,188;194,168;176,158;160,132;146,106;141,87;144,72;129,72;128,64;122,60;121,68;108,59;103,58;100,77;106,104;116,112;130,137;136,148;142,160;145,171;152,175;162,192;174,207;177,226;186,246;195,267;196,261;206,274;213,284;217,291;212,303;204,308;200,297;196,288;184,275;171,266;155,253;147,244;154,233;153,220;147,208;142,210;134,198;122,197;112,186;99,181;99,176;86,160;101,166;105,159;110,151;110,146;109,141;93,117;88,112;75,102;75,96;71,89;72,81;66,75;66,65;60,58;54,51;61,53;54,42;51,32;50,29;";

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