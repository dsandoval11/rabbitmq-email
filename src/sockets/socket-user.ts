import Publisher from '../amqp/Publisher';

const publisher = new Publisher();
const users: IUserSocket[] = [];

function SocketUser(socket: SocketIO.Socket) {
  socket.on('newUser', (email) => {
    users.push({ email, id: socket.id });
    socket.broadcast.emit('connectUser', `Se conecto un usuario con correo ${email}`);
  });

  socket.on('disconnect', () => {
    const index = users.findIndex((user: IUserSocket) => user.id === socket.id);
    users.slice(index, 1);
  });

  socket.on('sendEmail', (data: INewEmail | null) => {
    if (data) {
      users.forEach((user: IUserSocket) => {
        const index = data.to.findIndex((email: string) => email === user.email);
        if (index !== -1) {
          socket.broadcast.to(user.id).emit('newEmail', `Has recibido un email de ${data.from}`);
        }
      });
      publisher.sendEmail(data);
    }
  });
}

interface INewEmail {
  subject: string;
  content: string;
  from: string;
  to: string[];
}

interface IUserSocket {
  email: string;
  id: string;
}

export default SocketUser;
