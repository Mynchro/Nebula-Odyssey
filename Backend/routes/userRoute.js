import express from "express";
import {
  register,
  login,
  updateUser,
  logout,
  checkLoginStatus,
} from "../controllers/userController.js";
import { authenticateAndRefresh } from "../middleware/authentication.js";

const router = express.Router();

router.get("/checkLoginStatus", authenticateAndRefresh, checkLoginStatus);

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.patch("/update-user", authenticateAndRefresh, updateUser);

export default router;
