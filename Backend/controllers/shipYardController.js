import User from "../models/User.js";
import Planet from "../models/Planet.js";

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
export const instantiateShips = async(req,res)=>{
    try{
        const userId = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("Benutzer nicht gefunden!");
          }
          const ships = user.homePlanet.ships;
          try{
            console.log("hier");
            console.log("ships");
            console.log("hier");
          }
          catch{
            console.log("funzt nicht")
          }
          
          return res.status(200).json(ships);
    }
    catch(error){
    console.error("fehler beim abrufen der schiffe")
    return res.status(500).send("serverfehler")
    }
}
// GET: http://localhost:3000/api/user/6707f5b128946e558e271814/resources für abfrufen aller Gebäude

export const buildShip = async (req, res) => {
  try {
    const { userId, shipType } = req.params;

    // Finde den Benutzer anhand der ID und lade seine Planeten
    const user = await User.findById(userId).populate({
      path: "planets",
      populate: { path: "ships" }, // Populiere die Gebäude des Planeten
    });
    if (!user) {
      return res.status(404).send("Benutzer nicht gefunden");
    }

    // Angenommen, du möchtest das Gebäude auf dem Heimatplaneten upgraden
    const planet = user.planets[0]; // Gehe davon aus, dass der Heimatplanet der erste Planet ist
    if (!planet) {
      return res.status(404).send("Planetlanet nicht gefunden");
    }

    // console.log("Verfügbare Gebäude:", homePlanet.buildings); // Debugging

    // Suche das Gebäude anhand des buildingType im Heimatplaneten
    const ship = planet.ships.find(
      (s) => s.shipType.toLowerCase() === shipType.toLowerCase()
    );

    if (!ship) {
      return res
        .status(404)
        .send(`Schiff mit dem Typ ${shipType} nicht gefunden`);
    }

    // Erhöhe das Level um 1
    ship.amount += 1;

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
