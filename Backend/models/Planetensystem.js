import mongoose from "mongoose";
const { Schema } = mongoose;

const galaxySchema = new Schema({
  systemName: {
    type: String,
    required: true,
  },
  solarSystem: {
    type: Number,
    required: true,
  },
  planets: [
    {
      type: Schema.Types.ObjectId,
      ref: "Planet",
    },
  ],
});

const Galaxy = mongoose.model("Galaxy", galaxySchema);

export default Galaxy;
