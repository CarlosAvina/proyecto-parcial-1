var io = require('socket.io')();
var fs = require('fs');

var ruta = '/Users/juancarlosavinaluna/Documents/ISSC/Semestre6/SistemasGeoreferenciados/proyecto-parcial-1/public/files/';

io.sockets.on('connection', function(socket){
    console.log('Hola amigo ' + socket.id);

    socket.on('action', function(data){
        var readFile = fs.readFileSync(ruta + 'areas_deportivas.dat', 'utf-8');
        console.log(readFile);
    });
});

module.exports = io;