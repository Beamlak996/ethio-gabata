var nodemailer = require("nodemailer");

export async function sendMail(toEmail: string, inviteKey: number) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_EMAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.EMAIL,
    to: toEmail,
    subject: "Welcome to Ethio Gabata",
    text: `Click Here`,
  };

  const sendMessage = async () => {
    await transporter.sendMail(mailOptions, function (error: any, info: any) {
      if (error) {
        throw new Error(error);
      } else {
        return true;
      }
    });
  };

  await sendMessage();
}


export async function sendVerificationEmail(toEmail: string, token: string) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_EMAIL_PASSWORD,
    },
  });

  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  var mailOptions = {
    from: process.env.EMAIL,
    to: toEmail,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  };

  const sendMessage = async () => {
    await transporter.sendMail(mailOptions, function (error: any, info: any) {
      if (error) {
        throw new Error(error);
      } else {
        return true;
      }
    });
  };

  await sendMessage();
}
