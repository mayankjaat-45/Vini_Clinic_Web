import express from "express";
import {
  createService,
  deleteService,
  getAllServicesAdmin,
  getServiceBySlug,
  getServices,
  updateService,
} from "../controllers/serviceController.js";
import { protect } from "../middleware/authMiddleware.js";

const servicesRoutes = express.Router();

servicesRoutes.get("/", getServices);
servicesRoutes.get("/:slug", getServiceBySlug);

//Admin
servicesRoutes.get("/admin/all", protect, getAllServicesAdmin);
servicesRoutes.post("/", protect, createService);
servicesRoutes.put("/:id", protect, updateService);
servicesRoutes.delete("/:id", deleteService);

export default servicesRoutes;
