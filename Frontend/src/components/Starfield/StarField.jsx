import { useEffect, useRef } from 'react';
import './StarField.css';

const NUMBER_OF_STARS = 50;  // Anzahl der Sterne auf 10 setzen

const StarField = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Erstelle die Sterne
    const stars = [];
    for (let i = 0; i < NUMBER_OF_STARS; i++) {
      const star = document.createElement('div');
      star.className = 'star';

      const x = Math.random() * windowWidth;
      star.style.left = `${x}px`;

      const y = Math.random() * windowHeight;
      star.style.top = `${y}px`;

      container.appendChild(star);
      stars.push(star);
    }

    // Füge die Puls-Animation zu jedem Stern hinzu
    stars.forEach(star => {
      const pulseTime = Math.random() * 8000;
      setTimeout(() => {
        star.classList.add('pulse');
      }, pulseTime);
    });

    // Cleanup-Funktion
    return () => {
      stars.forEach(star => container.removeChild(star));
    };
  }, []);

  return <div ref={containerRef} className="star-field" />;
};

export default StarField;


