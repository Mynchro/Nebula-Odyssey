import mongoose from "mongoose";
import { Resource } from "../models/Resources.js"; // Model importieren
import { connectToDB, closeDB } from "../libs/db.js"; // Verbindungen

export const seedResources = async () => {
  try {
    // Stelle die Verbindung zur Datenbank her
    await connectToDB();

    // Seed-Daten, die in die Datenbank eingetragen werden sollen
    const resources = {
      silicon: 1000,
      ores: 500,
      chemicals: 300,
      fuel: 200,
      energy: 1000,
      steel: 700,
      electronics: 400,
      ammo: 600,
    };

    // Erstelle ein neues Resource-Dokument in der Datenbank
    await Resource.create(resources);
    console.log("Resources successfully seeded!");
  } catch (error) {
    console.error("Error seeding resources:", error);
  } finally {
    // Schließe die Verbindung zur Datenbank
    await closeDB();
  }
};

// Starte den Seeder
// seedResources();
