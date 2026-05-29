import mongoose from "mongoose";

const internshipApplicationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      trim: true,
    },

    qualification: {
      type: String,
      required: true,
      trim: true,
    },

    college: {
      type: String,
      trim: true,
    },

    programInterested: {
      type: String,
      enum: [
        "Child Psychology Internship",
        "Clinical Psychology Internship",
        "School Psychology Internship",
        "Special Education Internship",
        "Not Sure",
      ],
      default: "Not Sure",
    },

    preferredMode: {
      type: String,
      enum: ["Online", "Offline", "Hybrid", "Not Sure"],
      default: "Not Sure",
    },

    duration: {
      type: String,
      trim: true,
    },

    message: {
      type: String,
      trim: true,
    },

    resume: {
      url: String,
      public_id: String,
    },

    status: {
      type: String,
      enum: ["New", "Reviewed", "Shortlisted", "Rejected"],
      default: "New",
    },

    adminNote: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

const InternshipApplication = mongoose.model(
  "InternshipApplication",
  internshipApplicationSchema,
);

export default InternshipApplication;
