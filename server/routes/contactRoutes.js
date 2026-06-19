import express from "express";
import {
  createContactEnquiry,
  deleteContactEnquiry,
  getContactEnquiries,
  getContactEnquiryById,
  updateContactEnquiryStatus,
} from "../controllers/contactController.js";
import { protect } from "../middleware/authMiddleware.js";
import sendMail from "../utils/sendMail.js";

const contactRoutes = express.Router();

// Public Route
contactRoutes.post("/", createContactEnquiry);

//Admin Route
contactRoutes.get("/", protect, getContactEnquiries);
contactRoutes.get("/test-mail", async (req, res) => {
  try {
    await sendMail({
      to: process.env.CLIENT_MAIL,
      subject: "Local Test Mail from Website",
      html: "<h2>Email setup is working locally ✅</h2>",
    });

    return res.status(200).json({
      success: true,
      message: "Test mail sent successfully",
    });
  } catch (error) {
    console.log("TEST MAIL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

contactRoutes.get("/:id", protect, getContactEnquiryById);
contactRoutes.patch("/:id/status", protect, updateContactEnquiryStatus);
contactRoutes.delete("/:id", protect, deleteContactEnquiry);

export default contactRoutes;
