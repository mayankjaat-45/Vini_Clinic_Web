import nodemailer from "nodemailer";

const sendMail = async ({ to, subject, html, replyTo }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT) || 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Dr. Vini Website" <${process.env.MAIL_USER}>`,
    to,
    subject,
    html,
    replyTo: replyTo || process.env.MAIL_USER,
  });
};

export default sendMail;
