import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async ({ to, subject, html, replyTo }) => {
  try {
    const response = await resend.emails.send({
      from: "Dr. Vini Jhariya <hello@thechildpsychologist.in>",
      to,
      subject,
      html,
      replyTo,
    });

    console.log("RESEND SUCCESS:", response);

    return response;
  } catch (error) {
    console.error("RESEND ERROR:", error);
    throw error;
  }
};

export default sendMail;
