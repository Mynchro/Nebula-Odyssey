import { buildingSchema } from "../models/Buildings.js";
import Planet from "../models/Planet.js"; // Importiere das Planetenmodell

// Funktion zur Berechnung der Ressourcen basierend auf der Produktionsrate und der verstrichenen Zeit
const calculateResourcesForTimePeriod = (
    planet,
    lastCalculation,
    currentTime
) => {
    const timeDifferenceInSeconds = (currentTime - lastCalculation) / 1000; // Zeitunterschied in Sekunden
    if (timeDifferenceInSeconds <= 0) return;

    // Schleife durch alle Gebäude des Planeten
    planet.buildings.forEach((building) => {
        if (!building.productionRate) return; // Skip, wenn keine Produktionsrate vorhanden

        // Schleife durch alle Ressourcen in der Produktionsrate
        Object.keys(building.productionRate).forEach((resource) => {
            const hourlyRate = building.productionRate[resource] || 0; // Fallback auf 0
            const perSecondRate = hourlyRate / 3600; // Umrechnung auf Produktion pro Sekunde
            planet.resources[resource] =
                (planet.resources[resource] || 0) +
                perSecondRate * timeDifferenceInSeconds;
        });
    });
};

// Hauptfunktion zur Berechnung der Ressourcen für alle Planeten
export async function calculateResources() {
    try {
        // Abrufen aller Planeten, inklusive der Gebäudedaten
        const planets = await Planet.find().populate("buildings");

        const bulkOps = []; // Array für alle Bulk-Operationen

        const currentTime = Date.now(); // Aktuelle Zeit für die Berechnung

        // Durchlaufen aller Planeten zur Ressourcenberechnung
        planets.forEach((planet) => {
            const lastCalculation = planet.lastResourceUpdate || currentTime; // Zeitpunkt der letzten Berechnung

            // Berechne die Ressourcen für den Planeten
            calculateResourcesForTimePeriod(
                planet,
                lastCalculation,
                currentTime
            );

            // Füge eine Bulk-Update-Operation zum Array hinzu
            bulkOps.push({
                updateOne: {
                    filter: { _id: planet._id }, // Finde den Planeten anhand seiner ID
                    update: {
                        $set: {
                            resources: planet.resources, // Aktualisierte Ressourcen
                            lastResourceUpdate: currentTime, // Aktualisierter Zeitstempel
                        },
                    },
                },
            });
        });

        // Führe alle Bulk-Operationen in einer einzigen Datenbankabfrage aus
        if (bulkOps.length > 0) {
            await Planet.bulkWrite(bulkOps);
            console.log(
                "Alle Planetenressourcen wurden erfolgreich aktualisiert."
            );
        } else {
            console.log("Keine Planeten zur Aktualisierung vorhanden.");
        }
    } catch (error) {
        console.error("Fehler bei der Ressourcenberechnung:", error);
    }
}
