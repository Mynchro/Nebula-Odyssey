import express from "express";
import {
  register,
  login,
  updateUser,
  logout,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authentication.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.patch("/update-user", authMiddleware, updateUser);

export default router;
