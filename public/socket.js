let socket;
const favicon = new Favico({
  position: 'up',
});
function newNotification() {
  favicon.badge(1);
  setTimeout(() => {
    favicon.badge(0);
  }, 3000);
}

function connectSocket(email) {
  socket = io();
  socket.emit('newUser', email);

  socket.on('connectUser', (mensaje) => {
    $('#toast-title').text('Usuario conectado');
    $('#toast-body').text(mensaje);
    $('#toast-connect').toast('show');
    newNotification();
  });

  socket.on('newEmail', (mensaje) => {
    $('#toast-title').text('Nuevo correo');
    $('#toast-body').text(mensaje);
    $('#toast-connect').toast('show');
    newNotification();
  });
}

function sendEmailSocket(data) {
  socket.emit('sendEmail', data);
}
