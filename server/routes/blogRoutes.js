import express from "express";
import {
  bulkUploadBlogs,
  createBlog,
  deleteBlog,
  getAllAdminBlogs,
  getBlogBySlug,
  getBlogs,
  updateBlog,
} from "../controllers/blogController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const blogRoutes = express.Router();

// Public
blogRoutes.get("/", getBlogs);

// Admin
blogRoutes.get("/admin/all", protect, getAllAdminBlogs);
blogRoutes.post("/", protect, upload.single("image"), createBlog);
blogRoutes.post("/admin/bulk-upload", protect, adminOnly, bulkUploadBlogs);
blogRoutes.put("/:id", protect, upload.single("image"), updateBlog);
blogRoutes.delete("/:id", protect, deleteBlog);

// Keep this last
blogRoutes.get("/:slug", getBlogBySlug);

export default blogRoutes;
