import express from "express";
import {
  createResource,
  deleteResource,
  getAllResourcesAdmin,
  getResourceBySlug,
  getResources,
  updateResource,
} from "../controllers/resourceController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const resourceRoutes = express.Router();

resourceRoutes.get("/", getResources);
resourceRoutes.get("/:slug", getResourceBySlug);
resourceRoutes.get("/admin/all", protect, getAllResourcesAdmin);

resourceRoutes.post(
  "/",
  protect,
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  createResource,
);

resourceRoutes.put(
  "/:id",
  protect,
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  updateResource,
);

resourceRoutes.delete("/:id", protect, deleteResource);

export default resourceRoutes;
