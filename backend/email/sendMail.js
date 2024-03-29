const nodemailer = require("nodemailer");

const sendEmail = async (messageContent, doctorMail) => {
  return new Promise(async (resolve, reject) => {
    const transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: doctorMail,
      subject: "You Have Pending Appointment Request!",
      html: messageContent,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        reject(error.message);
      } else {
        resolve("Email sent: " + info.response);
      }
    });
  });
};

module.exports = sendEmail;
