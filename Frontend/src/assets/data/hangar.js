const hangar = {
  klein: [
    {
      id: "leichter-jaeger",
      name: "Leichter Jäger",
      description:
        "Ein leichter Jäger, der sich durch hohe Geschwindigkeit und Wendigkeit auszeichnet. Ausgestattet mit leichten Waffen eignet er sich hervorragend für schnelle Angriffe und Verteidigungsmissionen. Besonders effektiv in Schwärmen. Perfekt für kurze, präzise Einsätze.",
      img: "/werften/kleine_werft/leichter_jaeger/leichter_jaeger.png",
    },
    {
      id: "schwerer-jaeger",
      name: "Schwerer Jäger",
      description:
        "Ein schwerer Jäger, der mit stärkeren Waffen und besserer Panzerung ausgestattet ist. Entwickelt für intensivere Kämpfe und zur Unterstützung größerer Flotten. Er kann mehr Schaden austeilen und einstecken als leichtere Jäger. Ideal für längere Kampfeinsätze.",
      img: "/werften/kleine_werft/schwerer_jaeger/schwerer_jaeger.png",
    },
    {
      id: "bomber",
      name: "Bomber",
      description:
        "Ein Bomber, spezialisiert auf das Abwerfen von schweren Bomben und Torpedos auf feindliche Ziele. Er ist weniger wendig, aber dafür stark gepanzert und in der Lage, massiven Schaden zu verursachen. Perfekt für Angriffe auf große Schiffe und stationäre Ziele. Langsame, aber mächtige Feuerkraft.",
      img: "/werften/kleine_werft/bomber/bomber.png",
    },
    {
      id: "fregatte",
      name: "Fregatte",
      description:
        "Eine Fregatte, die als vielseitiges Kriegsschiff in verschiedenen Rollen dienen kann. Sie ist gut bewaffnet und gepanzert, aber dennoch schnell und wendig. Ideal für Patrouillen, Eskortmissionen und den Schutz von Konvois. Ausgeglichen in Angriff und Verteidigung.",
      img: "/werften/kleine_werft/fregatte/fregatte.png",
    },
    {
      id: "kleiner-transporter",
      name: "Kleiner Transporter",
      description:
        "Ein kleiner Transporter, der für schnelle und effiziente Transporte von Gütern zwischen verschiedenen Stationen und Planeten verwendet wird. Er hat eine moderate Ladefähigkeit und ist gut geschützt gegen kleinere Angriffe. Ideal für schnelle Handelsmissionen. Kompakt und leicht manövrierbar.",
      img: "/werften/kleine_werft/kleiner_transporter/kleiner_transporter.png",
    },
    {
      id: "mining-drohne",
      name: "Miningdrohne",
      description:
        "Eine Mining-Drohne, die für den Abbau von Ressourcen in Asteroidenfeldern und auf Planetenoberflächen konzipiert ist. Ausgestattet mit speziellen Bergbauwerkzeugen und -technologien. Effizient und autonom arbeitend, ideal für die Unterstützung bei Bergbauoperationen. Robust und zuverlässig.",
      img: "/werften/kleine_werft/mining_drone/mining_drone.png",
    },
  ],
  mittel: [
    {
      id: "zerstoerer",
      name: "Zerstörer",
      description:
        "Ein Zerstörer, entwickelt zur Jagd auf feindliche Schiffe. Ausgestattet mit einer Vielzahl von Waffen und hoher Geschwindigkeit. Perfekt für offensive Missionen und Flottenbegleitung. Robuste Panzerung und starke Feuerkraft.",
      img: "/werften/mittlere_werft/zerstoerer/zerstoerer.png",
    },
    {
      id: "bergbau-schiff",
      name: "Bergbauschiff",
      description:
        "Ein Bergbauschiff, spezialisiert auf den großflächigen Abbau von Ressourcen im Weltraum. Ausgestattet mit fortschrittlichen Bergbauwerkzeugen und Lagerkapazitäten. Effizient und produktiv. Unterstützt wirtschaftliche Operationen durch Rohstoffgewinnung.",
      img: "/werften/mittlere_werft/bergbauschiff/bergbauschiff.png",
    },
    {
      id: "grosser-transporter",
      name: "Großer Transporter",
      description:
        "Ein großer Transporter mit erhöhter Ladefähigkeit für den Transport großer Mengen an Gütern. Gut geschützt und mit defensiven Waffensystemen ausgestattet. Ideal für längere Handelsrouten und Versorgungsmissionen. Bietet hohe Sicherheit für wertvolle Ladungen.",
      img: "/werften/mittlere_werft/grosser_transporter/grosser_transporter.png",
    },
    {
      id: "flugdeckkreuzer",
      name: "Flugdeckkreuzer",
      description:
        "Ein Flugdeckkreuzer, der als mobile Basis für Jäger und Bomber dient. Ausgestattet mit Landedecks und Hangars für verschiedene Schiffstypen. Bietet Luftunterstützung und Aufklärung.",
      img: "/werften/mittlere_werft/flugdeckkreuzer/flugdeckkreuzer.png",
    },
    {
      id: "kolonieschiff",
      name: "Kolonieschiff",
      description:
        "Ein Kolonieschiff, das Siedler und Ausrüstung zu neuen Planeten bringt. Gut ausgestattet für Langzeitmissionen und autarkes Leben. Ideal für die Expansion und Erkundung neuer Welten. Bietet Lebensraum und Schutz für Kolonisten.",
      img: "/werften/mittlere_werft/kolonieschiff/kolonieschiff.png",
    },
    {
      id: "kreuzer",
      name: "Kreuzer",
      description:
        "Ein Kreuzer, der als vielseitiges Kampfschiff in Flottenoperationen dient. Gut bewaffnet und gepanzert, aber dennoch relativ schnell. Kann verschiedene Rollen wie Angriff, Verteidigung und Unterstützung übernehmen. Ein Rückgrat jeder Flotte.",
      img: "/werften/mittlere_werft/kreuzer/kreuzer.png",
    },
  ],
  gross: [
    {
      id: "schlachtkreuzer",
      name: "Schlachtkreuzer",
      description:
        "Ein Schlachtkreuzer, kombiniert die Feuerkraft eines Schlachtschiffs mit der Geschwindigkeit eines Kreuzers. Gut bewaffnet und gepanzert, für schnelle und durchschlagende Angriffe. Ideal für Durchbruchoperationen und Flottenführung. Ein vielseitiger Kampfeinheit.",
      img: "/werften/grosse_werft/schlachtkreuzer/schlachtkreuzer.png",
    },
    {
      id: "schlachtschiff",
      name: "Schlachtschiff",
      description:
        "Ein Schlachtschiff, das größte und am stärksten bewaffnete Kriegsschiff. Entwickelt für direkte Konfrontationen und massive Feuergefechte. Bietet extrem starke Panzerung und Feuerkraft. Ein unverzichtbares Flaggschiff für jede Großflotte.",
      img: "/werften/grosse_werft/schlachtschiff/schlachtschiff.png",
    },
    {
      id: "traegerschiff",
      name: "Trägerschiff",
      description:
        "Ein Trägerschiff, das als mobile Basis für eine Vielzahl von Jägern und Bombern dient. Ausgestattet mit großen Landedecks und Hangars. Bietet Luftunterstützung, Aufklärung und schnelle Angriffe. Ein zentraler Bestandteil moderner Flottenoperationen.",
      img: "/werften/grosse_werft/traegerschiff/traegerschiff.png",
    },
  ],
};

export default hangar;
