import "./Navbar.css";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { defaultUser_DEV, PlayerContext } from "../../context/PlayerContext";
import Audio from "../Audio/Audio";
import axios from "axios";

const Navbar = () => {
  const { currentPlayer, setCurrentPlayer } = useContext(PlayerContext);
  const userName = currentPlayer?.userName;
  const navigate = useNavigate();

  // Funktion für Logout
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/user/logout",
        {},
        { withCredentials: true }
      );
      setCurrentPlayer(defaultUser_DEV);
      navigate("/");
    } catch (error) {
      console.error("Fehler beim Logout:", error);
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
          to="/settings"
          className={({ isActive }) => (isActive ? "active" : "")}
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
          onClick={handleLogout}
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
    </header>
  );
};

export default Navbar;
