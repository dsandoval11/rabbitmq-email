import amqp from 'amqplib';
import { SendMailOptions } from 'nodemailer';
import Mail from '../tools/mail';

amqp.connect('amqp://localhost')
  .then((connection: amqp.Connection) => connection.createChannel())
  .then((channel: amqp.Channel) => {
    try {
      const mail = new Mail();
      console.log('Consumidor iniciado');
      const cola = 'pruebas';
      const colaEmails = 'emails';
      channel.assertQueue(cola, { durable: false });
      channel.assertQueue(colaEmails, { durable: false });
      // No pone en la cola del consumidor hasta que no lo haya procesado
      // El mensaje se enviara a otro consumidor que no este ocupado
      // channel.prefetch(1);

      /**
       *  COLA DE PRUEBAS
       */
      channel.consume(cola, (msg: amqp.ConsumeMessage | null) => {

        const message = msg?.content.toString();
        const num = parseInt(<string>message, 0);
        if (num % 2 === 0) {
          setTimeout(() => {
            console.log(msg?.content.toString());
            channel.ack(<amqp.Message>msg);
          }, 3000);
        } else {
          console.log(msg?.content.toString());
          channel.ack(<amqp.Message>msg); // Confirma el procesamiento de mensaje
        }
      }, { noAck: false });

      /**
       * COLA ENCARGADA DE ENVIAR EMAILS
       */
      channel.consume(colaEmails, (msg: amqp.ConsumeMessage | null) => {
        let payload: SendMailOptions = {};
        if (msg?.content.toString !== undefined) {
          payload = <SendMailOptions>JSON.parse(msg?.content.toString());
        }
        console.log(payload);
        mail.send(payload, (err: Error | null, info: any) => {
          if (err) {
            console.log(err);
            channel.ack(<amqp.Message>msg);
          } else {
            channel.ack(<amqp.Message>msg); // Confirma el procesamiento de mensaje
            console.log('Email enviado correctamente');
          }
        });
      });
    } catch (exception) {
      console.log('Excepcion ', exception);
    }
  })
  .catch((err: any) => {
    console.log(err);
  });

