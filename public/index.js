$('#modal-myemail').modal('show');
$('#toast-connect').toast({ delay: 2000 });

const emails = [];
let from;

function elementList(text) {
  return `<li class="list-group-item d-flex justify-content-between align-items-center">${text}
      <button type="button" class="btn btn-outline-danger" onclick="deleteEmail(${emails.length})">Eliminar</button>` +
    '</li > ';
}

function addEmail() {
  const email = $('#email').val();
  if (email) {
    const list = $('#email-list');
    list.append(elementList(email));
    emails.push(email);
    $('#email').val('');
  } else {
    alert('El campo no puede estar vacio');
  }
}

function clear() {
  $('#subject').val('');
  $('#content').val('');
  $('#email-list').empty();
}

function sendEmail() {
  const subject = $('#subject').val();
  const content = $('#content').val();
  const data = {
    subject,
    text: content,
    from,
    to: emails,
  };
  sendEmailSocket(data);
  clear();
}

function emailFrom() {
  from = $('#from').val();
  $('#myemail-text').text(from);
  $('#modal-myemail').modal('hide');
  connectSocket(from);
}

$('#email').keypress((event) => {
  const keycode = (event.keyCode ? event.keyCode : event.which);
  if (keycode === 13) {
    addEmail();
  }
});

$('#from').keypress((event) => {
  const keycode = (event.keyCode ? event.keyCode : event.which);
  if (keycode === 13) {
    emailFrom();
  }
});
