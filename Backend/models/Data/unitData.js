import Unit from "./unit.js";

class LeichterJaeger extends Unit {
  constructor() {
    super();
    this.attackEnergy = 100;
    this.name = "Leichter Jaeger";
    this.steelcosts = 200;
    this.mikroshipkosten = 0;
    this.chemicalcost = 50;
    this.energycosts = 50;
    this.firepower = 10;
    this.hull = 200;
    this.shield = 0;
    this.speed = 800;
    this.fuelconsume = 10;
    this.ammoconsume = 5;
    this.hangaring = -1;
    this.cargo = 100;
    this.unittype = Unit.unittype.lightHunter;
    this.rapidfirevsschlachtschiff = 100;
    this.rapidfirevszerstörer = 50;
    this.rapidfirevsbomber = 10;
    this.rapidfirevskleinertransporter = 10;
    this.img = "kein bild vorhanden";
    this.label = "nicht gefundener name";
    this.description = "keine beschreibung";
  }
}
class SchwererJaeger extends Unit {
  constructor() {
    super();
    this.attackEnergy = 100;
    this.name = "Schwerer Jaeger";
    this.steelcosts = 800;
    this.mikroshipkosten = 100;
    this.chemicalcost = 200;
    this.energycosts = 800;
    this.firepower = 50;
    this.hull = 800;
    this.shield = 200;
    this.speed = 600;
    this.fuelconsume = 20;
    this.ammoconsume = 10;
    this.hangaring = -2;
    this.cargo = 200;
    this.unittype = Unit.unittype.heavyHunter;
    this.rapidfirevsschlachtschiff = 100;
    this.rapidfirevszerstörer = 50;
    this.rapidfirevsbomber = 10;
    this.rapidfirevsgroßertransporter = 10;
  }
}
class Bomber extends Unit {
  constructor() {
    super();
    this.attackEnergy = 100;
    this.name = "Bomber";
    this.steelcosts = 1500;
    this.mikroshipkosten = 200;
    this.chemicalcost = 800;
    this.energycosts = 2000;
    this.firepower = 1000;
    this.hull = 1500;
    this.shield = 400;
    this.speed = 500;
    this.fuelconsume = 50;
    this.ammoconsume = 50;
    this.hangaring = -3;
    this.cargo = 500;
    this.unittype = Unit.unittype.bomber;
    this.dmgversusleichterjaeger = (this.firepower / 100) * -95;
    this.dmgversusschwererjaeger = (this.firepower / 100) * -95;
    this.rapidfirevszerstörer = 10;
    this.rapidfirevsschlachtschiff = 20;
    this.rapidfirevsschlachtkreuzer = 20;
    this.rapidfirevstraegerschiff = 20;
    this.rapidfirevsflugdeckkreuzer = 10;
    this.rapidfirevsbergbauschiff = 10;
    this.rapidfirevsartillerie = 10;
    this.rapidfirevsionenkanone = 10;
    this.rapidfirevslasergeschütz = 10;
    this.rapidfirevsrailgun = 10;
    this.rapidfirevspartikelkanone = 10;
    this.rapidfirevsplanetarerschildgenerator = 10;
  }
}
class KleinerTransporter extends Unit {
  constructor() {
    super();
    this.attackEnergy = 100;
    this.name = "Kleiner Transporter";
    this.steelcosts = 500;
    this.mikroshipkosten = 0;
    this.chemicalcost = 100;
    this.energycosts = 200;
    this.firepower = 0;
    this.hull = 500;
    this.shield = 0;
    this.speed = 500;
    this.fuelconsume = 20;
    this.ammoconsume = 0;
    this.hangaring = -2;
    this.cargo = 5000;
    this.unittype = Unit.unittype.smallTransporter;
  }
}
class MiningDrohne extends Unit {
  constructor() {
    super();
    this.attackEnergy = 100;
    this.name = "Miningdrohne";
    this.steelcosts = 500;
    this.mikroshipkosten = 0;
    this.chemicalcost = 200;
    this.energycosts = 500;
    this.firepower = 0;
    this.hull = 500;
    this.shield = 100;
    this.speed = 500;
    this.fuelconsume = 20;
    this.ammoconsume = 0;
    this.hangaring = -1;
    this.cargo = 2000;
    this.unittype = Unit.unittype.miningDrone;
  }
}
class Fregatte extends Unit {
  constructor() {
    super();
    this.attackEnergy = 100;
    this.name = "Fregatte";
    this.steelcosts = 5000;
    this.mikroshipkosten = 500;
    this.chemicalcost = 1500;
    this.energycosts = 1000;
    this.firepower = 500;
    this.hull = 5000;
    this.shield = 1000;
    this.speed = 400;
    this.fuelconsume = 200;
    this.ammoconsume = 100;
    this.hangaring = 6;
    this.cargo = 5000;
    this.unittype = Unit.unittype.frigate;
    this.rapidfirevsflakgeschütz = 5;
  }
}
class GrosserTransporter extends Unit {
  constructor() {
    super();
    this.attackEnergy = 100;
    this.name = "Großer Transporter";
    this.steelcosts = 5000;
    this.mikroshipkosten = 500;
    this.chemicalcost = 5000;
    this.energycosts = 4000;
    this.firepower = 50;
    this.hull = 5000;
    this.shield = 500;
    this.speed = 200;
    this.fuelconsume = 500;
    this.ammoconsume = 10;
    this.hangaring = 0;
    this.cargo = 50000;
    this.unittype = Unit.unittype.largeTransporter;
  }
}
class Zerstörer extends Unit {
  constructor() {
    super();
    this.attackEnergy = 100;
    this.name = "Zerstörer";
    this.steelcosts = 15000;
    this.mikroshipkosten = 2500;
    this.chemicalcost = 5000;
    this.energycosts = 10000;
    this.firepower = 2500;
    this.hull = 15000;
    this.shield = 2500;
    this.speed = 100;
    this.fuelconsume = 1000;
    this.ammoconsume = 0;
    this.hangaring = 12;
    this.cargo = 5000;
    this.unittype = Unit.unittype.destroyer;
    this.dmgversusleichterjaeger = (this.firepower / 100) * -90;
    this.dmgversusschwererjaeger = (this.firepower / 100) * -95;
    this.dmgversusflugdeckkreuzer = (this.firepower / 100) * 150;
    this.dmgversusbomber = (this.firepower / 100) * -90;
    this.rapidfirevsfregatte = 5;
    this.rapidfirevsflugdeckkreuzer = 5;
  }
}
class Kreuzer extends Unit {
  constructor() {
    super();
    this.attackEnergy = 100;
    this.name = "Kreuzer";
    this.steelcosts = 20000;
    this.mikroshipkosten = 500;
    this.chemicalcost = 2500;
    this.energycosts = 5000;
    this.firepower = 500;
    this.hull = 25000;
    this.shield = 1000;
    this.speed = 150;
    this.fuelconsume = 800;
    this.ammoconsume = 300;
    this.hangaring = 24;
    this.cargo = 5000;
    this.unittype = Unit.unittype.cruiser;
    this.rapidfirevsleichterjaeger = 50;
    this.rapidfirevsschwererjaeger = 25;
    this.rapidfirevsbomber = 25;
    this.rapidfirevsminingdrohne = 25;
  }
}
class FlugDeckKreuzer extends Unit {
  constructor() {
    super();
    this.attackEnergy = 100;
    this.name = "Flugdeckkreuzer";
    this.steelcosts = 50000;
    this.mikroshipkosten = 20000;
    this.chemicalcost = 20000;
    this.energycosts = 20000;
    this.firepower = 1000;
    this.hull = 50000;
    this.shield = 25000;
    this.speed = 100;
    this.fuelconsume = 3000;
    this.ammoconsume = 200;
    this.hangaring = 600;
    this.cargo = 50000;
    this.unittype = Unit.unittype.smallCarrier;
    this.dmgversusbomber = (this.firepower / 100) * -90;//TODO löschen
    this.rapidfirevsbomber = 5;//TODO löschen
  }
}
class KolonieSchiff extends Unit {
  constructor() {
    super();
    this.attackEnergy = 100;
    this.name = "Kolonieschiff";
    this.steelcosts = 8000;
    this.mikroshipkosten = 3000;
    this.chemicalcost = 8000;
    this.energycosts = 10000;
    this.firepower = 250;
    this.hull = 5000;
    this.shield = 4000;
    this.speed = 200;
    this.fuelconsume = 1000;
    this.ammoconsume = 50;
    this.hangaring = 30;
    this.cargo = 10000;
    this.unittype = Unit.unittype.colonyShip;
  }
}
class BergBauSchiff extends Unit {
  constructor() {
    super();
    this.attackEnergy = 100;
    this.name = "Bergbauschiff";
    this.steelcosts = 20000;
    this.mikroshipkosten = 10000;
    this.chemicalcost = 10000;
    this.energycosts = 20000;
    this.firepower = 0;
    this.hull = 10000;
    this.shield = 2500;
    this.speed = 200;
    this.fuelconsume = 2000;
    this.ammoconsume = 0;
    this.hangaring = 90;
    this.cargo = 150000;
    this.unittype = Unit.unittype.miningShip;
  }
}
class SchlachtSchiff extends Unit {
  constructor() {
    super();
    this.attackEnergy = 100;
    this.name = "Schlachtschiff";
    this.steelcosts = 300000;
    this.mikroshipkosten = 150000;
    this.chemicalcost = 100000;
    this.energycosts = 400000;
    this.firepower = 50000;
    this.hull = 500000;
    this.shield = 200000;
    this.speed = 50;
    this.fuelconsume = 20000;
    this.ammoconsume = 5000;
    this.hangaring = 60;
    this.cargo = 200000;
    this.unittype = Unit.unittype.battleShip;
    this.dmgversusbomber = (this.firepower / 100) * -99;
    this.dmgversusleichterjaeger = (this.firepower / 100) * -99.9;
    this.dmgversusschwererjaeger = (this.firepower / 100) * -99.9;
    this.rapidfirevsflakgeschütz = 100;
    this.rapidfirevsartillerie = 100;
    this.rapidfirevslasergeschütz = 50;
    this.rapidfirevsrailgun = 50;
    this.rapidfirevsplanetarerschildgenerator = 50;
    this.rapidfirevsionenkanone = 50;
    this.rapidfirevszerstörer = 10;
    this.rapidfirevskreuzer = 10;
  }
}
class SchlachtKreuzer extends Unit {
  constructor() {
    super();
    this.attackEnergy = 100;
    this.name = "Schlachtkreuzer";
    this.steelcosts = 250000;
    this.mikroshipkosten = 250000;
    this.chemicalcost = 60000;
    this.energycosts = 200000;
    this.firepower = 20000;
    this.hull = 300000;
    this.shield = 300000;
    this.speed = 100;
    this.fuelconsume = 18000;
    this.ammoconsume = 1000;
    this.hangaring = 30;
    this.cargo = 100000;
    this.unittype = Unit.unittype.battleCruiser;
    this.rapidfirevsschlachtschiff = 10;
  }
}
class TraegerSchiff extends Unit {
  constructor() {
    super();
    this.attackEnergy = 100;
    this.name = "Traegerschiff";
    this.steelcosts = 1000000;
    this.mikroshipkosten = 400000;
    this.chemicalcost = 200000;
    this.energycosts = 800000;
    this.firepower = 10000;
    this.hull = 1000000;
    this.shield = 500000;
    this.speed = 50;
    this.fuelconsume = 50000;
    this.ammoconsume = 2500;
    this.hangaring = 9000;
    this.cargo = 500000;
    this.unittype = Unit.unittype.carrier;
  }
}
class FlakGeschütz extends Unit {
  constructor() {
    super();
    this.attackEnergy = 100;
    this.name = "Flakgeschütz";
    this.steelcosts = 300;
    this.mikroshipkosten = 0;
    this.chemicalcost = 300;
    this.energycosts = 0;
    this.firepower = 50;
    this.hull = 600;
    this.shield = 0;
    this.speed = 0;
    this.fuelconsume = 0;
    this.ammoconsume = 5;
    this.hangaring = 0;
    this.cargo = 0;
    this.unittype = Unit.unittype.flakgeschuetz;
    this.rapidfirevsleichterjaeger = 20;
    this.rapidfirevsschwererjaeger = 20;
    this.rapidfirevsbomber = 20;
    this.rapidfirevskleinertransporter = 20;
  }
}
class Artillerie extends Unit {
  constructor() {
    super();
    this.attackEnergy = 100;
    this.name = "Artillerie";
    this.steelcosts = 1000;
    this.mikroshipkosten = 0;
    this.chemicalcost = 1000;
    this.energycosts = 100;
    this.firepower = 250;
    this.hull = 2000;
    this.shield = 0;
    this.speed = 0;
    this.fuelconsume = 0;
    this.ammoconsume = 50;
    this.hangaring = 0;
    this.cargo = 0;
    this.unittype = Unit.unittype.flak;
  }
}
class IonenKanone extends Unit {
  constructor() {
    super();
    this.attackEnergy = 100;
    this.name = "Ionenkanone";
    this.steelcosts = 500;
    this.mikroshipkosten = 1000;
    this.chemicalcost = 500;
    this.energycosts = 500;
    this.firepower = 500;
    this.hull = 1000;
    this.shield = 1000;
    this.speed = 0;
    this.fuelconsume = 0;
    this.ammoconsume = 0;
    this.hangaring = 0;
    this.cargo = 0;
    this.unittype = Unit.unittype.ionCannon;
  }
}
class LaserGeschütz extends Unit {
  constructor() {
    super();
    this.attackEnergy = 100;
    this.name = "Lasergeschütz";
    this.steelcosts = 5000;
    this.mikroshipkosten = 5000;
    this.chemicalcost = 0;
    this.energycosts = 2500;
    this.firepower = 2500;
    this.hull = 5000;
    this.shield = 5000;
    this.speed = 0;
    this.fuelconsume = 0;
    this.ammoconsume = 0;
    this.hangaring = -0;
    this.cargo = 0;
    this.unittype = Unit.unittype.laserCannon;
  }
}
class Railgun extends Unit {
  constructor() {
    super();
    this.attackEnergy = 100;
    this.name = "Railgun";
    this.steelcosts = 20000;
    this.mikroshipkosten = 2500;
    this.chemicalcost = 2500;
    this.energycosts = 2000;
    this.firepower = 5000;
    this.hull = 40000;
    this.shield = 2500;
    this.speed = 0;
    this.fuelconsume = 0;
    this.ammoconsume = 300;
    this.hangaring = 0;
    this.cargo = 0;
    this.unittype = Unit.unittype.railGun;
    this.dmgversusschlachtschiff = (this.firepower / 100) * 100;
    this.dmgversusschlachtkreuzer = (this.firepower / 100) * 100;
    this.rapidfirevszerstörer = 5;
  }
}
class PartikelKanone extends Unit {
  constructor() {
    super();
    this.attackEnergy = 100;
    this.attackenergy = 100;
    this.name = "Partikelkanone";
    this.steelcosts = 50000;
    this.mikroshipkosten = 100000;
    this.chemicalcost = 50000;
    this.energycosts = 50000;
    this.firepower = 25000;
    this.hull = 100000;
    this.shield = 100000;
    this.speed = 0;
    this.fuelconsume = 0;
    this.ammoconsume = 0;
    this.hangaring = 0;
    this.cargo = 0;
    this.unittype = Unit.unittype.particleCannon;
    this.rapidfirevsschlachtschiff = 5;
    this.rapidfirevszerstörer = 5;
    this.rapidfirevstraegerschiff = 5;
    this.rapidfirevsschlachtkreuzer = 5;
  }
}
class PlanetarerSchildGenerator extends Unit {
  constructor() {
    super();
    this.attackEnergy = 100;
    this.name = "Planetarer Schildgenerator";
    this.steelcosts = 100000;
    this.mikroshipkosten = 100000;
    this.chemicalcost = 100000;
    this.energycosts = 100000;
    this.firepower = 0;
    this.hull = 20000;
    this.shield = 100000;
    this.speed = 0;
    this.fuelconsume = 0;
    this.ammoconsume = 0;
    this.hangaring = 0;
    this.cargo = 0;
    this.unittype = Unit.unittype.planetaryShield;
  }
}

const onlyShips = [
  LeichterJaeger,
  SchwererJaeger,
  Bomber,
  KleinerTransporter,
  Fregatte,
  GrosserTransporter,
  Zerstörer,
  Kreuzer,
  FlugDeckKreuzer,
  SchlachtSchiff,
  SchlachtKreuzer,
  TraegerSchiff,
];

export default {
  LeichterJaeger,
  SchwererJaeger,
  Bomber,
  KleinerTransporter,
  MiningDrohne,
  Fregatte,
  GrosserTransporter,
  Zerstörer,
  Kreuzer,
  FlugDeckKreuzer,
  KolonieSchiff,
  BergBauSchiff,
  SchlachtSchiff,
  SchlachtKreuzer,
  TraegerSchiff,
  FlakGeschütz,
  Artillerie,
  IonenKanone,
  LaserGeschütz,
  Railgun,
  PartikelKanone,
  PlanetarerSchildGenerator,
  onlyShips,
};

