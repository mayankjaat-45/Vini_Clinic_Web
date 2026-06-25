import dns from "node:dns";
dns.setDefaultResultOrder("ipv4first");

import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDb } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import servicesRoutes from "./routes/serviceRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import courseRouter from "./routes/courseRoutes.js";
import InternshipRoutes from "./routes/internshipRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";
import seedRoutes from "./routes/seedRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

const allowedOrigins = ["http://localhost:3000", process.env.CLIENT_URL];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Child Psychologist API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/contact-enquiries", contactRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/courses", courseRouter);
app.use("/api/internship", InternshipRoutes);
app.use("/api/resources", resourceRoutes);

app.use("/api/seed", seedRoutes);

connectDb();

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
