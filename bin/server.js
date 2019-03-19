var io = require('socket.io')();
var fs = require('fs');

io.sockets.on('connection', function(socket){
    console.log('Hola amigo ' + socket.id);

    socket.on('action', function(data){
        var readFile = fs.readFileSync('/Users/juancarlosavinaluna/Documents/ISSC/Semestre6/SistemasGeoreferenciados/proyecto-parcial-1/bin/edificio_D.dat', 'utf-8');
        console.log(readFile);
    });
});

module.exports = io;