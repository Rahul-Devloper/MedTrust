const nodemailer = require('nodemailer')

const sendOTPEmail = async (email, otp) => {
  // const transporter = nodemailer.createTransport({
  //   host: 'sandbox.smtp.mailtrap.io',
  //   port: 2525,
  //   auth: {
  //     user: 'e9498c2661df56',
  //     pass: '0f4933f2b27d54',
  //   },
  //   secure: false,
  // })
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false, // use false for STARTTLS; true for SSL on port 465
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  })

  const mailOptions = {
    from: `medtrust <rameshrahul26@gmail.com>`,
    to: email,
    subject: 'Your OTP Code',
    html: `<p>Hello,</p>
  <p>Your MedTrust OTP code is <strong>${otp}</strong>.</p>
  <p>This code is valid for 10 minutes. Please do not share it with anyone.</p>
  <br/>
  <p>Thanks,<br/>MedTrust Team</p>`,
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('Error:', error)
    } else {
      console.log('Email sent: ', info.response)
    }
  })
}

module.exports = sendOTPEmail
