import express from "express";
import { showUserList, deleteUser } from "../controllers/adminController.js";

const router = express.Router();

router.get("/overview", showUserList);

router.delete("/delete-user", deleteUser);

export default router;
