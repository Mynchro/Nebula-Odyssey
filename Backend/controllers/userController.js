import bcrypt from "bcrypt";
import User from "../models/User.js";

// user-registration

export const register = async (req, res) => {
  const { userName, email, password, confirmPassword } = req.body;

  // check if password and confirmPassword match

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ message: "Die Passwörter stimmen nicht überein!" });
  }

  // check password-safety with regex

  const isPasswordStrong = (password) => {
    const passwordRequirements =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/; // Mindestens 8 Zeichen, mindestens 1 Kleinbuchstabe, 1 Großbuchstabe, 1 Zahl und 1 Sonderzeichen
    return passwordRequirements.test(password);
  };

  if (!isPasswordStrong(password)) {
    return res.status(400).json({
      message:
        "Das Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten.",
    });
  }

  try {
    // check existing User

    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({
        message: "Username ist bereits vergeben, wähle einen anderen!",
      });
    }

    // hash password with bcrypt

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res
      .status(201)
      .json({ message: "Benutzer erfolgreich registriert!" });
  } catch (error) {
    console.error("Fehler bei der Registrierung:", error);
    return res
      .status(500)
      .json({ message: "Serverfehler, versuche es erneut" });
  }
};

// user-login

export const login = async (req, res) => {
  const { userName, password } = req.body;

  try {
    // check if user exists in the db
    const existingUser = await User.findOne({ userName });
    if (!existingUser) {
      return res.status(400).json({ message: "User existiert nicht!" });
      // user exists? proceed
    }
    // compare password with hash via bcrypt
    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Benutzername oder Passwort sind ungültig!" });
    }

    return res.status(200).json({ message: "Login erfolgreich!" });
  } catch (error) {
    console.error("Fehler beim Login:", error);
    return res
      .status(500)
      .json({ message: "Etwas ist schiefgelaufen, probier es nochmal." });
  }
};

// update User

export const updateUser = async (req, res) => {
  const { userName, newUserName, newEmail, newPassword } = req.body;

  try {
    const updateData = {};

    // validate new userName
    if (newUserName) {
      const existingUser = await User.findOne({ userName: newUserName });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Benutzername bereits vergeben." });
      }
      updateData.userName = newUserName;
    }

    // validate new email
    if (newEmail) {
      const existingEmail = await User.findOne({ email: newEmail });
      if (existingEmail) {
        return res.status(400).json({ message: "E-Mail bereits vergeben." });
      }
      updateData.email = newEmail;
    }

    // update password
    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findOneAndUpdate(
      { userName },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User existiert nicht!" });
    }

    return res.status(200).json({
      message: "Benutzer erfolgreich aktualisiert!",
      user: { userName: updatedUser.userName, email: updatedUser.email },
    });
  } catch (error) {
    console.error("Fehler beim Aktualisieren des Benutzers:", error);
    return res
      .status(500)
      .json({ message: "Etwas ist schiefgelaufen, probier es nochmal." });
  }
};
