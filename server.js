const express = require('express');
const app = express();
const server = require('http').createServer(app);
const connectSocket = require('./socket.server');

connectSocket(server);
app.use(require('cors')());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

server.listen(process.env.PORT, () =>
    console.log('----Hey man leave her alone!----')
);
