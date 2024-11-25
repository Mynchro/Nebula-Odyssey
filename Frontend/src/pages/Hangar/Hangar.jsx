import { useState, useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import "./Hangar.css";
import { useOutletContext } from "react-router-dom";
import werftTypen from "../../assets/data/werften";

const werften = {
  klein: [
    {
      id: "leichter-jaeger",
      name: "Leichter Jäger",
      description:
        "Ein schnelles und wendiges Raumschiff, ideal für Erkundungen und leichte Kämpfe.",
      img: "/werften/kleine_werft/leichter_jaeger/leichter_jaeger.png",
    },
    {
      id: "schwerer-jaeger",
      name: "Schwerer Jäger",
      description:
        "Höhere Feuerkraft und Panzerung, perfekt für den Angriff kleinerer Flotten.",
      img: "/werften/kleine_werft/schwerer_jaeger/schwerer_jaeger.png",
    },
    {
      id: "bomber",
      name: "Bomber",
      description:
        "Schwer bewaffnetes Schiff, spezialisiert auf das Zerstören großer Ziele wie Stationen oder Kreuzer.",
      img: "/werften/kleine_werft/bomber/bomber.png",
    },
    {
      id: "fregatte",
      name: "Fregatte",
      description:
        "Ein vielseitiges Kampfschiff, das sowohl angreifen als auch verteidigen kann.",
      img: "/werften/kleine_werft/fregatte/fregatte.png",
    },
    {
      id: "kleiner-transporter",
      name: "Kleiner Transporter",
      description:
        "Ein kleines Frachtschiff, ideal für kurze Liefermissionen und das Sammeln von Ressourcen.",
      img: "/werften/kleine_werft/kleiner_transporter/kleiner_transporter.png",
    },
    {
      id: "bergbau-drohne",
      name: "Bergbau-Drohne",
      description:
        "Automatisierte Drohne, die schnell und effizient Rohstoffe abbaut.",
      img: "/werften/kleine_werft/mining_drone/mining_drone.png",
    },
  ],
  mittel: [
    {
      id: "zerstoerer",
      name: "Zerstörer",
      description:
        "Ein robustes Kriegsschiff mit hoher Feuerkraft, ideal für direkte Konfrontationen.",
      img: "/werften/mittlere_werft/zerstoerer/zerstoerer.png",
    },
    {
      id: "bergbau-schiff",
      name: "Bergbau-Schiff",
      description:
        "Großes Schiff für den Abbau und die Verarbeitung von Ressourcen aus Asteroiden.",
      img: "/werften/mittlere_werft/bergbauschiff/bergbauschiff.png",
    },
    {
      id: "grosser-transporter",
      name: "Großer Transporter",
      description:
        "Ein massives Frachtschiff, das große Mengen an Gütern und Ressourcen transportieren kann.",
      img: "/werften/mittlere_werft/grosser_transporter/grosser_transporter.png",
    },
    {
      id: "flugdeckkreuzer",
      name: "Flugdeckkreuzer",
      description:
        "Ein Schiff, das kleinere Jäger und Bomber transportieren und starten kann.",
      img: "/werften/mittlere_werft/flugdeckkreuzer/flugdeckkreuzer.png",
    },
    {
      id: "kolonieschiff",
      name: "Kolonieschiff",
      description:
        "Ein großes Schiff, das für die Besiedlung neuer Planeten ausgelegt ist.",
      img: "/werften/mittlere_werft/kolonieschiff/kolonieschiff.png",
    },
    {
      id: "kreuzer",
      name: "Kreuzer",
      description:
        "Ein vielseitiges Kriegsschiff mit ausgewogenem Angriff und Verteidigung.",
      img: "/werften/mittlere_werft/kreuzer/kreuzer.png",
    },
  ],
  gross: [
    {
      id: "schlachtkreuzer",
      name: "Schlachtkreuzer",
      description:
        "Ein riesiges Kriegsschiff mit enormer Feuerkraft und schwerer Panzerung.",
      img: "/werften/grosse_werft/schlachtkreuzer/schlachtkreuzer.png",
    },
    {
      id: "schlachtschiff",
      name: "Schlachtschiff",
      description:
        "Das Rückgrat jeder Flotte – extrem robust und tödlich im Angriff.",
      img: "/werften/grosse_werft/schlachtschiff/schlachtschiff.png",
    },
    {
      id: "traegerschiff",
      name: "Trägerschiff",
      description:
        "Ein mobiles Hauptquartier, das Flottenkommandos und Angriffe koordiniert.",
      img: "/werften/grosse_werft/traegerschiff/traegerschiff.png",
    },
  ],
};

// const werften = werftTypen;

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
                      <p>{ship.label}</p>
                      <p>{ship.amount}</p>
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
              <div className="maik">
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
