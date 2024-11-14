import "./Overview.css";
import { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { useOutletContext } from "react-router-dom";

const Overview = () => {
  const { currentPlayer } = useContext(PlayerContext);
  const { countdown } = useContext(PlayerContext);

  const userName = currentPlayer.userName || "Guest";
  const planets = currentPlayer.planets || [];
  const buildingInProgress = currentPlayer.buildingInProgress;

  const { selectedPlanet } = useOutletContext();
  const planetName = selectedPlanet ? selectedPlanet.name : "Unknown Planet";

  const formatCountdown = () => {
    if (!countdown) return ""; // Wenn kein Countdown vorhanden ist
    const hours = Math.floor(countdown / 3600);
    const minutes = Math.floor((countdown % 3600) / 60);
    const seconds = countdown % 60;
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const buildingDataMap = {
    smallShipyard: "Kleine Raumwerft",
    mediumShipyard: "Mittlere Raumwerft",
    largeShipyard: "Große Raumwerft",
    Mine: "Bergwerk",
    Ammofactory: "Munitionsfabrik",
    Fuelfactory: "Treibstofffabrik",
    Solarplant: "Solaranlage",
    Powerplant: "Kraftwerk",
    Refinery: "Raffinerie",
    Junkyard: "Schrottplatz",
    Recycler: "Recycler",
    Spycenter: "Spionagezentrum",
    Fueldepot: "Treibstofflager",
    Oredepot: "Erzlager",
    Chemicaldepot: "Chemikalienlager",
    Ammodepot: "Munitionslager",
    Steeldepot: "Stahllager",
    Energystorage: "Energyspeicher",
    Silicondepot: "Siliconlager",
    Mikrochipdepot: "Mikrochiplager",
  };

  console.log("Aktueller Spieler:", currentPlayer);
  console.log("Benutzername:", userName);
  console.log("Aktueller Planetenname:", selectedPlanet);
  console.log("testet", buildingInProgress)

  return (
    <div className="content-box">
      <div className="overview-title">
        <h1>Übersicht</h1>
      </div>
      <div className="topcontent">
        <div className="overview-topcontent">
          <h1 className="overview-user">
            Willkommen auf {planetName}, <em>{userName}</em>!
          </h1>
        </div>
      </div>
      <div className="overview-midcontent">
        <div className="midcontent midcontent-row1">
          <div className="overview-status">
            <h4>Raumkarte</h4>
            <p>
              <em>Aktive Planeten: {planets.length}</em>
            </p>
          </div>
          <div className="overview-status">
            <h4>Forschung</h4>
            <p>
              <em>Aktuell keine Forschung in Betrieb</em>
            </p>
          </div>
          <div className="overview-status">
            <h4>Verteidigung</h4>
            <p>
              <em>Noch nicht erforscht</em>
            </p>
          </div>
        </div>
        <div className="midcontent midcontent-row2">
          <div className="overview-status">
            <h4>Werften</h4>
            <p>
              <em>Keine Werften in Bau </em>
            </p>
          </div>
          <div className="overview-status">
            <h4>Armada</h4>
            <p>
              <em>Keine Flotten in Bewegung</em>
            </p>
          </div>
          <div className="overview-status">
            <h4>Gebäude</h4>
            <p>
            <em>
              {countdown 
                ? `Gebäude ${buildingDataMap[buildingInProgress] || buildingInProgress} wird gebaut ${formatCountdown()}` 
                : "Keine Gebäude in Bau"}
            </em>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
