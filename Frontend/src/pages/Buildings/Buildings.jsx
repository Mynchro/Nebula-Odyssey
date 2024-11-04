import "./Buildings.css";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

const Buildings = () => {
  const { selectedPlanet } = useOutletContext();
  const [activeType, setActiveType] = useState("produktion");
  const [selectedBuilding, setSelectedBuilding] = useState(null);

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

  const handleBuildingSelect = (building) => {
    setSelectedBuilding(building);
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
          className="buildings-title"
        >
          <div className="buildings-data">
            <h3>Planet: {selectedPlanet.name}</h3>
            
            {/* Wenn ein spezifisches Gebäude ausgewählt ist, zeige dessen Produktionsrate */}
            {selectedBuilding ? (
              <div className="building-details">
                
                <ul>
                  <li>
                    <h4>Gebäude: {buildingDataMap[selectedBuilding.buildingType]}</h4>
                    <h4 className="building-data">Level: {selectedBuilding.level}</h4>
                  </li>
                  <li>
                    <p className="building-data">Produktionsrate:</p>
                  </li>
                  {/* Produktionsrate anzeigen */}
                  {selectedBuilding.productionRate && (
                    <div>
                      <div className="building-data-box">
                        {Object.entries(selectedBuilding.productionRate).filter(([resource]) => resource !== "_id").map(([resource, rate]) => (
                          <li key={resource}>
                            <p className="data-left">{resource}:</p>
                            <p className="data-right">{rate}</p>
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
        <div className="buildings-box">
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

