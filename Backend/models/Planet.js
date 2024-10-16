import mongoose from "mongoose";
import { buildingSchema } from "./Buildings.js";
import resourceSchema from "./resources.js";
const { Schema } = mongoose;

const planetSchema = new Schema({
  starSystem: {
    // type: Schema.Types.ObjectId,
    // ref: 'Galaxy',
    type: String,
    required: true,
  },
  position: {
    type: Number,
    required: true,
    min: 1,
    max: 16,
  },
  owner: {
    type: String,
    // ref: 'User',
    // default: null,
  },
  name: {
    type: String,
    required: true,
  },
  resources: resourceSchema,
  buildings: { type: [buildingSchema], default: [] },
  research: [
    {
      // type: Schema.Types.ObjectId,
      type: String,
      // ref: 'Research',
    },
  ],
  shipyard: [
    {
      // type: Schema.Types.ObjectId,
      type: String,
      // ref: 'Shipyard',
    },
  ],
});

const Planet = mongoose.model("Planet", planetSchema);

export default Planet;
