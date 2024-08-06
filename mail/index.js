const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.MAIL,
        pass: process.env.APP_PASSWORD
    }
  });

module.exports = transporter