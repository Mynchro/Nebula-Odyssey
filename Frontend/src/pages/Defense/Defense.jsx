import { useState } from "react";
import "./Defense.css";
import werftTypen from "../../assets/data/werften";

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
      <div className="defense-top">
        <div className="defense-info">
          <h3>Deine Verteidigungsanlagen</h3>
          <ul>
            <li>
              <p>Lasergeschuetz: 0</p>
            </li>
            <li>
              <p>Flaggeschuetz: 0</p>
            </li>
            <li>
              <p>Ionenkanone: 0</p>
            </li>
            <li>
              <p>Railgun: 0</p>
            </li>
            <li>
              <p>Partikelgeschuetz: 0</p>
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
