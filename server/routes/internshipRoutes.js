import express from "express";
import {
  createInternshipApplication,
  deleteInternshipApplication,
  getAllInternshipApplications,
  updateInternshipApplicationStatus,
} from "../controllers/internshipController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const InternshipRoutes = express.Router();

InternshipRoutes.post(
  "/apply",
  upload.single("resume"),
  createInternshipApplication,
);

InternshipRoutes.get("/admin/all", protect, getAllInternshipApplications);
InternshipRoutes.patch(
  "/admin/:id/status",
  protect,
  updateInternshipApplicationStatus,
);
InternshipRoutes.delete("/admin/:id", protect, deleteInternshipApplication);

export default InternshipRoutes;
