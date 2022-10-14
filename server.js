const express = require('express');
const app = express();
const server = require('http').createServer(app);
const connectSocket = require('./socket.server');

connectSocket(server);
app.use(require('cors')());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('<h1>Server is Running!</h1>'));

server.listen(process.env.PORT, () =>
    console.log('----Hey man leave her alone!----')
);
