import express from "express";
import { userController } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", userController.userSignUp);

export default router;
