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
  "/planets/p-8.png",
  "/planets/p-9.png",
  "/planets/p-10.png",
  "/planets/p-11.png",
  "/planets/p-12.png",
  "/planets/p-14.png",
  "/planets/p-15.png",
  "/planets/p-16.png",
  "/planets/p-17.png",
  "/planets/p-18.png",
  "/planets/p-19.png",
  "/planets/p-20.png",
  "/planets/p-21.png",
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
    let availableImages = [...planetImages];
    const planets = [];

    const homePlanet = new Planet({
      owner: userId,
      name: "Nebula",
      image: `/planets/p-13.png`,
      buildings: defaultBuildings.map((building) => ({
        buildingType: building.buildingType,
        level: building.level,
        status: building.status,
        category: building.category,
        originalBuildingId: building._id,
        constructionTime: building.constructionTime,
        constructionCosts: building.constructionCosts,
        baseValue: building.baseValue,
        productionRate: building.productionRate,
        storageCapacity: building.storageCapacity,
      })),
      ships: defaultShips.map((ship) => ({
        shipType: ship.shipType,
        shipYardType: ship.shipYardType,
        amount: ship.amount,
        originalShipId: ship._id,
        ressourceCosts: ship.ressourceCosts,
        values: ship.values,
        rapidFire: ship.rapidFire,
        dmgVs: ship.dmgVs,
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
        const randomIndex = Math.floor(Math.random() * availableImages.length);
        const randomImage = availableImages[randomIndex];
        availableImages.splice(randomImage, 1);

        const newPlanet = new Planet({
          owner: null,
          name: `Planet ${i}`,
          image: randomImage,
          buildings: defaultBuildings.map((building) => ({
            buildingType: building.buildingType,
            level: building.level,
            status: building.status,
            category: building.category,
            originalBuildingId: building._id,
            constructionTime: building.constructionTime,
            constructionCosts: building.constructionCosts,
            baseValue: building.baseValue,
            productionRate: building.productionRate,
            storageCapacity: building.storageCapacity,
          })),
          ships: defaultShips.map((ship) => ({
            shipType: ship.shipType,
            shipYardType: ship.shipYardType,
            amount: ship.amount,
            originalShipId: ship._id,
            ressourceCosts: ship.ressourceCosts,
            values: ship.values,
            rapidFire: ship.rapidFire,
            dmgVs: ship.dmgVs,
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
