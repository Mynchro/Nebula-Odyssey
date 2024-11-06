import Building from "../models/Buildings.js";
import User from "../models/User.js";
import mongoose from "mongoose";

const increaseProductionRate = (productionRate, factor) => {
    const updatedProductionRate = {};

    for (const resource in productionRate) {
        // Prüfen, ob der aktuelle Wert eine gültige Zahl ist
        const resourceValue = productionRate[resource];
        if (isNaN(resourceValue)) {
            continue; // Überspringe diese Ressource, wenn der Wert ungültig ist
        }

        // Berechne den neuen Wert der Ressource
        updatedProductionRate[resource] = parseFloat(
            (resourceValue * factor).toFixed(2)
        );
    }

    return updatedProductionRate;
};

export const upgradeBuilding = async (req, res) => {
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

        const planet = user.planets.find((p) => p._id.toString() === planetId);
        if (!planet) {
            return res.status(404).send("Planet nicht gefunden");
        }

        const building = planet.buildings.find(
            (b) => b.buildingType.toLowerCase() === buildingType.toLowerCase()
        );
        if (!building)
            return res
                .status(404)
                .send(`Gebäude vom Typ ${buildingType} nicht gefunden`);

        if (building.level >= 15) {
            return res.status(400).send("Maximales Level erreicht");
        }

        const productionIncreaseFactor = 1.1;

        // Sicherstellen, dass die _id der productionRate nicht überschrieben wird
        const updatedProductionRate = increaseProductionRate(
            building.productionRate,
            productionIncreaseFactor
        );

        // Behalte die _id der productionRate bei
        updatedProductionRate._id = building.productionRate._id;

        // Setze die aktualisierte Produktionsrate und erhöhe das Level
        building.productionRate = updatedProductionRate;
        building.level += 1;

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
