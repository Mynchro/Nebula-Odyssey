import "./Shipyard.css";
import { useEffect, useContext, useState } from "react";
import werftTypen from "../../assets/data/werften";
import { PlayerContext } from "../../context/PlayerContext";
import ship from "../../../../Backend/models/Ships";
import { useOutletContext } from "react-router-dom";

const Shipyard = () => {
  // Ships
  const [ships, setShips] = useState([]);
  const [shipImage, setShipImage] = useState(
    `url(/werften/uebersicht-title.png)`
  );

  const { setCurrentPlayer } = useContext(PlayerContext);

  const [shipData, setShipData] = useState({});
  const [shipTitle, setShipTitle] = useState("");
  const [shipDescription, setShipDescription] = useState("");
  const [activeShip, setActiveShip] = useState("");
  const [activeType, setActiveType] = useState(null); // State for active type button
  const { selectedPlanet } = useOutletContext();

  const [dummy, setDummy] = useState(false);

  const handleShipType = async (type) => {
    const loadedShips = await loadShips(); // Schiffe laden
    console.log("Geladene Schiffe:", loadedShips); // Debugging: Zeige alle geladenen Schiffe an

    const validShipYardTypes = [
      "lightShipyard",
      "mediumShipyard",
      "heavyShipyard",
    ];

    // Verwende reduce, um Schiffe mit dem gültigen shipYardType zu sammeln
    const filteredShips = loadedShips.reduce((result, ship) => {
      console.log(type + " der typ");
      console.log(ship.shipYardType + " shipyardtype");
      if (type === ship.shipYardType) {
        result.push(ship); // Füge das Schiff der Ergebnisliste hinzu
      }
      return result; // Gib das Ergebnis zurück
    }, []);

    console.log("Gefilterte Schiffe:", filteredShips); // Debugging: Zeige gefilterte Schiffe an
    setShips(filteredShips); // Setze den Zustand mit den gefilterten Schiffen
    setActiveType(type); // Setze den aktiven Werfttyp
  };

  const loadShips = async () => {
    try {
      const response = await fetch("http://localhost:3000/shipyard/shipdata");
      if (!response.ok) {
        throw new Error("Fehler beim Laden der Schiffe");
      }

      // zu einer JSON Datei umwandeln
      const ships = await response.json();

      // Gib die Schiffs-Daten zurück (promise)
      return await ships;
    } catch (error) {
      console.error("Fehler beim Abrufen der Schiffe:", error);
      return [];
    }
  };
  const changeDescriptionAndImage = async (descriptionKey) => {
    let item = null;
    //console.log(selectedPlanet._id + " das hier ist DER AUSGEWÄHLÖTE PLANET")
    //console.log("Schiffe im State:", ships); // Ausgabe der Schiffe im State

    // Suche nach dem Schiff anhand des shipType
    for (const ship of ships) {
      if (ship.shipType === descriptionKey) {
        // Vergleiche anhand von 'id' statt 'shipType'
        item = ship;
        break; // Wenn das Schiff gefunden wurde, beende die Schleife
      }
    }

    console.log("Gefundenes Schiff:", item); // Gib das gefundene Schiff aus

    if (item) {
      setShipData({
        ...item.ressourceCosts, // Alle Eigenschaften von 'ressourceCosts'
        ...item.values, // Alle Eigenschaften von 'values'
      });
      setShipImage(`url(${item.img})`);
      setShipTitle(item.label);
      setShipDescription(item.description);
      setActiveShip(descriptionKey); // Set the active ship button
    }
  };

  // Counter
  const [count, setCount] = useState(0);
  const maxCount = 100;

  const incrementCount = () => {
    setCount((prevCount) => (prevCount < maxCount ? prevCount + 1 : prevCount));
  };

  const decrementCount = () => {
    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    const number = parseInt(value, 10);

    if (!isNaN(number)) {
      setCount(number > maxCount ? maxCount : number);
    } else if (value === "") {
      setCount(0);
    }
  };

  //Buy

  const { currentPlayer } = useContext(PlayerContext);
  const [buyMessage, setBuyMessage] = useState("");

  const buildShip = async () => {
    try {
      //console.log(activeShip + " mein aktives activeShip");
      //const planetId =currentPlayer.
      const response = await fetch(
        `http://localhost:3000/shipyard/user/${currentPlayer._id}/ship/${activeShip}/buildShip/${selectedPlanet._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Wenn nötig, Authentifizierungs-Header hinzufügen
            Authorization: "Bearer deinTokenHier",
          },
        }
      );

      if (response.ok) {
        const data = await response.json(); // Antwort des Servers (falls im JSON-Format)

        setCurrentPlayer(data.user);

        console.log("Schiff erfolgreich gebaut:", data);
        //console.log("Antwort vom Backend:", data);
      } else {
        console.error("Fehler beim Bauen des Schiffs:", response.statusText);
      }
    } catch (error) {
      console.error("Es gab einen Fehler:", error);
    }
    //location.reload();
  };
  /*
  const buyShip = (descriptionKey) => {
    let item = null;
    ["klein", "mittel", "gross"].forEach((size) => {
      if (!item) {
        item = werftTypen[size].find(
          (element) => element.id === descriptionKey
        );
      }
    });

    if (item) {
      const totalSteelCost = item.properties.steelcosts * count;
      const totalElectronicsCost = item.properties.mikroshipkosten * count;
      const totalChemicalCost = item.properties.chemicalcosts * count;
      const totalEnergyCost = item.properties.energycosts * count;

      if (
        currentPlayer.steel >= totalSteelCost &&
        currentPlayer.electronics >= totalElectronicsCost &&
        currentPlayer.chem >= totalChemicalCost &&
        currentPlayer.energy >= totalEnergyCost
      ) {
        const updatedPlayer = {
          ...currentPlayer,
          steel: currentPlayer.steel - totalSteelCost,
          electronics: currentPlayer.electronics - totalElectronicsCost,
          chem: currentPlayer.chem - totalChemicalCost,
          energy: currentPlayer.energy - totalEnergyCost,
        };

        setCurrentPlayer(updatedPlayer);
        setBuyMessage(`${count}x ${activeShip} gekauft!`);
      } else setBuyMessage(`Nicht genügend Ressourcen!`);
    }
  };*/

  useEffect(() => {
    if (buyMessage) {
      const timer = setTimeout(() => {
        setBuyMessage("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [buyMessage]);

  return (
    <div className="content-box">
      <div
        id="werften-title"
        className="werften-title"
        style={{ backgroundImage: shipImage }}
      >
        <div className="ship-data">
          <p className="ship-name">{shipTitle}</p>
          <ul>
            <h4>Werte</h4>
            <li>
              <p className="data-left">Feuerpower:</p>{" "}
              <p className="data-right">{shipData.firepower}</p>
            </li>
            <li>
              <p className="data-left">Hülle:</p>{" "}
              <p className="data-right">{shipData.hull}</p>
            </li>
            <li>
              <p className="data-left">Schild:</p>{" "}
              <p className="data-right">{shipData.shield}</p>
            </li>
            <li>
              <p className="data-left">Geschwindigkeit:</p>{" "}
              <p className="data-right">{shipData.speed}</p>
            </li>
            <li>
              <p className="data-left">Kraftstoffverbrauch:</p>{" "}
              <p className="data-right">{shipData.fuelconsume}</p>
            </li>
            <li>
              <p className="data-left">Munitionsverbrauch:</p>{" "}
              <p className="data-right">{shipData.ammoconsume}</p>
            </li>
            <li>
              <p className="data-left">Hangar:</p>{" "}
              <p className="data-right">{shipData.hangaring}</p>
            </li>
            <li>
              <p className="data-left">Fracht:</p>{" "}
              <p className="data-right">{shipData.cargo}</p>
            </li>
          </ul>
          <h6>{shipDescription}</h6>
        </div>
        <div className="build-menu">
          <ul>
            {" "}
            <li>
              <p className="data-left">Stahlkosten:</p>{" "}
              <p className="data-right">
                {(shipData?.steelcosts ?? 0) * (count ?? 0)}
              </p>
            </li>
            <li>
              <p className="data-left">Mikrochipkosten:</p>{" "}
              <p className="data-right">
                {(shipData?.mikroshipkosten ?? 0) * (count ?? 0)}
              </p>
            </li>
            <li>
              <p className="data-left">Chemiekosten:</p>{" "}
              <p className="data-right">
                {(shipData?.chemicalcosts ?? 0) * (count ?? 0)}
              </p>
            </li>
            <li>
              <p className="data-left">Energiekosten:</p>{" "}
              <p className="data-right">
                {(shipData?.energycosts ?? 0) * (count ?? 0)}
              </p>
            </li>
          </ul>
          <div className="increment-decrement">
            <input
              type="text"
              className="build-counter"
              value={count}
              onChange={handleInputChange}
              min="0"
              max={maxCount}
            />
            <button className="btn" onClick={decrementCount}>
              -
            </button>
            <button className="btn" onClick={incrementCount}>
              +
            </button>
          </div>
          <button className="btn buy-btn" onClick={() => buildShip()}>
            Kaufen
          </button>
          <p className="buy-message">{buyMessage}</p>
        </div>
      </div>
      <div className="werften-box">
        <div className="werft">
          <div className="werft-bar">
            <button
              className={`btn ${
                activeType === "lightShipyard" ? "active" : ""
              }`}
              id="change-klein"
              onClick={() => handleShipType("lightShipyard")}
            >
              Kleine Werft
            </button>
            <button
              className={`btn ${
                activeType === "mediumShipyard" ? "active" : ""
              }`}
              id="change-mittel"
              onClick={() => handleShipType("mediumShipyard")}
            >
              Mittlere Werft
            </button>
            <button
              className={`btn ${
                activeType === "heavyShipyard" ? "active" : ""
              }`}
              id="change-gross"
              onClick={() => handleShipType("heavyShipyard")}
            >
              Große Werft
            </button>
          </div>
          <div className="btn-box" id="btn-content">
            {ships.map((ship) => (
              <button
                key={ship.shipType}
                id={ship.shipType}
                className={`${ship.class} ${
                  activeShip === ship.shipType ? "active" : ""
                }`}
                onClick={() => changeDescriptionAndImage(ship.shipType)}
              >
                {ship.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipyard;
