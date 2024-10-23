import Planet from "../models/Planet.js";

// Funktion zur Berechnung der Ressourcen für einen spezifischen Planeten
const calculatePlanetResources = async (planet) => {
    let totalProduction = {
        silicon: 0,
        ores: 0,
        chemicals: 0,
        fuel: 0,
        energy: 0,
        steel: 0,
        electronics: 0,
        ammo: 0,
    };

    // Berechnung der Produktionsraten basierend auf den Gebäuden des Planeten
    if (planet.buildings && planet.buildings.length > 0) {
        for (const building of planet.buildings) {
            totalProduction.silicon += building.productionRate.silicon || 0;
            totalProduction.ores += building.productionRate.ores || 0;
            totalProduction.chemicals += building.productionRate.chemicals || 0;
            totalProduction.fuel += building.productionRate.fuel || 0;
            totalProduction.energy += building.productionRate.energy || 0;
            totalProduction.steel += building.productionRate.steel || 0;
            totalProduction.electronics +=
                building.productionRate.electronics || 0;
            totalProduction.ammo += building.productionRate.ammo || 0;
        }
    }

    // Füge die Gesamtproduktion zu den resourcen des Planeten hinzu
    planet.resources.silicon += totalProduction.silicon;
    planet.resources.ores += totalProduction.ores;
    planet.resources.chemicals += totalProduction.chemicals;
    planet.resources.fuel += totalProduction.fuel;
    planet.resources.energy += totalProduction.energy;
    planet.resources.steel += totalProduction.steel;
    planet.resources.electronics += totalProduction.electronics;
    planet.resources.ammo += totalProduction.ammo;

    // Speichere die aktualisierten resourcen des Planeten
    await planet.save();
    console.log(
        `Ressourcen für ${planet.name} wurden erfolgreich aktualisiert.`
    );
};

// Hauptfunktion zur Berechnung der Ressourcen für alle Planeten
export async function calculateResources() {
    setInterval(async () => {
        try {
            // Alle Planeten abrufen und die Gebäude befüllen
            const planets = await Planet.find().populate("buildings");

            // Berechnung für jeden Planeten einzeln
            for (const planet of planets) {
                await calculatePlanetResources(planet);
            }

            console.log("Alle Planeten wurden erfolgreich aktualisiert.");
        } catch (error) {
            console.error("Fehler bei der Ressourcenberechnung:", error);
        }
    }, 30000); // alle 30 Sekunden ausführen
}
