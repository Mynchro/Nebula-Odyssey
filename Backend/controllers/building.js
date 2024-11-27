import Building from "../models/Buildings.js";
import Planet from "../models/Planet.js";
import User from "../models/User.js";
import mongoose from "mongoose";

const calculateProductionRate = (
    baseProductionRate,
    constructionCosts,
    constructionTime,
    baseStorageCapacity,
    level
) => {
    const updatedProductionRate = {};
    const updatedConstructionCosts = {};
    let updatedStorageCapacity;
    let updatedConstructionTime; // Verwende let, da der Wert aktualisiert wird

    // Berechnung der Produktionsrate für jede Ressource
    for (const resource in baseProductionRate) {
        const baseValue = baseProductionRate[resource];
        updatedProductionRate[resource] = Math.round(
            baseValue * level * level * (1 + (level - 1) / 5)
        );
    }

    // Berechnung der Baukosten für jede Ressource
    for (const resource in constructionCosts) {
        if (resource === "_id") {
            continue;
        }

        const baseValue = constructionCosts[resource];

        if (level === 0) {
            updatedConstructionCosts[resource] = baseValue;
        } else if (level === 1) {
            updatedConstructionCosts[resource] = Math.round(baseValue * 1.01);
        } else {
            updatedConstructionCosts[resource] = Math.round(
                baseValue * level * level * (1 + (level - 1) / 5)
            );
        }
    }

    if (level === 0) {
        updatedStorageCapacity = baseStorageCapacity;
    } else {
        updatedStorageCapacity = Math.round(
            baseStorageCapacity * level * (1 + (level - 1) / 5)
        );
    }

    // Berechnung der Bauzeit
    if (level === 0) {
        updatedConstructionTime = constructionTime;
    } else if (level === 1) {
        updatedConstructionTime = Math.round(constructionTime * 1.01);
    } else {
        updatedConstructionTime = Math.round(
            constructionTime * level * level * (1 + (level - 1) / 5)
        );
    }
    return {
        updatedProductionRate,
        updatedConstructionCosts,
        updatedConstructionTime,
        updatedStorageCapacity,
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
            return res
                .status(400)
                .send({ message: "Maximales Level erreicht" });

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

        const resources = planet.resources.toObject(); // Konvertiere es in ein einfaches Objekt
        const constructionCosts = building.constructionCosts.toObject();

        for (const resource in constructionCosts) {
            if (resource === "_id") {
                continue; // Diese Iteration überspringen, falls der Schlüssel "_id" ist
            }

            const cost = constructionCosts[resource];
            const currentResource = resources[resource]; // Jetzt hast du den Wert der Ressource

            //console.log(`cost: ${cost}`);
            //console.log(`currentResource: ${currentResource}`);

            if (isNaN(cost) || isNaN(currentResource)) {
                console.error(`Ungültiger Wert für Ressource ${resource}`);
                return res
                    .status(400)
                    .send(`Ungültiger Wert für Ressource ${resource}`);
            }

            if (currentResource < cost) {
                return res.status(400).send({
                    message: `Nicht genügend Ressourcen vorhanden!`,
                });
            }

            // Ziehe die Ressourcen ab, wenn der Wert > 0 ist
            if (cost > 0) {
                planet.resources[resource] -= cost;
            }
        }

        // Setze die Bauendzeit basierend auf der aktuellen Bauzeit
        const constructionEndTime = new Date(
            now.getTime() + building.constructionTime * 1000
        );
        // Berechnung der neuen Produktionsrate
        const {
            updatedProductionRate,
            updatedConstructionCosts,
            updatedConstructionTime,
            updatedStorageCapacity,
        } = calculateProductionRate(
            building.baseValue.baseProductionRate,
            building.baseValue.constructionCosts,
            building.baseValue.constructionTime,
            building.baseValue.storageCapacity,
            building.level + 1 // Berechnung für das nächste Level
        );

        // Setze die aktualisierte Produktionsrate und erhöhe das Level
        building.productionRate = updatedProductionRate;
        building.constructionCosts = updatedConstructionCosts;
        building.constructionTime = updatedConstructionTime;
        building.constructionEndTime = constructionEndTime;
        building.storageCapacity = updatedStorageCapacity;
        building.level += 1;

        user.buildingInProgress = buildingType;
        await user.save();
        await planet.save();

        return res.status(200).send({
            message: "Gebäude wurde erfolgreich aufgewertet",
            building,
            user,
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
