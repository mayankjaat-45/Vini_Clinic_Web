import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
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
        "Autism",
        "ADHD",
        "Dyslexia",
        "Parenting",
        "Child Development",
        "Mental Health",
        "Worksheet",
        "Guide",
        "Other",
      ],
      default: "Other",
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    file: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
      format: String,
      bytes: Number,
    },

    coverImage: {
      url: String,
      public_id: String,
    },

    pageTitle: {
      type: String,
      trim: true,
    },

    metaDescription: {
      type: String,
      trim: true,
    },
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

const Resource = mongoose.model("Resource", resourceSchema);

export default Resource;
