const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);

app.get('/',(req,res) => {

res.end('voting app');
});

const votes = {
    batman: 0,
    spiderman: 0,
    superman: 0,
};

io.on('connection', (socket) => {

    console.log('user connected');

    socket.emit('new-vote', votes);

    socket.on('new-vote', (vote) => {
        console.log('New vote', vote);
     votes[vote]+=1;
     io.emit('new-vote', votes);
    });

    socket.on('disconnect', () => console.log('a user disconnected'));
});

server.listen(3000, () => {

    console.log('listening 3000');
});