import mongoose from "mongoose";
import resourceSchema from "./Resources.js";
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
  homePlanet: {
    type: homePlanetSchema, // Verknüpfe das homePlanetSchema hier
    default: () => ({
      planetName: "Nebula Zero",
      resources: {
        silicon: 50,
        ores: 100,
        energy: 5000,
      },
      buildings: [
        {
          buildingType: "Mine",
          level: 1,
          productionRate: {
            silicon: 125,
            ores: 225,
            chemicals: 100,
            energy: -25,
          },
        },
        {
          buildingType: "Ammofactory",
          level: 0,
          productionRate: {
            chemicals: -25,
            energy: -100,
            steel: -50,
            ammo: 50,
          },
        },
        {
          buildingType: "Fuelfactory",
          level: 1,
          productionRate: {
            chemicals: -50,
            fuel: 100,
            energy: -25,
          },
        },
        {
          buildingType: "Solarplant",
          level: 1,
          productionRate: {
            energy: 100,
          },
        },
        {
          buildingType: "Powerplant",
          level: 1,
          productionRate: {
            fuel: -100,
            energy: 250,
          },
        },
        {
          buildingType: "Refinery",
          level: 1,
          productionRate: {
            silicon: -100,
            ores: -200,
            energy: -50,
            steel: 200,
            electronics: 100,
          },
        },
        {
          buildingType: "Junkyard",
          level: 0,
          productionRate: {},
        },
        {
          buildingType: "Recycler",
          level: 0,
          productionRate: {},
        },
        {
          buildingType: "Spycenter",
          level: 0,
          productionRate: {},
        },
        {
          buildingType: "smallShipyard",
          level: 0,
          productionRate: {},
        },
        {
          buildingType: "mediumShipyard",
          level: 0,
          productionRate: {},
        },
        {
          buildingType: "largeShipyard",
          level: 0,
          productionRate: {},
        },
        {
          buildingType: "Fueldepot",
          level: 0,
          productionRate: {},
        },
        {
          buildingType: "Oredepot",
          level: 0,
          productionRate: {},
        },
        {
          buildingType: "Chemicaldepot",
          level: 0,
          productionRate: {},
        },
        {
          buildingType: "Ammodepot",
          level: 0,
          productionRate: {},
        },
        {
          buildingType: "Steeldepot",
          level: 0,
          productionRate: {},
        },
        {
          buildingType: "Energystorage",
          level: 0,
          productionRate: {},
        },
        {
          buildingType: "Silicondepot",
          level: 0,
          productionRate: {},
        },
        {
          buildingType: "Mikrochipdepot",
          level: 0,
          productionRate: {},
        },
      ],
    }),
  },
  planets: [
    {
      type: Schema.Types.ObjectId,
      ref: "Planet",
      default: [],
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
