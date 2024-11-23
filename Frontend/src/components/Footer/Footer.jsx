import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>
        Diese Seite dient zu Präsentationszwecken und befindet sich noch in Arbeit.
      </p>
      <p style={styles.text}>
        Besuche unseren YouTube-Kanal: 
        <a href="https://www.youtube.com/@Nebula-Odyssey-Game" target="_blank" rel="noopener noreferrer" style={styles.link}>
          Nebula Odyssey Game
        </a>
      </p>
      <p style={styles.text}>
        © 2024 Nebula Odyssey Games. Alle Rechte vorbehalten.
      </p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#fff',
    textAlign: 'center',
    padding: '1rem',
    position: 'absolute',
    bottom: 0,
    top: '1250px',
    height: '60px',
    width: '98.15vw',
    flexdirection: 'column',
  },
  text: {
    marginTop: '5px',
    fontSize: '14px',
  },
  link: {
    color: '#1e90ff',
    textDecoration: 'none',
    marginLeft: '5px',
  },
};

export default Footer;
