import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { createAccessToken, createRefreshToken } from "../controllers/user.js";

export const authenticateAndRefresh = async (req, res, next) => {
    const { accessToken, refreshToken } = req.cookies;

    if (!accessToken) {
        return res
            .status(401)
            .json({ message: "Nicht autorisiert, bitte einloggen." });
    }

    try {
        // check access token
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        req.userId = decoded.userId;

        // load user from db
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: "User existiert nicht" });
        }
        req.user = user;

        next();
    } catch (error) {
        // access-token expired?
        if (error.name === "TokenExpiredError") {
            if (!refreshToken) {
                return res.status(401).json({ message: "Bitte neu einloggen" });
            }

            try {
                // validate refresh-token, create new access-token
                const decoded = jwt.verify(
                    refreshToken,
                    process.env.JWT_SECRET
                );
                const newAccessToken = createAccessToken(decoded.userId);
                const newRefreshToken = createRefreshToken(decoded.userId);

                // set new tokens as http-only cookies
                res.cookie("accessToken", newAccessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 2 * 60 * 60 * 1000, // 2h
                });
                res.cookie("refreshToken", newRefreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 14 * 24 * 60 * 60 * 1000, // 14d
                });

                // set userId as req for later access
                req.userId = decoded.userId;
                req.user = await User.findById(decoded.userId);

                next();
            } catch (refreshError) {
                return res
                    .status(403)
                    .json({
                        message:
                            "Ungültiger Refresh-Token, bitte neu einloggen",
                    });
            }
        } else {
            return res.status(403).json({ message: "Zugriff verweigert." });
        }
    }
};
