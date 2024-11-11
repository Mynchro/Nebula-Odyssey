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

  return (
    <div className="content-box">
      <div className="overview-title">
        <h1>Verteidigungsanlagen</h1>
      </div>
      <div className="defense-top">
        <div className="defense-info">
          <h3>Deine Verteidigungsanlagen</h3>
          <ul>
            <li>
              <p>Lasergeschuetz: </p>
              <p>
                {console.log("selectedPlanet:", selectedPlanet)}
                {selectedPlanet.ships.find(
                  (ship) => ship.shipType === "laserCannon"
                )?.amount || 0}
              </p>
            </li>
            <li>
              <p>Flaggeschuetz: </p>
              <p>
                {selectedPlanet.ships.find((ship) => ship.shipType === "flak")
                  ?.amount || 0}
              </p>
            </li>
            <li>
              <p>Ionenkanone: </p>
              <p>
                {selectedPlanet.ships.find(
                  (ship) => ship.shipType === "ionCannon"
                )?.amount || 0}
              </p>
            </li>
            <li>
              <p>Railgun: </p>
              <p>
                {selectedPlanet.ships.find(
                  (ship) => ship.shipType === "railgun"
                )?.amount || 0}
              </p>
            </li>
            <li>
              <p>Partikelgeschuetz: </p>
              <p>
                {selectedPlanet.ships.find(
                  (ship) => ship.shipType === "particleCannon"
                )?.amount || 0}
              </p>
            </li>
            <li>
              <p>Planetarer Schild: </p>
              <p>
                {selectedPlanet.ships.find(
                  (ship) => ship.shipType === "planetaryShield"
                )?.amount || 0}
              </p>
            </li>
          </ul>
        </div>
        <div className="defense-img">
          <img src={image} alt="Verteidigungsanlage"></img>
        </div>
      </div>
      <div className="defense-bot">
        <div className="defense-btnbox">
          <button
            className={`btn ${active === "" ? "active" : ""}`}
            onClick={() => {
              setDescription(null);
              setImage(defaultImage);
              setActive("");
            }}
          >
            Übersicht
          </button>
          <button
            className={`btn ${active === "lasergeschuetz" ? "active" : ""}`}
            onClick={() => changeDescriptionAndImage("lasergeschuetz")}
          >
            Lasergeschuetz
          </button>
          <button
            className={`btn ${active === "flaggeschuetz" ? "active" : ""}`}
            onClick={() => changeDescriptionAndImage("flaggeschuetz")}
          >
            Flaggeschuetz
          </button>
          <button
            className={`btn ${active === "ionenkanone" ? "active" : ""}`}
            onClick={() => changeDescriptionAndImage("ionenkanone")}
          >
            Ionenkanone
          </button>
          <button
            className={`btn ${active === "railgun" ? "active" : ""}`}
            onClick={() => changeDescriptionAndImage("railgun")}
          >
            Railgun
          </button>
          <button
            className={`btn ${active === "partikelgeschuetz" ? "active" : ""}`}
            onClick={() => changeDescriptionAndImage("partikelgeschuetz")}
          >
            Partikelgeschuetz
          </button>
        </div>
        <div className="defense-description">
          {description && <p>{description}</p>}
          {!description && <DefaultDescription />}
        </div>
      </div>
    </div>
  );
};

export default Defense;
