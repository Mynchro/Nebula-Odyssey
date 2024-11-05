import "./Buildings.css";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const Buildings = () => {
  const { selectedPlanet } = useOutletContext();
  const [activeType, setActiveType] = useState("produktion");
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [isBuildingOn, setIsBuildingOn] = useState(false);

  useEffect(() => {
    // Initialisiere den Status beim Auswahl des Gebäudes
    if (selectedBuilding) {
      setIsBuildingOn(selectedBuilding.status);
    }
  }, [selectedBuilding]);

  const buildingDataMap = {
    "smallShipyard" : "Kleine Raumwerft",
    "mediumShipyard" : "Mittlere Raumwerft",
    "largeShipyard" : "Große Raumwerft",
    "Mine" : "Bergwerk",
    "Ammofactory" : "Munitionsfabrik",
    "Fuelfactory" : "Treibstofffabrik",
    "Solarplant" : "Solaranlage",
    "Powerplant" : "Kraftwerk",
    "Refinery" : "Raffinerie",
    "Junkyard" : "Schrottplatz",
    "Recycler" : "Recycler",
    "Spycenter" : "Spionagezentrum",
    "Fueldepot" : "Treibstofflager",
    "Oredepot" : "Erzlager",
    "Chemicaldepot" : "Chemikalienlager",
    "Ammodepot" : "Munitionslager",
    "Steeldepot" : "Stahllager",
    "Energystorage" : "Energyspeicher",
    "Silicondepot" : "Siliconlager",
    "Mikrochipdepot" : "Mikrochiplager",
  };
  const updateStatus = async (buildingId, status) => {
    try {
      const response = await fetch(`/api/buildings/${buildingId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
  
      if (!response.ok) throw new Error("Fehler beim Aktualisieren des Status");
    } catch (error) {
      console.log(buildingId, status)
      console.error("Statusaktualisierung fehlgeschlagen:", error);
    }
  };

  const toggleBuildingStatus = async () => {
    const newStatus = !isBuildingOn;
    setIsBuildingOn(newStatus);
  
    if (selectedBuilding && selectedBuilding._id) {
      try {
        await updateStatus(selectedBuilding._id, newStatus);
      } catch (error) {
        console.error("Statusaktualisierung fehlgeschlagen:", error);
      }
    } else {
      console.error("Building ID is missing.");
    }
  };

  const handleBuildingSelect = (building) => {
    setSelectedBuilding(building);
    setIsBuildingOn(building.status);
  };

  const handleCategorySelect = (type) => {
    setActiveType(type);
  };

  if (!selectedPlanet) 
    return <p>Kein Planet ausgewählt.</p>;

  const filteredBuildings = selectedPlanet.buildings.filter(
    (building) => building.category.toLowerCase() === activeType
  );
  return (
    <div className="content-box">
      <div className="buildings-content">
        <div
          id={ selectedBuilding ? selectedBuilding.buildingType : ''}
          className="building-box"
        >
          <div className="buildings-data">
            <div className="buildings-headline">
              <h3 className="buildings-title">Gebäude: {selectedBuilding ? buildingDataMap[selectedBuilding.buildingType] : " "}</h3>
              {selectedBuilding && (
              <>
              <input
                type="checkbox"
                hidden="hidden"
                id="status"
                checked={isBuildingOn}
                onChange={toggleBuildingStatus}
              />
              <label
                className={`btn-switch ${isBuildingOn ? 'on' : ''}`}
                htmlFor="status"
                onClick={toggleBuildingStatus}
              >
                {isBuildingOn ? "On" : "Off"}
              </label>
              </>
            )}
            </div>
       
            {/* Wenn ein spezifisches Gebäude ausgewählt ist, zeige dessen Produktionsrate */}
            {selectedBuilding ? (
              <div className="building-details">
                
                <ul>
                  <h4>Planet: {selectedPlanet.name}</h4>
                  <li>
                    <h4 className="building-data-left">Aktuelles</h4>
                    <h4 className="building-data-current">Level: {selectedBuilding.level}</h4>
                    <h4 className="building-data-arrow">→</h4>
                    <h4 className="building-data-update">Level: {selectedBuilding.level + 1}</h4>
                  </li>
                  <li>
                    <p className="building-data">Produktionsrate</p>
                  </li>
                  {/* Produktionsrate anzeigen */}
                  {selectedBuilding.productionRate && (
                    <div>
                      <div className="building-data-box">
                      {Object.entries(selectedBuilding.productionRate)
                        .filter(([resource, rate]) => resource !== "_id" && rate !== 0) // filtert "_id" und "0" heraus
                        .map(([resource, rate]) => (
                          <li key={resource}>
                            <p className="resource-left">{resource.charAt(0).toUpperCase() + resource.slice(1).toLowerCase()}:</p>
                            <p className="resource-mid">{rate}</p>
                            <p className="resource-arrow">→</p>
                            <p className="resource-right">{(rate * 1.1).toFixed()}</p>
                          </li>
                        ))}
                      </div>
                    </div>
                  )}
                </ul>
              </div>
            ) : (
              <div className="building-default">
                <p>Wähle ein Gebäude aus,</p>
                <p>um die Details anzuzeigen.</p>
              </div>
            )}
          </div>

          <div className="building-menu">
          <ul>
            {" "}
            <li>
              <p className="data-left">Stahlkosten:</p>{" "}
              <p className="data-right">
                0
              </p>
            </li>
            <li>
              <p className="data-left">Mikrochipkosten:</p>{" "}
              <p className="data-right">
                0
              </p>
            </li>
            <li>
              <p className="data-left">Chemiekosten:</p>{" "}
              <p className="data-right">
                0
              </p>
            </li>
            <li>
              <p className="data-left">Energiekosten:</p>{" "}
              <p className="data-right">
                0
              </p>
            </li>
          </ul>
          <div className="increment-decrement">
            <button className="btn">
              x0
            </button>
            <button className="btn">
              x1
            </button>
            <button className="btn">
              x2
            </button>
          </div>
          <button className="btn buy-btn">
            Kaufen
          </button>
          <p className="buy-message"></p>
        </div>

        </div>
        <div className="building-bar-box">
            <div className="buildings-bar">
              <button
                id="change-produktion"
                className={`building btn ${activeType === "produktion" ? "active" : ""}`}
                onClick={() => handleCategorySelect("produktion")}
              >
                Produktion
              </button>
              <button
                id="change-veredelung"
                className={`building btn ${activeType === "veredelung" ? "active" : ""}`}
                onClick={() => handleCategorySelect("veredelung")}
              >
                Veredelung
              </button>
              <button
                id="change-überwachung"
                className={`building btn ${activeType === "überwachung" ? "active" : ""}`}
                onClick={() => handleCategorySelect("überwachung")}
              >
                Überwachung
              </button>
              <button
                id="change-lagerung"
                className={`building btn ${activeType === "lagerung" ? "active" : ""}`}
                onClick={() => handleCategorySelect("lagerung")}
              >
                Lagerung
              </button>
              <button
                id="change-werften"
                className={`building btn ${activeType === "werften" ? "active" : ""}`}
                onClick={() => handleCategorySelect("werften")}
              >
                Werften
              </button>
            </div>
            <div className="btn-building">
            {filteredBuildings.map((building, index) => (
              <button
                key={index}
                className={`building btn  ${selectedBuilding === building ? "active" : ""}`}
                onClick={() => handleBuildingSelect(building)}
              >
                {buildingDataMap[building.buildingType] || building.buildingType}
              </button>))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buildings;

