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

  public send(email: nodemailer.SendMailOptions, callback: (err: Error | null, info: any) => void) {
    this.transporter.sendMail(email, callback);
  }
}

export default Mail;
