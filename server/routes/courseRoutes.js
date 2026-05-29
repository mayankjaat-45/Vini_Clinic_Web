import express from "express";
import {
  createCourse,
  deleteCourse,
  getAllCoursesAdmin,
  getCourseBySlug,
  getCourses,
  updateCourse,
} from "../controllers/courseController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const courseRoutes = express.Router();

courseRoutes.get("/", getCourses);
courseRoutes.get("/admin/all", protect, getAllCoursesAdmin);
courseRoutes.get("/:slug", getCourseBySlug);

courseRoutes.post("/", protect, upload.single("image"), createCourse);
courseRoutes.put("/:id", protect, upload.single("image"), updateCourse);
courseRoutes.delete("/:id", protect, deleteCourse);

export default courseRoutes;
