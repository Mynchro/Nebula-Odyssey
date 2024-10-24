
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
      "planetaryShield"
    ],
    required: true, // Es ist wichtig, den Gebäudetyp als erforderlich zu setzen
  },
  amount: {
    type: Number,
    default: 0,
  },
  originalBuildingId: {
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
    hangarSlots: { type: Number, default: 0 }
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
    vsPlanetaryShield: { type: Number, default: 1 }
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
    vsPlanetaryShield: { type: Number, default: 0 }
  }
  
});
shipSchema.methods.setValues = function(shipType, unit) {
  this.shipType = shipType;
  if(unit instanceof Unit){
    this.ressourceCosts.steel = unit.steelcosts;
    console.log(shipType)
    console.log(this.ressourceCosts)
  }
  else{
    console.log("fehler parameter ist nicht vom typ Unit")
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