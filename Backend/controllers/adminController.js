import User from "../models/User.js";
import bcrypt from "bcrypt";

// show Users

export const showUserList = async (req, res) => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: "Es liegen keine Dokumente vor." });
    }

    const showEmail = req.query.showEmail === "true";

    const result = users.map((user) => {
      const userData = { userName: user.userName };
      if (showEmail) {
        userData.email = user.email;
      }
      return userData;
    });

    res.status(200).json({
      message: "Die Kollektion users enthält folgende Benutzer:",
      users: result,
    });
  } catch (error) {
    console.error("Fehler beim Abrufen der Daten.", error);
    res.status(400).json({ message: "Fehler beim Abrufen der Daten." });
  }
};

// delete User

export const deleteUser = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const existingUser = await User.findOne({ userName });
    if (!existingUser) {
      return res.status(404).json({ message: "User existiert nicht!" });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ message: "Das eingegebene Passwort ist falsch" });
    }

    await User.deleteOne({ _id: existingUser._id });

    return res.status(200).json({ message: "User erfolgreich gelöscht" });
  } catch (error) {
    console.error("Fehler beim Löschen des Benutzers.", error);
    res.status(500).json({ message: "Fehler beim Abrufen der Daten." });
  }
};
