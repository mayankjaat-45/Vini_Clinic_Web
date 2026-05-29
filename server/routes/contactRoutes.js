import express from "express";
import {
  createContactEnquiry,
  deleteContactEnquiry,
  getContactEnquiries,
  getContactEnquiryById,
  updateContactEnquiryStatus,
} from "../controllers/contactController.js";
import { protect } from "../middleware/authMiddleware.js";

const contactRoutes = express.Router();

// Public Route
contactRoutes.post("/", createContactEnquiry);

//Admin Route
contactRoutes.get("/", protect, getContactEnquiries);
contactRoutes.get("/:id", protect, getContactEnquiryById);
contactRoutes.patch("/:id/status", protect, updateContactEnquiryStatus);
contactRoutes.delete("/:id", protect, deleteContactEnquiry);

export default contactRoutes;
