import Gallery from "../models/Gallery.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import cloudinary from "../config/cloudinary.js";

// Public
export const getGalleryImage = async (req, res) => {
  try {
    const { category } = req.query;

    const query = { isActive: true };

    if (category && category !== "All") {
      query.category = category;
    }

    const images = await Gallery.find(query).sort({
      displayOrder: -1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: images.length,
      data: images,
    });
  } catch (error) {
    console.log("GET GALLERY ERROR:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin
export const getAllGalleryImagesAdmin = async (req, res) => {
  try {
    const images = await Gallery.find({}).sort({
      displayOrder: -1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: images.length,
      data: images,
    });
  } catch (error) {
    console.log("GET ADMIN GALLERY ERROR:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin
export const createGalleryImages = async (req, res) => {
  try {
    const { title, category, description, isFeatured, isActive, displayOrder } =
      req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const uploadedImage = await uploadToCloudinary(
      req.file.buffer,
      "child-psychologist/gallery",
    );

    const galleryImage = await Gallery.create({
      title: title.trim(),
      category: category || "Other",
      description: description || "",
      image: {
        url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
      },
      isFeatured: isFeatured === "true" || isFeatured === true,
      isActive: isActive === "false" ? false : true,
      displayOrder: Number(displayOrder) || 0,
    });

    res.status(201).json({
      success: true,
      message: "Gallery image uploaded successfully",
      data: galleryImage,
    });
  } catch (error) {
    console.log("CREATE GALLERY ERROR:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin
export const updatedGalleryImage = async (req, res) => {
  try {
    const { title, category, description, isFeatured, isActive, displayOrder } =
      req.body;

    const galleryImage = await Gallery.findById(req.params.id);

    if (!galleryImage) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found",
      });
    }

    if (title !== undefined) {
      galleryImage.title = title.trim();
    }

    if (category !== undefined) {
      galleryImage.category = category;
    }

    if (description !== undefined) {
      galleryImage.description = description;
    }

    if (isFeatured !== undefined) {
      galleryImage.isFeatured = isFeatured === "true" || isFeatured === true;
    }

    if (isActive !== undefined) {
      galleryImage.isActive = isActive === "true" || isActive === true;
    }

    if (displayOrder !== undefined) {
      galleryImage.displayOrder = Number(displayOrder) || 0;
    }

    if (req.file) {
      if (galleryImage.image?.public_id) {
        await cloudinary.uploader.destroy(galleryImage.image.public_id);
      }

      const uploadedImage = await uploadToCloudinary(
        req.file.buffer,
        "child-psychologist/gallery",
      );

      galleryImage.image = {
        url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
      };
    }

    await galleryImage.save();

    res.status(200).json({
      success: true,
      message: "Gallery image updated successfully",
      data: galleryImage,
    });
  } catch (error) {
    console.log("UPDATE GALLERY ERROR:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin
export const deleteGalleryImage = async (req, res) => {
  try {
    const galleryImage = await Gallery.findById(req.params.id);

    if (!galleryImage) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found",
      });
    }

    if (galleryImage.image?.public_id) {
      await cloudinary.uploader.destroy(galleryImage.image.public_id);
    }

    await galleryImage.deleteOne();

    res.status(200).json({
      success: true,
      message: "Gallery image deleted successfully",
    });
  } catch (error) {
    console.log("DELETE GALLERY ERROR:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
