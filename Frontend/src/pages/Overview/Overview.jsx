import "./Overview.css";
import { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { useOutletContext } from "react-router-dom";

const Overview = () => {
  const { currentPlayer } = useContext(PlayerContext);

  const userName = currentPlayer.userName || "Guest";
  const planets = currentPlayer.planets || [];

  const { selectedPlanet } = useOutletContext();
  const planetName = selectedPlanet ? selectedPlanet.name : "Unknown Planet";

  console.log("Aktueller Spieler:", currentPlayer);
  console.log("Benutzername:", userName);
  console.log("Aktueller Planetenname:", selectedPlanet);

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
              <em>Keine Werften in Bau</em>
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
              <em>Keine Gebäude in Bau</em>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
