import "./Research.css"
import { useState } from "react";

const imgTypes = {
  blank: {
    electronikString: "",
    energyString: "",
    fuelString: "",
    ammostring: "",
    siliciumString: "",
    oreString: "",
    steelString: "",
    id: "",
    level: "",
    researchHead: "",
    researchheadCost: "",
    head: "",
    steelCosts: "",
    electronicCost: "",
    energyCost: "",
    fuelCost: "",
    ammoCost: "",
    siliciumCost: "",
    oreCost: "",
    basicBackground: "/forschung/forschung-blank-weit.jpg",
    description: "",

  },
  mining: {
    electronikString: "Elektronik",
    energyString: "Energie",
    fuelString: "Treibstoff",
    ammostring: "Munition",
    siliciumString: "Silizium",
    oreString: "Erz",
    steelString: "Stahl",
    id: "mining",
    level: "Bergbau stufe X",
    researchHead: "Ressource",
    researchheadCost: "Kosten",
    head: "Bergbau",
    steelCosts: "0000",
    electronicCost: "0000",
    energyCost: "0000",
    fuelCost: "0000",
    ammoCost: "0000",
    siliciumCost: "0000",
    oreCost: "0000",
    basicBackground: "/forschung/mining-weit.jpg",
    description: "Im Bergbau-Modul erschließe die unendlichen Ressourcen des Weltraums. Baue auf Planeten ab, um Rohstoffe zu gewinnen und deine Flotte zu staerken. Nutze die Schaetze des Universums für deine Expansion, Dominanz und den Aufbau einer maechtigen Zivilisation.\
",

  },
  func: {
    electronikString: "Elektronik",
    energyString: "Energie",
    fuelString: "Treibstoff",
    ammostring: "Munition",
    siliciumString: "Silizium",
    oreString: "Erz",
    steelString: "Stahl",
    id: "func",
    level: "Funktechnik stufe X",
    researchHead: "Ressource",
    researchheadCost: "Kosten",
    head: "Funktechnik",
    steelCosts: "0000",
    electronicCost: "0000",
    energyCost: "0000",
    fuelCost: "0000",
    ammoCost: "0000",
    siliciumCost: "0000",
    oreCost: "0000",
    basicBackground: "/forschung/funk-weit.jpg",
    description: "Durch die Erforschung fortschrittlicher Funktechnik bleibst du stets verbunden. Sende und empfange Nachrichten in Echtzeit, koordiniere deine Flottenbewegungen und spüre feindliche Aktivitaeten auf. Kommunikation ist der Schlüssel zur Überlegenheit im unendlichen Kosmos.",

  },
  armor: {
    electronikString: "Elektronik",
    energyString: "Energie",
    fuelString: "Treibstoff",
    ammostring: "Munition",
    siliciumString: "Silizium",
    oreString: "Erz",
    steelString: "Stahl",
    id: "armor",
    level: "Panzerung stufe X",
    researchHead: "Ressource",
    researchheadCost: "Kosten",
    head: "Panzerung",
    steelCosts: "0000",
    electronicCost: "0000",
    energyCost: "0000",
    fuelCost: "0000",
    ammoCost: "0000",
    siliciumCost: "0000",
    oreCost: "0000",
    basicBackground: "/forschung/panzerung-weit.jpg",
    description: "Mit unserer hochentwickelten Panzerungstechnologie bist du in den Tiefen des Weltraums geschützt. Rüste deine Schiffe mit robusten Panzerungen aus, um feindliche Angriffe abzuwehren und deine Flotte zu verteidigen. Überleben ist der Schlüssel zur Herrschaft im Universum.\
",

  },
  ballistic: {
    electronikString: "Elektronik",
    energyString: "Energie",
    fuelString: "Treibstoff",
    ammostring: "Munition",
    siliciumString: "Silizium",
    oreString: "Erz",
    steelString: "Stahl",
    id: "ballistic",
    level: "Ballistik stufe X",
    researchHead: "Ressource",
    researchheadCost: "Kosten",
    head: "Ballistik",
    steelCosts: "0000",
    electronicCost: "0000",
    energyCost: "0000",
    fuelCost: "0000",
    ammoCost: "0000",
    siliciumCost: "0000",
    oreCost: "0000",
    basicBackground: "/forschung/ballistik-weit.jpg",
    description: "Durch die Erforschung der Ballistik erlangst du eine unübertroffene Feuerkraft. Entwickle Waffen mit tödlicher Praezision, um deine Feinde im Weltraum zu vernichten. Die Kontrolle über das Schlachtfeld gehört denen, die die Macht der Ballistik beherrschen."
    ,
  },
  energyWeapons: {
    electronikString: "Elektronik",
    energyString: "Energie",
    fuelString: "Treibstoff",
    ammostring: "Munition",
    siliciumString: "Silizium",
    oreString: "Erz",
    steelString: "Stahl",
    id: "energyWeapons",
    level: "Energiewaffen stufe X",
    researchHead: "Ressource",
    researchheadCost: "Kosten",
    head: "Energiewaffen",
    steelCosts: "0000",
    electronicCost: "0000",
    energyCost: "0000",
    fuelCost: "0000",
    ammoCost: "0000",
    siliciumCost: "0000",
    oreCost: "0000",
    basicBackground: "/forschung/energiewaffen-weit.jpg",
    description: "Durch die Erforschung von Energiewaffen erlangst du eine überlegene Feuerkraft. Entwickle Technologien, um die Energie des Universums zu kanalisieren und vernichte deine Feinde mit zerstörerischer Kraft. Die Zukunft des Kampfes liegt in der Beherrschung von Energiewaffen.\
",

  },
  shieldTech: {
    electronikString: "Elektronik",
    energyString: "Energie",
    fuelString: "Treibstoff",
    ammostring: "Munition",
    siliciumString: "Silizium",
    oreString: "Erz",
    steelString: "Stahl",
    id: "shieldTech",
    level: "Schildtechnik stufe X",
    researchHead: "Ressource",
    researchheadCost: "Kosten",
    head: "Schildtechnik",
    steelCosts: "0000",
    electronicCost: "0000",
    energyCost: "0000",
    fuelCost: "0000",
    ammoCost: "0000",
    siliciumCost: "0000",
    oreCost: "0000",
    basicBackground: "/forschung/schildtechnik-weit.jpg",
    description: "Mit der Erforschung von Schildtechnik schützt du deine Flotte vor tödlichen Angriffen. Entwickle fortschrittliche Schilde, um deine Schiffe zu verteidigen und ihre Überlebensfaehigkeit im Weltraum zu erhöhen. Die Sicherheit deiner Flotte ist entscheidend für deine Dominanz im Universum."
    ,

  },
  jumpDrives: {
    electronikString: "Elektronik",
    energyString: "Energie",
    fuelString: "Treibstoff",
    ammostring: "Munition",
    siliciumString: "Silizium",
    oreString: "Erz",
    steelString: "Stahl",
    id: "jumpDrives",
    level: "Sprungantriebe stufe X",
    researchHead: "Ressource",
    researchheadCost: "Kosten",
    head: "Sprungantriebe",
    steelCosts: "0000",
    electronicCost: "0000",
    energyCost: "0000",
    fuelCost: "0000",
    ammoCost: "0000",
    siliciumCost: "0000",
    oreCost: "0000",
    basicBackground: "/forschung/sprungantrieb-weit.jpg",
    description: "Durch die Erforschung von Sprungantrieben eröffnest du neue Horizonte im Universum. Entwickle Technologien für Warp- und Hyperraum-Sprünge, um die Weiten des Weltraums zu durchqueren und neue Gebiete zu erschließen. Die Faehigkeit zu schnellen Reisen ist der Schlüssel zur Expansion und Eroberung."
    ,

  },
  thrusters: {
    electronikString: "Elektronik",
    energyString: "Energie",
    fuelString: "Treibstoff",
    ammostring: "Munition",
    siliciumString: "Silizium",
    oreString: "Erz",
    steelString: "Stahl",
    id: "thrusters",
    level: "Verbrennungstriebwerke stufe X",
    researchHead: "Ressource",
    researchheadCost: "Kosten",
    head: "Verbrennungstriebwerke",
    steelCosts: "0000",
    electronicCost: "0000",
    energyCost: "0000",
    fuelCost: "0000",
    ammoCost: "0000",
    siliciumCost: "0000",
    oreCost: "0000",
    basicBackground: "/forschung/verbrennungstriebwerke-weit.jpg",
    description: "Mit der Erforschung von Verbrennungstriebwerken katapultierst du deine Flotte in die Weiten des Weltraums. Entwickle leistungsfaehige Antriebe, um deine Schiffe zu beschleunigen und ferne Welten zu erreichen. Die Geschwindigkeit ist der Schlüssel zur Eroberung des unendlichen Kosmos. "
    ,

  }
}

const Research = () => {
  const [activeObject, setActiveObject] = useState(imgTypes.blank);
  const [activeButton, setActiveButton] = useState(null);

  const changeImg = (imgTypeObj, buttonId) => {
    if (activeButton === buttonId) {
      // Wenn derselbe Button geklickt wurde, setze zurück
      setActiveObject(imgTypes.blank);
      setActiveButton(null);
    } else {
      // Anderer Button wurde geklickt
      setActiveObject(imgTypeObj);
      setActiveButton(buttonId);
    }
  };

  return (


    <div className="content-box">


      <div className="researchheader" style={{ backgroundImage: `url(${activeObject.basicBackground || imgTypes.blank.basicBackground})` }}>
        <div className="researchflex">
          <div id="costtable" className="researchcosts">
          {activeObject.id === imgTypes.blank.id ? (

          <div className="research-content"><span>Forschung wählen...</span></div>
          ) : (
          <>
            <h1 id="forschungs-title">{activeObject.level}</h1>
              <ul>
                <li>
                  <p>{activeObject.researchHead || imgTypes.blank.researchHead}</p>
                  <p>{activeObject.researchheadCost || imgTypes.blank.researchheadCost}</p>
                </li>
                <li>
                  <p>{activeObject.steelString || imgTypes.blank.steelString}</p>
                  <p>{activeObject.steelCosts || imgTypes.blank.steelCosts}</p>
                </li>
                <li>
                  <p>{activeObject.electronikString || imgTypes.blank.electronikString}</p>
                  <p>{activeObject.electronicCost || imgTypes.blank.electronicCost}</p>
                </li>
                <li>
                  <p>{activeObject.energyString || imgTypes.blank.energyString}</p>
                  <p>{activeObject.electronicCost || imgTypes.blank.electronicCost}</p>
                </li>
                <li>
                  <p>{activeObject.fuelString || imgTypes.blank.fuelString}</p>
                  <p>{activeObject.fuelCost || imgTypes.blank.fuelCost}</p>
                </li>
                <li>
                  <p>{activeObject.ammostring || imgTypes.blank.ammostring}</p>
                  <p>{activeObject.ammoCost || imgTypes.blank.ammoCost}</p>
                </li>
                <li>
                  <p>{activeObject.siliciumString || imgTypes.blank.siliciumString}</p>
                  <p>{activeObject.siliciumCost || imgTypes.blank.siliciumCost}</p>
                </li>
                <li>
                  <p>{activeObject.oreString || imgTypes.blank.oreString}</p>
                  <p>{activeObject.oreCost || imgTypes.blank.oreCost}</p>
                </li>
              </ul>
            </>
          )}
          </div>
          {activeObject.id !== imgTypes.blank.id && (
  <div id="r-footer" className="researchfooter">
      <p className="left">{activeObject.description || imgTypes.blank.description}</p>
      <button className="right btn" type="button">Forschung starten</button>
      <button className="right btn" type="button">Details</button>
  </div>
)}
        </div>
      </div>
      <section className="researchoverview">
        <div className="researchbuttons">
          <div className={`element ${activeButton === "mining" ? "activesearch" : ""}`}>
            <input className="f-bergbau " type="button" placeholder="Berbau" onClick={() => changeImg(imgTypes.mining, "mining")} />
            <p className="researchtip">Bergbau</p>
          </div>
          <div className={`element ${activeButton === "func" ? "activesearch" : ""}`}>
            <input className="f-funktechnik" type="button" onClick={() => changeImg(imgTypes.func, "func")} />
            <p className="researchtip">Funktechnik</p>
          </div>
          <div className={`element ${activeButton === "armor" ? "activesearch" : ""}`}>
            <input className="f-panzerung" type="button" onClick={() => changeImg(imgTypes.armor, "armor")} />
            <p className="researchtip">Panzerung</p>
          </div>
          <div className={`element ${activeButton === "ballistic" ? "activesearch" : ""}`}>
            <input className="f-ballistik" type="button" onClick={() => changeImg(imgTypes.ballistic, "ballistic")} />
            <p className="researchtip">Ballistik</p>
          </div>
        </div>
        <div className="researchbuttons">
          <div className={`element ${activeButton === "energyWeapons" ? "activesearch" : ""}`}>
            <input className="f-energiewaffen" type="button" onClick={() => { changeImg(imgTypes.energyWeapons, "energyWeapons") }} />
            <p className="researchtip">Energiewaffen</p>
          </div>
          <div className={`element ${activeButton === "jumpDrives" ? "activesearch" : ""}`}>
            <input className="f-sprungantrieb" type="button" onClick={() => { changeImg(imgTypes.jumpDrives, "jumpDrives") }} />
            <p className="researchtip">Schildtechnik</p>
          </div>
          <div className={`element ${activeButton === "thrusters" ? "activesearch" : ""}`}>
            <input className="f-verbrennung" type="button" onClick={() => { changeImg(imgTypes.thrusters, "thrusters") }} />
            <p className="researchtip">Sprungantriebe</p>
          </div>
          <div className={`element ${activeButton === "shieldTech" ? "activesearch" : ""}`}>
            <input className="f-schildtechnik" type="button" onClick={() => { changeImg(imgTypes.shieldTech, "shieldTech") }} />
            <p className="researchtip">Verbrennungstriebwerke</p>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Research;
