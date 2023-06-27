const routerenviaEmail = require('express').Router()
const nodemailer = require('nodemailer')
const dotenv = require('dotenv');

dotenv.config()

const transport = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });


  routerenviaEmail.post('/', (req, res) => {

    const { name, email, _subject, message } = req.body;

    // Configuração do e-mail a ser enviado
    const mailOptions = {
      from: 'contato.spcegames@outlook.com',
      to: 'contato.spcegames@outlook.com',
      subject: _subject,
      text: `Nome: ${name}\nEmail: ${email}\nMensagem: ${message}`
    };

    
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Erro ao enviar o e-mail');
      } else {
        console.log('E-mail enviado: ' + info.response);
        res.send('E-mail enviado com sucesso');
      }
    });
  })

module.exports = routerenviaEmail