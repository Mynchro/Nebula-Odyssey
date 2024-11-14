import Building from "../models/Buildings.js";
import Planet from "../models/Planet.js";
import User from "../models/User.js";
import mongoose from "mongoose";

const calculateProductionRate = (
    baseProductionRate,
    constructionCosts,
    constructionTime,
    level
) => {
    const updatedProductionRate = {};
    const updatedConstructionCosts = {};
    let updatedConstructionTime; // Verwende let, da der Wert aktualisiert wird

    // Berechnung der Produktionsrate für jede Ressource
    for (const resource in baseProductionRate) {
        const baseValue = baseProductionRate[resource];
        updatedProductionRate[resource] = parseFloat(
            (baseValue * level * level * (1 + (level - 1) / 5)).toFixed()
        );
    }

    // Berechnung der Baukosten für jede Ressource
    for (const resource in constructionCosts) {
        const baseValue = constructionCosts[resource];

        if (level === 0) {
            updatedConstructionCosts[resource] = baseValue;
        } else if (level === 1) {
            updatedConstructionCosts[resource] = parseFloat(
                (baseValue * 1.01).toFixed()
            );
        } else {
            updatedConstructionCosts[resource] = parseFloat(
                (baseValue * level * level * (1 + (level - 1) / 5)).toFixed()
            );
        }
    }

    // Berechnung der Bauzeit
    if (level === 0) {
        updatedConstructionTime = constructionTime;
    } else if (level === 1) {
        updatedConstructionTime = parseFloat(
            (constructionTime * 1.01).toFixed()
        );
    } else {
        updatedConstructionTime = parseFloat(
            (constructionTime * level * level * (1 + (level - 1) / 5)).toFixed()
        );
    }

    return {
        updatedProductionRate,
        updatedConstructionCosts,
        updatedConstructionTime,
    };
};

export const upgradeBuilding = async (req, res) => {
    try {
        const { userId, buildingType, planetId } = req.params;

        // Finde den Benutzer und dessen Planeten
        const user = await User.findById(userId).populate({
            path: "planets",
            populate: { path: "buildings" },
        });

        if (!user) return res.status(404).send("Benutzer nicht gefunden");

        if (
            user.buildingInProgress &&
            user.buildingInProgress !== buildingType
        ) {
            return res
                .status(400)
                .send(
                    `Das Gebäude ${user.buildingInProgress} ist noch im Bau. Bitte warte, bis dieser Bau abgeschlossen ist.`
                );
        }

        const planet = user.planets.find((p) => p._id.toString() === planetId);
        if (!planet) return res.status(404).send("Planet nicht gefunden");

        const building = planet.buildings.find(
            (b) => b.buildingType.toLowerCase() === buildingType.toLowerCase()
        );
        if (!building)
            return res
                .status(404)
                .send(`Gebäude vom Typ ${buildingType} nicht gefunden`);
        if (building.level >= 15)
            return res.status(400).send("Maximales Level erreicht");

        const now = new Date();
        if (
            building.constructionEndTime &&
            now < building.constructionEndTime
        ) {
            return res
                .status(400)
                .send(
                    "Das Gebäude ist noch im Bau. Bitte warte bis zum Abschluss der Bauzeit."
                );
        }

        // Berechnung der neuen Produktionsrate
        const {
            updatedProductionRate,
            updatedConstructionCosts,
            updatedConstructionTime,
        } = calculateProductionRate(
            building.baseValue.baseProductionRate,
            building.baseValue.constructionCosts,
            building.baseValue.constructionTime,
            building.level + 1 // Berechnung für das nächste Level
        );

        const constructionEndTime = new Date(
            now.getTime() + updatedConstructionTime * 1000
        );

        // Setze die aktualisierte Produktionsrate und erhöhe das Level
        building.productionRate = updatedProductionRate;
        building.constructionCosts = updatedConstructionCosts;
        building.constructionTime = updatedConstructionTime;
        building.constructionEndTime = constructionEndTime;
        building.level += 1;

        user.buildingInProgress = buildingType;
        await user.save();
        await planet.save();

        return res.status(200).send({
            message: "Gebäude wurde erfolgreich aufgewertet",
            building,
        });
    } catch (error) {
        console.error("Fehler beim Upgraden des Gebäudes:", error);
        return res.status(500).send("Serverfehler beim Upgraden des Gebäudes");
    }
};

export const updateBuildingStatus = async (req, res) => {
    try {
        const { userId, buildingType, planetId } = req.params;

        // Finde den Benutzer anhand der ID und lade seine Planeten
        const user = await User.findById(userId).populate({
            path: "planets",
            populate: { path: "buildings" }, // Populiere die Gebäude des Planeten
        });

        if (!user) {
            return res.status(404).send("Benutzer nicht gefunden");
        }

        // Finde den Planeten anhand der Planet-ID
        const planet = user.planets.find((p) => p._id.toString() === planetId);
        if (!planet) {
            return res.status(404).send("Planet nicht gefunden");
        }

        // Finde das Gebäude anhand des Gebäudetyps
        const building = planet.buildings.find(
            (b) => b.buildingType.toLowerCase() === buildingType.toLowerCase()
        );
        if (!building)
            return res
                .status(404)
                .send(`Gebäude vom Typ ${buildingType} nicht gefunden`);

        // Toggle den Status von true auf false oder umgekehrt
        building.status = !building.status;

        // Speichere die Änderungen im Planet-Objekt
        await planet.save();

        return res.status(200).send({
            message: "Gebäude-Status erfolgreich geändert",
            building,
        });
    } catch (error) {
        console.error("Fehler beim Upgraden des Gebäudes:", error);
        return res.status(500).send("Serverfehler beim Upgraden des Gebäudes");
    }
};

export const getBuilding = async (req, res) => {
    try {
        const { userId, planetId, buildingType } = req.params;

        const user = await User.findById(userId);
        if (!user)
            return res.status(404).json({ message: "Benutzer nicht gefunden" });

        const planet = await Planet.findOne({ _id: planetId, owner: userId });
        if (!planet)
            return res.status(404).json({ message: "Planet nicht gefunden" });

        const building = planet.buildings.find(
            (b) => b.buildingType === buildingType
        );
        if (!building)
            return res.status(404).json({ message: "Gebäude nicht gefunden" });

        res.status(200).json({ building });
    } catch (error) {
        console.error("Fehler beim Abrufen des Gebäudes:", error);
        res.status(500).json({ message: "Serverfehler" });
    }
};
