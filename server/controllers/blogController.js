import cloudinary from "../config/cloudinary.js";
import Blog from "../models/Blog.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

const parseJson = (value) => {
  if (!value) return null;

  if (typeof value === "object") return value;

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

const cleanSlug = (value = "") => {
  return value.replace(/^\/+/, "").toLowerCase().trim().replace(/\s+/g, "-");
};

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
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    return [];
  }
};

// Public - Get Blogs
export const getBlogs = async (req, res) => {
  try {
    const { language, search, category } = req.query;

    const query = { isPublished: true };

    if (category) query.category = category;
    if (language) query.language = language;

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { focusKeyword: { $regex: search, $options: "i" } },
        { secondaryKeywords: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    const blogs = await Blog.find(query).sort({
      publishedAt: -1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Public - Get Blog By Slug
export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      isPublished: true,
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin - Get All Blogs
export const getAllAdminBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin - Create Blog
export const createBlog = async (req, res) => {
  try {
    const {
      title,
      slug: bodySlug,
      category,
      language,
      author,
      seoTitle,
      metaTitle,
      pageTitle,
      metaDescription,
      focusKeyword,
      secondaryKeywords,
      schemaType,
      faqSchema,
      excerpt,
      content,
      tags,
      isFeatured,
      isPublished,
      publishedAt,
    } = req.body;

    if (!title || !content || !excerpt) {
      return res.status(400).json({
        success: false,
        message: "Title, excerpt and content are required",
      });
    }

    const slug = bodySlug ? cleanSlug(bodySlug) : slugify(title);

    const existingBlog = await Blog.findOne({ slug });

    if (existingBlog) {
      return res.status(400).json({
        success: false,
        message: "Blog already exists with this slug",
      });
    }

    let image = {};

    if (req.file) {
      const uploadedImage = await uploadToCloudinary(
        req.file.buffer,
        "child-psychologist/blogs",
      );

      image = {
        url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
      };
    }

    const blog = await Blog.create({
      title,
      slug,
      category: category || "General",
      language: language || "English",
      author: author || "Dr. Vini Jhariya",

      seoTitle,
      metaTitle,
      pageTitle: pageTitle || metaTitle || seoTitle || title,
      metaDescription,
      focusKeyword,
      secondaryKeywords: parseArray(secondaryKeywords),
      schemaType,
      faqSchema: parseJson(faqSchema),

      excerpt,
      content,
      tags: parseArray(tags),
      image,

      isFeatured: isFeatured === "true" || isFeatured === true,
      isPublished: isPublished === "false" ? false : true,
      publishedAt: publishedAt || Date.now(),
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Admin - Update Blog
export const updateBlog = async (req, res) => {
  try {
    const {
      title,
      slug: bodySlug,
      category,
      language,
      author,
      seoTitle,
      metaTitle,
      pageTitle,
      metaDescription,
      focusKeyword,
      secondaryKeywords,
      schemaType,
      faqSchema,
      excerpt,
      content,
      tags,
      isFeatured,
      isPublished,
      publishedAt,
    } = req.body;

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const oldTitle = blog.title;

    if (bodySlug) {
      const newSlug = cleanSlug(bodySlug);

      if (newSlug !== blog.slug) {
        const existingBlog = await Blog.findOne({
          slug: newSlug,
          _id: { $ne: blog._id },
        });

        if (existingBlog) {
          return res.status(400).json({
            success: false,
            message: "Blog already exists with this slug",
          });
        }

        blog.slug = newSlug;
      }
    } else if (title && title !== oldTitle) {
      const newSlug = slugify(title);

      const existingBlog = await Blog.findOne({
        slug: newSlug,
        _id: { $ne: blog._id },
      });

      if (existingBlog) {
        return res.status(400).json({
          success: false,
          message: "Blog already exists with this title",
        });
      }

      blog.slug = newSlug;
    }

    if (title) {
      blog.title = title;
    }

    blog.category = category ?? blog.category;
    blog.language = language ?? blog.language;
    blog.author = author ?? blog.author;

    blog.seoTitle = seoTitle ?? blog.seoTitle;
    blog.metaTitle = metaTitle ?? blog.metaTitle;
    blog.pageTitle = pageTitle ?? blog.pageTitle;
    blog.metaDescription = metaDescription ?? blog.metaDescription;
    blog.focusKeyword = focusKeyword ?? blog.focusKeyword;

    blog.secondaryKeywords =
      secondaryKeywords !== undefined
        ? parseArray(secondaryKeywords)
        : blog.secondaryKeywords;

    blog.schemaType = schemaType ?? blog.schemaType;

    blog.faqSchema =
      faqSchema !== undefined ? parseJson(faqSchema) : blog.faqSchema;

    blog.excerpt = excerpt ?? blog.excerpt;
    blog.content = content ?? blog.content;
    blog.tags = tags !== undefined ? parseArray(tags) : blog.tags;

    blog.isFeatured =
      isFeatured !== undefined
        ? isFeatured === "true" || isFeatured === true
        : blog.isFeatured;

    blog.isPublished =
      isPublished !== undefined
        ? isPublished === "false"
          ? false
          : isPublished === "true"
            ? true
            : Boolean(isPublished)
        : blog.isPublished;

    blog.publishedAt = publishedAt ?? blog.publishedAt;

    if (req.file) {
      if (blog.image?.public_id) {
        await cloudinary.uploader.destroy(blog.image.public_id);
      }

      const uploadedImage = await uploadToCloudinary(
        req.file.buffer,
        "child-psychologist/blogs",
      );

      blog.image = {
        url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
      };
    }

    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin - Delete Blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (blog.image?.public_id) {
      await cloudinary.uploader.destroy(blog.image.public_id);
    }

    await blog.deleteOne();

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
