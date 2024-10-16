// models/resource.js
import mongoose from "mongoose";
const { Schema } = mongoose;

export const resourceSchema = new Schema({
  silicon: {
    type: Number,
    default: 0,
  },
  ores: {
    type: Number,
    default: 0,
  },
  chemicals: {
    type: Number,
    default: 0,
  },
  fuel: {
    type: Number,
    default: 0,
  },
  energy: {
    type: Number,
    default: 0,
  },
  steel: {
    type: Number,
    default: 0,
  },
  electronics: {
    type: Number,
    default: 0,
  },
  ammo: {
    type: Number,
    default: 0,
  },
  _id: false,
});

export default resourceSchema;
