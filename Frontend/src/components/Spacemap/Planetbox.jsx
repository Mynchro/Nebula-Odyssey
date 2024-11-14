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
  // Wenn der Planetname "Sun" ist, nur das Bild anzeigen, aber Platz für die anderen Elemente einhalten
  if (planetName === "Sun") {
    return (
      <div
        className={`planet-box ${className} sun`}
        style={{ pointerEvents: "none" }}
      >
        <div className="planetnumber" style={{ visibility: "hidden" }}>
          <p>{number}</p>
          <div className="alert-icons">
            <i
              className="fa-solid fa-circle"
              style={{ color: circleColor }}
            ></i>
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

        <div>
          <img src={image} alt={alt} />
        </div>

        {/* Dieser Bereich wird für die Sonne nicht angezeigt, behält aber den Platz */}
        <div className="planet-data" style={{ visibility: "hidden" }}>
          <p>{planetName}</p>
          <p>{playerName || "Unknown Owner"}</p>
        </div>
      </div>
    );
  }

  // Wenn es keine Sonne ist, die PlanetBox normal anzeigen und onClick ausführen
  return (
    <div
      className={`planet-box ${className}`}
      onClick={(e) => {
        e.stopPropagation(); // Verhindert das Weiterleiten des Klicks
        onClick && onClick(); // Führt onClick nur aus, wenn es definiert ist
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
