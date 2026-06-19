import nodemailer from "nodemailer";

const sendMail = async ({ to, subject, html, replyTo }) => {
  try {
    if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
      throw new Error("MAIL_USER or MAIL_PASS is missing");
    }

    if (!to) {
      throw new Error("Receiver email is missing");
    }

    const mailPort = Number(process.env.MAIL_PORT) || 465;

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || "smtp.gmail.com",
      port: mailPort,
      secure: mailPort === 465,
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
  } catch (error) {
    console.log("MAIL SEND ERROR:", error.message);
    throw error;
  }
};

export default sendMail;
