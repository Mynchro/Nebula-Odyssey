import "./Navbar.css";
import { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { PlayerContext } from "../../context/PlayerContext";
import Audio from "../Audio/Audio";
import axios from "axios";

const Navbar = () => {
  const { currentPlayer, setCurrentPlayer } = useContext(PlayerContext);
  const userName = currentPlayer?.userName;
  const navigate = useNavigate();

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#ffffff"); // Setze einen Standardwert

  // Funktion für Logout
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/user/logout",
        {},
        { withCredentials: true }
      );
      setCurrentPlayer(null);
      navigate("/");
    } catch (error) {
      console.error("Fehler beim Logout:", error);
    }
  };

  useEffect(() => {
    if (currentPlayer?.user) {
      // Setze die Farbe beim Laden der Benutzereinstellungen
      const initialColor = currentPlayer.user.settings?.color || "#ffffff"; // Fallback auf Weiß
      setSelectedColor(initialColor);
      document.documentElement.style.setProperty(
        "--secondary-color",
        initialColor
      );
    }
  }, [currentPlayer]);

  // Funktion, die den Farbwechsel handhabt
  const handleColorChange = async (e) => {
    const newColor = e.target.value;
    setSelectedColor(newColor);

    // Spieler-Daten aktualisieren
    const updatedPlayer = {
      ...currentPlayer,
      user: {
        ...currentPlayer.user,
        settings: { color: newColor },
      },
    };
    setCurrentPlayer(updatedPlayer);

    if (!currentPlayer?._id) {
      console.log(currentPlayer._id);
      console.error("Benutzer-ID ist nicht definiert");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/api/user/${currentPlayer._id}`, // Achte darauf, dass die ID in der URL steht
        { color: newColor }
      );
      console.log("Farbe erfolgreich gespeichert", response.data);
      document.documentElement.style.setProperty("--secondary-color", newColor);
    } catch (error) {
      console.error("Fehler beim Speichern der Farbe", error);
    }
  };

  return (
    <header>
      <div className="head-bar">
        <NavLink
          to="/overview"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          HOME
        </NavLink>
        <NavLink
          to="/comingsoon"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          NOTIZEN
        </NavLink>
        <NavLink
          to="/comingsoon"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          HIGHSCORE
        </NavLink>
        <NavLink
          to="#"
          className={({ isActive }) =>
            isActive ? "active colorpicker" : "colorpicker"
          }
          onClick={() => setShowColorPicker(!showColorPicker)}
        >
          EINSTELLUNGEN
        </NavLink>
        <NavLink
          to="/comingsoon"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          SUPPORT
        </NavLink>
        <NavLink
          to="/"
          onClick={handleLogout} // handleLogout wird jetzt direkt hier aufgerufen
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          {currentPlayer && currentPlayer.userName === "Guest"
            ? "LOGIN"
            : "LOGOUT"}
        </NavLink>
      </div>

      <div className="player">
        <a href="#">{userName}</a>
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
