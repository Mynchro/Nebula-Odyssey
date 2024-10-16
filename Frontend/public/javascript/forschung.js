//Idee: Auf eine der kleinen Bilderboxen klicken, um den Inhalt der Gesamtbox zu aendern (großes Bild anzeigen lassen) //

//Variablen//

/*
benötigt funktion um forschung zu starten
benötigt funktion die die playerdata aktualisiert wenn eine forschung fertiggestellt wurde
benötigt funktion um forschung abzubrechen und ressourcen zurückzuerstatten (auch auf dem richtigem planeten)
*/

const bergbauDescription =
  "Im Bergbau-Modul erschließe die unendlichen Ressourcen des Weltraums. Baue auf Planeten ab, um Rohstoffe zu gewinnen und deine Flotte zu staerken. Nutze die Schaetze des Universums für deine Expansion, Dominanz und den Aufbau einer maechtigen Zivilisation.\
";
const funkDescription =
  "Durch die Erforschung fortschrittlicher Funktechnik bleibst du stets verbunden. Sende und empfange Nachrichten in Echtzeit, koordiniere deine Flottenbewegungen und spüre feindliche Aktivitaeten auf. Kommunikation ist der Schlüssel zur Überlegenheit im unendlichen Kosmos.";
const panzerungDescription =
  "Mit unserer hochentwickelten Panzerungstechnologie bist du in den Tiefen des Weltraums geschützt. Rüste deine Schiffe mit robusten Panzerungen aus, um feindliche Angriffe abzuwehren und deine Flotte zu verteidigen. Überleben ist der Schlüssel zur Herrschaft im Universum.\
";
const ballistikDescription =
  "Durch die Erforschung der Ballistik erlangst du eine unübertroffene Feuerkraft. Entwickle Waffen mit tödlicher Praezision, um deine Feinde im Weltraum zu vernichten. Die Kontrolle über das Schlachtfeld gehört denen, die die Macht der Ballistik beherrschen.";
const energiewaffenDescription =
  "Durch die Erforschung von Energiewaffen erlangst du eine überlegene Feuerkraft. Entwickle Technologien, um die Energie des Universums zu kanalisieren und vernichte deine Feinde mit zerstörerischer Kraft. Die Zukunft des Kampfes liegt in der Beherrschung von Energiewaffen.\
";
const schildtechnikDescription =
  "Mit der Erforschung von Schildtechnik schützt du deine Flotte vor tödlichen Angriffen. Entwickle fortschrittliche Schilde, um deine Schiffe zu verteidigen und ihre Überlebensfaehigkeit im Weltraum zu erhöhen. Die Sicherheit deiner Flotte ist entscheidend für deine Dominanz im Universum.";
const sprungantriebDescription =
  "Durch die Erforschung von Sprungantrieben eröffnest du neue Horizonte im Universum. Entwickle Technologien für Warp- und Hyperraum-Sprünge, um die Weiten des Weltraums zu durchqueren und neue Gebiete zu erschließen. Die Faehigkeit zu schnellen Reisen ist der Schlüssel zur Expansion und Eroberung.";
const verbrennungstriebwerkeDescription =
  "Mit der Erforschung von Verbrennungstriebwerken katapultierst du deine Flotte in die Weiten des Weltraums. Entwickle leistungsfaehige Antriebe, um deine Schiffe zu beschleunigen und ferne Welten zu erreichen. Die Geschwindigkeit ist der Schlüssel zur Eroberung des unendlichen Kosmos. ";

const bergbauTitle = "Bergbau Stufe X";
const funkTitle = "Funktechnik Stufe X";
const panzerungTitle = "Panzerung Stufe X";
const ballistikTitle = "Ballistik Stufe X";
const energiewaffenTitle = "Energiewaffen Stufe X";
const schildtechnikTitle = "Schildtechnik Stufe X";
const sprungantriebTitle = "Sprungantrieb Stufe X";
const verbrennungTitle = "Verbrennungstriebwerke Stufe X";

const imgBackground = "../img/img/forschung/forschung-blank-weit.jpg";
const imgBergbau = "../img/img/forschung/mining-weit.jpg";
const imgFunk = "../img/img/forschung/funk-weit.jpg";
const imgPanzerung = "../img/img/forschung/panzerung-weit.jpg";
const imgBallistik = "../img/img/forschung/ballistik-weit.jpg";
const imgEnergieWaffen = "../img/img/forschung/energiewaffen-weit.jpg";
const imgSchildTechnik = "../img/img/forschung/schildtechnik-weit.jpg";
const imgSprungAntriebe = "../img/img/forschung/sprungantrieb-weit.jpg";
const imgVerbrennungsTriebwerke =
  "../img/img/forschung/verbrennungstriebwerke-weit.jpg";

//Funktion//
const costtable = document.getElementById("costtable");
const rfooter = document.getElementById("r-footer");
const e = document.getElementById("r-header");
const descriptionElement = document.getElementById("description");
const titleElement = document.getElementById("forschungs-title");
const researchButtons = document.querySelectorAll(".testevent");
e.style.backgroundImage = "url('" + imgBackground + "')";
rfooter.style.display = "none";
costtable.style.display = "none";
let currentBackgroundImg = imgBackground;

researchButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    console.log(event);
    if (event.target.className.includes("f-bergbau")) {
      if (currentBackgroundImg != imgBergbau) {
        descriptionElement.innerText = bergbauDescription;
        titleElement.innerText = bergbauTitle;
        e.style.backgroundImage = "url('" + imgBergbau + "')";
        currentBackgroundImg = imgBergbau;
        ResearchFooter(true);
      } else {
        ResearchFooter(false);
      }
    }
    if (event.target.className.includes("f-funktechnik")) {
      if (currentBackgroundImg != imgFunk) {
        descriptionElement.innerText = funkDescription;
        titleElement.innerText = funkTitle;
        e.style.backgroundImage = "url('" + imgFunk + "')";
        currentBackgroundImg = imgFunk;
        ResearchFooter(true);
      } else {
        ResearchFooter(false);
      }
    }
    if (event.target.className.includes("f-panzerung")) {
      if (currentBackgroundImg != imgPanzerung) {
        descriptionElement.innerText = panzerungDescription;
        titleElement.innerText = panzerungTitle;
        e.style.backgroundImage = "url('" + imgPanzerung + "')";
        currentBackgroundImg = imgPanzerung;
        ResearchFooter(true);
      } else {
        ResearchFooter(false);
      }
    }
    if (event.target.className.includes("f-ballistik")) {
      if (currentBackgroundImg != imgBallistik) {
        descriptionElement.innerText = ballistikDescription;
        titleElement.innerText = ballistikTitle;
        e.style.backgroundImage = "url('" + imgBallistik + "')";
        currentBackgroundImg = imgBallistik;
        ResearchFooter(true);
      } else {
        e.style.backgroundImage = "url('" + imgBackground + "')";
        currentBackgroundImg = imgBackground;
        ResearchFooter(false);
      }
    }
    if (event.target.className.includes("f-energiewaffen")) {
      if (currentBackgroundImg != imgEnergieWaffen) {
        descriptionElement.innerText = energiewaffenDescription;
        titleElement.innerText = energiewaffenTitle;
        e.style.backgroundImage = "url('" + imgEnergieWaffen + "')";
        currentBackgroundImg = imgEnergieWaffen;
        ResearchFooter(true);
      } else {
        ResearchFooter(false);
      }
    }
    if (event.target.className.includes("f-schildtechnik")) {
      if (currentBackgroundImg != imgSchildTechnik) {
        descriptionElement.innerText = schildtechnikDescription;
        titleElement.innerText = schildtechnikTitle;
        e.style.backgroundImage = "url('" + imgSchildTechnik + "')";
        currentBackgroundImg = imgSchildTechnik;
        ResearchFooter(true);
      } else {
        ResearchFooter(false);
      }
    }
    if (event.target.className.includes("f-sprungantrieb")) {
      if (currentBackgroundImg != imgSprungAntriebe) {
        descriptionElement.innerText = sprungantriebDescription;
        titleElement.innerText = sprungantriebTitle;
        e.style.backgroundImage = "url('" + imgSprungAntriebe + "')";
        currentBackgroundImg = imgSprungAntriebe;
        ResearchFooter(true);
      } else {
        ResearchFooter(false);
      }
    }
    if (event.target.className.includes("f-verbrennung")) {
      if (currentBackgroundImg != imgVerbrennungsTriebwerke) {
        descriptionElement.innerText = verbrennungstriebwerkeDescription;
        titleElement.innerText = verbrennungTitle;
        e.style.backgroundImage = "url('" + imgVerbrennungsTriebwerke + "')";
        currentBackgroundImg = imgVerbrennungsTriebwerke;
        ResearchFooter(true);
      } else {
        ResearchFooter(false);
      }
    }
  });
});
function ResearchFooter(bool) {
  if (bool) {
    rfooter.style.display = "flex";
    costtable.style.display = "flex";
  } else {
    e.style.backgroundImage = "url('" + imgBackground + "')";
    currentBackgroundImg = imgBackground;
    rfooter.style.display = "none";
    costtable.style.display = "none";
  }
}
