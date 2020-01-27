let socket;

function connectSocket(email) {
  socket = io();
  socket.emit('newUser', email);

  socket.on('connectUser', (mensaje) => {
    $('#toast-title').text('Usuario conectado');
    $('#toast-body').text(mensaje);
    $('#toast-connect').toast('show');
  });

  socket.on('newEmail', (mensaje) => {
    $('#toast-title').text('Nuevo correo');
    $('#toast-body').text(mensaje);
    $('#toast-connect').toast('show');
  });
}

function sendEmailSocket(data) {
  socket.emit('sendEmail', data);
}
