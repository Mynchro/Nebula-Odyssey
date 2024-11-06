import Planet from "../models/Planet.js";
import { Resource } from "../models/Resources.js";
import Building from "../models/Buildings.js";
import ship from "../models/Ships.js";
export const createHomeplanet = async (userId) => {
    try {
        const defaultBuildings = await Building.find();
        const defaultResources = await Resource.findOne();
    const defaultShips = await ship.find();
        if (!defaultResources || !defaultBuildings) {
            throw new Error(
                "Keine Ressourcen oder Gebäude in der Datenbank gefunden!"
            );
        }

        const newPlanet = new Planet({
            owner: userId,
            name: "Nebula",
            buildings: defaultBuildings.map((building) => ({
                originalBuildingId: building._id,
                buildingType: building.buildingType,
                level: building.level,
                status: building.status,
                category: building.category,
                productionRate: building.productionRate,
            })),
      ships: defaultShips.map((ship) => ({
        originalShipId: ship._id,
        shipType: ship.shipType,
        amount: ship.amount,
        ressourceCosts:ship.ressourceCosts,
        values:ship.values,
        rapidFire:ship.rapidFire,
        dmgVs:ship.dmgVs,
        shipYardType:ship.shipYardType
      })),


            resources: defaultResources._id,
        });

        await newPlanet.save();

        console.log("Heimatplanet erfolgreich erstellt!");
        return newPlanet;
    } catch (error) {
        console.error("Fehler beim Erstellen des Planeten:", error);
    }
};
