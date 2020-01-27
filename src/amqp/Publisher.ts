import amqp from 'amqplib';
import { SendMailOptions } from 'nodemailer';
//import amqp from 'amqplib/callback_api'; Realizar conexion con Callbacks

class Publisher {
  channel?: amqp.Channel;

  private async startChannel() {
    if (!this.channel) {
      this.channel = await amqp.connect('amqp://localhost')
        .then((connection: amqp.Connection) => connection.createChannel());
    }
  }

  async sendEmail(data: SendMailOptions) {
    await this.startChannel();
    const queue = 'emails';
    if (this.channel) {
      this.channel.assertQueue(queue, { durable: false });
      this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
      console.log('Mensaje enviado a la cola');
    }
  }
}

export default Publisher;
