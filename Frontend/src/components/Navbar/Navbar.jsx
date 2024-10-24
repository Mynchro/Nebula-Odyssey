import "./Navbar.css";
import { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { PlayerContext } from "../../context/PlayerContext";
import Audio from "../Audio/Audio";
import axios from 'axios'; // Für die API-Anfragen

const Navbar = () => {
  const { currentPlayer, setCurrentPlayer } = useContext(PlayerContext);
  const { userName, color: initialColor } = currentPlayer.user; // 'color' wird genutzt, falls der Spieler schon eine Farbe gespeichert hat

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState(initialColor || "#ffffff"); // Standardfarbe

  // Funktion, die den Farbwechsel handhabt
  const handleColorChange = async (e) => {
    const newColor = e.target.value;
    setSelectedColor(newColor);

    // Spieler-Daten aktualisieren
    const updatedPlayer = { ...currentPlayer, user: { ...currentPlayer.user, color: newColor } };
    setCurrentPlayer(updatedPlayer);

    try {
      // Farbe in der Datenbank speichern
      const response = await axios.put(`http://localhost:3000/api/user/${currentPlayer.user._id}`, { color: newColor });
      console.log("Farbe erfolgreich gespeichert", response.data);

      // CSS-Variable aktualisieren
      document.documentElement.style.setProperty('--secondary-color', newColor);
    } catch (error) {
      console.error("Fehler beim Speichern der Farbe", error);
    }
  };

  // Setze die Farbe beim ersten Laden der Komponente
  useEffect(() => {
    document.documentElement.style.setProperty('--secondary-color', selectedColor);
  }, [selectedColor]);

  return (
    <header>
      <div className="head-bar">
        <NavLink to="/overview" className={({ isActive }) => (isActive ? "active" : "")}>HOME</NavLink>
        <NavLink to="/comingsoon" className={({ isActive }) => (isActive ? "active" : "")}>NOTIZEN</NavLink>
        <NavLink to="/comingsoon" className={({ isActive }) => (isActive ? "active" : "")}>HIGHSCORE</NavLink>
        <NavLink className="colorpicker" onClick={() => setShowColorPicker(!showColorPicker)}>EINSTELLUNGEN</NavLink>
        <NavLink to="/comingsoon" className={({ isActive }) => (isActive ? "active" : "")}>SUPPORT</NavLink>
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
          {currentPlayer && currentPlayer.userName === "Guest" ? "LOGIN" : "LOGOUT"}
        </NavLink>
      </div>

      <div className="player">
        <a href="#">{userName || ""}</a>
      </div>
      <div className="audio">
        <Audio />
      </div>

      {/* Color Picker anzeigen, wenn auf Einstellungen geklickt wurde */}
      {showColorPicker && (
        <div className="colorpickerbox">
          <input
            type="color"
            value={selectedColor}
            onChange={handleColorChange} // Hier die Funktion verwenden, um die Farbe zu aktualisieren
          />
        </div>
      )}
    </header>
  );
};

export default Navbar;



