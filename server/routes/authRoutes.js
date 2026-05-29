import express from "express";
import { loginAdmin, registerAdmin } from "../controllers/authController.js";

const authRoutes = express.Router();

authRoutes.post("/register", registerAdmin);
authRoutes.post("/login", loginAdmin);

export default authRoutes;
