const nodemailer = require('nodemailer')

const sendOTPEmail = async (email, otp) => {

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
    from: `medtrust <rameshrahul26@gmail.com>`,
    to: email,
    subject: 'Your OTP Code',
    html: `<p>Hello,</p>
      <p>Your MedTrust OTP code is <strong>${otp}</strong>.</p>
      <p>This code is valid for 10 minutes. Please do not share it with anyone.</p>
      <p><small>Sent at: ${new Date().toISOString()}</small></p>
      <br/>
      <p>Thanks,<br/>MedTrust Team</p>`,
  }

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      // sendMail is an async function, hence using Promise to handle it for awaiting the response
      if (error) {
        console.error('OTP Email Error:', error)
        return reject(error)
      }
      console.log(
        `OTP "${otp}" sent to ${email} at ${new Date().toISOString()}`
      )
      return resolve(info)
    })
  })
}

module.exports = sendOTPEmail
