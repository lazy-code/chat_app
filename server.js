const express = require('express');
const app = express();

const connections = [];
const users = [];

app.use(express.static('./public'));

const server = app.listen(3000);
const io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length);
});

console.log('Server is running on port 3000');