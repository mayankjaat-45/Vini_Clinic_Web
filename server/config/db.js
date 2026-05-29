import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Mongodb Connected : ${conn.connection.name}`);
  } catch (error) {
    console.log(`Mongodb Connection Failed : ${error.message}`);
    process.exit(1);
  }
};
