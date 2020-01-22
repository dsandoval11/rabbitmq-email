function SocketMain(io: SocketIO.Server) {
  io.on('connection', (socket: SocketIO.Socket) => {
    console.log('Cliente conectado');

    socket.emit('nuevo', { status: true, message: 'Hola' });
  });
}

export default SocketMain;
