const nodemailer = require("nodemailer");

exports.sendMail = async (email, code) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your SignUp Verification Code",
      text: `Your verification code is ${code}. It will expire in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    res.status(500).json({message: "Failed to send email"});
  }
};
