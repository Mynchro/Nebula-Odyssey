import express from "express";
import {
    upgradeBuilding,
    updateBuildingStatus,
    getBuilding,
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
router.get(
    "/user/:userId/planet/:planetId/building/:buildingType",
    getBuilding
);
export default router;
