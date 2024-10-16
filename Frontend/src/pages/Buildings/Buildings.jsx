import { useState } from "react";
import "./Buildings.css";

const Buildings = () => {
  const [selectedCategory, setSelectedCategory] = useState("Produktion");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const buildings = [
    {
      level: "Stufe 1",
      category: "Produktion",
      name: "Bergwerk",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, ad nisi. Maiores quasi error minus. Totam laborum iusto.",
      imageClass: "bergwerk",
    },
    {
      level: "Stufe 1",
      category: "Produktion",
      name: "Munitionsfabrik",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, ad nisi. Maiores quasi error minus. Totam laborum iusto.",
      imageClass: "munitionsfabrik",
    },
    {
      level: "Stufe 1",
      category: "Produktion",
      name: "Treibstofffabrik",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, ad nisi. Maiores quasi error minus. Totam laborum iusto.",
      imageClass: "treibstofffabrik",
    },
    {
      level: "Stufe 1",
      category: "Produktion",
      name: "Solaranlage",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, ad nisi. Maiores quasi error minus. Totam laborum iusto.",
      imageClass: "solaranlage",
    },
    {
      level: "Stufe 1",
      category: "Produktion",
      name: "Kraftwerk",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, ad nisi. Maiores quasi error minus. Totam laborum iusto.",
      imageClass: "kraftwerk",
    },
    {
      level: "Stufe 1",
      category: "Veredelung",
      name: "Raffinerie",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, ad nisi. Maiores quasi error minus. Totam laborum iusto.",
      imageClass: "raffinerie",
    },
    {
      level: "Stufe 1",
      category: "Veredelung",
      name: "Schrottplatz",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, ad nisi. Maiores quasi error minus. Totam laborum iusto.",
      imageClass: "schrottplatz",
    },
    {
      level: "Stufe 1",
      category: "Veredelung",
      name: "Recycler",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, ad nisi. Maiores quasi error minus. Totam laborum iusto.",
      imageClass: "recycler",
    },
    {
      level: "Stufe 1",
      category: "Überwachung",
      name: "Spionagezentrum",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, ad nisi. Maiores quasi error minus. Totam laborum iusto.",
      imageClass: "spionagezentrum",
    },
    {
      level: "Stufe 1",
      category: "Lagerung",
      name: "Treibstoffdepot",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, ad nisi. Maiores quasi error minus. Totam laborum iusto.",
      imageClass: "treibstoffdepot",
    },
    {
      level: "Stufe 1",
      category: "Lagerung",
      name: "Chemikaliendepot",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, ad nisi. Maiores quasi error minus. Totam laborum iusto.",
      imageClass: "chemikaliendepot",
    },
    {
      level: "Stufe 1",
      category: "Lagerung",
      name: "Erzdepot",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, ad nisi. Maiores quasi error minus. Totam laborum iusto.",
      imageClass: "erzdepot",
    },
    {
      level: "Stufe 1",
      category: "Lagerung",
      name: "Munitionsdepot",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, ad nisi. Maiores quasi error minus. Totam laborum iusto.",
      imageClass: "munitionsdepot",
    },
    {
      level: "Stufe 1",
      category: "Lagerung",
      name: "Energiespeicher",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, ad nisi. Maiores quasi error minus. Totam laborum iusto.",
      imageClass: "energiespeicher",
    },
    {
      level: "Stufe 1",
      category: "Lagerung",
      name: "Stahldepot",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, ad nisi. Maiores quasi error minus. Totam laborum iusto.",
      imageClass: "stahldepot",
    },
    {
      level: "Stufe 1",
      category: "Werften",
      name: "Kleine Raumwerft",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, ad nisi. Maiores quasi error minus. Totam laborum iusto.",
      imageClass: "kleine-raumwerft",
    },
    {
      level: "Stufe 1",
      category: "Werften",
      name: "Mittlere Raumwerft",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, ad nisi. Maiores quasi error minus. Totam laborum iusto.",
      imageClass: "mittlere-raumwerft",
    },
    {
      level: "Stufe 1",
      category: "Werften",
      name: "Große Raumwerft",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, ad nisi. Maiores quasi error minus. Totam laborum iusto.",
      imageClass: "grosse-raumwerft",
    },
  ];

  const filteredBuildings = buildings.filter(
    (building) => building.category === selectedCategory
  );

  return (
    <div className="content-box">
      <div className="uebersicht-title">
        <h1>Gebaeude</h1>
      </div>

      <div className="building-nav-bar">
        <button
          className="btn geb-1"
          onClick={() => handleCategoryChange("Produktion")}
        >
          Produktion
        </button>
        <button
          className="btn geb-1"
          onClick={() => handleCategoryChange("Veredelung")}
        >
          Veredelung
        </button>
        <button
          className="btn geb-1"
          onClick={() => handleCategoryChange("Überwachung")}
        >
          Überwachung
        </button>
        <button
          className="btn geb-1"
          onClick={() => handleCategoryChange("Lagerung")}
        >
          Lagerung
        </button>
        <button
          className="btn geb-1"
          onClick={() => handleCategoryChange("Werften")}
        >
          Werften
        </button>
      </div>

      <div className="building-section">
        <h1 className="gebaeude-heading">{selectedCategory}</h1>
        <div className="buildings-grid">
          {filteredBuildings.map((building, index) => (
            <div key={index} className={`gebaeude-box ${building.imageClass}`}>
              <div className="text">
                <p>{building.level}</p>
                <h1>{building.name}</h1>
                <p>{building.description}</p>
              </div>
              <div className="button-box">
                <a href="#">
                  <button className="btn geb-1">Bauen</button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Buildings;
