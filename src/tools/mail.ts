import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

class Mail {
  transporter: nodemailer.Transporter;

  constructor() {
    dotenv.config();
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
