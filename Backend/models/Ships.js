import mongoose from "mongoose";
import { resourceSchema } from "./Resources.js";
import unitData from "./Data/unitData.js";
import Unit from "./Data/unit.js";
const { Schema } = mongoose;

export const shipSchema = new Schema({
  shipType: {
    type: String,
    enum: [
      "lightHunter",
      "heavyHunter",
      "bomber",
      "frigate",
      "miningDrone",
      "smallTransporter",
      "largeTransporter",
      "destroyer",
      "cruiser",
      "smallCarrier",
      "colonyShip",
      "miningShip",
      "battleShip",
      "battleCruiser",
      "carrier",
      "flak",
      "ionCannon",
      "laserCannon",
      "railGun",
      "particleCannon",
      "planetaryShield",
    ],

    required: true // Es ist wichtig, den Gebäudetyp als erforderlich zu setzen
  },
  //id: {
    //type: String,
   // required: true
 // },
  class: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  shipYardType: {
    type: String,
    enum: ["lightShipyard", "mediumShipyard", "heavyShipyard"],
    required: true,
  },
  amount: {
    type: Number,
    default: 0,
  },
  originalShipId: {
    // Füge die originalBuildingId hinzu
    type: Schema.Types.ObjectId,
  },
  ressourceCosts: {
    type: resourceSchema,
    default: {}, // Standardmäßig leeres Objekt
  },

  values: {
    firepower: { type: Number, default: 0 },
    hull: { type: Number, default: 0 },
    shield: { type: Number, default: 0 },
    speed: { type: Number, default: 0 },
    fuelConsume: { type: Number, default: 0 },
    ammoConsume: { type: Number, default: 0 },
    cargo: { type: Number, default: 0 },
    hangarSlots: { type: Number, default: 0 },
  },
  rapidFire: {
    vsLightHunter: { type: Number, default: 1 },
    vsHeavyHunter: { type: Number, default: 1 },
    vsBomber: { type: Number, default: 1 },
    vsFrigate: { type: Number, default: 1 },
    vsSmallTransporter: { type: Number, default: 1 },
    vsLargeTransporter: { type: Number, default: 1 },
    vsMiningDrone: { type: Number, default: 1 },
    vsDestroyer: { type: Number, default: 1 },
    vsCruiser: { type: Number, default: 1 },
    vsSmallCarrier: { type: Number, default: 1 },
    vsColonyShip: { type: Number, default: 1 },
    vsMiningShip: { type: Number, default: 1 },
    vsBattleship: { type: Number, default: 1 },
    vsBattlecruiser: { type: Number, default: 1 },
    vsCarrier: { type: Number, default: 1 },
    vsFlak: { type: Number, default: 1 },
    vsIonCannon: { type: Number, default: 1 },
    vsLaserCannon: { type: Number, default: 1 },
    vsRailgun: { type: Number, default: 1 },
    vsParticleCannon: { type: Number, default: 1 },
    vsPlanetaryShield: { type: Number, default: 1 },
  },
  dmgVs: {
    vsLightHunter: { type: Number, default: 0 },
    vsHeavyHunter: { type: Number, default: 0 },
    vsBomber: { type: Number, default: 0 },
    vsFrigate: { type: Number, default: 0 },
    vsSmallTransporter: { type: Number, default: 0 },
    vsLargeTransporter: { type: Number, default: 0 },
    vsMiningDrone: { type: Number, default: 0 },
    vsDestroyer: { type: Number, default: 0 },
    vsCruiser: { type: Number, default: 0 },
    vsSmallCarrier: { type: Number, default: 0 },
    vsColonyShip: { type: Number, default: 0 },
    vsMiningShip: { type: Number, default: 0 },
    vsBattleship: { type: Number, default: 0 },
    vsBattlecruiser: { type: Number, default: 0 },
    vsCarrier: { type: Number, default: 0 },
    vsFlak: { type: Number, default: 0 },
    vsIonCannon: { type: Number, default: 0 },
    vsLaserCannon: { type: Number, default: 0 },
    vsRailgun: { type: Number, default: 0 },
    vsParticleCannon: { type: Number, default: 0 },
    vsPlanetaryShield: { type: Number, default: 0 },
  },
});

shipSchema.methods.setValues = function (shipType, unit) {
  this.shipType = shipType;

  const lightShips = ["lightHunter", "heavyHunter", "bomber", "frigate", "miningDrone", "smallTransporter", "flak", "laserCannon"];
  const mediumShips = ["largeTransporter", "destroyer", "cruiser", "smallCarrier", "colonyShip", "miningShip", "ionCannon", "railgun"];
  const heavyShips = ["battleShip", "battleCruiser", "carrier", "particleCannon", "planetaryShield"];

  if (lightShips.includes(shipType)) {
    this.shipYardType = "lightShipyard";
    this.shipYardType = "lightShipyard";
  } else if (mediumShips.includes(shipType)) {
    this.shipYardType = "mediumShipyard";
    this.shipYardType = "mediumShipyard";
  } else if (heavyShips.includes(shipType)) {
    this.shipYardType = "heavyShipyard";
    this.shipYardType = "heavyShipyard";
  }


  if (unit instanceof Unit) {
    //this.id = unit.name;
    this.ressourceCosts.steel = unit.steelcosts;
    this.ressourceCosts.electronics = unit.mikroshipkosten;
    this.ressourceCosts.energy = unit.energycosts;
    this.ressourceCosts.chemicals = unit.chemicalcost;

    this.values.firepower = unit.firepower;
    this.values.hull = unit.hull;
    this.values.shield = unit.shield;
    this.values.speed = unit.speed;
    this.values.fuelConsume = unit.fuelconsume;
    this.values.ammoConsume = unit.ammoconsume;
    this.values.cargo = unit.cargo;
    this.values.hangarSlots = unit.hangaring;

    this.rapidFire.vsLightHunter = unit.rapidfirevsleichterjaeger;
    this.rapidFire.vsHeavyHunter = unit.rapidfirevsschwererjaeger;
    this.rapidFire.vsBomber = unit.rapidfirevsbomber;
    this.rapidFire.vsFrigate = unit.rapidfirevsfregatte;
    this.rapidFire.vsSmallTransporter = unit.rapidfirevskleinertransporter;
    this.rapidFire.vsLargeTransporter = unit.rapidfirevsgroßertransporter;
    this.rapidFire.vsMiningDrone = unit.rapidfirevsminingdrohne;
    this.rapidFire.vsDestroyer = unit.rapidfirevszerstörer;
    this.rapidFire.vsCruiser = unit.rapidfirevskreuzer;
    this.rapidFire.vsSmallCarrier = unit.rapidfirevsflugdeckkreuzer;
    this.rapidFire.vsColonyShip = unit.rapidfirevskolonieschiff;
    this.rapidFire.vsMiningShip = unit.rapidfirevsbergbauschiff;
    this.rapidFire.vsBattleship = unit.rapidfirevsschlachtschiff;
    this.rapidFire.vsBattlecruiser = unit.rapidfirevsschlachtkreuzer;
    this.rapidFire.vsCarrier = unit.rapidfirevstraegerschiff;
    this.rapidFire.vsFlak = unit.rapidfirevsflakgeschütz;
    this.rapidFire.vsIonCannon = unit.rapidfirevsionenkanone;
    this.rapidFire.vsLaserCannon = unit.rapidfirevslasergeschütz;
    this.rapidFire.vsRailgun = unit.rapidfirevsrailgun;
    this.rapidFire.vsParticleCannon = unit.rapidfirevspartikelkanone;
    this.rapidFire.vsPlanetaryShield =
      unit.rapidfirevsplanetarerschildgenerator;

    this.dmgVs.vsLightHunter = unit.dmgversusleichterjaeger;
    this.dmgVs.vsHeavyHunter = unit.dmgversusschwererjaeger;
    this.dmgVs.vsBomber = unit.dmgversusbomber;
    this.dmgVs.vsFrigate = unit.dmgversusfregatte;
    this.dmgVs.vsSmallTransporter = unit.dmgversuskleinertransporter;
    this.dmgVs.vsLargeTransporter = unit.dmgversusgrossertransporter;
    this.dmgVs.vsMiningDrone = unit.dmgversusminingdrohne;
    this.dmgVs.vsDestroyer = unit.dmgversuszerstörer;
    this.dmgVs.vsCruiser = unit.dmgversuskreuzer;
    this.dmgVs.vsSmallCarrier = unit.dmgversusflugdeckkreuzer;
    this.dmgVs.vsColonyShip = unit.dmgversuskolonieschiff;
    this.dmgVs.vsMiningShip = unit.dmgversusbergbauschiff;
    this.dmgVs.vsBattleship = unit.dmgversusschlachtschiff;
    this.dmgVs.vsBattlecruiser = unit.dmgversusschlachtkreuzer;
    this.dmgVs.vsCarrier = unit.dmgversustraegerschiff;
    this.dmgVs.vsFlak = unit.dmgversusflakgeschütz;
    this.dmgVs.vsIonCannon = unit.dmgversusionenkanone;
    this.dmgVs.vsLaserCannon = unit.dmgversuslasergeschütz;
    this.dmgVs.vsRailgun = unit.dmgversusrailgun;
    this.dmgVs.vsParticleCannon = unit.dmgversuspartikelkanone;
    this.dmgVs.vsPlanetaryShield = unit.dmgversusplanetarerschildgenerator;

    console.log(shipType);
    console.log(this.ressourceCosts);
    console.log(this.values);
    console.log(this.rapidFire);
    console.log(this.dmgVs);
  } else {
    console.log("fehler parameter ist nicht vom typ Unit");
  }
};
const ship = mongoose.model("ship", shipSchema);

export default ship;

/*
export const resourceSchema = new Schema({
  silicon: {
    type: Number,
    default: 0,
  },
  ores: {
    type: Number,
    default: 0,
  },
  chemicals: {
    type: Number,
    default: 0,
  },
  fuel: {
    type: Number,
    default: 0,
  },
  energy: {
    type: Number,
    default: 0,
  },
  steel: {
    type: Number,
    default: 0,
  },
  electronics: {
    type: Number,
    default: 0,
  },
  ammo: {
    type: Number,
    default: 0,
  },
  // _id: false,
});
*/

/*
Werte: sample lighthunter
Baukosten ressourcenschema
silicon  0
ores  0
chemicals  0
fuel  0
energy  50
steel  200
electronics  0
ammo  0

firepower 50
hull 200
shield 0
speed 100
fuelconsume 5
ammoconsume 2
cargo 100
hangarslots -1

//rapidfire vs all enemyships/defenses
dmgversusleichterjaeger = 0;
  dmgversusschwererjaeger = 0;
  dmgversusbomber = 0;
  dmgversusfregatte = 0;
  dmgversuskleinertransporter = 0;
  dmgversusminingdrohne = 0;

  dmgversusgrossertransporter = 0;
  dmgversuszerstörer = 0;
  dmgversuskreuzer = 0;
  dmgversusflugdeckkreuzer = 0;
  dmgversuskolonieschiff = 0;
  dmgversusbergbauschiff = 0;

  dmgversusschlachtschiff = 0;
  dmgversusschlachtkreuzer = 0;
  dmgversustraegerschiff = 0;

  dmgversusflakgeschütz = 0;
  dmgversusartillerie = 0;
  dmgversusionenkanone = 0;
  dmgversuslasergeschütz = 0;
  dmgversusrailgun = 0;
  dmgversuspartikelkanone = 0;
  dmgversusplanetarerschildgenerator = 0;

  ///Rapidfire
  rapidfirevsleichterjaeger = 1;
  rapidfirevsschwererjaeger = 1;
  rapidfirevsbomber = 1;
  rapidfirevsfregatte = 1;
  rapidfirevskleinertransporter = 1;
  rapidfirevsminingdrohne = 1;

  rapidfirevsgroßertransporter = 1;
  rapidfirevszerstörer = 1;
  rapidfirevskreuzer = 1;
  rapidfirevsflugdeckkreuzer = 1;
  rapidfirevskolonieschiff = 1;
  rapidfirevsbergbauschiff = 1;

  rapidfirevsschlachtschiff = 1;
  rapidfirevsschlachtkreuzer = 1;
  rapidfirevstraegerschiff = 1;

  rapidfirevsflakgeschütz = 1;
  rapidfirevsartillerie = 1;
  rapidfirevsionenkanone = 1;
  rapidfirevslasergeschütz = 1;
  rapidfirevsrailgun = 1;
  rapidfirevspartikelkanone = 1;
  rapidfirevsplanetarerschildgenerator = 1;
*/
