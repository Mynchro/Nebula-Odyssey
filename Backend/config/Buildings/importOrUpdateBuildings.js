import mongoose from "mongoose";
import Building from "../../models/Buildings.js";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const { ADMIN } = process.env;
const MONGO_URI = `mongodb+srv://Admin:${ADMIN}@nebulaodysseycluster.4gaxp.mongodb.net/NebulaOdyssey?retryWrites=true&w=majority&appName=NebulaOdysseyCluster`; // Setze deine MongoDB-Verbindung

// Verbindung zur MongoDB herstellen
mongoose
    .connect(MONGO_URI)
    .then(() => console.log("MongoDB verbunden"))
    .catch((err) => console.error("Fehler beim Verbinden mit MongoDB", err));

// Funktion zum Importieren der Gebäude
const importOrUpdateBuildings = async () => {
    try {
        // JSON-Datei laden
        const filePath = path.join(__dirname, "defaultBuildings.json");

        // Überprüfen, ob die Datei existiert
        if (!fs.existsSync(filePath)) {
            throw new Error(`Die Datei ${filePath} wurde nicht gefunden.`);
        }

        // Datei lesen und parsen
        const data = fs.readFileSync(filePath, "utf8");

        // Überprüfen, ob die Datei Daten enthält
        if (!data) {
            throw new Error(
                "Die JSON-Datei ist leer oder konnte nicht gelesen werden."
            );
        }

        const buildings = JSON.parse(data);

        // Überprüfen, ob das JSON-Dokument ein Array ist
        if (!Array.isArray(buildings)) {
            throw new Error(
                "Erwartetes JSON-Format ist ein Array, aber ein anderes Format wurde gefunden."
            );
        }

        for (const buildingData of buildings) {
            const { buildingType, level } = buildingData;

            // Suche nach einem existierenden Gebäude basierend auf buildingType
            const existingBuilding = await Building.findOne({
                buildingType,
            });

            if (existingBuilding) {
                // Wenn das Gebäude existiert, wird es aktualisiert
                await Building.updateOne(
                    { _id: existingBuilding._id },
                    buildingData
                );
                console.log(`Gebäude ${buildingType} wurde aktualisiert.`);
            } else {
                // Andernfalls wird ein neues Gebäude erstellt
                await Building.create(buildingData);
                console.log(`Gebäude ${buildingType} wurde hinzugefügt.`);
            }
        }

        console.log("Import oder Update abgeschlossen.");
    } catch (error) {
        console.error(
            "Fehler beim Importieren oder Aktualisieren der Gebäude",
            error
        );
    } finally {
        mongoose.connection.close();
    }
};

// Funktion aufrufen
importOrUpdateBuildings();
