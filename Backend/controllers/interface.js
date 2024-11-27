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

export const getAllPlanets = async (req, res) => {
  try {
    const planets = await Planet.find().populate("owner", "userName");
    res.json(planets);
  } catch (error) {
    console.error("Fehler beim Abrufen der Planeten:", error);
    res.status(500).json({ error: "Interner Serverfehler" });
  }
};

export const updatePlayerColor = async (req, res) => {
  try {
    const { userId } = req.params;
    const { color } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { "settings.color": color },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "Spieler nicht gefunden" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Fehler beim Aktualisieren der Farbe" });
  }
};

// Controller zum Abrufen eines Spielers
export const getPlayer = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "Spieler nicht gefunden" });
    }

    res.json(user); // Gibt das Spielerobjekt zurück
  } catch (error) {
    res.status(500).json({ error: "Fehler beim Abrufen des Spielers" });
  }
};
export const getPlanetById = async (req, res) => {
  console.log("start der getPlanetById funktion ")
  try {
    const { userId, planetId } = req.params;

    const user = await User.findById(userId).populate({
      path: "planets",
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
    return res.status(200).json(planet);
  } catch (error) {
    console.error("Fehler beim Abrufen der Gebäude:", error);
    return res.status(500).send("Serverfehler");
  }
};

export const colonizePlanet = async (req, res) => {
  const { planetId, userId } = req.params;

  try {
    const updatedPlanet = await Planet.findByIdAndUpdate(
      planetId,
      { owner: userId },
      { new: true }
    );

    if (!updatedPlanet) {
      return res.status(404).json({ message: "Planet nicht gefunden" });
    }

    const updateUser = await User.findByIdAndUpdate(
      userId,
      { $push: { planets: updatedPlanet._id } },
      { new: true }
    );

    const populatedUser = await updateUser.populate({
      path: "planets",
      populate: [{ path: "buildings" }, { path: "position", select: "page" }],
    });

    res.json({ updatedPlanet, populatedUser });
  } catch (error) {
    console.error("Fehler beim Aktualisieren des Planeten:", error);
    res.status(500).json({ message: "Fehler beim Besiedeln des Planeten" });
  }
};
