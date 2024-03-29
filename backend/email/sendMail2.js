const nodemailer = require("nodemailer");

const sendEmail2 = async (messageContent, patientMail) => {
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
      to: patientMail,
      subject: "Confirmation: Your Consultation Request has been Forwarded",
      html: messageContent,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        reject(error.message);
      } else {
        resolve("Email sent to Patient");
      }
    });
  });
};

module.exports = sendEmail2;
