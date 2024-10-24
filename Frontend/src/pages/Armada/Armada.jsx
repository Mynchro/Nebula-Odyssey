import { useState, useEffect } from "react";
import werftTypen from "../../assets/data/werften";
/* eslint-disable react/prop-types */
import './Armada.css';
import activities from '../../assets/data/activities';
//import units from '../../assets/data/units';

const Activity = ({ activity }) => {
  const [countdown, setCountdown] = useState(activity.timestamp);
  const [showForwardAnimation, setShowForwardAnimation] = useState(true);
  const [showBackwardAnimation, setShowBackwardAnimation] = useState(false);

  const animationDuration = `${activity.timestamp}s`; // Dauer der Animation aus Timestamp berechnen

  useEffect(() => {
      const forwardAnimationTime = activity.timestamp * 1000; // In Millisekunden

      // Countdown-Timer
      const interval = setInterval(() => {
          setCountdown(prevCountdown => prevCountdown > 0 ? prevCountdown - 1 : 0);
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
  }, [activity.timestamp]);

  return (
      <div className='activity'>
          <div className='activity-info'>
              <p>Truppenstärke: {activity.info.Truppenstärke}</p>
              <ul>
                  {Object.values(activity.info.Einheiten).map((einheit, index) => (
                      <li key={index}>{einheit}</li>
                  ))}
              </ul>
          </div>
          <div className='activity-visual'>
              <div>
                  <img id="armada-in-activity" src={activity.planets[0].img} alt={activity.planets[0].name} />
                  <p className='activity-planet'>{activity.planets[0].name}</p>
              </div>
              <div className='timer'>
                  {countdown}s
                  {showForwardAnimation && (
                      <img
                          src='/icons/spaceship-right.png'
                          className={`fa-solid fa-shuttle-space ship-forward`}
                          style={{ animationDuration: animationDuration }}
                      ></img>
                  )}
                  {showBackwardAnimation && (
                      <img
                          src='/icons/spaceship-left.png'
                          className={`ship-backward`}
                          style={{ animationDuration: animationDuration }}
                      ></img>
                  )}
              </div>
              <div>
                  <img id="armada-in-activity" src={activity.planets[1].img} alt={activity.planets[1].name} />
                  <p className='activity-planet'>{activity.planets[1].name}</p>
              </div>
          </div>
      </div>
  );
};

const defaultImage = `/werften/uebersicht-defense.png`;

const Armada = () => {
  const [description, setDescription] = useState(null);
  const [image, setImage] = useState(defaultImage);
  const [active, setActive] = useState("");

  const changeDescriptionAndImage = (descriptionKey) => {
    let item = null;
    ["klein", "mittel", "gross"].forEach((size) => {
      if (!item) {
        item = werftTypen[size].find(
          (element) => element.id === descriptionKey
        );
      }
    });

    if (item) {
      setDescription(item.description);
      setImage(item.img);
      setActive(descriptionKey); // Set the active button
    }
  };

  return (
    <div className="content-box">
      <div className="overview-title">
        <h1>Armada</h1>
      </div>
      <div className="armada-top">
        <div className="armada-info">
          <h3>Deine Einheiten</h3>
          <ul>
            <li>
              <p>Kleine Werft</p>
              <p>0</p>
            </li>
            <li>
              <p>Mittlere Werft:</p>
              <p>0</p>
            </li>
            <li>
              <p>Große Werft:</p>
              <p>0</p>
            </li>
            <li>
              <p>Einheiten Gesamt:</p>
              <p>0</p>
            </li>
          </ul>
        </div>
        <div className="armada-rightbox">
          <div className="armada-img">
            <img src={image} alt="Verteidigungsanlage"></img>
          </div>
          <div className="armada-btnbox">
          <button
              className={`btn ${active === "" ? "active" : ""}`}
              onClick={() => {
                setDescription(null);
                setImage(defaultImage);
                setActive(""); // Setzt den aktiven Zustand auf "" (Übersicht)
              }}
          >
            Übersicht
          </button>
          <button
            className={`btn ${active === "kleinewerft" ? "active" : ""}`}
            onClick={() => changeDescriptionAndImage("kleinewerft")}
          >
            Kleine Werft
          </button>
          <button
            className={`btn ${active === "mittlerewerft" ? "active" : ""}`}
            onClick={() => changeDescriptionAndImage("mittlerewerft")}
          >
            Mittlere Werft
          </button>
          <button
            className={`btn ${active === "großewerft" ? "active" : ""}`}
            onClick={() => changeDescriptionAndImage("großewerft")}
          >
            Große Werft
          </button>
          </div>
        </div>
      </div>
      <section>
                <h3 className='text-title'>Armada im Einsatz</h3>
                {activities.map((activity, index) => (
                    <Activity key={index} activity={activity} />
                ))}
            </section>
    </div>
  );
};

export default Armada;
