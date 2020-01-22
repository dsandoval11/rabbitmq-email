import nodemailer from 'nodemailer';

class Mail {
  transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  public send(email: IEmail | string, callback: (err: Error | null, info: any) => void) {
    const mailOptions = {
      from: 'Remitente',
      to: 'david__2811@gmail.com',
      subject: 'Asunto',
      text: 'Contenido del email',
    };
    this.transporter.sendMail(mailOptions, callback);
  }
}

interface IEmail {
  from: string;
  to: string;
  subject: string;
  text: string;
}

export { Mail, IEmail };
