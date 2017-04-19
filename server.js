const express = require('express');
const app = express();

const connections = [];
const users = [];

app.use(express.static('./public'));

const server = app.listen(3000);
const io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {

  socket.once('disconnect', function () {
    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();
    console.log('Disconnected: %s sockets connected', connections.length);
    io.emit('disconnect');
  });

  socket.on('messageAdded', function (payload) {
    const { timeStamp, text } = payload;
    const newMessage = { timeStamp, text };
    io.emit('messageAdded', newMessage);
  });

  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length);
});

console.log('Server is running on port 3000');