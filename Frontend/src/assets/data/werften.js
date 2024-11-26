const werftTypen = {
  klein: [
    {
      id: "kleinerTransporter",
      class: "btn btn1",
      label: "Kleiner Transporter",
      img: "/werften/kleine_werft/kleiner_transporter/kleiner_transporter.png",
      description:
        "Ein kleiner Transporter, der für schnelle und effiziente Transporte von Gütern zwischen verschiedenen Stationen und Planeten verwendet wird. Er hat eine moderate Ladefähigkeit und ist gut geschützt gegen kleinere Angriffe. Ideal für schnelle Handelsmissionen. Kompakt und leicht manövrierbar.",
    },
    {
      id: "leichterJaeger",
      class: "btn btn2",
      label: "Leichter Jaeger",
      img: "/werften/kleine_werft/leichter_jaeger/leichter_jaeger.png",
      description:
        "Ein leichter Jäger, der sich durch hohe Geschwindigkeit und Wendigkeit auszeichnet. Ausgestattet mit leichten Waffen eignet er sich hervorragend für schnelle Angriffe und Verteidigungsmissionen. Besonders effektiv in Schwärmen. Perfekt für kurze, präzise Einsätze.",
    },
    {
      id: "schwererJaeger",
      class: "btn btn3",
      label: "Schwerer Jaeger",
      img: "/werften/kleine_werft/schwerer_jaeger/schwerer_jaeger.png",
      description:
        "Ein schwerer Jäger, der mit stärkeren Waffen und besserer Panzerung ausgestattet ist. Entwickelt für intensivere Kämpfe und zur Unterstützung größerer Flotten. Er kann mehr Schaden austeilen und einstecken als leichtere Jäger. Ideal für längere Kampfeinsätze.",
    },
    {
      id: "bomber",
      class: "btn btn4",
      label: "Bomber",
      img: "/werften/kleine_werft/bomber/bomber.png",
      description:
        "Ein Bomber, spezialisiert auf das Abwerfen von schweren Bomben und Torpedos auf feindliche Ziele. Er ist weniger wendig, aber dafür stark gepanzert und in der Lage, massiven Schaden zu verursachen. Perfekt für Angriffe auf große Schiffe und stationäre Ziele. Langsame, aber mächtige Feuerkraft.",
    },
    {
      id: "fregatte",
      class: "btn btn5",
      label: "Fregatte",
      img: "/werften/kleine_werft/fregatte/fregatte.png",
      description:
        "Eine Fregatte, die als vielseitiges Kriegsschiff in verschiedenen Rollen dienen kann. Sie ist gut bewaffnet und gepanzert, aber dennoch schnell und wendig. Ideal für Patrouillen, Eskortmissionen und den Schutz von Konvois. Ausgeglichen in Angriff und Verteidigung.",
    },
    {
      id: "miningDrone",
      class: "btn btn6",
      label: "Mining Drone",
      img: "/werften/kleine_werft/mining_drone/mining_drone.png",
      description:
        "Eine Mining-Drohne, die für den Abbau von Ressourcen in Asteroidenfeldern und auf Planetenoberflächen konzipiert ist. Ausgestattet mit speziellen Bergbauwerkzeugen und -technologien. Effizient und autonom arbeitend, ideal für die Unterstützung bei Bergbauoperationen. Robust und zuverlässig.",
    },
    {
      id: "flaggeschuetz",
      class: "btn btn7",
      label: "Flaggeschuetz",
      img: "/werften/kleine_werft/flaggeschuetz/flaggeschuetz.png",
      description:
        "Ein Flakgeschütz, das zur Verteidigung gegen feindliche Flugzeuge und Drohnen eingesetzt wird. Mit schnellen und präzisen Geschossen ausgestattet. Es bietet eine starke Verteidigungslinie gegen Luftangriffe. Essenziell für den Schutz von Basen und Flotten.",
    },
    {
      id: "lasergeschuetz",
      class: "btn btn8",
      label: "Lasergeschuetz",
      img: "/werften/kleine_werft/lasergeschuetz/lasergeschuetz.jpg",
      description:
        "Ein Lasergeschütz, das hochenergetische Laserstrahlen abfeuert. Effektiv gegen gepanzerte Ziele und feindliche Schiffe. Es bietet eine hohe Präzision und Reichweite. Ideal zur Unterstützung von Boden- und Weltraumoperationen.",
    },
  ],
  mittel: [
    {
      id: "grosserTransporter",
      class: "btn btn1",
      label: "Großer Transporter",
      img: "/werften/mittlere_werft/großer_transporter/grosser_transporter.png",
      description:
        "Ein großer Transporter mit erhöhter Ladefähigkeit für den Transport großer Mengen an Gütern. Gut geschützt und mit defensiven Waffensystemen ausgestattet. Ideal für längere Handelsrouten und Versorgungsmissionen. Bietet hohe Sicherheit für wertvolle Ladungen.",
    },
    {
      id: "zerstoerer",
      class: "btn btn2",
      label: "Zerstoerer",
      img: "/werften/mittlere_werft/zerstoerer/zerstoerer.png",
      description:
        "Ein Zerstörer, entwickelt zur Jagd auf feindliche Schiffe. Ausgestattet mit einer Vielzahl von Waffen und hoher Geschwindigkeit. Perfekt für offensive Missionen und Flottenbegleitung. Robuste Panzerung und starke Feuerkraft.",
    },
    {
      id: "kreuzer",
      class: "btn btn3",
      label: "Kreuzer",
      img: "/werften/mittlere_werft/kreuzer/kreuzer_1.png",
      description:
        "Ein Kreuzer, der als vielseitiges Kampfschiff in Flottenoperationen dient. Gut bewaffnet und gepanzert, aber dennoch relativ schnell. Kann verschiedene Rollen wie Angriff, Verteidigung und Unterstützung übernehmen. Ein Rückgrat jeder Flotte.",
    },
    {
      id: "flugdeckkreuzer",
      class: "btn btn4",
      label: "Flugdeckkreuzer",
      img: "/werften/mittlere_werft/flugdeckkreuzer/flugdeckkreuzer.png",
      description:
        "Ein Flugdeckkreuzer, der als mobile Basis für Jäger und Bomber dient. Ausgestattet mit Landedecks und Hangars für verschiedene Schiffstypen. Bietet Luftunterstützung und Aufklärung.",
    },
    {
      id: "kolonieschiff",
      class: "btn btn5",
      label: "Kolonieschiff",
      img: "/werften/mittlere_werft/kolonieschiff/kolonieschiff.png",
      description:
        "Ein Kolonieschiff, das Siedler und Ausrüstung zu neuen Planeten bringt. Gut ausgestattet für Langzeitmissionen und autarkes Leben. Ideal für die Expansion und Erkundung neuer Welten. Bietet Lebensraum und Schutz für Kolonisten.",
    },
    {
      id: "bergbauschiff",
      class: "btn btn6",
      label: "Bergbauschiff",
      img: "/werften/mittlere_werft/bergbauschiff/bergbauschiff.png",
      description:
        "Ein Bergbauschiff, spezialisiert auf den großflächigen Abbau von Ressourcen im Weltraum. Ausgestattet mit fortschrittlichen Bergbauwerkzeugen und Lagerkapazitäten. Effizient und produktiv. Unterstützt wirtschaftliche Operationen durch Rohstoffgewinnung.",
    },
    {
      id: "ionenkanone",
      class: "btn btn7",
      label: "Ionenkanone",
      img: "/werften/mittlere_werft/ionenkanone/ionenkanone.jpg",
      description:
        "Eine Ionenkanone, die hochenergetische Ionenschüsse abfeuert. Effektiv gegen Schilde und elektronische Systeme von Feindschiffen. Bietet eine präzise und durchschlagende Feuerkraft. Ideal zur Unterstützung von Flottenoperationen.",
    },
    {
      id: "railgun",
      class: "btn btn8",
      label: "Railgun",
      img: "/werften/mittlere_werft/railgun/railgun.png",
      description:
        "Eine Railgun, die Projektile mit extrem hoher Geschwindigkeit abfeuert. Kann schwere Panzerungen durchdringen und massive Schäden verursachen. Ideal für lange Reichweiten und präzise Angriffe. Bietet überlegene Feuerkraft.",
    },
  ],
  gross: [
    {
      id: "schlachtschiff",
      class: "btn btn9",
      label: "Schlachtschiff",
      img: "/werften/große_werft/schlachtschiff/schlachtschiff.png",
      description:
        "Ein Schlachtschiff, das größte und am stärksten bewaffnete Kriegsschiff. Entwickelt für direkte Konfrontationen und massive Feuergefechte. Bietet extrem starke Panzerung und Feuerkraft. Ein unverzichtbares Flaggschiff für jede Großflotte.",
    },
    {
      id: "traegerschiff",
      class: "btn btn10",
      label: "Traegerschiff",
      img: "/werften/große_werft/traegerschiff/traegerschiff.png",
      description:
        "Ein Trägerschiff, das als mobile Basis für eine Vielzahl von Jägern und bombern dient. Ausgestattet mit großen Landedecks und Hangars. Bietet Luftunterstützung, Aufklärung und schnelle Angriffe. Ein zentraler Bestandteil moderner Flottenoperationen.",
    },
    {
      id: "schlachtkreuzer",
      class: "btn btn11",
      label: "Schlachtkreuzer",
      img: "/werften/große_werft/schlachtkreuzer/schlachtkreuzer.png",
      description:
        "Ein Schlachtkreuzer, kombiniert die Feuerkraft eines Schlachtschiffs mit der Geschwindigkeit eines Kreuzers. Gut bewaffnet und gepanzert, für schnelle und durchschlagende Angriffe. Ideal für Durchbruchoperationen und Flottenführung. Ein vielseitiger Kampfeinheit.",
    },
    {
      id: "partikelgeschuetz",
      class: "btn btn12",
      label: "Partikelgeschuetz",
      img: "/werften/große_werft/partikelgeschuetz/partikelgeschuetz.jpg",
      description:
        "Ein Partikelgeschütz, das hochenergetische Partikelstrahlen abfeuert. Effektiv gegen starke Panzerungen und Schilde. Bietet präzise und zerstörerische Feuerkraft. Ideal zur Unterstützung von schweren Angriffsoperationen.",
    },
    {
      id: "planetarer_schildgenerator",
      class: "btn btn12",
      label: "Planetarer Schildgenerator",
      img: "/werften/planetare_schutzsysteme/planetarer_schildgenerator/schildgenerator1.jpg",
      description:
        "Ein planetarer Schildgenerator, der eine massive Energiekuppel erzeugt, um ganze Planeten vor Angriffen zu schützen. Effektiv gegen Orbitalbombardements, Raketen und Angriffe von Großkampfschiffen. Ein unverzichtbarer Verteidigungsmechanismus für strategisch wichtige Welten.",
    },
  ],
};

export default werftTypen;
