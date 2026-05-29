import cloudinary from "../config/cloudinary.js";
import Service from "../models/Service.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

const slugify = (text = "") => {
  return text
    .toLowerCase()
    .replaceAll("&", "and")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
};

const parseArray = (value) => {
  if (!value) return [];

  if (Array.isArray(value)) return value;

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    if (typeof value === "string") {
      return value
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    return [];
  }
};

const parseObject = (value) => {
  if (!value) return {};

  if (typeof value === "object" && !Array.isArray(value)) return value;

  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
};

// Public: Get active services
export const getServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({
      displayOrder: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin: Get all services
export const getAllServicesAdmin = async (req, res) => {
  try {
    const services = await Service.find().sort({
      displayOrder: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Public: Get service by slug
export const getServiceBySlug = async (req, res) => {
  try {
    const service = await Service.findOne({
      slug: req.params.slug,
      isActive: true,
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin: Create service
export const createService = async (req, res) => {
  try {
    const {
      title,
      category,
      pageTitle,
      metaDescription,
      primaryKeywords,
      secondaryKeywords,
      shortDescription,
      description,
      hero,
      sections,
      points,
      process,
      faqs,
      isFeatured,
      isActive,
      displayOrder,
    } = req.body;

    if (!title || !category || !shortDescription || !description) {
      return res.status(400).json({
        success: false,
        message:
          "Title, category, short description and description are required",
      });
    }

    const slug = slugify(title);

    const existingService = await Service.findOne({ slug });

    if (existingService) {
      return res.status(400).json({
        success: false,
        message: "Service already exists with this title",
      });
    }

    //image
    let image = {};
    if (req.file) {
      const uploadedImage = await uploadToCloudinary(
        req.file.buffer,
        "child-psychologist/services",
      );

      image = {
        url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
      };
    }

    const service = await Service.create({
      title,
      slug,
      category,
      pageTitle,
      metaDescription,
      primaryKeywords: parseArray(primaryKeywords),
      secondaryKeywords: parseArray(secondaryKeywords),
      shortDescription,
      description,
      hero: {
        headline: parseObject(hero)?.headline || title,
        subHeadline: parseObject(hero)?.subHeadline || "",
        paragraph: parseObject(hero)?.paragraph || description,
        trustLine: parseObject(hero)?.trustLine || "",
        buttons: parseArray(parseObject(hero)?.buttons),
      },

      points: parseArray(points),
      process: parseArray(process),
      sections: parseArray(sections),
      faqs: parseArray(faqs),

      image,
      isFeatured: isFeatured === "true" || isFeatured === true,
      isActive: isActive === "false" ? false : (isActive ?? true),
      displayOrder: Number(displayOrder) || 0,
    });

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin: Update service
// Admin: Update service
export const updateService = async (req, res) => {
  try {
    const {
      title,
      category,
      pageTitle,
      metaDescription,
      primaryKeywords,
      secondaryKeywords,
      shortDescription,
      description,
      hero,
      sections,
      points,
      process,
      faqs,
      isFeatured,
      isActive,
      displayOrder,
    } = req.body;

    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    if (title && title !== service.title) {
      const newSlug = slugify(title);

      const existingService = await Service.findOne({
        slug: newSlug,
        _id: { $ne: service._id },
      });

      if (existingService) {
        return res.status(400).json({
          success: false,
          message: "Another service already exists with this title",
        });
      }

      service.slug = newSlug;
      service.title = title;
    }

    service.category = category ?? service.category;
    service.pageTitle = pageTitle ?? service.pageTitle;
    service.metaDescription = metaDescription ?? service.metaDescription;
    service.shortDescription = shortDescription ?? service.shortDescription;
    service.description = description ?? service.description;

    service.primaryKeywords =
      primaryKeywords !== undefined
        ? parseArray(primaryKeywords)
        : service.primaryKeywords;

    service.secondaryKeywords =
      secondaryKeywords !== undefined
        ? parseArray(secondaryKeywords)
        : service.secondaryKeywords;

    if (hero !== undefined) {
      const parsedHero = parseObject(hero);

      service.hero = {
        headline: parsedHero?.headline || service.title,
        subHeadline: parsedHero?.subHeadline || "",
        paragraph: parsedHero?.paragraph || service.description,
        trustLine: parsedHero?.trustLine || "",
        buttons: parseArray(parsedHero?.buttons),
      };
    }

    service.points = points !== undefined ? parseArray(points) : service.points;

    service.process =
      process !== undefined ? parseArray(process) : service.process;

    service.sections =
      sections !== undefined ? parseArray(sections) : service.sections;

    service.faqs = faqs !== undefined ? parseArray(faqs) : service.faqs;

    service.isFeatured =
      isFeatured !== undefined
        ? isFeatured === "true" || isFeatured === true
        : service.isFeatured;

    service.isActive =
      isActive !== undefined
        ? isActive === "false"
          ? false
          : isActive === "true"
            ? true
            : Boolean(isActive)
        : service.isActive;

    service.displayOrder =
      displayOrder !== undefined ? Number(displayOrder) : service.displayOrder;

    if (req.file) {
      const uploadedImage = await uploadToCloudinary(
        req.file.buffer,
        "child-psychologist/services",
      );

      service.image = {
        url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
      };
    }

    await service.save();

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin: Delete service
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    if (service.image?.public_id) {
      await cloudinary.uploader.destroy(service.image.public_id);
    }

    await service.deleteOne();

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
