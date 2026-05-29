import cloudinary from "../config/cloudinary.js";
import Resource from "../models/Resource.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

const slugify = (text = "") => {
  return text
    .toLowerCase()
    .replaceAll("&", "and")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
};

// Public
export const getResources = async (req, res) => {
  try {
    const { category } = req.query;

    const query = { isActive: true };

    if (category) query.category = category;

    const resources = await Resource.find(query).sort({
      displayOrder: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: resources.length,
      data: resources,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Public
export const getResourceBySlug = async (req, res) => {
  try {
    const resource = await Resource.findOne({
      slug: req.params.slug,
      isActive: true,
    });

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    res.status(200).json({
      success: true,
      data: resource,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin
export const getAllResourcesAdmin = async (req, res) => {
  try {
    const resources = await Resource.find().sort({
      displayOrder: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: resources.length,
      data: resources,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin
export const createResource = async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      pageTitle,
      metaDescription,
      isFeatured,
      isActive,
      displayOrder,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    if (!req.files?.file?.[0]) {
      return res.status(400).json({
        success: false,
        message: "PDF/resource file is required",
      });
    }

    const slug = slugify(title);

    const existingResource = await Resource.findOne({ slug });

    if (existingResource) {
      return res.status(400).json({
        success: false,
        message: "Resource already exists with this title",
      });
    }

    const uploadedFile = await uploadToCloudinary(
      req.files.file[0].buffer,
      "child-psychologist/resources",
      "raw",
    );

    let coverImage = {};

    if (req.files?.coverImage?.[0]) {
      const uploadedCover = await uploadToCloudinary(
        req.files.coverImage[0].buffer,
        "child-psychologist/resources/covers",
        "image",
      );

      coverImage = {
        url: uploadedCover.secure_url,
        public_id: uploadedCover.public_id,
      };
    }

    const resource = await Resource.create({
      title,
      slug,
      category: category || "Other",
      description,
      file: {
        url: uploadedFile.secure_url,
        public_id: uploadedFile.public_id,
        format: uploadedFile.format,
        bytes: uploadedFile.bytes,
      },
      pageTitle,
      metaDescription,
      coverImage,
      isFeatured: isFeatured === "true" || isFeatured === true,
      isActive: isActive === "false" ? false : true,
      displayOrder: Number(displayOrder) || 0,
    });

    res.status(201).json({
      success: true,
      message: "Resource uploaded successfully",
      data: resource,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin
export const updateResource = async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      pageTitle,
      metaDescription,
      isFeatured,
      isActive,
      displayOrder,
    } = req.body;

    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    if (title && title !== resource.title) {
      const newSlug = slugify(title);

      const existingResource = await Resource.findOne({
        slug: newSlug,
        _id: { $ne: resource._id },
      });

      if (existingResource) {
        return res.status(400).json({
          success: false,
          message: "Another resource already exists with this title",
        });
      }

      resource.title = title;
      resource.slug = newSlug;
    }

    resource.category = category ?? resource.category;
    resource.description = description ?? resource.description;
    resource.pageTitle = pageTitle ?? resource.pageTitle;
    resource.metaDescription = metaDescription ?? resource.metaDescription;

    resource.isFeatured =
      isFeatured !== undefined
        ? isFeatured === "true" || isFeatured === true
        : resource.isFeatured;

    resource.isActive =
      isActive !== undefined
        ? isActive === "false"
          ? false
          : isActive === "true"
            ? true
            : Boolean(isActive)
        : resource.isActive;

    resource.displayOrder =
      displayOrder !== undefined
        ? Number(displayOrder) || 0
        : resource.displayOrder;

    if (req.files?.file?.[0]) {
      if (resource.file?.public_id) {
        await cloudinary.uploader.destroy(resource.file.public_id, {
          resource_type: "raw",
        });
      }

      const uploadedFile = await uploadToCloudinary(
        req.files.file[0].buffer,
        "child-psychologist/resources",
        "raw",
      );

      resource.file = {
        url: uploadedFile.secure_url,
        public_id: uploadedFile.public_id,
        format: uploadedFile.format,
        bytes: uploadedFile.bytes,
      };
    }

    if (req.files?.coverImage?.[0]) {
      if (resource.coverImage?.public_id) {
        await cloudinary.uploader.destroy(resource.coverImage.public_id);
      }

      const uploadedCover = await uploadToCloudinary(
        req.files.coverImage[0].buffer,
        "child-psychologist/resources/covers",
        "image",
      );

      resource.coverImage = {
        url: uploadedCover.secure_url,
        public_id: uploadedCover.public_id,
      };
    }

    await resource.save();

    res.status(200).json({
      success: true,
      message: "Resource updated successfully",
      data: resource,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin
export const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    if (resource.file?.public_id) {
      await cloudinary.uploader.destroy(resource.file.public_id, {
        resource_type: "raw",
      });
    }

    if (resource.coverImage?.public_id) {
      await cloudinary.uploader.destroy(resource.coverImage.public_id);
    }

    await resource.deleteOne();

    res.status(200).json({
      success: true,
      message: "Resource deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
