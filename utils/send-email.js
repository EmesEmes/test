import nodemailer from 'nodemailer';
import configs from '../configs/configs.js';

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: configs.MAILTRAP_HOST,
    port: configs.MAILTRAP_PORT,
    auth: {
      user: configs.MAILTRAP_USER,
      pass: configs.MAILTRAP_PASS,
    },
  })

  const mailOptions = {
    from: '"Proyecto Ordenes" <no-reply@demomailtrap.co>',
    to: options.email,
    subject: options.subject,
    text: options.text,
  }
  await transporter.sendMail(mailOptions)
}

export default sendEmail  