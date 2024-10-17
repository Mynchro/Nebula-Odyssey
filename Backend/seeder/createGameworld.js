import Planet from "../models/Planet.js";
import { Resource } from "../models/Resources.js";
import Building from "../models/Buildings.js";

export const createGameworld = async () => {
  try {
    const isPlanetCollection = await Planet.find();

    if (isPlanetCollection.length !== 0) {
      return;
    }

    const defaultBuildings = await Building.find();
    const defaultResources = await Resource.findOne();

    if (!defaultResources || !defaultBuildings) {
      throw new Error(
        "Keine Ressourcen oder Gebäude in der Datenbank gefunden!"
      );
    }

    const resourceId = defaultResources._id;

    const planets = [];
    for (let i = 1; i <= 10; i++) {
      const newPlanet = new Planet({
        owner: null,
        name: `Planet ${i}`,
        buildings: defaultBuildings.map((building) => ({
          originalBuildingId: building._id,
          buildingType: building.buildingType,
          level: building.level,
          productionRate: building.productionRate,
        })),
        resources: resourceId,
      });

      planets.push(newPlanet);
    }
    await Planet.insertMany(planets);
    console.log("10 Spielwelt-Planeten erfolgreich erstellt!");
  } catch (error) {
    console.error("Fehler beim Erstellen der Spielwelt-Planeten:", error);
  }
};
