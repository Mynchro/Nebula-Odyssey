/* eslint-disable react/prop-types */
import React from "react";
import { useState, useEffect, useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { useOutletContext } from "react-router-dom";
import werftTypen from "../../assets/data/werften";
import activities from "../../assets/data/activities";
import "../../pages/Armada/Armada.css";

const Activity = ({
  activity,
  totalCount,
  selectedPlanet,
  choicePlanet,
  fleetName,
  startAnimation,
}) => {
  const { currentPlayer } = useContext(PlayerContext);
  const [countdown, setCountdown] = useState(activity.timestamp);
  const [showForwardAnimation, setShowForwardAnimation] = useState(false);
  const [showBackwardAnimation, setShowBackwardAnimation] = useState(false);

  const animationDuration = `${activity.timestamp}s`;

  useEffect(() => {
    if (!startAnimation) return;
    const forwardAnimationTime = activity.timestamp * 1000; // In Millisekunden

    // Countdown-Timer
    const interval = setInterval(() => {
      setCountdown((prevCountdown) =>
        prevCountdown > 0 ? prevCountdown - 1 : 0
      );
    }, 1000);

    // Vorwärtsanimation starten
    const forwardAnimation = setTimeout(() => {
      setShowForwardAnimation(true);
      setShowBackwardAnimation(false);
    }, 0); // Sofort starten

    // Vorwärtsanimation beenden
    const hideForwardAnimationTimeout = setTimeout(() => {
      setShowForwardAnimation(false);
    }, forwardAnimationTime);

    // Countdown auf 5 Sekunden setzen
    const resetCountdown = setTimeout(() => {
      setCountdown(5);
    }, forwardAnimationTime); // Nach Abschluss der Vorwärtsanimation

    // Rückwärtsanimation nach 5 Sekunden starten
    const backwardAnimationTimeout = setTimeout(() => {
      setShowBackwardAnimation(true);
      setCountdown(activity.timestamp); // Countdown neu starten
    }, forwardAnimationTime + 5000); // 5 Sekunden nach Vorwärtsanimation

    // Rückwärtsanimation beenden
    const hideBackwardAnimationTimeout = setTimeout(() => {
      setShowBackwardAnimation(false);
    }, forwardAnimationTime + 5000 + activity.timestamp * 1000); // Rückwärtsanimation-Dauer hinzufügen

    return () => {
      clearInterval(interval);
      clearTimeout(forwardAnimation);
      clearTimeout(hideForwardAnimationTimeout);
      clearTimeout(resetCountdown);
      clearTimeout(backwardAnimationTimeout);
      clearTimeout(hideBackwardAnimationTimeout);
    };
  }, [startAnimation]);

  return (
    <div className="activity">
      <div className="activity-info">
        <p>Truppenstärke: {totalCount}</p>
        <p>Flottenname: {fleetName}</p>
      </div>
      <div className="activity-visual">
        <div>
          <img
            id="armada-in-activity"
            src={
              selectedPlanet?.image ? selectedPlanet.image : "/planets/p-13.png"
            }
            alt={"Dein ausgewählter Planet"}
          />
          <p className="activity-planet">
            {selectedPlanet?.name ? selectedPlanet.name : "N/A"}
          </p>
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
            src={choicePlanet?.image ? choicePlanet.image : "/planets/p-13.png"}
            alt={"Zu besiedelnder Planet"}
          />
          <p className="activity-planet">
            {choicePlanet?.name ? choicePlanet.name : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Activity;
