import express from "express";
import {
  buildShip,
  sellShip,
  getAllShips,
  getUserResources,
  instantiateShips,
  getShipData,
  getShip
} from "../controllers/shipYardController.js";

const router = express.Router();

router.post("/user/:userId/ship/:shipType/buildShip/:planetId", buildShip);
router.get("/user/:userId/ship/:shipType/getShip/:planetId", getShip);
router.post(
  "/user/:userId/building/:buildingType/downgrade",
  sellShip
);
router.post("/instantiateShips",instantiateShips)
router.get("/user/:userId/buildings", getAllShips);
router.get("/shipdata", getShipData);
//http://localhost:3000/shipyard/instantiateShips
// POST: http://localhost:3000/api/user/6707f5b128946e558e271814/building/Mine/upgrade  für Mine upgrade
// POST: http://localhost:3000/api/user/6707f5b128946e558e271814/building/Mine/downgrade für Mine downgrade
// GET: http://localhost:3000/api/user/6707f5b128946e558e271814/buildings für abfrufen aller Gebäude

router.get("/user/:userId/resources", getUserResources);

export default router;

// GET: http://localhost:3000/api/user/6707f5b128946e558e271814/resources für abfrufen aller Gebäude
