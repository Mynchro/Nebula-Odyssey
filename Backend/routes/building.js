import express from "express";
import { updateBuildingStatus } from "../controllers/building.js";
const router = express.Router();
// Definiere die Route für das Aktualisieren des Gebäude-Status
router.patch("/:buildingId/status", updateBuildingStatus);

export default router;
