import mongoose from "mongoose";
import { resourceSchema } from "./Resources.js";
import { buildingSchema } from "./Buildings.js";
const { Schema } = mongoose;

// Define the homePlanet schema with default resources and buildings
const homePlanetSchema = new Schema({
    planetName: { type: String, default: "Nebula Zero" },
    resources: {
        type: resourceSchema,
        default: {
            silicon: 50,
            ores: 100,
            energy: 5000,
        },
    },
    buildings: {
        type: [buildingSchema], // Array von Gebäuden im Homeplanet
        default: [],
    },
});

// Define the user schema
const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    settings: {
        color: {
            type: String, // Hex-Wert oder Farbcodes als String
            default: "#ffffff", // Standardfarbe (z. B. Weiß)
        },
    },
    planets: [
        {
            type: Schema.Types.ObjectId,
            ref: "Planet",
        },
    ],
    score: {
        type: Number,
    },
    notes: {
        type: Object,
    },
});

// don't send password/email as server-response
userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    delete user.email;
    return user;
};

const User = mongoose.model("User", userSchema);

export default User;
