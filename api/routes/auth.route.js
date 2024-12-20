import express from "express";
import { google, signIn, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signUp", signup);
router.post("/signIn", signIn);
router.post("/google", google);

export default router;
