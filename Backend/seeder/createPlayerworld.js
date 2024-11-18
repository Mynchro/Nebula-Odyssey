import Planet from "../models/Planet.js";
import { Resource } from "../models/Resources.js";
import Building from "../models/Buildings.js";
import ship from "../models/Ships.js";
import User from "../models/User.js";

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
    const user = await User.findById(userId);
    if (!user) throw new Error(`Benutzer mit der ID ${userId} nicht gefunden!`);

    const defaultBuildings = await Building.find();
    const defaultResources = await Resource.findOne();
    const defaultShips = await ship.find();

    if (!defaultResources || !defaultBuildings) {
      throw new Error(
        "Keine Ressourcen oder Gebäude in der Datenbank gefunden!"
      );
    }

    const pageNumber = user.page; // Verwende die zugewiesene Seite des Benutzers
    let availableImages = [...planetImages];
    const planets = [];

    const positions = [
      { positionOnPage: 0 }, // Position 1: Heimatplanet
      { positionOnPage: 1 }, // Position 2: Planet
      { positionOnPage: 2 }, // Position 3: Planet
      { positionOnPage: 3 }, // Position 4: Planet
      { positionOnPage: 4 }, // Position 5: Sonne
      { positionOnPage: 5 }, // Position 6: Planet
      { positionOnPage: 6 }, // Position 7: Planet
      { positionOnPage: 7 }, // Position 8: Planet
      { positionOnPage: 8 }, // Position 9: Planet
    ];

    let remainingPositions = positions.filter(
      (pos) => pos.positionOnPage !== 0 && pos.positionOnPage !== 4
    );

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
        label: ship.label,
        description: ship.description,
        img: ship.img

      })),
      resources: defaultResources._id,
      position: {
        page: pageNumber,
        positionOnPage: 0,
      },
    });

    await homePlanet.save();
    user.planets.push(homePlanet._id);
    await user.save();

    const newSun = new Planet({
      name: `Sun`,
      image: `/planets/s-2.png`,
      position: {
        page: pageNumber,
        positionOnPage: 4,
      },
    });
    planets.push(newSun);

    for (let i = 0; i < remainingPositions.length; i++) {
      const randomIndex = Math.floor(Math.random() * availableImages.length);
      const randomImage = availableImages[randomIndex];
      availableImages.splice(randomIndex, 1);

      const newPlanet = new Planet({
        owner: null,
        name: `Planet ${i + 1}`,
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
          label: ship.label,
          description: ship.description,
          img: ship.img,
        })),
        resources: defaultResources._id,
        position: {
          page: pageNumber,
          positionOnPage: remainingPositions[i].positionOnPage,
        },
      });
      planets.push(newPlanet);
    }

    await Planet.insertMany(planets);
    console.log("Spielwelt erfolgreich erstellt!");
    return homePlanet;
  } catch (error) {
    console.error("Fehler beim Erstellen des Planeten:", error);
  }
};
