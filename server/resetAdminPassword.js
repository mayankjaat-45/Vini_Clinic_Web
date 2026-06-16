import dns from "dns";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

// Force Node.js DNS to use Google DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const resetAdminPassword = async () => {
  try {
    const mongoUri =
      process.env.MONGO_URI ||
      process.env.MONGODB_URI ||
      process.env.MONGO_URL ||
      process.env.MONGODB_URL ||
      process.env.DB_URL ||
      process.env.DATABASE_URL;

    if (!mongoUri) {
      console.log("MongoDB URI not found.");
      process.exit(1);
    }

    console.log("Using DB:", mongoUri.replace(/\/\/.*:.*@/, "//****:****@"));

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 30000,
    });

    console.log("MongoDB connected:", mongoose.connection.name);

    const email = "admin@vini.com";
    const newPassword = "ViniAdmin@12345";

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const admin = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          name: "Admin",
          email,
          password: hashedPassword,
          role: "admin",
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      },
    );

    console.log("Admin created/reset successfully.");
    console.log("Email:", email);
    console.log("Password:", newPassword);
    console.log("Role:", admin.role);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Reset password error:", error);
    process.exit(1);
  }
};

resetAdminPassword();
