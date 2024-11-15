import { useState, useEffect, useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { useOutletContext } from "react-router-dom";
import werftTypen from "../../assets/data/werften";
import "./Armada.css";
import activities from "../../assets/data/activities";

const DefaultDescriptionArmada = () => (
  <div>
    <p>Willkommen bei deiner Armada!</p>
    <p>
      Hier kannst du deine Flotte zusammenstellen, um diese loszuschicken.
      Besiedele ferne Planeten, triff auf andere Spieler und mach dich für den
      Kampf bereit!
    </p>
  </div>
);

const Activity = ({ activity }) => {
  const { currentPlayer } = useContext(PlayerContext);
  const [countdown, setCountdown] = useState(activity.timestamp);
  const [showForwardAnimation, setShowForwardAnimation] = useState(true);
  const [showBackwardAnimation, setShowBackwardAnimation] = useState(false);

  const animationDuration = `${activity.timestamp}s`;

  return (
    <div className="activity">
      <div className="activity-info">
        <p>Truppenstärke: {activity.info.Truppenstärke}</p>
        <ul>
          {Object.values(activity.info.Einheiten).map((einheit, index) => (
            <li key={index}>{einheit}</li>
          ))}
        </ul>
      </div>
      <div className="activity-visual">
        <div>
          <img
            id="armada-in-activity"
            src={activity.planets[0].img}
            alt={activity.planets[0].name}
          />
          <p className="activity-planet">{activity.planets[0].name}</p>
        </div>
        <div className="timer">
          {countdown}s
          {showForwardAnimation && (
            <img
              src="/icons/spaceship-right.png"
              className={`fa-solid fa-shuttle-space ship-forward`}
              style={{ animationDuration: animationDuration }}
            ></img>
          )}
          {showBackwardAnimation && (
            <img
              src="/icons/spaceship-left.png"
              className={`ship-backward`}
              style={{ animationDuration: animationDuration }}
            ></img>
          )}
        </div>
        <div>
          <img
            id="armada-in-activity"
            src={activity.planets[1].img}
            alt={activity.planets[1].name}
          />
          <p className="activity-planet">{activity.planets[1].name}</p>
        </div>
      </div>
    </div>
  );
};

const Armada = () => {
  const { choicePlanet, currentPlayer } = useContext(PlayerContext);
  const { selectedPlanet } = useOutletContext();
  const [description, setDescription] = useState(null);
  const [image, setImage] = useState(`/werften/uebersicht-defense.png`);
  const [activeType, setActiveType] = useState("klein"); // State for active type buttonDefault value is "Übersicht"

  const handleShipType = (type) => {
    setActiveType(type); // Markiere den aktiven Werft-Typ
  };

  const getFilteredShips = () => {
    if (!selectedPlanet || !selectedPlanet.ships) {
      return [];
    }

    if (activeType === "klein") {
      return selectedPlanet.ships.filter(
        (ship) => ship.shipYardType === "lightShipyard"
      );
    } else if (activeType === "mittel") {
      return selectedPlanet.ships.filter(
        (ship) => ship.shipYardType === "mediumShipyard"
      );
    } else if (activeType === "gross") {
      return selectedPlanet.ships.filter(
        (ship) => ship.shipYardType === "heavyShipyard"
      );
    }
    // Default case: Show all ships if "Übersicht" is active
    return selectedPlanet.ships;
  };

  useEffect(() => {
    if (selectedPlanet) {
      // Wenn selectedPlanet vorhanden ist, initialisiere oder aktualisiere die Werte
      setDescription(null); // Optional: Beschreibung zurücksetzen
      setImage(`/werften/uebersicht-defense.png`);
    }
  }, [selectedPlanet]); // Abhängig von selectedPlanet

  return (
    <div className="content-box">
      <div className="overview-title">
        <h1>Armada</h1>
      </div>
      {!selectedPlanet ? (
        <div className="armada-fallback">
          <p>Lade Planetendaten</p>
        </div>
      ) : (
        <div className="armada-top">
          <div className="armada-info">
            <div>
              <h3>Deine Einheiten</h3>
              <ul>
                <li>
                  <p>Kleine Werft</p>
                  <p>0</p>
                </li>
                <li>
                  <p>Mittlere Werft:</p>
                  <p>0</p>
                </li>
                <li>
                  <p>Große Werft:</p>
                  <p>0</p>
                </li>
                <li>
                  <p>Einheiten Gesamt:</p>
                  <p>0</p>
                </li>
              </ul>
            </div>
            <div className="current-position">
              <h4>Du befindest dich auf:</h4>
              <img
                className="current-position-img"
                src={selectedPlanet.image}
              />
              <p>{selectedPlanet.name}</p>
            </div>
          </div>
          <div className="armada-rightbox">
            <div className="armada-img">
              <div className="armada-screen-left">
                <div className="armada-screen-description">
                  {description ? (
                    <p>{description}</p>
                  ) : (
                    <DefaultDescriptionArmada />
                  )}
                </div>
                <div className="armada-screen-selection">
                  <ul className="armada-shiplist">
                    {getFilteredShips().map((ship, index) => (
                      <li key={index} className="ship-item">
                        <p>
                          <strong>Typ:</strong> {ship.shipType}
                        </p>
                        <p>
                          <strong>Anzahl:</strong> {ship.amount}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="armada-screen-right">
                {choicePlanet ? (
                  <div className="planet-to-colonize">
                    <h4>Aktuell ausgewählter Planet:</h4>
                    <img
                      className="choicePlanet-img"
                      src={choicePlanet.image}
                    />
                    <h4>Name:</h4>
                    <p>{`${choicePlanet.name}`}</p>
                    <h4>Besitzer:</h4>
                    <p>{`
                     ${
                       choicePlanet.owner
                         ? choicePlanet.owner.userName
                         : "Unbekannter Spieler"
                     }`}</p>
                  </div>
                ) : (
                  <h4>Kein Planet ausgewählt</h4>
                )}
              </div>
            </div>
            <div className="armada-btnbox">
              <button
                className={`btn ${activeType === "klein" ? "active" : ""}`}
                onClick={() => handleShipType("klein")}
              >
                Kleine Werft
              </button>
              <button
                className={`btn ${activeType === "mittel" ? "active" : ""}`}
                onClick={() => handleShipType("mittel")}
              >
                Mittlere Werft
              </button>
              <button
                className={`btn ${activeType === "gross" ? "active" : ""}`}
                onClick={() => handleShipType("gross")}
              >
                Große Werft
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="activities">
        {activities.length > 0 &&
          activities.map((activity, index) => (
            <Activity key={index} activity={activity} />
          ))}
      </div>
    </div>
  );
};

export default Armada;
