// Buildings.js
import mongoose from "mongoose";
import { resourceSchema } from "./Resources.js";
const { Schema } = mongoose;

export const buildingSchema = new Schema({
    buildingType: {
        type: String,
        enum: [
            "Mine",
            "Ammofactory",
            "Fuelfactory",
            "Solarplant",
            "Powerplant",
            "Refinery",
            "Junkyard",
            "Recycler",
            "Spycenter",
            "smallShipyard",
            "mediumShipyard",
            "largeShipyard",
            "Fueldepot",
            "Oredepot",
            "Chemicaldepot",
            "Ammodepot",
            "Steeldepot",
            "Energystorage",
            "Silicondepot",
            "Mikrochipdepot",
        ],
        required: true, // Es ist wichtig, den Gebäudetyp als erforderlich zu setzen
    },
    level: {
        type: Number,
        default: 0,
    },
    status: {
        type: Boolean,
    },
    category: {
        type: String,
    },
    originalBuildingId: {
        type: Schema.Types.ObjectId, // Füge die originalBuildingId hinzu
    },
    constructionTime: {
        type: Number,
        default: 0,
    },
    constructionCosts: {
        type: resourceSchema,
        default: {},
    },
    productionRate: {
        type: resourceSchema,
        default: {},
    },
    storageCapacity: {
        type: Number,
        default: 0,
    },
});

const Building = mongoose.model("Building", buildingSchema);

// Default-Export für Building
export default Building;
