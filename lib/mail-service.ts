var nodemailer = require("nodemailer");

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


export async function sendPasswordResetEmail(toEmail: string, token: string) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_EMAIL_PASSWORD,
    },
  });

  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

  var mailOptions = {
    from: process.env.EMAIL,
    to: toEmail,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset email.</p>`,
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
