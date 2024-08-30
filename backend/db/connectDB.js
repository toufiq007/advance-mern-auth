import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const dbResponse = await mongoose.connect(process.env.MONGO_URI);
    console.log(`database connected`, dbResponse.connection.host);
  } catch (err) {
    console.log(err);
    process.exit(1);
    // here status code 1 means failure
    // here status code 0 means success
  }
};
