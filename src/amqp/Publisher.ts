import amqp from 'amqplib';
//import amqp from 'amqplib/callback_api'; Realizar conexion con Callbacks

class Publisher {
  channel?: amqp.Channel;

  constructor() {
    //Se realiza la conexion en base a Promises
    amqp.connect('amqp://localhost')
      .then((connection: amqp.Connection) => connection.createChannel())
      .then((channel: amqp.Channel) => {
        this.channel = channel;
        /*const cola = 'emails';
        const message = 'Prueba de publicador';

        channel.assertQueue(cola, { durable: false });

        console.log('Enviando mensaje mensajes');
        for (let index = 0; index < 10; index++) {
          //channel.sendToQueue(cola, Buffer.from(`${message} ${index}`));
          channel.sendToQueue(cola, Buffer.from(`${index}`));
        }
        console.log('Mensaje enviado');*/
      });
  }
}

