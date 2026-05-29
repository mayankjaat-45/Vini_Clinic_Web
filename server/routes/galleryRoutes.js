import express from "express";
import {
  createGalleryImages,
  deleteGalleryImage,
  getAllGalleryImagesAdmin,
  getGalleryImage,
  updatedGalleryImage,
} from "../controllers/galleryController.js";

import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const galleryRoutes = express.Router();

// Public
galleryRoutes.get("/", getGalleryImage);

// Admin
galleryRoutes.get("/admin/all", protect, getAllGalleryImagesAdmin);
galleryRoutes.post("/", protect, upload.single("image"), createGalleryImages);
galleryRoutes.put("/:id", protect, upload.single("image"), updatedGalleryImage);
galleryRoutes.delete("/:id", protect, deleteGalleryImage);

export default galleryRoutes;
