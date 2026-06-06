import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

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
      console.log("Available env keys:", Object.keys(process.env));
      process.exit(1);
    }

    console.log("Using DB:", mongoUri.replace(/\/\/.*:.*@/, "//****:****@"));

    await mongoose.connect(mongoUri);

    console.log("MongoDB connected:", mongoose.connection.name);

    const email = "admin@vini.com";
    const newPassword = "ViniAdmin@12345";

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const admin = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          password: hashedPassword,
          role: "admin",
        },
      },
      { new: true },
    );

    if (!admin) {
      console.log("Admin user not found with email:", email);
      await mongoose.disconnect();
      process.exit(1);
    }

    console.log("Admin password reset successfully.");
    console.log("Email:", email);
    console.log("New Password:", newPassword);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Reset password error:", error);
    process.exit(1);
  }
};

resetAdminPassword();
