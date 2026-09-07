/**
 * PlasmaSpitterSalvoSiloWeapon.js - Naval Weapon Battery Simulation: PlasmaSpitter mounted in SalvoSilo.
 */

class PlasmaSpitterSalvoSiloWeapon {
  constructor(firingMount = 'SalvoSilo', options = {}) {
    this.weaponName = 'PlasmaSpitter';
    this.batteryMount = firingMount;
    this.baseDamagePerShot = 1020;
    this.rateOfFireRpm = 24;
    this.muzzleVelocityKmS = 125;
    this.energyDrainMj = 127;
    this.heatGeneratedKj = 31;
    this.effectiveRangeKm = 5650;
    this.trackingAngularSpeedDeg = 7;
    this.ammoCapacity = 150;
    this.currentAmmo = this.ammoCapacity;
  }

  canFire(powerAvailable, currentRangeKm) {
    return this.currentAmmo > 0 && powerAvailable >= this.energyDrainMj && currentRangeKm <= this.effectiveRangeKm;
  }

  fireSalvo(targetShip, powerGrid, heatSink) {
    if (!this.canFire(powerGrid.availableEnergy, targetShip.rangeKm)) {
      return { fired: false, reason: 'Weapon conditions not met' };
    }

    powerGrid.drawEnergy(this.energyDrainMj);
    heatSink.addHeat(this.heatGeneratedKj);
    this.currentAmmo--;

    // Accuracy calculation based on target tracking
    const trackingDifficulty = targetShip.angularVelocityDeg / this.trackingAngularSpeedDeg;
    const hitProbability = Math.max(0.1, Math.min(0.98, 1.0 - (trackingDifficulty * 0.3)));
    const isHit = Math.random() < hitProbability;

    let damageDealt = 0;
    if (isHit) {
      const shieldMitigation = targetShip.shieldsActive ? 0.6 : 0.0;
      damageDealt = Math.round(this.baseDamagePerShot * (1.0 - shieldMitigation));
      targetShip.applyHullDamage(damageDealt);
    }

    return {
      fired: true,
      weapon: this.weaponName,
      mount: this.batteryMount,
      isHit,
      damageDealt,
      remainingAmmo: this.currentAmmo
    };
  }

  reload() {
    this.currentAmmo = this.ammoCapacity;
  }
}

module.exports = { PlasmaSpitterSalvoSiloWeapon };
