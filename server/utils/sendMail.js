import nodemailer from "nodemailer";

const sendMail = async ({ to, subject, html, replyTo }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST || "smtp.gmail.com",
    port: Number(process.env.MAIL_PORT) || 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `"Dr. Vini Website" <${process.env.MAIL_USER}>`,
    to,
    subject,
    html,
    replyTo: replyTo || process.env.MAIL_USER,
  });

  console.log("Mail sent:", info.messageId);

  return info;
};

export default sendMail;
