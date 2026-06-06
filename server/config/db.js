import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

dotenv.config();

export const connectDb = async () => {
  try {
    const mongoUri =
      process.env.MONGO_URI ||
      process.env.MONGODB_URI ||
      process.env.MONGO_URL ||
      process.env.MONGODB_URL ||
      process.env.DB_URL ||
      process.env.DATABASE_URL;

    const conn = await mongoose.connect(mongoUri);

    console.log("Mongodb Connected :", conn.connection.name);

    // TEMP ADMIN PASSWORD RESET
    // const email = "admin@vini.com";
    // const newPassword = "AdminVini@12345";

    // const hashedPassword = await bcrypt.hash(newPassword, 10);

    // const admin = await User.findOneAndUpdate(
    //   { email },
    //   {
    //     $set: {
    //       password: hashedPassword,
    //       role: "admin",
    //     },
    //   },
    //   { new: true },
    // );

    // if (!admin) {
    //   console.log("Admin not found:", email);
    // } else {
    //   console.log("Admin password reset done");
    //   console.log("Email:", email);
    //   console.log("Password:", newPassword);
    // }
  } catch (error) {
    console.log("MongoDB Error:", error.message);
    process.exit(1);
  }
};
