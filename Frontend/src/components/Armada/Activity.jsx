import React from "react";
import { useState, useEffect, useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { useOutletContext } from "react-router-dom";
import werftTypen from "../../assets/data/werften";
import activities from "../../assets/data/activities";
import "../../pages/Armada/Armada.css";

const Activity = ({ activity }) => {
  const { currentPlayer } = useContext(PlayerContext);
  const [countdown, setCountdown] = useState(activity.timestamp);
  const [showForwardAnimation, setShowForwardAnimation] = useState(true);
  const [showBackwardAnimation, setShowBackwardAnimation] = useState(false);

  const animationDuration = `${activity.timestamp}s`;

  return (
    <div className="activity">
      <div className="activity-info">
        <p>Truppenstärke: {activity.info.Truppenstärke}</p>
        <ul>
          {Object.values(activity.info.Einheiten).map((einheit, index) => (
            <li key={index}>{einheit}</li>
          ))}
        </ul>
      </div>
      <div className="activity-visual">
        <div>
          <img
            id="armada-in-activity"
            src={activity.planets[0].img}
            alt={activity.planets[0].name}
          />
          <p className="activity-planet">{activity.planets[0].name}</p>
        </div>
        <div className="timer">
          {countdown}s
          {showForwardAnimation && (
            <img
              src="/icons/spaceship-right.png"
              className={`fa-solid fa-shuttle-space ship-forward`}
              style={{ animationDuration: animationDuration }}
            ></img>
          )}
          {showBackwardAnimation && (
            <img
              src="/icons/spaceship-left.png"
              className={`ship-backward`}
              style={{ animationDuration: animationDuration }}
            ></img>
          )}
        </div>
        <div>
          <img
            id="armada-in-activity"
            src={activity.planets[1].img}
            alt={activity.planets[1].name}
          />
          <p className="activity-planet">{activity.planets[1].name}</p>
        </div>
      </div>
    </div>
  );
};

export default Activity;
