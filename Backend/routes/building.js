import express from "express";
import {
    upgradeBuilding,
    updateBuildingStatus,
} from "../controllers/building.js";

const router = express.Router();
// Definiere die Route für das Aktualisieren des Gebäude-Status
router.patch(
    "/user/:userId/planet/:planetId/building/:buildingType/upgrade",
    upgradeBuilding
);
router.patch(
    "/user/:userId/planet/:planetId/building/:buildingType/status",
    updateBuildingStatus
);

export default router;
