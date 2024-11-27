import mongoose from "mongoose";
import { buildingSchema } from "./Buildings.js";
import { resourceSchema } from "./Resources.js";
import { shipSchema } from "./Ships.js";
const { Schema } = mongoose;

const planetSchema = new Schema({
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
  lightShipIsBuilding: {
    type: Boolean,
    default: false
  },
  mediumShipIsBuilding:{
    type:Boolean,
    default:false,
  },
  heavyShipIsBuilding:{
    type:Boolean,
    default:false,
  },
  typeOfLightShipsInBuilding:{
    type:String,
    default:"none"
  },
  typeOfMediumShipsInBuilding:{
    type:String,
    default:"none"
  },
  typeOfHeavyShipsInBuilding:{
    type:String,
    default:"none"
  },
  amountOfLightShipsInBuilding:{
    type:Number,
    default:1,
  },
  amountOfMediumShipsInBuilding:{
    type:Number,
    default:1,
  },
  amountOfHeavyShipsInBuilding:{
    type:Number,
    default:1,
  },
  finishingTimeOfLightShipsInBuilding:{
    type:String,
    default:"00:00:00",
  },
  finishingTimeOfMediumShipsInBuilding:{
    type:String,
    default:"00:00:00",
  },
  finishingTimeOfHeavyShipsInBuilding:{
    type:String,
    default:"00:00:00",
  },
  buildings: [buildingSchema], // Gebäude als Unterdokumente
  resources: {
    type: resourceSchema, // Ressourcen bleiben gleich
    default: {},
  },
  lastResourceUpdate: { type: Date, default: Date.now },
  ships: [shipSchema],
  position: {
    // Position des Planeten auf der Seite
    page: {
      type: Number,
      required: true,
    },
    positionOnPage: {
      type: Number,
      required: true,
    },
  },
});

const Planet = mongoose.model("Planet", planetSchema);

export default Planet;

// Planet X -> Building = leeres Array (default), Owner = null
// User nimmt Planet X ein
// -> if owner = User:
//      planet.buildings populate (? anhand der building-collection, liegt bereits in der DB)
//      owner = user.id
