const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });
const cors = require('cors');
app.use(cors())



io.on('connection', (socket) => {
    console.log('a user connected' + socket.id);
});
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message recvd: ' + msg);
        console.log('message broadcasting: ' + msg);
        io.emit('chat message', msg);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});