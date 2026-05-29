import cloudinary from "../config/cloudinary.js";
import Course from "../models/Course.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

const slugify = (text = "") => {
  return text
    .toLowerCase()
    .replaceAll("&", "and")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
};

const parseModules = (value) => {
  if (!value) return [];

  if (Array.isArray(value)) return value;

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    if (typeof value === "string") {
      return value
        .split("\n")
        .map((line, index) => ({
          title: line.trim(),
          description: "",
          order: index + 1,
        }))
        .filter((item) => item.title);
    }

    return [];
  }
};

// Public
export const getCourses = async (req, res) => {
  try {
    const { category, mode } = req.query;

    const query = { isActive: true };

    if (category) query.category = category;
    if (mode) query.mode = mode;

    const courses = await Course.find(query).sort({
      displayOrder: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Public
export const getCourseBySlug = async (req, res) => {
  try {
    const course = await Course.findOne({
      slug: req.params.slug,
      isActive: true,
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin
export const getAllCoursesAdmin = async (req, res) => {
  try {
    const courses = await Course.find().sort({
      displayOrder: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin
export const createCourse = async (req, res) => {
  try {
    const {
      title,
      category,
      shortDescription,
      description,
      duration,
      mode,
      eligibility,
      fees,
      startDate,
      modules,
      pageTitle,
      metaDescription,
      isFeatured,
      isActive,
      displayOrder,
    } = req.body;

    if (!title || !shortDescription || !description) {
      return res.status(400).json({
        success: false,
        message: "Title, short description and description are required",
      });
    }

    const slug = slugify(title);

    const existingCourse = await Course.findOne({ slug });

    if (existingCourse) {
      return res.status(400).json({
        success: false,
        message: "Course already exists with this title",
      });
    }

    let image = {};

    if (req.file) {
      const uploadedImage = await uploadToCloudinary(
        req.file.buffer,
        "child-psychologist/courses",
      );

      image = {
        url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
      };
    }

    const course = await Course.create({
      title,
      slug,
      category: category || "Other",
      shortDescription,
      description,
      duration,
      mode: mode || "Online",
      eligibility,
      fees,
      startDate: startDate || undefined,
      modules: parseModules(modules),
      image,
      pageTitle,
      metaDescription,
      isFeatured: isFeatured === "true" || isFeatured === true,
      isActive: isActive === "false" ? false : true,
      displayOrder: Number(displayOrder) || 0,
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin
export const updateCourse = async (req, res) => {
  try {
    const {
      title,
      category,
      shortDescription,
      description,
      duration,
      mode,
      eligibility,
      fees,
      startDate,
      modules,
      pageTitle,
      metaDescription,
      isFeatured,
      isActive,
      displayOrder,
    } = req.body;

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    if (title && title !== course.title) {
      const newSlug = slugify(title);

      const existingCourse = await Course.findOne({
        slug: newSlug,
        _id: { $ne: course._id },
      });

      if (existingCourse) {
        return res.status(400).json({
          success: false,
          message: "Another course already exists with this title",
        });
      }

      course.title = title;
      course.slug = newSlug;
    }

    course.category = category ?? course.category;
    course.shortDescription = shortDescription ?? course.shortDescription;
    course.description = description ?? course.description;
    course.duration = duration ?? course.duration;
    course.mode = mode ?? course.mode;
    course.eligibility = eligibility ?? course.eligibility;
    course.fees = fees ?? course.fees;
    course.startDate = startDate || course.startDate;
    course.modules =
      modules !== undefined ? parseModules(modules) : course.modules;
    course.pageTitle = pageTitle ?? course.pageTitle;
    course.metaDescription = metaDescription ?? course.metaDescription;

    course.isFeatured =
      isFeatured !== undefined
        ? isFeatured === "true" || isFeatured === true
        : course.isFeatured;

    course.isActive =
      isActive !== undefined
        ? isActive === "false"
          ? false
          : isActive === "true"
            ? true
            : Boolean(isActive)
        : course.isActive;

    course.displayOrder =
      displayOrder !== undefined
        ? Number(displayOrder) || 0
        : course.displayOrder;

    if (req.file) {
      if (course.image?.public_id) {
        await cloudinary.uploader.destroy(course.image.public_id);
      }

      const uploadedImage = await uploadToCloudinary(
        req.file.buffer,
        "child-psychologist/courses",
      );

      course.image = {
        url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
      };
    }

    await course.save();

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    if (course.image?.public_id) {
      await cloudinary.uploader.destroy(course.image.public_id);
    }

    await course.deleteOne();

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
