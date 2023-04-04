import { Server } from 'socket.io';

function SocketHandler(req, res){
    if (res.socket.server.io) {
        console.log('Socket is already running...');
        res.end()
        return;
    }

    const io = new Server(res.socket.server)
    res.socket.server.io = io


    io.on('connection', socket => {
        console.log(`User Connected: ${socket.id}`)

        socket.on('sendMessage', (data) => {
            console.log(`Message for ${data.room} received.`);
            socket.to(data.room).emit('receiveMessage', data);
        });

        socket.on('joinRoom', (data) => {
            socket.join(data);
            console.log(`${socket.id} joined room ${data}`);
        });
    });

    console.log('Socket is initializing...');
    res.end();
}

export default SocketHandler