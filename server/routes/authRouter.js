import express from "express";
import { registerUser, loginUser, getCurrentUser, logoutUser } from "../controllers/authController.js";
import { protectedMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();
// This is list of my Endpoint

//post /api/v1/auth/register
router.post(
  `/register`, registerUser);

//post /api/v1/auth/login
router.post(`/login`, loginUser);

//post /api/v1/auth/Logout
router.get(`/logout`, protectedMiddleware, logoutUser);

//post /api/v1/auth/getUser
router.get(`/getuser`, protectedMiddleware,  getCurrentUser);

export default router;
