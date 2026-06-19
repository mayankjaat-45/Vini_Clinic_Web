import cloudinary from "../config/cloudinary.js";
import InternshipApplication from "../models/InternshipApplication.js";
import sendMail from "../utils/sendMail.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

// Public
// Public
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

    console.log("MAIL ENV CHECK:", {
      MAIL_HOST: process.env.MAIL_HOST,
      MAIL_PORT: process.env.MAIL_PORT,
      MAIL_USER: process.env.MAIL_USER,
      CLIENT_MAIL: process.env.CLIENT_MAIL,
      HAS_MAIL_PASS: Boolean(process.env.MAIL_PASS),
    });

    const adminMailHtml = `
      <div style="font-family: Arial, sans-serif; background:#f6f9fc; padding:20px;">
        <div style="max-width:650px; margin:auto; background:#ffffff; border-radius:12px; padding:24px; border:1px solid #e5e7eb;">
          
          <h2 style="color:#0F3D5E; margin-top:0;">
            New Internship Application
          </h2>

          <p style="font-size:15px; color:#334155;">
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
              <td style="padding:10px; border-bottom:1px solid #e5e7eb;">${city || "Not provided"}</td>
            </tr>

            <tr>
              <td style="padding:10px; font-weight:bold; border-bottom:1px solid #e5e7eb;">Qualification</td>
              <td style="padding:10px; border-bottom:1px solid #e5e7eb;">${qualification}</td>
            </tr>

            <tr>
              <td style="padding:10px; font-weight:bold; border-bottom:1px solid #e5e7eb;">College / University</td>
              <td style="padding:10px; border-bottom:1px solid #e5e7eb;">${college || "Not provided"}</td>
            </tr>

            <tr>
              <td style="padding:10px; font-weight:bold; border-bottom:1px solid #e5e7eb;">Internship Category</td>
              <td style="padding:10px; border-bottom:1px solid #e5e7eb;">${programInterested || "Not Sure"}</td>
            </tr>

            <tr>
              <td style="padding:10px; font-weight:bold; border-bottom:1px solid #e5e7eb;">Preferred Format</td>
              <td style="padding:10px; border-bottom:1px solid #e5e7eb;">${preferredMode || "Not Sure"}</td>
            </tr>

            <tr>
              <td style="padding:10px; font-weight:bold; border-bottom:1px solid #e5e7eb;">Preferred Duration</td>
              <td style="padding:10px; border-bottom:1px solid #e5e7eb;">${duration || "Not provided"}</td>
            </tr>

            <tr>
              <td style="padding:10px; font-weight:bold; border-bottom:1px solid #e5e7eb;">Message</td>
              <td style="padding:10px; border-bottom:1px solid #e5e7eb;">${message || "Not provided"}</td>
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

          <p style="margin-top:24px; font-size:13px; color:#64748b;">
            This application was submitted from the Urjasvini CDC website internship form.
          </p>

        </div>
      </div>
    `;

    const studentMailHtml = `
      <div style="font-family: Arial, sans-serif; background:#f6f9fc; padding:20px;">
        <div style="max-width:650px; margin:auto; background:#ffffff; border-radius:12px; padding:24px; border:1px solid #e5e7eb;">
          
          <h2 style="color:#0F3D5E; margin-top:0;">
            Thank you for applying, ${fullName}
          </h2>

          <p style="font-size:15px; color:#334155; line-height:1.7;">
            We have received your internship application at Urjasvini Child Development Centre.
          </p>

          <p style="font-size:15px; color:#334155; line-height:1.7;">
            Our team will review your details and contact you shortly regarding the internship structure, fee details, documentation requirements, and next steps.
          </p>

          <div style="background:#E9F8F6; border-radius:12px; padding:16px; margin-top:20px;">
            <p style="margin:0; font-size:14px; color:#0F3D5E;">
              <strong>Applied Category:</strong> ${programInterested || "Not Sure"}
            </p>
            <p style="margin:8px 0 0; font-size:14px; color:#0F3D5E;">
              <strong>Preferred Format:</strong> ${preferredMode || "Not Sure"}
            </p>
            <p style="margin:8px 0 0; font-size:14px; color:#0F3D5E;">
              <strong>Qualification:</strong> ${qualification}
            </p>
          </div>

          <p style="font-size:15px; color:#334155; line-height:1.7; margin-top:20px;">
            For urgent queries, you can contact us on WhatsApp:
            <strong>+91 7999215093</strong>
          </p>

          <p style="margin-top:24px; font-size:14px; color:#64748b;">
            Regards,<br/>
            Team Urjasvini CDC
          </p>

        </div>
      </div>
    `;

    const mailResults = await Promise.allSettled([
      sendMail({
        to: process.env.CLIENT_MAIL,
        subject: "New Internship Application Received",
        html: adminMailHtml,
        replyTo: email,
      }),

      sendMail({
        to: email,
        subject: "Your Internship Application Has Been Received",
        html: studentMailHtml,
      }),
    ]);

    console.log("INTERNSHIP MAIL RESULTS:", mailResults);

    res.status(201).json({
      success: true,
      message: "Internship application submitted successfully",
      data: application,
      mailStatus: mailResults.map((result) => ({
        status: result.status,
        reason: result.reason?.message || null,
      })),
    });
  } catch (error) {
    console.log("INTERNSHIP APPLICATION ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin
export const getAllInternshipApplications = async (req, res) => {
  try {
    const applications = await InternshipApplication.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin
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

    res.status(200).json({
      success: true,
      message: "Application updated successfully",
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin
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

    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
