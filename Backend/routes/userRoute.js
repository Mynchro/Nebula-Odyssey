import express from "express";
import { register, login, updateUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.patch("/update-user", updateUser);

export default router;
