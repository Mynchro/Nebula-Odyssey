/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import './Armada.css';
import activities from '../../assets/data/activities';
import units from '../../assets/data/units';

const Armada = () => {
    return (
        <div className="content-box">
            <div className='armada-title'>
                <h1>Armada</h1>
            </div>
            <section>
                <h3 className='text-title'>Armada im Einsatz</h3>
                {activities.map((activity, index) => (
                    <Activity key={index} activity={activity} />
                ))}
            </section>
            <section>
                <h3 className='text-title'>Armada im Hangar</h3>
                <ul>
                    <li className='unit-box-title'>
                        <p className='text-left'>Einheit</p>
                        <p className='text-right'>Anzahl</p>
                    </li>
                    {units.map((unit, index) => (
                        <Units key={index} unit={unit} />
                    ))}
                </ul>
            </section>
        </div>
    );
};

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
                    <img src={activity.planets[0].img} alt={activity.planets[0].name} />
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
                    <img src={activity.planets[1].img} alt={activity.planets[1].name} />
                    <p className='activity-planet'>{activity.planets[1].name}</p>
                </div>
            </div>
        </div>
    );
};

const Units = ({ unit }) => {
    return (
        <li className='unit-box'>
            <p className='text-left'>{unit.id}</p>
            <p className='text-right'>{unit.number}</p>
        </li>
    );
};

export default Armada;


