import SocketUser from './socket-user';

function SocketMain(io: SocketIO.Server) {
  io.on('connection', (socket: SocketIO.Socket) => {
    SocketUser(socket);
  });
}

export default SocketMain;
