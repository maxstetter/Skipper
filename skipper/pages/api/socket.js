import { Server } from 'socket.io';

function SocketHandler(req, res){
    if (res.socket.server.io) {
        console.log('Socket is already running...');
        
        //res.end() // Get rid of this later
    } else {
        console.log('Socket is initializing...');
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
                //socket.to(data).emit('receiveJoinRoom', data);
            });

            socket.on('sendVote', (data) => {
                console.log(`Vote from ${socket.id}.`);
                socket.to(data.room).emit('receiveVote', data);
            });

            socket.on('sendUpdate', (data) => {
                console.log(`Update from ${socket.id}. Package: ${data.pckg}`);
                socket.to(data.room).emit('receiveUpdate', data);
            });

            socket.on('sendUpdateRequest', (data) => {
                console.log(`Update request from ${socket.id}.`);
                socket.to(data.room).emit('receiveUpdateRequest', data);
            })

        });

    }

    // const io = new Server(res.socket.server)
    // res.socket.server.io = io



    res.end();
}

export default SocketHandler