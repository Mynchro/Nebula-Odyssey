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
  const { userName } = currentPlayer.user;

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
          to="/comingsoon"
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
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          {currentPlayer && currentPlayer.userName === "Guest"
            ? "LOGIN"
            : "LOGOUT"}
        </NavLink>
      </div>
      <div className="player">
        <a href="#">{userName || ""}</a>
        {console.log(currentPlayer)}
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
