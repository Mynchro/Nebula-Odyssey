import { useEffect, useState, useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import "./Defense.css";
import werftTypen from "../../assets/data/werften";
import { useOutletContext } from "react-router-dom";

const DefaultDescription = () => (
  <div>
    <p>Willkommen bei deinen Verteidigungsanlagen!</p>
    <p>
      Schütze deinen Stützpunkt in dieser gefährlichen Galaxie mit unseren
      hochmodernen Verteidigungssystemen. Jede Anlage ist darauf ausgelegt,
      Angriffe effektiv abzuwehren und deine Kolonien zu sichern.
    </p>
    <p>
      Wähle eine Anlage, um mehr zu erfahren und bereite dich auf den nächsten
      Angriff vor!
    </p>
    <p>Bleib wachsam und sicher!</p>
  </div>
);

const defaultImage = `/werften/uebersicht-defense.png`;

const Defense = () => {
  const [description, setDescription] = useState(null);
  const [image, setImage] = useState(defaultImage);
  const [active, setActive] = useState("");
  const { selectedPlanet } = useOutletContext();
  const { currentPlayer } = useContext(PlayerContext);

  const changeDescriptionAndImage = (descriptionKey) => {
    let item = null;
    ["klein", "mittel", "gross"].forEach((size) => {
      if (!item) {
        item = werftTypen[size].find(
          (element) => element.id === descriptionKey
        );
      }
    });

    if (item) {
      setDescription(item.description);
      setImage(item.img);
      setActive(descriptionKey); // Set the active button
    }
  };

  const exclusionLabels = [
    "Schwerer Jaeger",
    "Leichter Jaeger",
    "Bomber",
    "Kleiner Transporter",
    "Großer Transporter",
    "Zerstörer",
    "Kreuzer",
    "Flugdeckkreuzer",
    "Kolonieschiff",
    "Bergbauschiff",
    "Schlachtschiff",
    "Schlachtkreuzer",
    "Traegerschiff",
    "Miningdrohne",
    "Fregatte",
  ];

  return (
    selectedPlanet && (
      <div className="content-box">
        <div className="overview-title">
          <h1>Verteidigungsanlagen</h1>
        </div>
        <div className="defense-top">
          <div className="defense-info">
            <h3>Deine Verteidigungsanlagen</h3>
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
          <div className="defense-img">
            <img src={image} alt="Verteidigungsanlage"></img>
          </div>
        </div>
        <div className="defense-bot">
          <div className="defense-btnbox">
            <button
              className={`btn-uebersicht btn ${active === "" ? "active" : ""}`}
              onClick={() => {
                setDescription(null);
                setImage(defaultImage);
                setActive("");
              }}
            >
              Übersicht
            </button>
            <button
              className={`btn ${active === "flakgeschuetz" ? "active" : ""}`}
              onClick={() => changeDescriptionAndImage("flakgeschuetz")}
            >
              Flakgeschütz
            </button>
            <button
              className={`btn ${active === "artillerie" ? "active" : ""}`}
              onClick={() => changeDescriptionAndImage("artillerie")}
            >
              Artillerie
            </button>
            <button
              className={`btn ${active === "ionenkanone" ? "active" : ""}`}
              onClick={() => changeDescriptionAndImage("ionenkanone")}
            >
              Ionenkanone
            </button>
            <button
              className={`btn ${active === "lasergeschuetz" ? "active" : ""}`}
              onClick={() => changeDescriptionAndImage("lasergeschuetz")}
            >
              Lasergeschütz
            </button>
            <button
              className={`btn ${active === "railgun" ? "active" : ""}`}
              onClick={() => changeDescriptionAndImage("railgun")}
            >
              Railgun
            </button>

            <button
              className={`btn ${
                active === "planetarer_schildgenerator" ? "active" : ""
              }`}
              onClick={() =>
                changeDescriptionAndImage("planetarer_schildgenerator")
              }
            >
              Planetarer Schildgenerator
            </button>
            <button
              className={`btn ${
                active === "partikelgeschuetz" ? "active" : ""
              }`}
              onClick={() => changeDescriptionAndImage("partikelgeschuetz")}
            >
              Partikelkanone
            </button>
          </div>
          <div className="defense-description">
            {description && <p>{description}</p>}
            {!description && <DefaultDescription />}
          </div>
        </div>
      </div>
    )
  );
};

export default Defense;
