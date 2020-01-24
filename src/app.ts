import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import SocketMain from './sockets/socket.main';

class App {
  app: express.Express;
  server: http.Server;
  io: SocketIO.Server;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = socketIO(this.server);
  }

  start(): void {
    SocketMain(this.io);
    this.server.listen(process.env.PORT, (): void => {
      console.log(`Servidor iniciado ${process.env.PORT}`);
    });
  }
}

export default App;
