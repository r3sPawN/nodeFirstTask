import nodemailer from "nodemailer";

export async function sendEmail(emailAddress, weatherInfo) {
    if (emailAddress) {
        let transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          auth: {
            user: "einar.kessler26@ethereal.email",
            pass: "gwzMhp5B4VtVUZubhF",
          },
        });
      
        let info = await transporter.sendMail({
          from: "<einar.kessler26@ethereal.email>", // sender address
          to: `${emailAddress}`, // list of receivers
          subject: "Hello ✔", // Subject line
          text: `${weatherInfo}`, // plain text body
          html: `${weatherInfo}`, // html body
        });
        console.log("Message sent: %s", info.messageId);
      
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      }else {
        console.log("No email address was provided");
      }
}