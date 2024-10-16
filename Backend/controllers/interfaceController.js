import User from "../models/User.js";

export const getUserResources = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("Benutzer nicht gefunden!");
        }

        const resources = user.homePlanet.resources;

        return res.status(200).json(resources);
    } catch (error) {
        console.error("Fehler beim Abrufen der Ressourcen", error);
        return res.status(500).send("Serverfehler");
    }
};
// GET: http://localhost:3000/api/user/6707f5b128946e558e271814/resources für abfrufen aller Gebäude

export const upgradeBuilding = async (req, res) => {
    try {
        const { userId, buildingType } = req.params;

        // Finde den Benutzer anhand der ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("Benutzer nicht gefunden");
        }

        // Suche das Gebäude anhand des buildingType im Home-Planeten des Benutzers
        const building = user.homePlanet.buildings.find(
            (b) => b.buildingType === buildingType
        );

        if (!building) {
            return res
                .status(404)
                .send(`Gebäude mit dem Typ ${buildingType} nicht gefunden`);
        }

        if (building.level >= 15) {
            return res.status(400).send("Maximales Level erreicht");
        }

        // Erhöhe die Produktionsrate um 10% pro Level
        const productionIncreaseFactor = 1.1;
        building.productionRate.silicon = parseFloat(
            (
                building.productionRate.silicon * productionIncreaseFactor
            ).toFixed(2)
        );
        building.productionRate.ores = parseFloat(
            (building.productionRate.ores * productionIncreaseFactor).toFixed(2)
        );
        building.productionRate.chemicals = parseFloat(
            (
                building.productionRate.chemicals * productionIncreaseFactor
            ).toFixed(2)
        );
        building.productionRate.fuel = parseFloat(
            (building.productionRate.fuel * productionIncreaseFactor).toFixed(2)
        );
        building.productionRate.energy = parseFloat(
            (building.productionRate.energy * productionIncreaseFactor).toFixed(
                2
            )
        );
        building.productionRate.steel = parseFloat(
            (building.productionRate.steel * productionIncreaseFactor).toFixed(
                2
            )
        );
        building.productionRate.electronics = parseFloat(
            (
                building.productionRate.electronics * productionIncreaseFactor
            ).toFixed(2)
        );
        building.productionRate.ammo = parseFloat(
            (building.productionRate.ammo * productionIncreaseFactor).toFixed(2)
        );

        // Erhöhe das Level um 1
        building.level += 1;
        // Speichere den Benutzer mit dem aktualisierten Gebäude
        await user.save();

        return res.status(200).send({
            message: "Gebäude wurde erfolgreich aufgewertet",
            building,
        });
    } catch (error) {
        console.error("Fehler beim Upgraden des Gebäudes:", error);
        return res.status(500).send("Serverfehler");
    }
};

export const downgradeBuilding = async (req, res) => {
    try {
        const { userId, buildingType } = req.params;

        // Finde den Benutzer anhand der ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("Benutzer nicht gefunden");
        }

        // Suche das Gebäude anhand des buildingType im Home-Planeten des Benutzers
        const building = user.homePlanet.buildings.find(
            (b) => b.buildingType === buildingType
        );

        if (!building) {
            return res
                .status(404)
                .send(`Gebäude mit dem Typ ${buildingType} nicht gefunden`);
        }

        if (building.level <= 1) {
            return res
                .status(400)
                .send(
                    "Das Level des Gebäudes kann nicht weiter gesenkt werden"
                );
        }

        // Verringere die Produktionsrate um 10% pro Level
        const productionDecreaseFactor = 1.1;

        building.productionRate.silicon = parseFloat(
            (
                building.productionRate.silicon / productionDecreaseFactor
            ).toFixed(2)
        );
        building.productionRate.ores = parseFloat(
            (building.productionRate.ores / productionDecreaseFactor).toFixed(2)
        );
        building.productionRate.chemicals = parseFloat(
            (
                building.productionRate.chemicals / productionDecreaseFactor
            ).toFixed(2)
        );
        building.productionRate.fuel = parseFloat(
            (building.productionRate.fuel / productionDecreaseFactor).toFixed(2)
        );
        building.productionRate.energy = parseFloat(
            (building.productionRate.energy / productionDecreaseFactor).toFixed(
                2
            )
        );
        building.productionRate.steel = parseFloat(
            (building.productionRate.steel / productionDecreaseFactor).toFixed(
                2
            )
        );
        building.productionRate.electronics = parseFloat(
            (
                building.productionRate.electronics / productionDecreaseFactor
            ).toFixed(2)
        );
        building.productionRate.ammo = parseFloat(
            (building.productionRate.ammo / productionDecreaseFactor).toFixed(2)
        );

        // verringere das Level um 1
        building.level -= 1;

        // Speichere den Benutzer mit dem aktualisierten Gebäude
        await user.save();

        return res.status(200).send({
            message: "Gebäude wurde erfolgreich heruntergestuft",
            building,
        });
    } catch (error) {
        console.error("Fehler beim Downgraden des Gebäudes:", error);
        return res.status(500).send("Serverfehler");
    }
};

export const getAllBuildings = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User nichst gefunden");
        }

        const buildings = user.homePlanet.buildings;

        return res.status(200).json(buildings);
    } catch (error) {
        console.error("Fehler beim Abrufen der Gebäude:", error);
        return res.status(500).send("Serverfehler");
    }
};

// POST: http://localhost:3000/api/user/6707f5b128946e558e271814/building/Mine/upgrade  für Mine upgrade
// POST: http://localhost:3000/api/user/6707f5b128946e558e271814/building/Mine/downgrade für Mine downgrade
// GET: http://localhost:3000/api/user/6707f5b128946e558e271814/buildings für abfrufen aller Gebäude
