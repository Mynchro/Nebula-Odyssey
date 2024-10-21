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
  originalBuildingId: {
    // Füge die originalBuildingId hinzu
    type: Schema.Types.ObjectId,
  },
  productionRate: {
    type: resourceSchema,
    default: {}, // Standardmäßig leeres Objekt
  },
});

const Building = mongoose.model("Building", buildingSchema);

// Default-Export für Building
export default Building;
