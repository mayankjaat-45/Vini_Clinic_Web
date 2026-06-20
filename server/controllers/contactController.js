import ContactEnquiry from "../models/ContactEnquiry.js";
import sendMail from "../utils/sendMail.js";

// Public: Create Contact Enquiry
export const createContactEnquiry = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      consultationType,
      preferredMode,
      preferredDate,
      message,
    } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, phone and message are required",
      });
    }

    const enquiry = await ContactEnquiry.create({
      name,
      phone,
      email,
      consultationType,
      preferredMode: preferredMode || "Not Sure",
      preferredDate,
      message,
    });

    const viniMailHtml = `
      <div style="font-family: Arial, sans-serif; background:#f6f9fb; padding:24px;">
        <div style="max-width:650px; margin:auto; background:#ffffff; border-radius:14px; overflow:hidden; border:1px solid #e5e7eb;">
          
          <div style="background:#0F3D5E; color:#ffffff; padding:20px 24px;">
            <h2 style="margin:0;">New Contact Enquiry</h2>
            <p style="margin:6px 0 0;">Received from Dr. Vini Jhariya website</p>
          </div>

          <div style="padding:24px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email || "Not provided"}</p>
            <p><strong>Consultation Type:</strong> ${
              consultationType || "Not provided"
            }</p>
            <p><strong>Preferred Mode:</strong> ${
              preferredMode || "Not Sure"
            }</p>
            <p><strong>Preferred Time / Date:</strong> ${
              preferredDate || "Not provided"
            }</p>

            <hr style="border:none; border-top:1px solid #e5e7eb; margin:20px 0;" />

            <p><strong>Message:</strong></p>
            <p style="white-space:pre-line; line-height:1.7;">${message}</p>

            <div style="margin-top:24px; padding:16px; background:#E9F8F6; border-radius:12px;">
              <p style="margin:0; color:#0F766E; font-weight:bold;">
                Please contact this enquiry as soon as possible.
              </p>
            </div>
          </div>
        </div>
      </div>
    `;

    const userMailHtml = `
      <div style="font-family: Arial, sans-serif; background:#f6f9fb; padding:24px;">
        <div style="max-width:650px; margin:auto; background:#ffffff; border-radius:14px; overflow:hidden; border:1px solid #e5e7eb;">
          
          <div style="background:#0F3D5E; color:#ffffff; padding:20px 24px;">
            <h2 style="margin:0;">Thank you for contacting Dr. Vini Jhariya</h2>
          </div>

          <div style="padding:24px;">
            <p>Dear ${name},</p>

            <p style="line-height:1.7;">
              Thank you for reaching out. We have received your enquiry successfully.
              Our team will contact you soon.
            </p>

            <p><strong>Your submitted details:</strong></p>

            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email || "Not provided"}</p>
            <p><strong>Consultation Type:</strong> ${
              consultationType || "Not provided"
            }</p>
            <p><strong>Preferred Mode:</strong> ${
              preferredMode || "Not Sure"
            }</p>
            <p><strong>Preferred Time / Date:</strong> ${
              preferredDate || "Not provided"
            }</p>

            <hr style="border:none; border-top:1px solid #e5e7eb; margin:20px 0;" />

            <p><strong>Your Message:</strong></p>
            <p style="white-space:pre-line; line-height:1.7;">${message}</p>

            <div style="margin-top:24px; padding:16px; background:#E9F8F6; border-radius:12px;">
              <p style="margin:0; color:#0F766E; font-weight:bold;">
                For urgent support, you can WhatsApp us at +91 7999215093.
              </p>
            </div>

            <p style="margin-top:24px;">
              Regards,<br/>
              <strong>Dr. Vini Jhariya Team</strong><br/>
              Urjasvini Child Development Centre, Indore
            </p>
          </div>
        </div>
      </div>
    `;

    let clientMailSent = false;
    let userMailSent = false;

    try {
      if (!process.env.CLIENT_MAIL) {
        console.log("CLIENT_MAIL is missing in environment variables");
      } else {
        console.log(
          "Sending contact enquiry mail to client:",
          process.env.CLIENT_MAIL,
        );

        await sendMail({
          to: process.env.CLIENT_MAIL,
          subject: `New Contact Enquiry from ${name}`,
          html: viniMailHtml,
          replyTo: email || process.env.MAIL_USER,
        });

        clientMailSent = true;
        console.log("Client contact enquiry mail sent successfully");
      }

      if (email) {
        console.log("Sending confirmation mail to user:", email);

        await sendMail({
          to: email,
          subject: "We received your enquiry - Dr. Vini Jhariya",
          html: userMailHtml,
        });

        userMailSent = true;
        console.log("User confirmation mail sent successfully");
      }
    } catch (mailError) {
      console.log("Contact enquiry mail sending error:", mailError.message);
    }

    return res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      mailStatus: {
        clientMailSent,
        userMailSent,
      },
      data: enquiry,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin: Get All Enquiries
export const getContactEnquiries = async (req, res) => {
  try {
    const enquiries = await ContactEnquiry.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin: Get Single Contact Enquiry
export const getContactEnquiryById = async (req, res) => {
  try {
    const enquiry = await ContactEnquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin: Update Enquiry Status
export const updateContactEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatus = ["New", "Contacted", "Closed"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const enquiry = await ContactEnquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true },
    );

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: enquiry,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin: Delete Enquiry
export const deleteContactEnquiry = async (req, res) => {
  try {
    const enquiry = await ContactEnquiry.findByIdAndDelete(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
