export default class Unit {
  static name;
  static steelcosts;
  static chemicalcost;
  static energycosts;
  static mikroshipkosten;
  static firepower;
  static hull;
  static shield;
  static speed;
  static fuelconsume;
  static ammoconsume;
  static hangaring; // if negative the unit use hangarslots, if positive unit have hangarslots
  static cargo;
  static unittype;
  static attackEnergy;

  img = "kein bild vorhanden";
  label = "nicht gefundener name";
  description = "keine beschreibung";

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

  /*
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
  
  */
  static unittype = {
    lightHunter: 1,
    heavyHunter: 2,
    bomber: 3,
    frigate: 4,
    smallTransporter: 5,
    miningDrone: 6,

    largeTransporter: 7,
    destroyer: 8,
    cruiser: 9,
    smallCarrier: 10,
    colonyShip: 11,
    miningShip: 12,

    battleShip: 13,
    battleCruiser: 14,
    carrier: 15,

    flak: 16,
    artillerie: 17,
    ionCannon: 18,
    laserCannon: 19,
    railGun: 20,
    particleCannon: 21,
    planetaryShield: 22,
  };

  damageVersus(enemy) {
    // console.log(enemy.unittype + " enemy unittype");
    switch (enemy.unittype) {
      case 1:
        return [this.dmgversusleichterjaeger, this.rapidfirevsleichterjaeger];
      case 2:
        return [this.dmgversusschwererjaeger, this.rapidfirevsschwererjaeger];
      case 3:
        return [this.dmgversusbomber, this.rapidfirevsbomber];
      case 4:
        return [this.dmgversusfregatte, this.rapidfirevsfregatte];
      case 5:
        return [
          this.dmgversuskleinertransporter,
          this.rapidfirevskleinertransporter,
        ];
      case 6:
        return [this.dmgversusminingdrohne, this.rapidfirevsminingdrohne];
      case 7:
        return [
          this.dmgversusgrossertransporter,
          this.rapidfirevsgroßertransporter,
        ];
      case 8:
        return [this.dmgversuszerstörer, this.rapidfirevszerstörer];
      case 9:
        return [this.dmgversuskreuzer, this.rapidfirevskreuzer];
      case 10:
        return [this.dmgversusflugdeckkreuzer, this.rapidfirevsflugdeckkreuzer];
      case 11:
        return [this.dmgversuskolonieschiff, this.rapidfirevskolonieschiff];
      case 12:
        return [this.dmgversusbergbauschiff, this.rapidfirevsbergbauschiff];
      case 13:
        return [this.dmgversusschlachtschiff, this.rapidfirevsschlachtschiff];
      case 14:
        return [this.dmgversusschlachtkreuzer, this.rapidfirevsschlachtkreuzer];
      case 15:
        return [this.dmgversustraegerschiff, this.rapidfirevstraegerschiff];
      case 16:
        return [this.dmgversusflakgeschütz, this.rapidfirevsflakgeschütz];
      case 17:
        return [this.dmgversusartillerie, this.rapidfirevsartillerie];
      case 18:
        return [this.dmgversusionenkanone, this.rapidfirevsionenkanone];
      case 19:
        return [this.dmgversuslasergeschütz, this.rapidfirevslasergeschütz];
      case 20:
        return [this.dmgversusrailgun, this.rapidfirevsrailgun];
      case 21:
        return [this.dmgversuspartikelkanone, this.rapidfirevspartikelkanone];
      case 22:
        return [
          this.dmgversusplanetarerschildgenerator,
          this.rapidfirevsplanetarerschildgenerator,
        ];
      default:
        //console.log(enemy.unittype);
        return [0, 0];
    }
  }
  angriff(gegner) {
    let isDead;
    gegner.shield -= this.firepower + this.damageVersus(gegner)[0];
    console.log(
      `${this.name} greift ${gegner.name} an und fügt ${this.firepower + this.damageVersus(gegner)[0]
      } Schaden zu.`
    );
    if (gegner.shield < 0) {
      gegner.hull += gegner.shield;
      gegner.shield = 0;
    }
    if (gegner.hull < 0) {
      gegner.hull = 0;
      isDead = true;
      console.log(`${gegner.name} wurde vernichtet!`);
    } else {
      if (this.damageVersus(gegner)[1] > 1 && this.attackEnergy > 0) {
        this.attackEnergy -= 100 / this.damageVersus(gegner)[1];
        isDead = false;
        console.log(
          `${gegner.name} hat noch ${gegner.hull} Hüllenpunkte und ${gegner.shield} Schildpunkte übrig.`
        );
        isDead = this.angriff(gegner);
      }
    }
    return isDead;
  }

  checkAmmo(fleet) {
    if (this.ammoconsume <= fleet.ammo) {
      fleet.ammo -= this.ammoconsume;
      return true;
    }
    else {
      return false;

    }
  }
}
/*
  static chemicalcost;
  static energycosts;
  static firepower;
  static hull;
  static shield;
  static speed;
  static fuelconsume;
  static ammoconsume;
  static hangaring // if negative the unit use hangarslots, if positive unit have hangarslots
  static cargo;
  static unittype;
*/
