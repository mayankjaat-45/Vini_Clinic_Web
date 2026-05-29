import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Clinic",
        "Therapy Room",
        "Events",
        "Workshop",
        "TEDX & Awards",
        "Training",
        "Newspaper",
        "Other",
      ],
      default: "Other",
    },

    description: {
      type: String,
      trim: true,
    },

    image: {
      url: {
        type: String,
        trim: true,
      },
      public_id: {
        type: String,
        trim: true,
      },
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

const Gallery = mongoose.model("Gallery", gallerySchema);

export default Gallery;
