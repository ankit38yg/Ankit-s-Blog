import express from "express";
import { signIn, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signUp", signup);
router.post("/signIn", signIn);

export default router;
