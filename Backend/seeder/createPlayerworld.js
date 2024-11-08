import Planet from "../models/Planet.js";
import { Resource } from "../models/Resources.js";
import Building from "../models/Buildings.js";
import ship from "../models/Ships.js";

const planetImages = [
  "/planets/p-1.png",
  "/planets/p-2.png",
  "/planets/p-3.png",
  "/planets/p-4.png",
  "/planets/p-5.png",
  "/planets/p-6.png",
  "/planets/p-7.png",
];

export const createPlayerworld = async (userId) => {
  try {
    const defaultBuildings = await Building.find();
    const defaultResources = await Resource.findOne();
    const defaultShips = await ship.find();
    if (!defaultResources || !defaultBuildings) {
      throw new Error(
        "Keine Ressourcen oder Gebäude in der Datenbank gefunden!"
      );
    }
    const planets = [];

    const homePlanet = new Planet({
      owner: userId,
      name: "Nebula",
      image: `/planets/p-13.png`,
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
        ressourceCosts: ship.ressourceCosts,
        values: ship.values,
        rapidFire: ship.rapidFire,
        dmgVs: ship.dmgVs,
        shipYardType: ship.shipYardType,
      })),

      resources: defaultResources._id,
    });

    planets.push(homePlanet);

    for (let i = 1; i <= 8; i++) {
      if (i === 4) {
        const newSun = new Planet({
          name: `Sun`,
          image: `/planets/s-2.png`,
        });
        planets.push(newSun);
      } else {
        const randomImage =
          planetImages[Math.floor(Math.random() * planetImages.length)];
        const newPlanet = new Planet({
          owner: null,
          name: `Planet ${i}`,
          image: randomImage,
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
            ressourceCosts: ship.ressourceCosts,
            values: ship.values,
            rapidFire: ship.rapidFire,
            dmgVs: ship.dmgVs,
            shipYardType: ship.shipYardType,
          })),

          resources: defaultResources._id,
        });
        planets.push(newPlanet);
      }
    }

    await Planet.insertMany(planets);

    console.log("Spielwelt erfolgreich erstellt!");
    return planets;
  } catch (error) {
    console.error("Fehler beim Erstellen des Planeten:", error);
  }
};
