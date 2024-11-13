/* eslint-disable react/prop-types */

export const PlanetBox = ({
  className,
  number,
  image,
  alt,
  circleColor,
  triangleColor,
  skullColor,
  planetName,
  playerName,
  onClick,
}) => {
  // // Generiere eine zufällige Zahl zwischen 2 und 22 für den Fallback
  // const getRandomPlanetImage = () => {
  //   const randomIndex = Math.floor(Math.random() * 21) + 2; // Zahl zwischen 2 und 22
  //   return `/planets/p-${randomIndex}.png`;
  // };

  return (
    <div
      className={`planet-box ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <div className="planetnumber">
        <p>{number}</p>
        <div className="alert-icons">
          <i className="fa-solid fa-circle" style={{ color: circleColor }}></i>
          <i
            className="fa-solid fa-triangle-exclamation"
            style={{ color: triangleColor }}
          ></i>
          <i
            className="fa-solid fa-skull-crossbones"
            style={{ color: skullColor }}
          ></i>
        </div>
      </div>

      {/* Verwende entweder das Bild aus der API oder einen zufälligen Fallback */}
      <div>
        <img src={image} alt={alt} />
      </div>

      <div className="planet-data">
        <p>{planetName}</p>
        <p>{playerName || "Unknown Owner"}</p>
      </div>
    </div>
  );
};
