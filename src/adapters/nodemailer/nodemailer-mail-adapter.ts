import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c0bfab7a4431d1",
    pass: "b43b091fcdb5a8"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <contato@feedget.com>',
      to: 'Leo Vargas <leu1607@hotmail.com>',
      subject: subject,
      html: body
    })
  }
}