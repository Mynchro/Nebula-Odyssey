import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { createPlayerworld } from "../seeder/createPlayerworld.js";
import TokenBlacklist from "../models/TokenBlacklist.js";

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

        // Bestimme die nächste verfügbare Seite
        const userCount = await User.countDocuments();
        const pageNumber = userCount + 1; // Setze die Seite auf userCount + 1

        // hash password with bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user
        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
            page: pageNumber,
        });

        // Save the user
        await newUser.save();

        const homePlanet = await createPlayerworld(newUser._id);

        // newUser.planets.push(homePlanet._id);

        return res.status(201).json({
            message:
                "Benutzer erfolgreich registriert! Heimatplanet zugewiesen!",
        });
    } catch (error) {
        console.error("Fehler bei der Registrierung:", error);
        return res
            .status(500)
            .json({ message: "Serverfehler, versuche es erneut" });
    }
};

// user-login with token-creation

export const createAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "2h" });
};

export const createRefreshToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "14d" });
};

export const login = async (req, res) => {
    const { userName, password } = req.body;

    try {
        // check if user exists in the db
        const user = await User.findOne({ userName }).populate({
            path: "planets",
            populate: [
                { path: "buildings" },
                { path: "position", select: "page" },
            ],
        });

        if (!user) {
            return res.status(400).json({ message: "User existiert nicht!" });
            // user exists? proceed
        }
        // compare password with hash via bcrypt
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res
                .status(400)
                .json({ message: "Benutzername oder Passwort sind ungültig!" });
        }

        // generate tokens

        const accessToken = createAccessToken(user._id);
        const refreshToken = createRefreshToken(user._id);

        // set httpOnly-Cookies

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 2 * 60 * 60 * 1000, // 2 Stunden
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 14 * 24 * 60 * 60 * 1000, // 14 Tage
        });

        return res.status(200).json({
            message: "Login erfolgreich!",
            user: {
                userName: user.userName,
                planets: user.planets,
                _id: user._id,
                settings: user.settings,
                page: user.page,
                buildingInProgress: user.buildingInProgress,
            },
        });
    } catch (error) {
        console.error("Fehler beim Login:", error);
        return res
            .status(500)
            .json({ message: "Etwas ist schiefgelaufen, probier es nochmal." });
    }
};

// token-endpoint

export const refreshAccessToken = async (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return res.status(401).json({
            message: "Kein Refresh-Token vorhanden, bitte einloggen.",
        });
    }

    try {
        // check refreshtoken
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const newAccessToken = createAccessToken(decoded.userId);
        const newRefreshToken = createRefreshToken(decoded.userId);

        // set new refresh-token
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 14 * 24 * 60 * 60 * 1000, // 14 Tage
        });

        // set new access-token
        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 2 * 60 * 60 * 1000, // 2 Stunden
        });

        return res
            .status(200)
            .json({ message: "Access-Token erfolgreich erneuert." });
    } catch (error) {
        return res.status(403).json({ message: "Ungültiger Refresh-Token." });
    }
};

export const checkLoginStatus = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate({
            path: "planets",
            populate: [
                { path: "buildings" },
                { path: "position", select: "page" },
            ], // Populiere die Gebäude des Planeten
        });
        if (!user) return res.sendStatus(404);

        return res.json({
            _id: user._id,
            userName: user.userName,
            settings: user.settings,
            planets: user.planets,
            page: user.page,
            buildingInProgress: user.buildingInProgress,
        });
    } catch (error) {
        console.error("Fehler bei /check:", error);
        res.sendStatus(500);
    }
};

// logout
export const logout = async (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return res
            .status(400)
            .json({ message: "Kein Refresh-Token vorhanden." });
    }
    try {
        // check and decode refresh-token
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

        // blacklist refresh-token
        await TokenBlacklist.create({
            token: refreshToken,
            expiresAt: new Date(decoded.exp * 1000), // *1000 to convert expirationDate into a JavaScript-date from seconds to milliseconds
        });

        res.clearCookie("accessToken", {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });

        res.status(200).json({ message: "Logout erfolgreich!" });
    } catch (error) {
        return res.status(400).json({ message: "Ungültiger Token." });
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
                return res
                    .status(400)
                    .json({ message: "E-Mail bereits vergeben." });
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
        console.log("Updating user", req.userId, req.body);
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
