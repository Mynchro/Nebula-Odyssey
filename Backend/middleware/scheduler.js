import cron from "node-cron"; // Importiere das Cron-Paket
import { calculateResources } from "./resourceCalculation.js"; // Importiere die Berechnungsfunktion

// Cron-Job, der alle 5 Minuten ausgeführt wird
export const startResourceCalculation = () => {
    cron.schedule("*/5 * * * *", async () => {
        console.log("Starte Ressourcenberechnung...");
        try {
            await calculateResources(); // Berechnungsfunktion aufrufen
            console.log("Ressourcenberechnung abgeschlossen.");
        } catch (error) {
            console.error("Fehler bei der Ressourcenberechnung:", error);
        }
    });
};
