import express from "express";
import Service from "../models/Service.js";
import { services } from "../seed/seedServices.js";

const seedRoutes = express.Router();

seedRoutes.post("/services", async (req, res) => {
  try {
    for (const service of services) {
      await Service.findOneAndUpdate(
        { slug: service.slug },
        { $set: service },
        {
          upsert: true,
          new: true,
          runValidators: true,
        },
      );

      console.log(`${service.title} seeded successfully`);
    }

    res.json({
      success: true,
      message: "All services seeded successfully",
      total: services.length,
    });
  } catch (error) {
    console.log("Seed route error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default seedRoutes;
