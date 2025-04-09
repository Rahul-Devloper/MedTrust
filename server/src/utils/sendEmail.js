const nodemailer = require('nodemailer')

const sendEmail = async (user, message) => {
  const { email } = user
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false, // use false for STARTTLS
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  })

  const mailOptions = {
    from: `MedTrust <rameshrahul26@gmail.com>`,
    to: email,
    subject: 'MedTrust Review Notification',
    html: `Hi ${user.name}, </br> ${message}`,
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('Error:', error)
    } else {
      console.log('Email sent: ', info.response)
    }
  })
}

module.exports = sendEmail
