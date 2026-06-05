import mongoose from "mongoose";

const contactEnquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    consultationType: {
      type: String,
      trim: true,
    },

    preferredMode: {
      type: String,
      enum: ["In-clinic at Urjasvini CDC, Indore", "Online Consultation", "Not Sure", ""],
      default: "Not Sure",
    },

    preferredDate: {
      type: String,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["New", "Contacted", "Closed"],
      default: "New",
    },
  },
  { timestamps: true },
);

const ContactEnquiry = mongoose.model("ContactEnquiry", contactEnquirySchema);

export default ContactEnquiry;
