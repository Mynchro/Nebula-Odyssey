import express from "express";
import {
  upgradeBuilding,
  downgradeBuilding,
  getAllBuildings,
  getUserResources,
} from "../controllers/interfaceController.js";

const router = express.Router();

router.post("/user/:userId/building/:buildingType/upgrade", upgradeBuilding);
router.post(
  "/user/:userId/building/:buildingType/downgrade",
  downgradeBuilding
);
router.get("/user/:userId/buildings", getAllBuildings);

// POST: http://localhost:3000/api/user/6707f5b128946e558e271814/building/Mine/upgrade  für Mine upgrade
// POST: http://localhost:3000/api/user/6707f5b128946e558e271814/building/Mine/downgrade für Mine downgrade
// GET: http://localhost:3000/api/user/6707f5b128946e558e271814/buildings für abfrufen aller Gebäude

router.get("/user/:userId/resources", getUserResources);

export default router;

// GET: http://localhost:3000/api/user/6707f5b128946e558e271814/resources für abfrufen aller Gebäude
