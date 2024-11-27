import { useState, useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import "./Hangar.css";
import { useOutletContext } from "react-router-dom";
import hangar from "../../assets/data/hangar.js";

const Hangar = () => {
  const [selectedWerft, setSelectedWerft] = useState(null);
  const [description, setDescription] = useState(null);
  const [image, setImage] = useState(null);
  const [activeShip, setActiveShip] = useState(null);
  const { selectedPlanet } = useOutletContext();
  const { currentPlayer } = useContext(PlayerContext);

  const resetOverview = () => {
    setSelectedWerft(null);
    setDescription(null);
    setImage(null);
    setActiveShip(null);
  };

  const selectShip = (ship) => {
    setDescription(ship.description);
    setImage(ship.img);
    setActiveShip(ship.id);
  };

  const werften = hangar;

  const exclusionLabels = [
    "Lasergeschütz",
    "Flaggeschuetz",
    "Ionenkanone",
    "Railgun",
    "Partikelgeschuetz",
    "Planetarer Schildgenerator",
    "Artillerie",
    "Partikelkanone",
  ];

  const defaultImage = "/werften/misc/default-hangar_1.png";

  return (
    selectedPlanet && (
      <div className="content-box">
        <div className="overview-title">
          <h1>Hangar</h1>
        </div>
        <div className="hangar-top">
          <div className="hangar-info">
            <h3>Deine Schiffe</h3>
            <ul>
              {selectedPlanet &&
              selectedPlanet.ships &&
              selectedPlanet.ships.length > 0 ? (
                selectedPlanet.ships
                  .filter((ship) => !exclusionLabels.includes(ship.label))
                  .map((ship, index) => (
                    <li key={index} className="ship-item">
                      <div>
                        <p>{ship.label}</p>
                      </div>
                      <div>
                        <p>{ship.amount}</p>
                      </div>
                    </li>
                  ))
              ) : (
                <p>Keine Schiffe verfügbar</p>
              )}
            </ul>
          </div>
          <div className="hangar-img">
            <img src={image || defaultImage} alt="Hangar"></img>
          </div>
        </div>
        <div className="hangar-bot">
          <div className="hangar-btnbox">
            {/* Übersicht-Button */}
            <button
              className={`btn ${!selectedWerft ? "active" : ""}`}
              onClick={resetOverview}
            >
              Übersicht
            </button>
            {/* Hauptbuttons für Werften */}
            {["klein", "mittel", "gross"].map((werft) => (
              <button
                key={werft}
                className={`btn ${selectedWerft === werft ? "active" : ""}`}
                onClick={() =>
                  setSelectedWerft(werft === selectedWerft ? null : werft)
                }
              >
                {werft === "klein"
                  ? "Kleine Werft"
                  : werft === "mittel"
                  ? "Mittlere Werft"
                  : "Große Werft"}
              </button>
            ))}
          </div>
          <div className="hangar-description">
            {selectedWerft ? (
              <div className="selected-werft">
                <h3 className="ship-description-head-left">
                  Schiffe der{" "}
                  {selectedWerft === "klein"
                    ? "Kleinen"
                    : selectedWerft === "mittel"
                    ? "Mittleren"
                    : "Großen"}{" "}
                  Werft
                </h3>
                <div className="hangar-ship-buttons">
                  {werften[selectedWerft].map((ship) => (
                    <button
                      key={ship.id}
                      className={`btn ${
                        activeShip === ship.id ? "active" : ""
                      }`}
                      onClick={() => selectShip(ship)}
                    >
                      {ship.name}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <p className="ship-description-head-right"></p>
            )}
            {/* Zeigt entweder die Beschreibung des ausgewählten Schiffs oder eine Standardnachricht */}
            <p className="ship-description-head-right">
              {description ||
                "Wähle ein Schiff, um eine Beschreibung zu sehen!"}
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default Hangar;
