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
  const [shipAmount, setShipAmount] = useState("");
  const [shipBuildTime, setshipBuildTime] = useState("");

  const [lightShipyardIsBuilding, setLightShipyardIsBuilding] = useState(false);
  const [lightShipInProcess, setLightShipInProcess] = useState("");
  const [lightShipTimeLeft, setLightShipTimeLeft] = useState("00:00:00");
  const [mediumShipyardIsBuilding, setMediumShipyardIsBuilding] =
    useState(false);
  const [mediumShipInProcess, setMediumShipInProcess] = useState("");
  const [mediumShipTimeLeft, setMediumShipTimeLeft] = useState("00:00:00");
  const [heavyShipyardIsBuilding, setHeavyShipyardIsBuilding] = useState(false);
  const [heavyShipInProcess, setHeavyShipInProcess] = useState("");
  const [heavyShipTimeLeft, setHeavyShipTimeLeft] = useState("00:00:00");

  const handleShipType = async (type) => {
    const loadedShips = await loadShips(); // Schiffe laden
    const loadetPlanet = await loadPlanet();
    // Verwende reduce, um Schiffe mit dem gültigen shipYardType zu sammeln
    const filteredShips = loadedShips.reduce((result, ship) => {
      if (type === ship.shipYardType) {
        result.push(ship); // Füge das Schiff der Ergebnisliste hinzu
      }
      return result; // Gib das Ergebnis zurück
    }, []);
    setShips(filteredShips); // Setze den Zustand mit den gefilterten Schiffen
    setActiveType(type); // Setze den aktiven Werfttyp

    setLightShipyardIsBuilding(loadetPlanet.lightShipIsBuilding);
    setMediumShipyardIsBuilding(loadetPlanet.mediumShipIsBuilding);
    setHeavyShipyardIsBuilding(loadetPlanet.heavyShipIsBuilding);

    setLightShipTimeLeft(
      getTimeRemaining(loadetPlanet.finishingTimeOfLightShipsInBuilding)
    );
    setMediumShipTimeLeft(
      getTimeRemaining(loadetPlanet.finishingTimeOfMediumShipsInBuilding)
    );
    setHeavyShipTimeLeft(
      getTimeRemaining(loadetPlanet.finishingTimeOfHeavyShipsInBuilding)
    );

    setLightShipInProcess(loadetPlanet.typeOfLightShipsInBuilding);
    setMediumShipInProcess(loadetPlanet.typeOfMediumShipsInBuilding);
    setHeavyShipInProcess(loadetPlanet.typeOfHeavyShipsInBuilding);
  };
  const loadPlanet = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/${currentPlayer._id}/planet/${selectedPlanet._id}/getPlanetById`
      );
      if (!response.ok) {
        throw new Error("Fehler beim Laden des Planeten");
      }

      return response.json();
    } catch {
      throw new Error("loadPlanet funktioniert nicht");
    }
  };
  const loadShips = async () => {
    try {
      //"/user/:userId/:planetId/getPlayerShips"
      const response = await fetch(
        `http://localhost:3000/shipyard/user/${currentPlayer._id}/${selectedPlanet._id}/getPlayerShips`
      );
      //const response = await fetch("http://localhost:3000/shipyard/shipdata");
      //`http://localhost:3000/shipyard/user/${currentPlayer._id}/ship/${activeShip}/getShip/${selectedPlanet._id}`,
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

    // Suche nach dem Schiff anhand des shipType
    for (const ship of ships) {
      if (ship.shipType === descriptionKey) {
        // Vergleiche anhand von 'id' statt 'shipType'
        item = ship;
        break; // Wenn das Schiff gefunden wurde, beende die Schleife
      }
    }

    if (item) {
      setShipData({
        ...item.ressourceCosts, // Alle Eigenschaften von 'ressourceCosts'
        ...item.values, // Alle Eigenschaften von 'values'
      });

      setShipAmount(item.amount);
      setshipBuildTime(item.buildTime);
      setShipImage(`url(${item.img})`);
      setShipTitle(item.label);
      setShipDescription(item.description);
      setActiveShip(descriptionKey); // Set the active ship button
    }
  };

  // Counter
  const [count, setCount] = useState(1);
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

  const update = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/shipyard/user/${currentPlayer._id}/ship/${activeShip}/getShip/${selectedPlanet._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer deinTokenHier",
          },
        }
      );
      if (response.ok) {
        const data = await response.json(); // Antwort des Servers (falls im JSON-Format)
        setCurrentPlayer(data.user);
        setShipAmount(data.ship.amount);
      } else {
        console.error("Fehler beim laden der Daten:", response.statusText);
      }
    } catch (error) {
      console.error("Es gab einen Fehler:", error);
    }
  };
  const buildShip = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/shipyard/user/${currentPlayer._id}/ship/${activeShip}/buildShip/${selectedPlanet._id}/${count}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer deinTokenHier",
          },
        }
      );

      if (response.ok) {
        const data = await response.json(); // Antwort des Servers (falls im JSON-Format)
        setLightShipTimeLeft(
          getTimeRemaining(data.planet.finishingTimeOfLightShipsInBuilding)
        );
        setMediumShipTimeLeft(
          getTimeRemaining(data.planet.finishingTimeOfMediumShipsInBuilding)
        );
        setHeavyShipTimeLeft(
          getTimeRemaining(data.planet.finishingTimeOfHeavyShipsInBuilding)
        );
        if (data.ship.shipYardType === "lightShipyard") {
          setLightShipyardIsBuilding(true);
          setLightShipInProcess(data.ship.label);
          setLightShipTimeLeft(
            getTimeRemaining(data.planet.finishingTimeOfLightShipsInBuilding)
          );
        }
        if (data.ship.shipYardType === "mediumShipyard") {
          setMediumShipyardIsBuilding(true);
          setMediumShipInProcess(data.ship.label);
          setMediumShipTimeLeft(
            getTimeRemaining(data.planet.finishingTimeOfMediumShipsInBuilding)
          );
        }
        if (data.ship.shipYardType === "heavyShipyard") {
          setHeavyShipyardIsBuilding(true);
          setHeavyShipInProcess(data.ship.label);
          setHeavyShipTimeLeft(
            getTimeRemaining(data.planet.finishingTimeOfHeavyShipsInBuilding)
          );
        }
        setCurrentPlayer(data.user);
        setShipAmount(data.ship.amount);

        console.log("Schiff erfolgreich gebaut:", data);
      } else {
        console.error("Fehler beim Bauen des Schiffs:", response.statusText);
      }
    } catch (error) {
      console.error("Es gab einen Fehler:", error);
    }
  };

  const toggleBuyButton = () => {
    if (activeType === "lightShipyard") {
      if (lightShipyardIsBuilding) {
        return (
          <button className="btn buy-btn" disabled>
            {lightShipInProcess + " im Bau " + lightShipTimeLeft}
          </button>
        );
      } else {
        return (
          <button className="btn buy-btn" onClick={() => buildShip()}>
            Bauen
          </button>
        );
      }
    }
    if (activeType === "mediumShipyard") {
      if (mediumShipyardIsBuilding) {
        return (
          <button className="btn buy-btn" disabled>
            {mediumShipInProcess + " im Bau " + mediumShipTimeLeft}
          </button>
        );
      }
      return (
        <button className="btn buy-btn" onClick={() => buildShip()}>
          Bauen
        </button>
      );
    }
    if (activeType === "heavyShipyard") {
      if (heavyShipyardIsBuilding) {
        return (
          <button className="btn buy-btn" disabled>
            {heavyShipInProcess + " im Bau " + heavyShipTimeLeft}
          </button>
        );
      }
      return (
        <button className="btn buy-btn" onClick={() => buildShip()}>
          Bauen
        </button>
      );
    }
  };

  useEffect(() => {
    // Erstelle ein Intervall, das jede Sekunde den State verändert
    const interval = setInterval(() => {
      if (lightShipInProcess) {
        setLightShipTimeLeft(reduceSecond(lightShipTimeLeft));
        if (isTimeZeroOrNegative(lightShipTimeLeft)) {
          setLightShipyardIsBuilding(false);
          setLightShipInProcess(false);
          //update();
        }
      }
      if (mediumShipInProcess) {
        setMediumShipTimeLeft(reduceSecond(mediumShipTimeLeft));
        if (isTimeZeroOrNegative(mediumShipTimeLeft)) {
          setMediumShipyardIsBuilding(false);
          setMediumShipInProcess(false);
          //update();
        }
      }
      if (heavyShipInProcess) {
        setHeavyShipTimeLeft(reduceSecond(heavyShipTimeLeft));
        if (isTimeZeroOrNegative(heavyShipTimeLeft)) {
          setHeavyShipyardIsBuilding(false);
          setHeavyShipInProcess(false);
          //update();
        }
      }
      update();
    }, 1000); // Alle 1000 Millisekunden (1 Sekunde)

    // Cleanup-Funktion: Der Intervall wird gestoppt, wenn die Komponente unmontiert wird
    return () => clearInterval(interval);
  });
  function getTimeRemaining(finishingTime) {
    // Holen der aktuellen Zeit
    const now = new Date();

    // Zerlegen der finishingTime in Stunden, Minuten und Sekunden
    const [hours, minutes, seconds] = finishingTime.split(":").map(Number);

    // Erstellen eines Date-Objekts für die Fertigstellungszeit
    const finishDate = new Date(now);
    finishDate.setHours(hours, minutes, seconds, 0); // setze Stunden, Minuten und Sekunden

    // Berechne die verbleibende Zeit (in Millisekunden)
    const timeDifference = finishDate - now;

    // Wenn die Zeit bereits vorbei ist (negative Differenz), zurückgeben 00:00:00
    if (timeDifference <= 0) {
      return "00:00:00";
    }

    // Berechne verbleibende Stunden, Minuten und Sekunden
    const remainingHours = Math.floor(timeDifference / (1000 * 60 * 60));
    const remainingMinutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const remainingSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Formatieren der verbleibenden Zeit im Format "00:00:00"
    const formattedTime = [remainingHours, remainingMinutes, remainingSeconds]
      .map((unit) => unit.toString().padStart(2, "0"))
      .join(":");

    return formattedTime;
  }
  function isTimeZeroOrNegative(timeString) {
    // Zerlege den Zeitstring in Stunden, Minuten und Sekunden
    const [hours, minutes, seconds] = timeString.split(":").map(Number);

    // Prüfe, ob Stunden, Minuten und Sekunden alle kleiner oder gleich 0 sind
    return hours <= 0 && minutes <= 0 && seconds <= 0;
  }
  const reduceSecond = (time) => {
    // Zerlege die Zeit in Stunden, Minuten und Sekunden
    const [hours, minutes, seconds] = time.split(":").map(Number);

    // Verringere die Sekunden um 1
    let newSeconds = seconds - 1;
    let newMinutes = minutes;
    let newHours = hours;
    if (newSeconds === 0 && newMinutes === 0 && newHours === 0) {
      return "00:00:00";
    }
    // Falls die Sekunden unter 0 fallen, setze sie auf 59 und verringere die Minuten
    if (newSeconds < 0) {
      newSeconds = 59;
      newMinutes -= 1;
    }

    // Falls die Minuten unter 0 fallen, setze sie auf 59 und verringere die Stunden
    if (newMinutes < 0) {
      newMinutes = 59;
      newHours -= 1;
    }

    // Falls die Stunden unter 0 fallen, setze sie auf 23 (für den Fall, dass wir um Mitternacht herum rechnen)
    if (newHours < 0) {
      newHours = 23;
    }

    // Formatieren der neuen Zeit im Format "HH:MM:SS"
    const formattedTime = [newHours, newMinutes, newSeconds]
      .map((unit) => unit.toString().padStart(2, "0"))
      .join(":");

    return formattedTime;
  };

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
              <p className="data-left">Aktuelle Anzahl:</p>{" "}
              <p className="data-right">{shipAmount}</p>
            </li>
            <li>
              <p className="data-left">Bauzeit:</p>{" "}
              <p className="data-right">{shipBuildTime}</p>
            </li>
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
                {(shipData?.steel ?? 0) * (count ?? 0)}
              </p>
            </li>
            <li>
              <p className="data-left">Mikrochipkosten:</p>{" "}
              <p className="data-right">
                {(shipData?.electronics ?? 0) * (count ?? 0)}
              </p>
            </li>
            <li>
              <p className="data-left">Chemiekosten:</p>{" "}
              <p className="data-right">
                {(shipData?.chemicals ?? 0) * (count ?? 0)}
              </p>
            </li>
            <li>
              <p className="data-left">Energiekosten:</p>{" "}
              <p className="data-right">
                {(shipData?.energy ?? 0) * (count ?? 0)}
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
          {toggleBuyButton()}

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
                className={`${"btn"} ${
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
