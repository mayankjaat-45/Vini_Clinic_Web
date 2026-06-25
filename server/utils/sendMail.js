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

    console.log("MAIL CONFIG", {
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      user: process.env.MAIL_USER,
      hasPass: !!process.env.MAIL_PASS,
    });
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    console.log("Checking SMTP connection...");
    await transporter.verify();
    console.log("SMTP VERIFIED");

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
    console.error("MAIL SEND ERROR FULL:", error);
    throw error;
  }
};

export default sendMail;
