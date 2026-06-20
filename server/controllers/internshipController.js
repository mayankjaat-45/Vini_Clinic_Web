import cloudinary from "../config/cloudinary.js";
import InternshipApplication from "../models/InternshipApplication.js";
import sendMail from "../utils/sendMail.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

// Public: Create Internship Application
export const createInternshipApplication = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      city,
      qualification,
      college,
      programInterested,
      preferredMode,
      duration,
      message,
    } = req.body;

    if (!fullName || !email || !phone || !qualification) {
      return res.status(400).json({
        success: false,
        message: "Full name, email, phone and qualification are required",
      });
    }

    let resume = {};

    if (req.file) {
      const uploadedResume = await uploadToCloudinary(
        req.file.buffer,
        "child-psychologist/internship-resumes",
        "raw",
      );

      resume = {
        url: uploadedResume.secure_url,
        public_id: uploadedResume.public_id,
      };
    }

    const application = await InternshipApplication.create({
      fullName,
      email,
      phone,
      city,
      qualification,
      college,
      programInterested: programInterested || "Not Sure",
      preferredMode: preferredMode || "Not Sure",
      duration,
      message,
      resume,
    });

    console.log("INTERNSHIP APPLICATION SAVED:", application._id);

    console.log("MAIL ENV CHECK:", {
      MAIL_HOST: process.env.MAIL_HOST,
      MAIL_PORT: process.env.MAIL_PORT,
      MAIL_USER: process.env.MAIL_USER,
      CLIENT_MAIL: process.env.CLIENT_MAIL,
      HAS_MAIL_PASS: Boolean(process.env.MAIL_PASS),
    });

    const adminMailHtml = `
      <div style="font-family: Arial, sans-serif; background:#f6f9fc; padding:24px;">
        <div style="max-width:650px; margin:auto; background:#ffffff; border-radius:14px; overflow:hidden; border:1px solid #e5e7eb;">
          
          <div style="background:#0F3D5E; color:#ffffff; padding:20px 24px;">
            <h2 style="margin:0;">New Internship Application</h2>
            <p style="margin:6px 0 0;">Received from Dr. Vini Jhariya website</p>
          </div>

          <div style="padding:24px;">
            <p style="font-size:15px; color:#334155; line-height:1.7;">
              A new student has submitted an internship application from the website.
            </p>

            <table style="width:100%; border-collapse:collapse; margin-top:20px;">
              <tr>
                <td style="padding:10px; font-weight:bold; border-bottom:1px solid #e5e7eb;">Full Name</td>
                <td style="padding:10px; border-bottom:1px solid #e5e7eb;">${fullName}</td>
              </tr>

              <tr>
                <td style="padding:10px; font-weight:bold; border-bottom:1px solid #e5e7eb;">Email</td>
                <td style="padding:10px; border-bottom:1px solid #e5e7eb;">${email}</td>
              </tr>

              <tr>
                <td style="padding:10px; font-weight:bold; border-bottom:1px solid #e5e7eb;">Phone</td>
                <td style="padding:10px; border-bottom:1px solid #e5e7eb;">${phone}</td>
              </tr>

              <tr>
                <td style="padding:10px; font-weight:bold; border-bottom:1px solid #e5e7eb;">City</td>
                <td style="padding:10px; border-bottom:1px solid #e5e7eb;">${
                  city || "Not provided"
                }</td>
              </tr>

              <tr>
                <td style="padding:10px; font-weight:bold; border-bottom:1px solid #e5e7eb;">Qualification</td>
                <td style="padding:10px; border-bottom:1px solid #e5e7eb;">${qualification}</td>
              </tr>

              <tr>
                <td style="padding:10px; font-weight:bold; border-bottom:1px solid #e5e7eb;">College / University</td>
                <td style="padding:10px; border-bottom:1px solid #e5e7eb;">${
                  college || "Not provided"
                }</td>
              </tr>

              <tr>
                <td style="padding:10px; font-weight:bold; border-bottom:1px solid #e5e7eb;">Internship Category</td>
                <td style="padding:10px; border-bottom:1px solid #e5e7eb;">${
                  programInterested || "Not Sure"
                }</td>
              </tr>

              <tr>
                <td style="padding:10px; font-weight:bold; border-bottom:1px solid #e5e7eb;">Preferred Format</td>
                <td style="padding:10px; border-bottom:1px solid #e5e7eb;">${
                  preferredMode || "Not Sure"
                }</td>
              </tr>

              <tr>
                <td style="padding:10px; font-weight:bold; border-bottom:1px solid #e5e7eb;">Preferred Duration</td>
                <td style="padding:10px; border-bottom:1px solid #e5e7eb;">${
                  duration || "Not provided"
                }</td>
              </tr>

              <tr>
                <td style="padding:10px; font-weight:bold; border-bottom:1px solid #e5e7eb;">Message</td>
                <td style="padding:10px; border-bottom:1px solid #e5e7eb;">${
                  message || "Not provided"
                }</td>
              </tr>

              <tr>
                <td style="padding:10px; font-weight:bold;">Resume</td>
                <td style="padding:10px;">
                  ${
                    resume?.url
                      ? `<a href="${resume.url}" target="_blank" style="color:#0F766E; font-weight:bold;">View Resume</a>`
                      : "No resume uploaded"
                  }
                </td>
              </tr>
            </table>

            <div style="margin-top:24px; padding:16px; background:#E9F8F6; border-radius:12px;">
              <p style="margin:0; color:#0F766E; font-weight:bold;">
                Please review this internship application as soon as possible.
              </p>
            </div>
          </div>
        </div>
      </div>
    `;

    const studentMailHtml = `
      <div style="font-family: Arial, sans-serif; background:#f6f9fc; padding:24px;">
        <div style="max-width:650px; margin:auto; background:#ffffff; border-radius:14px; overflow:hidden; border:1px solid #e5e7eb;">
          
          <div style="background:#0F3D5E; color:#ffffff; padding:20px 24px;">
            <h2 style="margin:0;">Thank you for applying, ${fullName}</h2>
          </div>

          <div style="padding:24px;">
            <p style="font-size:15px; color:#334155; line-height:1.7;">
              We have received your internship application at Urjasvini Child Development Centre.
            </p>

            <p style="font-size:15px; color:#334155; line-height:1.7;">
              Our team will review your details and contact you shortly regarding internship structure, fee details, documentation requirements, and next steps.
            </p>

            <p><strong>Your submitted details:</strong></p>

            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>City:</strong> ${city || "Not provided"}</p>
            <p><strong>Qualification:</strong> ${qualification}</p>
            <p><strong>College:</strong> ${college || "Not provided"}</p>
            <p><strong>Applied Category:</strong> ${
              programInterested || "Not Sure"
            }</p>
            <p><strong>Preferred Format:</strong> ${
              preferredMode || "Not Sure"
            }</p>
            <p><strong>Preferred Duration:</strong> ${
              duration || "Not provided"
            }</p>

            <hr style="border:none; border-top:1px solid #e5e7eb; margin:20px 0;" />

            <p><strong>Your Message:</strong></p>
            <p style="white-space:pre-line; line-height:1.7;">${
              message || "Not provided"
            }</p>

            <div style="margin-top:24px; padding:16px; background:#E9F8F6; border-radius:12px;">
              <p style="margin:0; color:#0F766E; font-weight:bold;">
                For urgent queries, you can WhatsApp us at +91 7999215093.
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
          "Sending internship application mail to client:",
          process.env.CLIENT_MAIL,
        );

        await sendMail({
          to: process.env.CLIENT_MAIL,
          subject: `New Internship Application from ${fullName}`,
          html: adminMailHtml,
          replyTo: email || process.env.MAIL_USER,
        });

        clientMailSent = true;
        console.log("Client internship mail sent successfully");
      }

      if (email) {
        console.log("Sending internship confirmation mail to student:", email);

        await sendMail({
          to: email,
          subject: "Your Internship Application Has Been Received",
          html: studentMailHtml,
        });

        userMailSent = true;
        console.log("Student confirmation mail sent successfully");
      }
    } catch (mailError) {
      console.log("Internship mail sending error:", mailError.message);
    }

    return res.status(201).json({
      success: true,
      message: "Internship application submitted successfully",
      mailStatus: {
        clientMailSent,
        userMailSent,
      },
      data: application,
    });
  } catch (error) {
    console.log("INTERNSHIP APPLICATION ERROR:", error);

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

// Admin: Get All Internship Applications
export const getAllInternshipApplications = async (req, res) => {
  try {
    const applications = await InternshipApplication.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin: Update Internship Application Status
export const updateInternshipApplicationStatus = async (req, res) => {
  try {
    const { status, adminNote } = req.body;

    const application = await InternshipApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (status) application.status = status;
    if (adminNote !== undefined) application.adminNote = adminNote;

    await application.save();

    return res.status(200).json({
      success: true,
      message: "Application updated successfully",
      data: application,
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

// Admin: Delete Internship Application
export const deleteInternshipApplication = async (req, res) => {
  try {
    const application = await InternshipApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (application.resume?.public_id) {
      await cloudinary.uploader.destroy(application.resume.public_id, {
        resource_type: "raw",
      });
    }

    await application.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
