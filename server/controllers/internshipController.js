import cloudinary from "../config/cloudinary.js";
import InternshipApplication from "../models/InternshipApplication.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

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

    res.status(201).json({
      success: true,
      message: "Internship application submitted successfully",
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
