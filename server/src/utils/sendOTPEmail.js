const nodemailer = require('nodemailer')

const sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'e9498c2661df56',
      pass: '0f4933f2b27d54',
    },
    secure: false,
  })

  const mailOptions = {
    from: `MedTrust <${process.env.NODEMAILER_EMAIL}>`,
    to: email,
    subject: 'Your OTP Code',
    html: `Hi, </br> Your OTP code is ${otp}. This code will expire in 10 minutes.`,
  }

  await transporter.sendMail(mailOptions)
}

module.exports = sendOTPEmail
