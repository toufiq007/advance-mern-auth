import express from "express";
import { userController } from "../controller/auth.controller.js";

const router = express.Router();

router.get("/signup", userController.userSignUp);

export default router;
