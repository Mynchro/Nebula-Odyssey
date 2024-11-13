import express from "express";
import {
    updatePlayerColor,
    getPlayer,
    getAllBuildings,
    getUserResources,
    getAllPlanets,
} from "../controllers/interface.js";

const router = express.Router();

router.get("/user/:userId/buildings", getAllBuildings);

// POST: http://localhost:3000/api/user/6707f5b128946e558e271814/building/Mine/upgrade  für Mine upgrade
// POST: http://localhost:3000/api/user/6707f5b128946e558e271814/building/Mine/downgrade für Mine downgrade
// GET: http://localhost:3000/api/user/6707f5b128946e558e271814/buildings für abfrufen aller Gebäude

router.get("/user/:userId/resources", getUserResources);

router.get("/planets", getAllPlanets);
router.put("/user/:userId", updatePlayerColor);
router.get("/user/:userId", getPlayer);

export default router;

// GET: http://localhost:3000/api/user/6707f5b128946e558e271814/resources für abfrufen aller Gebäude
