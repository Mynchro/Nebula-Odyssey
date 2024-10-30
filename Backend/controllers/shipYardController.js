import User from "../models/User.js";
import ship, { shipSchema } from "../models/Ships.js";
import { connectToDB } from "../libs/db.js";
import unitData from "../models/Data/unitData.js";
import Unit from "../models/Data/unit.js";
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
      new unitData.PlanetarerSchildGenerator()

    ]
    const shipTypes = shipSchema.path('shipType').enumValues;
    shipTypes.forEach(type => {


      let matchingUnit;
      const unitTypeStrings = Object.keys(Unit.unittype);
      shipArray.forEach(element => {
        if (element instanceof Unit) {
          if (unitTypeStrings[element.unittype - 1] === type) {
            matchingUnit = element;
          }
        }
      });
      if (matchingUnit) {
        const newShip = new ship();
        newShip.setValues(type, matchingUnit)
        ships.push(newShip);
        newShip.save();
        //console.log(newShip.ressourceCosts)
      }
      else { console.log("geht nicht") }
    });
    res.status(200).send("Schiffe erfolgreich erstellt und gespeichert");
  }
  catch (error) {
    res.status(500).send("Fehler beim Erstellen der Schiffe");
  }

  //return res.status(200).json(ships);

}
//"/user/:userId/ship/:shipType/buildShip"
// GET: http://localhost:3000/shipyard/user/6707f5b128946e558e271814/ship/lightHunter/buildShip
// POST: http://localhost:3000/api/user/6707f5b128946e558e271814/building/Mine/upgrade  für Mine upgrade
export const buildShip = async (req, res) => {
  try {
    const { userId, shipType, planetId } = req.params;

    // Finde den Benutzer anhand der ID und lade seine Planeten
    const user = await User.findById(userId).populate({
      path: "planets",
      populate: { path: "ships" }, 
    });
    if (!user) {
      return res.status(404).send("Benutzer nicht gefunden");
    }

    // Angenommen, du möchtest ein schiff bauen
    //const planet = user.planets[0]; // Gehe davon aus, dass der Heimatplanet der erste Planet ist
    const planet = user.planets.find((planet) => planet._id.toString() === planetId);
    if (!planet) {
      return res.status(404).send("Planetlanet nicht gefunden");
    }

    // console.log("Verfügbare Gebäude:", homePlanet.buildings); // Debugging

    // Suche das Gebäude anhand des buildingType im planeten
    const ship = planet.ships.find(
      (s) => s.shipType.toLowerCase() === shipType.toLowerCase()
    );

    if (!ship) {
      return res
        .status(404)
        .send(`Schiff mit dem Typ ${shipType} nicht gefunden`);
    }

    // Erhöhe das Level um 1
    
    
    let canBuild = true;
    for (const key in planet.resources.toObject()){
      if( planet.resources[key]-ship.ressourceCosts[key]<0){
        console.log(`nicht genug ${key} für den bau vorhanden`)
        canBuild = false;
      }
    }
    if(canBuild){
      for(const key in planet.resources){
        if (planet.resources[key] !== undefined && ship.ressourceCosts[key] !== undefined){
          planet.resources[key] -= ship.ressourceCosts[key];
        }
        
        //console.log(planet.resources[key])
        //console.log(ship.ressourceCosts[key])
      }
      ship.amount += 1;
    }
    //console.log(planet.resources);






    // Speichere den Planeten mit dem aktualisierten Gebäude
    await planet.save();

    return res.status(200).send({
      message: "Schiff wurde erfolgreich gebaut",
      ship,
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
    const ship = user.planet.ships.find(
      (s) => s.shipType === shipType
    );

    if (!ship) {
      return res
        .status(404)
        .send(`Schiff mit dem Typ ${shipType} nicht gefunden`);
    }

    if (ship.amount <= 1) {
      return res
        .status(400)
        .send("Konnte nicht verkauft werden , es sind keine Schiffe dieses typs vorhanden");
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

export const getAllShips = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User nichst gefunden");
    }

    const ships = user.homePlanet.ships;

    return res.status(200).json(ships);
  } catch (error) {
    console.error("Fehler beim Abrufen der Gebäude:", error);
    return res.status(500).send("Serverfehler");
  }
};

// POST: http://localhost:3000/api/user/6707f5b128946e558e271814/building/Mine/upgrade  für Mine upgrade
// POST: http://localhost:3000/api/user/6707f5b128946e558e271814/building/Mine/downgrade für Mine downgrade
// GET: http://localhost:3000/api/user/6707f5b128946e558e271814/buildings für abfrufen aller Gebäude
