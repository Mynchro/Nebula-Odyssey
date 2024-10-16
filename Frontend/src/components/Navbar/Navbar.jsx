import "./Navbar.css";
import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { PlayerContext } from "../../context/PlayerContext";
import Audio from "../Audio/Audio";

const Clock = () => {
  let time = new Date().toLocaleTimeString();
  const [currentTime, setCurrentTime] = useState(time);

  const updateTime = () => {
    let time = new Date().toLocaleTimeString();
    setCurrentTime(time);
  };
  setInterval(updateTime, 1000);

  return <>{currentTime}</>;
};

const Navbar = () => {
  const { currentPlayer } = useContext(PlayerContext);

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
          to="#"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          NOTIZEN
        </NavLink>
        <NavLink
          to="#"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          HIGHSCORE
        </NavLink>
        <NavLink
          to="#"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          EINSTELLUNGEN
        </NavLink>
        <NavLink
          to="#"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          SUPPORT
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          {currentPlayer && currentPlayer.username === "Guest"
            ? "LOGIN"
            : "LOGOUT"}
        </NavLink>
      </div>
      <div className="player">
        <a href="#">{currentPlayer.username}</a>
      </div>
      <div className="audio">
        <Audio />
      </div>
      <div className="clock" id="clock">
        <p>
          <Clock />
        </p>
      </div>
    </header>
  );
};

export default Navbar;
