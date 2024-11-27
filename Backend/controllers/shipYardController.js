import User from "../models/User.js";
import ship, { shipSchema } from "../models/Ships.js";
import { connectToDB } from "../libs/db.js";
import unitData from "../config/units/unitData.js";
import Unit from "../config/units/unit.js";
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
export const instantiateShips = async (req, res) => {
  try {
    await connectToDB();
    const existingShips = await ship.find();
    if (existingShips.length > 0) {
      await ship.deleteMany({});
    }
    const ships = [];
    const shipArray = [
      new unitData.SchwererJaeger(),
      new unitData.LeichterJaeger(),
      new unitData.Bomber(),
      new unitData.KleinerTransporter(),
      new unitData.Fregatte(),
      new unitData.MiningDrohne(),
      new unitData.GrosserTransporter(),
      new unitData.Zerstörer(),
      new unitData.Kreuzer(),
      new unitData.FlugDeckKreuzer(),
      new unitData.KolonieSchiff(),
      new unitData.BergBauSchiff(),
      new unitData.SchlachtKreuzer(),
      new unitData.SchlachtSchiff(),
      new unitData.TraegerSchiff(),
      new unitData.FlakGeschütz(),
      new unitData.Artillerie(),
      new unitData.LaserGeschütz(),
      new unitData.IonenKanone(),
      new unitData.PartikelKanone(),
      new unitData.Railgun(),
      new unitData.PlanetarerSchildGenerator(),
    ];
    const shipTypes = shipSchema.path("shipType").enumValues;
    shipTypes.forEach((type) => {
      let matchingUnit;
      const unitTypeStrings = Object.keys(Unit.unittype);
      shipArray.forEach((element) => {
        if (element instanceof Unit) {
          if (unitTypeStrings[element.unittype - 1] === type) {
            matchingUnit = element;
          }
        }
      });
      if (matchingUnit) {
        const newShip = new ship();
        newShip.setValues(type, matchingUnit);
        ships.push(newShip);
        newShip.save();
      } else {
        console.log("Fehler beim Instanzieren der Schiffe.");
      }
    });
    res.status(200).send("Schiffe erfolgreich erstellt und gespeichert");
  } catch (error) {
    res.status(500).send("Fehler beim Erstellen der Schiffe");
  }
};
//"/user/:userId/ship/:shipType/buildShip"
// GET: http://localhost:3000/shipyard/user/6707f5b128946e558e271814/ship/lightHunter/buildShip
// POST: http://localhost:3000/api/user/6707f5b128946e558e271814/building/Mine/upgrade  für Mine upgrade
export const getShip = async (req, res) => {
  try {
    const { userId, shipType, planetId } = req.params;
    const user = await User.findById(userId).populate({
      path: "planets",
      populate: { path: "ships" },
    });
    if (!user) {
      return res.status(404).send("Benutzer nicht gefunden");
    }

    const planet = user.planets.find(
      (planet) => planet._id.toString() === planetId
    );
    if (!planet) {
      return res.status(404).send("Planetlanet nicht gefunden");
    }

    const ship = planet.ships.find(
      (s) => s.shipType.toLowerCase() === shipType.toLowerCase()
    );

    if (!ship) {
      return res
        .status(404)
        .send(`Schiff mit dem Typ ${shipType} nicht gefunden`);
    }
    return res.status(200).send({
      ship,
      user,
    });
  } catch (error) {
    console.error("Fehler beim bauen des Schiffs:", error);
    return res.status(500).send("Serverfehler");
  }
};
export const buildShip = async (req, res) => {
  try {
    const { userId, shipType, planetId, amount } = req.params;

    // Finde den Benutzer anhand der ID und lade seine Planeten
    const user = await User.findById(userId).populate({
      path: "planets",
      populate: { path: "ships" },
    });
    if (!user) {
      return res.status(404).send("Benutzer nicht gefunden");
    }

    const planet = user.planets.find(
      (planet) => planet._id.toString() === planetId
    );
    if (!planet) {
      return res.status(404).send("Planetlanet nicht gefunden");
    }

    const ship = planet.ships.find(
      (s) => s.shipType.toLowerCase() === shipType.toLowerCase()
    );

    if (!ship) {
      return res
        .status(404)
        .send(`Schiff mit dem Typ ${shipType} nicht gefunden`);
    }
    const number = Number(amount);
    let shipsToBuild;
    if (!isNaN(number) && number > 0) {
      shipsToBuild = number;
    } else {
      shipsToBuild = 1;
    }
    let canBuild = true;
    for (const key in planet.resources.toObject()) {
      if (planet.resources[key] - ship.ressourceCosts[key] * shipsToBuild < 0) {
        console.log(`nicht genug ${key} für den bau vorhanden`);
        canBuild = false;
      }
    }

    if (canBuild) {
      for (const key in planet.resources.toObject()) {
        if (typeof planet.resources[key] === "number") {
          planet.resources[key] -= ship.ressourceCosts[key] * shipsToBuild;
        } else {
          canBuild = false;
        }
      }
      //ship.amount += shipsToBuild;
      const buildDuration = ship.buildTime * shipsToBuild * 1000; // in Millisekunden
      let buildFinishTime = new Date(Date.now() + buildDuration);
      const formatTimeUnit = (unit) => (unit < 10 ? `0${unit}` : unit);

      // Funktion, um die Zeit im Format "HH:mm:ss" zu erhalten
      const formatBuildFinishTime = (date) => {
        const hours = formatTimeUnit(date.getHours());
        const minutes = formatTimeUnit(date.getMinutes());
        const seconds = formatTimeUnit(date.getSeconds());

        return `${hours}:${minutes}:${seconds}`;
      };
      buildFinishTime = formatBuildFinishTime(buildFinishTime);
      if (ship.shipYardType === "lightShipyard") {
        planet.typeOfLightShipsInBuilding = ship.label;
        planet.lightShipIsBuilding = true;
        planet.amountOfLightShipsInBuilding = amount;
        planet.finishingTimeOfLightShipsInBuilding = buildFinishTime;
      }

      if (ship.shipYardType === "mediumShipyard") {
        planet.typeOfMediumShipsInBuilding = ship.label;
        planet.mediumShipIsBuilding = true;
        planet.amountOfMediumShipsInBuilding = amount;
        planet.finishingTimeOfMediumShipsInBuilding = buildFinishTime;
      }

      if (ship.shipYardType === "heavyShipyard") {
        planet.typeOfHeavyShipsInBuilding = ship.label;
        planet.heavyShipIsBuilding = true;
        planet.amountOfHeavyShipsInBuilding = amount;
        planet.finishingTimeOfHeavyShipsInBuilding = buildFinishTime;
      }

      // Plane eine Funktion, die das Schiff nach der Bauzeit aktualisiert
      await planet.save();
      setTimeout(async () => {
        // Erhöhe die Anzahl der Schiffe
        ship.amount += shipsToBuild;
        if (ship.shipYardType === "lightShipyard") {
          planet.typeOfLightShipsInBuilding = "none";
          planet.lightShipIsBuilding = false;
          planet.amountOfLightShipsInBuilding = 0;
        }

        if (ship.shipYardType === "mediumShipyard") {
          planet.typeOfMediumShipsInBuilding = "none";
          planet.mediumShipIsBuilding = false;
          planet.amountOfMediumShipsInBuilding = 0;
        }

        if (ship.shipYardType === "heavyShipyard") {
          planet.typeOfHeavyShipsInBuilding = "none";
          planet.heavyShipIsBuilding = false;
          planet.amountOfHeavyShipsInBuilding = 0;
        }
        // Speichern der neuen Anzahl
        await planet.save();

        console.log(`Bau von ${shipsToBuild} ${shipType} abgeschlossen!`);
      }, buildDuration);
    }

    //await planet.save();
    return res.status(200).send({
      message: "Schiff wurde erfolgreich gebaut",
      ship,
      user,
      planet,
    });
  } catch (error) {
    console.error("Fehler beim bauen des Schiffs:", error);
    return res.status(500).send("Serverfehler");
  }
};

export const sellShip = async (req, res) => {
  try {
    const { userId, shipType } = req.params;

    // Finde den Benutzer anhand der ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("Benutzer nicht gefunden");
    }

    // Suche das Gebäude anhand des buildingType im Home-Planeten des Benutzers
    const ship = user.planet.ships.find((s) => s.shipType === shipType);

    if (!ship) {
      return res
        .status(404)
        .send(`Schiff mit dem Typ ${shipType} nicht gefunden`);
    }

    if (ship.amount <= 1) {
      return res
        .status(400)
        .send(
          "Konnte nicht verkauft werden , es sind keine Schiffe dieses typs vorhanden"
        );
    }

    // verringere das Level um 1
    ship.amount -= 1;

    // Speichere den Benutzer mit dem aktualisierten Gebäude
    await user.save();

    return res.status(200).send({
      message: "Schiff wurde verkauft",
      ship: ship,
    });
  } catch (error) {
    console.error("Fehler beim Downgraden des Gebäudes:", error);
    return res.status(500).send("Serverfehler");
  }
};
export const getShipData = async (req, res) => {
  try {
    const ships = await ship.find();
    return res.status(200).json(ships);
  } catch (error) {
    console.error("Fehler beim Abrufen der Schiffe:", error);
    return res.status(500).send("Serverfehler");
  }
};
export const getPlayerShips = async (req, res) => {
  try {
    const { userId, planetId } = req.params;

    const user = await User.findById(userId).populate({
      path: "planets",
      populate: { path: "ships" },
    });
    if (!user) {
      return res.status(404).send("Benutzer nicht gefunden");
    }

    const planet = user.planets.find(
      (planet) => planet._id.toString() === planetId
    );
    if (!planet) {
      return res.status(404).send("Planetlanet nicht gefunden");
    }
    return res.status(200).json(planet.ships);
  } catch (error) {
    console.error("Fehler beim Abrufen der Gebäude:", error);
    return res.status(500).send("Serverfehler");
  }
};

// POST: http://localhost:3000/api/user/6707f5b128946e558e271814/building/Mine/upgrade  für Mine upgrade
// POST: http://localhost:3000/api/user/6707f5b128946e558e271814/building/Mine/downgrade für Mine downgrade
// GET: http://localhost:3000/api/user/6707f5b128946e558e271814/buildings für abfrufen aller Gebäude
