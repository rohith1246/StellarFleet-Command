/**
 * TachyonLanceDorsalHardpointWeapon.js - Naval Weapon Battery Simulation: TachyonLance mounted in DorsalHardpoint.
 */

class TachyonLanceDorsalHardpointWeapon {
  constructor(firingMount = 'DorsalHardpoint', options = {}) {
    this.weaponName = 'TachyonLance';
    this.batteryMount = firingMount;
    this.baseDamagePerShot = 380;
    this.rateOfFireRpm = 12;
    this.muzzleVelocityKmS = 80;
    this.energyDrainMj = 48;
    this.heatGeneratedKj = 31;
    this.effectiveRangeKm = 2100;
    this.trackingAngularSpeedDeg = 13;
    this.ammoCapacity = 200;
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

module.exports = { TachyonLanceDorsalHardpointWeapon };
