import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    order: {
      type: Number,
      default: 0,
    },
  },
  { _id: false },
);

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Psychology",
        "Internship",
        "Parent Training",
        "Teacher Training",
        "Workshop",
        "Other",
      ],
      default: "Other",
    },

    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    duration: {
      type: String,
      trim: true,
    },

    mode: {
      type: String,
      enum: ["Online", "Offline", "Hybrid"],
      default: "Online",
    },

    eligibility: {
      type: String,
      trim: true,
    },

    fees: {
      type: String,
      trim: true,
    },

    startDate: Date,

    modules: {
      type: [moduleSchema],
      default: [],
    },

    image: {
      url: String,
      public_id: String,
    },

    pageTitle: String,
    metaDescription: String,

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
