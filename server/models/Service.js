import mongoose from "mongoose";

const buttonSchema = new mongoose.Schema(
  {
    text: String,
    link: String,
    type: {
      type: String,
      enum: ["primary", "secondary"],
      default: "primary",
    },
  },
  { _id: false },
);

const heroSchema = new mongoose.Schema(
  {
    headline: String,
    subHeadline: String,
    paragraph: String,
    trustLine: String,
    buttons: {
      type: [buttonSchema],
      default: [],
    },
  },
  { _id: false },
);

const sectionItemSchema = new mongoose.Schema(
  {
    title: String,
    subtitle: String,
    description: String,
    content: String,
    items: {
      type: [String],
      default: [],
    },
    buttonText: String,
    buttonLink: String,
  },
  { _id: false },
);

const faqSchema = new mongoose.Schema(
  {
    question: String,
    answer: String,
  },
  { _id: false },
);

const sectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: String,
    type: {
      type: String,
      enum: [
        "text",
        "cards",
        "steps",
        "faq",
        "quote",
        "tools",
        "story",
        "cta",
        "badges",
        "two-column",
      ],
      default: "text",
    },
    content: String,
    items: {
      type: [sectionItemSchema],
      default: [],
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { _id: false },
);

const serviceSchema = new mongoose.Schema(
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
      required: true,
      trim: true,
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

    points: [
      {
        type: String,
        trim: true,
      },
    ],

    process: [
      {
        type: String,
        trim: true,
      },
    ],

    pageTitle: {
      type: String,
      trim: true,
    },

    metaDescription: {
      type: String,
      trim: true,
    },

    primaryKeywords: {
      type: [String],
      default: [],
    },

    secondaryKeywords: {
      type: [String],
      default: [],
    },

    hero: {
      type: heroSchema,
      default: {},
    },

    sections: {
      type: [sectionSchema],
      default: [],
    },

    faqs: {
      type: [faqSchema],
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

const Service = mongoose.model("Service", serviceSchema);

export default Service;
