import nodemailer from 'nodemailer';
import mailConfig from '../config/mail.js';

async function createNewUser_email(to) {
  try {
    const config = await mailConfig();

    const transporter = nodemailer.createTransport(config);

    const info = await transporter.sendMail({
      from: 'noreplay@email.com',
      to,
      subject: 'Conta criada no CatNews',
      text: `Conta criada com sucesso.\n\nAcesse o aplicativo para acessar a página de clínicas.`,
      html: `<h1>Conta criada com sucesso.</h1><p>Acesse o aplicativo para acessar a página de clínicas.</p>`,
    });

    if (process.env.NODE_ENV === 'development') {
      console.log(`Send email: ${nodemailer.getTestMessageUrl(info)}`);
    }
  } catch (err) {
    throw new Error(err);
  }
}

async function createNewUser_clinic(to) {
  try {
    const config = await mailConfig();

    const transporter = nodemailer.createTransport(config);

    const info = await transporter.sendMail({
      from: 'noreplay@email.com',
      to,
      subject: 'Clínica cadastrada com sucesso',
      text: `Clínica cadastrada com sucesso.\n\nAcesse o aplicativo para acessar a página de clínicas.`,
      html: `<h1>Clínica cadastrada com sucesso.</h1><p>Acesse o aplicativo para acessar a página de clínicas.</p>`,
    });

    if (process.env.NODE_ENV === 'development') {
      console.log(`Send email: ${nodemailer.getTestMessageUrl(info)}`);
    }
  } catch (err) {
    throw new Error(err);
  }
}

export default { createNewUser_email, createNewUser_clinic };