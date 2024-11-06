import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Ressourcebar from "../components/Ressourcen/Ressourcebar";
import Planets from "../components/Planets/Planets";
import Menubox from "../components/Menubox/Menubox";
import Chatbox from "../components/Chatbox/Chatbox";
import { useState, useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const SharedLayout = () => {
  const { currentPlayer } = useContext(PlayerContext);
  const [selectedPlanetIndex, setSelectedPlanetIndex] = useState(0); // State für den ausgewählten Planeten

  // Hol das Planeten-Array vom aktuellen Spieler
  const planets = currentPlayer?.planets || [];
  console.log("xyz:", currentPlayer.planets);

  // Funktion zum Aktualisieren des ausgewählten Planeten
  const handlePlanetSelect = (index) => {
    setSelectedPlanetIndex(index);
  };

  return (
    <>
      {/* nav/header */}
      <Navbar />
      {planets.length > 0 && (
        <Ressourcebar
          resources={planets[selectedPlanetIndex]?.resources || {}}
        />
      )}
      <Planets planets={planets} onPlanetSelect={handlePlanetSelect} />
      <main className="main-container">
        <Menubox />
        <Outlet
          context={{ planets, selectedPlanet: planets[selectedPlanetIndex] }}
        />
        <Chatbox />
      </main>
      {/* footer */}
    </>
  );
};

export default SharedLayout;
