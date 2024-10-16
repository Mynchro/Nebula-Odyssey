import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { ADMIN } = process.env;
const uri = `mongodb+srv://Admin:${ADMIN}@nebulaodysseycluster.4gaxp.mongodb.net/NebulaOdyssey?retryWrites=true&w=majority&appName=NebulaOdysseyCluster`;

export const connectToDB = async () => {
    try {
        // Setze Event-Listener für die Verbindung
        mongoose.connection.on("error", (error) => {
            console.error("Failed to connect to MongoDB:", error);
        });

        mongoose.connection.on("connected", () => {
            console.log("Connected to MongoDB");
        });

        // Verbindung zur Datenbank herstellen
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 30000, // Timeout auf 30 Sekunden erhöht
        });
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1);
    }
};

export const closeDB = async () => {
    try {
        await mongoose.connection.close();
        console.log("Database connection closed.");
    } catch (error) {
        console.error("Error closing the database connection:", error);
    }
};
