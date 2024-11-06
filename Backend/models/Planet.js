import mongoose from "mongoose";
import { buildingSchema } from "./Buildings.js";
import { resourceSchema } from "./Resources.js";
import { shipSchema } from "./Ships.js";
const { Schema } = mongoose;

const planetSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  buildings: [buildingSchema], // Gebäude als Unterdokumente
  resources: {
    type: resourceSchema, // Ressourcen bleiben gleich
    default: {},
  },
  lastResourceUpdate: { type: Date, default: Date.now },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    name: {
        type: String,
        required: true,
        default: "",
    },
    image: {
        type: String,
        default: "",
    },
    buildings: [buildingSchema], // Gebäude als Unterdokumente
    ships: [shipSchema],
  resources: {
        type: resourceSchema, // Ressourcen bleiben gleich
        default: {},
    },
});

const Planet = mongoose.model("Planet", planetSchema);

export default Planet;

// Planet X -> Building = leeres Array (default), Owner = null
// User nimmt Planet X ein
// -> if owner = User:
//      planet.buildings populate (? anhand der building-collection, liegt bereits in der DB)
//      owner = user.id
