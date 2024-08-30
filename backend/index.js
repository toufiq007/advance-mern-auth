import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
dotenv.config(); // for using the environment variables


const app = express();

app.listen(4000, () => {
  connectDB()
  console.log("server is running");
});
