import mongoose from "mongoose";
const { Schema } = mongoose;

// Das Schema für den Bauprozess
const buildProcessSchema = new Schema({
  playerId: {
    type: mongoose.Schema.Types.ObjectId, // Referenz auf den Spieler
    ref: "User", // Name des Playerschemas
    required: true,
  },
  planetId: {
    type: mongoose.Schema.Types.ObjectId, // Referenz auf den Planeten
    ref: "Planet", // Name des Planetenschemas
    required: true,
  },
  shipType: {
    type: String, // Der Typ des Schiffs (z.B. "Kreuzer", "Zerstörer")
    required: true,
  },
  amount: {
    type: Number, // Anzahl der Schiffe, die gebaut werden sollen
    required: true,
  },
  totalTime: {
    type: Number, // Gesamtbauzeit in Sekunden
    required: true,
  },
  remainingTime: {
    type: Number, // Verbleibende Bauzeit in Sekunden
    required: true,
  },
  createdAt: {
    type: Date, // Zeitstempel für den Startzeitpunkt
    default: Date.now,
  },
  status: {
    type: String, // Status des Bauprozesses
    enum: ["in_progress", "completed"], // Zulässige Werte
    default: "in_progress",
  },
});

const BuildProcess = mongoose.model("BuildProcess", buildProcessSchema);

export default BuildProcess;
