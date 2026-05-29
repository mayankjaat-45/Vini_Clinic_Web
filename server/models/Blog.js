import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
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
        "Teen Mental Health",
        "Child Behaviour",
        "School & Exams",
        "Adult Mental Health",
        "General",
      ],
      default: "General",
    },

    language: {
      type: String,
      enum: ["English", "Hindi", "Hinglish"],
      default: "English",
    },

    author: {
      type: String,
      default: "Dr. Vini Jhariya",
    },

    seoTitle: {
      type: String,
      trim: true,
    },

    metaTitle: {
      type: String,
      trim: true,
    },

    pageTitle: {
      type: String,
      trim: true,
    },

    metaDescription: {
      type: String,
      trim: true,
    },

    focusKeyword: {
      type: String,
      trim: true,
    },

    secondaryKeywords: {
      type: [String],
      default: [],
    },

    schemaType: {
      type: String,
      trim: true,
    },

    faqSchema: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    excerpt: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      trim: true,
      required: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    image: {
      url: String,
      public_id: String,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },

    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
