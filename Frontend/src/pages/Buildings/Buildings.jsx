import "./Buildings.css";
import { useState, useEffect, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { PlayerContext } from "../../context/PlayerContext";

const Buildings = () => {
  const { selectedPlanet } = useOutletContext();
  const [isBuildingOn, setIsBuildingOn] = useState(false);
  const { currentPlayer, countdown, startCountdown, setCountdown, setConstructionEndTime, constructionEndTime, } = useContext(PlayerContext);
  const userId = currentPlayer?._id;
  const [loading, setLoading] = useState(false);


  const [activeType, setActiveType] = useState(() => {
    return localStorage.getItem("activeType") || "produktion";
  });

  const [selectedBuilding, setSelectedBuilding] = useState(() => {
    const savedBuilding = localStorage.getItem("selectedBuilding");
    return savedBuilding ? JSON.parse(savedBuilding) : null;
  });

  const buildingDataMap = {
    smallShipyard: "Kleine Raumwerft",
    mediumShipyard: "Mittlere Raumwerft",
    largeShipyard: "Große Raumwerft",
    Mine: "Bergwerk",
    Ammofactory: "Munitionsfabrik",
    Fuelfactory: "Treibstofffabrik",
    Solarplant: "Solaranlage",
    Powerplant: "Kraftwerk",
    Refinery: "Raffinerie",
    Junkyard: "Schrottplatz",
    Recycler: "Recycler",
    Spycenter: "Spionagezentrum",
    Fueldepot: "Treibstofflager",
    Oredepot: "Erzlager",
    Chemicaldepot: "Chemikalienlager",
    Ammodepot: "Munitionslager",
    Steeldepot: "Stahllager",
    Energystorage: "Energyspeicher",
    Silicondepot: "Siliconlager",
    Mikrochipdepot: "Mikrochiplager",
  };
  useEffect(() => {
    // Initialisiere den Status beim Auswahl des Gebäudes
    if (selectedBuilding) {
      setIsBuildingOn(selectedBuilding.status);
    }
  }, [selectedBuilding]);

  useEffect(() => {
    const loadConstructionEndTime = async () => {
      setLoading(true);
        try {
          const response = await fetch(
            `http://localhost:3000/api/user/${userId}/planet/${selectedPlanet._id}/building/${selectedBuilding.buildingType}`
          );
          const data = await response.json();
          if (data.building.constructionEndTime) {
            // Wenn eine Bauzeit vorhanden ist, übergebe sie an den PlayerContext
            const endTime = new Date(data.building.constructionEndTime);
            setConstructionEndTime(endTime);  // Setzt die Endzeit im PlayerContext
            }
        } catch (error) {
          console.error("Fehler beim Laden der Bauendzeit:", error);
        } finally {
          setLoading(false);  // Ladezustand deaktivieren
        }
      };

      if (selectedBuilding && userId && selectedPlanet) {
        loadConstructionEndTime();
      }
    }, [selectedBuilding, userId, selectedPlanet]);

// Bauendzeit speichern
useEffect(() => {
  if (constructionEndTime && constructionEndTime instanceof Date && !isNaN(constructionEndTime)) {
    localStorage.setItem("constructionEndTime", constructionEndTime.toISOString());
  }
}, [constructionEndTime]); // Nur wenn constructionEndTime sich ändert

useEffect(() => {
  if (!constructionEndTime || countdown > 0) return; // Timer läuft oder keine Endzeit gesetzt
  const now = Date.now();
  if (constructionEndTime > now) {
    console.log("Starting countdown...");
    startCountdown(constructionEndTime);
  } else {
    console.log("End time in the past. Resetting...");
    setConstructionEndTime(null);
    setCountdown(0);
    localStorage.removeItem("constructionEndTime");
  }
}, [constructionEndTime, countdown, startCountdown]);


const formatCountdown = () => {
  if (!countdown) return "";
  const hours = Math.floor(countdown / 3600);
  const minutes = Math.floor((countdown % 3600) / 60);
  const seconds = countdown % 60;
  return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

  const updateStatus = async (userId, planetId, buildingType, status) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/${userId}/planet/${planetId}/building/${buildingType}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) throw new Error("Fehler beim Aktualisieren des Status");
    } catch (error) {
      console.error("Statusaktualisierung fehlgeschlagen:", error);
    }
  };
  const upgradeBuilding = async (userId, planetId, buildingType) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/${userId}/planet/${planetId}/building/${buildingType}/upgrade`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Fehler: ${response.statusText}`);
      }

      const updatedBuilding = await response.json();
      console.log("Upgrade erfolgreich:", updatedBuilding);

      setSelectedBuilding(updatedBuilding.building);
      if (updatedBuilding.building.constructionEndTime) {
        setConstructionEndTime(new Date(updatedBuilding.building.constructionEndTime));
      }
    } catch (error) {
      console.error("Fehler beim Upgraden des Gebäudes:", error);
    }
  };

  const toggleBuildingStatus = async () => {
    const newStatus = !isBuildingOn;
    if (newStatus !== isBuildingOn) { // Nur setzen, wenn der Status wirklich anders ist
      setIsBuildingOn(newStatus);
  
      if (selectedBuilding && selectedBuilding.buildingType) {
        try {
          await updateStatus(
            userId,
            selectedPlanet._id,
            selectedBuilding.buildingType,
            newStatus
          );
        } catch (error) {
          console.error("Statusaktualisierung fehlgeschlagen:", error);
        }
      } else {
        console.error("Building Type is missing.");
      }
    }
  };

  const handleBuildingSelect = (building) => {
    const updatedBuilding = { ...building, isActive: true }; // Markiere das Gebäude als aktiv
    setSelectedBuilding(updatedBuilding);
    setIsBuildingOn(building.status); // Falls der Status gebraucht wird
    localStorage.setItem("selectedBuilding", JSON.stringify(updatedBuilding));
  };
  
  const handleCategorySelect = (type) => {
    setActiveType(type);
  };

  useEffect(() => {
    localStorage.setItem("activeType", activeType);
  }, [activeType]);

  useEffect(() => {
    if (selectedBuilding) {
      localStorage.setItem("selectedBuilding", JSON.stringify(selectedBuilding));
    }
  }, [selectedBuilding]);

  if (!selectedPlanet) return <p>Kein Planet ausgewählt.</p>;

  const filteredBuildings = selectedPlanet.buildings.filter(
    (building) => building.category.toLowerCase() === activeType
  );

  return (
    <div className="content-box">
      <div className="buildings-content">
        <div
          id={selectedBuilding ? selectedBuilding.buildingType : ""}
          className="building-box"
        >
          <div className="buildings-data">
            <div className="buildings-headline">
              <h3 className="buildings-title">
                Gebäude:{" "}
                {selectedBuilding
                  ? buildingDataMap[selectedBuilding.buildingType]
                  : " "}
              </h3>
              {selectedBuilding && (
                <>
                  <input
                    type="checkbox"
                    hidden="hidden"
                    id="status"
                    checked={isBuildingOn}
                  />
                  <label
                    className={`btn-switch ${isBuildingOn ? "on" : ""}`}
                    htmlFor="status"
                    onClick={toggleBuildingStatus}
                  >
                    {isBuildingOn ? "An" : "Aus"}
                  </label>
                </>
              )}
            </div>

            {/* Wenn ein Gebäude ausgewählt ist, zeige die Details */}
            {selectedBuilding ? (
              <div className="building-details">
              <ul>
                <h4>Planet: {selectedPlanet.name}</h4>
                <li>
                  <h4 className="building-data-left">Aktuelles</h4>
                  <h4 className="building-data-current">
                    Level: {selectedBuilding.level}
                  </h4>
                  <h4 className="building-data-arrow">→</h4>
                  <h4 className="building-data-update">
                    Level: {selectedBuilding.level + 1}
                  </h4>
                </li>
          
                {/* Anzeige je nach aktiver Kategorie */}
                {activeType === "produktion" || activeType === "veredelung" ? (
                  <div className="building-li-box">
                    <p className="building-data">Produktionsrate</p>
                    {selectedBuilding.productionRate && (
                      <div>
                        <div className="building-data-box">
                          {Object.entries(selectedBuilding?.baseValue?.baseProductionRate || {})
                            .filter(([resource]) => resource !== "_id")
                            .map(([resource, baseRate]) => {
                              const upRate =
                                baseRate *
                                (selectedBuilding.level + 1) *
                                (selectedBuilding.level + 1) *
                                (1 + (selectedBuilding.level + 1 - 1) / 5);
                              const rate =
                                baseRate *
                                selectedBuilding.level *
                                selectedBuilding.level *
                                (1 + (selectedBuilding.level - 1) / 5);
                              return (
                                <li key={resource}>
                                  <p className="resource-left">
                                    {resource.charAt(0).toUpperCase() +
                                      resource.slice(1).toLowerCase()}
                                    :
                                  </p>
                                  <p className="resource-mid">{Math.round(rate)}</p>
                                  <p className="resource-arrow">→</p>
                                  <p className="resource-right">{Math.round(upRate)}</p>
                                </li>
                              );
                            })}
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}
          
                {activeType === "überwachung" ? (
                  <div className="building-li-box">
                    <p className="building-data">Beschreibung:</p>
                    <p>Ein geheimes Spionagezentrum, Es dient als Schlüssel zur Beobachtung und Kontrolle des Universums es kann mit jeder Stufe mehr Informationen abrufen.</p>
                  </div>
                ) : null}
          
          {activeType === "lagerung" && selectedBuilding.baseValue.storageCapacity ? (
                  <div className="building-li-box">
                    <p className="building-data">Lagerkapazität:</p>
                    <div className="building-storage-box">
                      <p className="resource-left">
                        Kapazität:
                        
                      </p>
                      <p className="resource-mid">{Math.round(
                          selectedBuilding.baseValue.storageCapacity *
                          (selectedBuilding.level + 1) *
                          (selectedBuilding.level + 1) *
                          (1 + (selectedBuilding.level - 1) / 5)
                        )}</p>
                      <p className="resource-arrow">→</p>
                      <p className="resource-right">{Math.round(
                          selectedBuilding.baseValue.storageCapacity *
                          (selectedBuilding.level + 1) *
                          (selectedBuilding.level + 1) *
                          (1 + (selectedBuilding.level + 1 - 1) / 5)
                        )}</p>
                      </div>
                  </div>
                ) : null}
          
          {activeType === "werften" && selectedBuilding ? (
                  selectedBuilding.shipTyps ? (
                    <div className="building-li-box">
                      <p className="building-data">Schiffstypen:</p>
                      <ul>
                        {Object.values(selectedBuilding.shipTyps).map((shipTyp, index) => (
                          <li key={index}>{shipTyp}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p>Keine Schiffstypen verfügbar.</p>
                  )
                ) : null}
              </ul>
            </div>
          ) : (
            <div className="building-default">
              <p>Wähle ein Gebäude aus,</p>
              <p>um die Details anzuzeigen.</p>
            </div>
          )}
          </div>

          {/* Baukosten anzeigen */}
          <div className="building-menu">
            <ul>
              {/* Nur Baukosten anzeigen, wenn ein Gebäude ausgewählt ist */}
              {selectedBuilding ? (
                Object.entries(
                  selectedBuilding?.baseValue?.constructionCosts || {}
                )
                  .filter(([resource]) => resource !== "_id") // filtert "_id" und "0" heraus
                  .map(([resource, baseRate]) => {
                    const rate =
                      baseRate *
                      selectedBuilding.level *
                      selectedBuilding.level *
                      (1 + (selectedBuilding.level - 1) / 5);

                    return (
                      <li key={resource}>
                        <p className="resource-left">
                          {resource.charAt(0).toUpperCase() +
                            resource.slice(1).toLowerCase()}
                          :
                        </p>
                        <p className="resource-mid">
                          {selectedBuilding.level === 1
                            ? Math.round((baseRate * 1.01))
                            : rate === 0
                            ? baseRate
                            : Math.round(rate)}
                        </p>{" "}
                        {/* Hier wird der Wert angezeigt */}
                      </li>
                    );
                  })
              ) : (
                <li>Loading...</li> // Zeige eine Nachricht, wenn kein Gebäude ausgewählt ist
              )}
              {selectedBuilding ? (
                <li>
                  <p className="resource-left">Bauzeit:</p>
                  <p className="resource-mid">
                    {
                      selectedBuilding.level === 0
                        ? Math.round(
                            selectedBuilding.baseValue.constructionTime / 60
                          ) // Basiswert für Level 0
                        : selectedBuilding.level === 1
                        ? Math.round(
                            (selectedBuilding.baseValue.constructionTime *
                              1.01) /
                            60
                          ) // Kleine Skalierung für Level 1
                        : (
                          Math.round(selectedBuilding.baseValue.constructionTime *
                              selectedBuilding.level *
                              selectedBuilding.level *
                              (1 + (selectedBuilding.level - 1) / 5)) /
                            60
                          ) // Vollständige Berechnung für Level 2+
                    }{" "}
                    min
                  </p>
                </li>
              ) : (
                <li>Loading...</li> // Zeige eine Nachricht, wenn kein Gebäude ausgewählt ist
              )}
            </ul>
            <button
                        className={`btn buy-btn-building ${countdown ? "disabled" : ""}`}
                        onClick={() =>
                            upgradeBuilding(
                                userId,
                                selectedPlanet._id,
                                selectedBuilding.buildingType
                            )
                        }
                        disabled={!!constructionEndTime || countdown > 0} // Button deaktiviert, wenn Bauzeit läuft
                    >
                        {countdown ? `Bauen läuft... ${formatCountdown()}` : "Bauen"}
                    </button>
            <p className="buy-message"></p>
          </div>
        </div>
        <div className="building-bar-box">
          <div className="buildings-bar">
            <button
              id="change-produktion"
              className={`building btn ${
                activeType === "produktion" ? "active" : ""
              }`}
              onClick={() => handleCategorySelect("produktion")}
            >
              Produktion
            </button>
            <button
              id="change-veredelung"
              className={`building btn ${
                activeType === "veredelung" ? "active" : ""
              }`}
              onClick={() => handleCategorySelect("veredelung")}
            >
              Veredelung
            </button>
            <button
              id="change-überwachung"
              className={`building btn ${
                activeType === "überwachung" ? "active" : ""
              }`}
              onClick={() => handleCategorySelect("überwachung")}
            >
              Überwachung
            </button>
            <button
              id="change-lagerung"
              className={`building btn ${
                activeType === "lagerung" ? "active" : ""
              }`}
              onClick={() => handleCategorySelect("lagerung")}
            >
              Lagerung
            </button>
            <button
              id="change-werften"
              className={`building btn ${
                activeType === "werften" ? "active" : ""
              }`}
              onClick={() => handleCategorySelect("werften")}
            >
              Werften
            </button>
          </div>
          <div className="btn-building">
            {filteredBuildings.map((building, index) => (
              <button
                key={index}
                className={`building btn ${
                    selectedBuilding?.buildingType === building.buildingType ? "active" : ""
                  }`}
                onClick={() => handleBuildingSelect(building)}
              >
                {buildingDataMap[building.buildingType] ||
                  building.buildingType}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buildings;
