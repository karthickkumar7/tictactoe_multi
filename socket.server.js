const crypto = require('crypto');

let rooms = {};

let msgs = {};

const connectSocket = (server) => {
    const io = require('socket.io')(server, { cors: { origin: '*' } });

    io.on('connect', (socket) => {
        console.log(`${socket.id} connected!`);

        socket.on('go', ({ username, room }) => {
            socket.join(room);
            if (rooms[room]) {
                rooms[room].push({ username, id: socket.id });
                io.to(room).emit('start', {
                    first: rooms[room][0].id,
                    players: rooms[room],
                });
            } else {
                rooms[room] = [{ username, id: socket.id }];
            }
            console.log(rooms[room]);
        });

        socket.on('marked', ({ id, room }) => {
            socket.to(room).emit('update', id);
        });

        socket.on('won', ({ room, username }) => {
            io.to(room).emit('msg', `${username} won!`);
        });

        socket.on('msg', ({ room, msg }) => {
            if (msgs[room]) {
                msgs[room].push({
                    id: crypto.randomBytes(16).toString('hex'),
                    msg,
                    author: socket.id,
                });
            } else {
                msgs[room] = [
                    {
                        id: crypto.randomBytes(16).toString('hex'),
                        msg,
                        author: socket.id,
                    },
                ];
            }

            //  change this later
            io.to(room).emit('msgs', msgs[room]);
        });

        socket.on('disconnect', () => {});
    });
};

module.exports = connectSocket;
