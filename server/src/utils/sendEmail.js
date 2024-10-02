const nodemailer = require('nodemailer')

const sendEmail = async (user, message) => {
  const { email } = user
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // use false for STARTTLS; true for SSL on port 465
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  })

  const mailOptions = {
    from: `MedTrust <${process.env.NODEMAILER_EMAIL}>`,
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
