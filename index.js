const express = require('express');
const socket = require('socket.io');

//App setup
const app = express();
const server = app.listen(4000, function() {
    console.log('listening to request on the http://localhost:4000');
});

//Static files
app.use(express.static('public'));

//Socket setup
const io = socket(server);

io.on('connection', (socket) => {
    console.log('made socket connection', socket.id);

    //Handle chat event
    socket.on('chat', function(data) {
        io.sockets.emit('chat', data);
    });

    //Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});
