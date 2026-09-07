/**
 * ArcEmitterBurstRevolverWeapon.js - Naval Weapon Battery Simulation: ArcEmitter mounted in BurstRevolver.
 */

class ArcEmitterBurstRevolverWeapon {
  constructor(firingMount = 'BurstRevolver', options = {}) {
    this.weaponName = 'ArcEmitter';
    this.batteryMount = firingMount;
    this.baseDamagePerShot = 930;
    this.rateOfFireRpm = 12;
    this.muzzleVelocityKmS = 110;
    this.energyDrainMj = 116;
    this.heatGeneratedKj = 15;
    this.effectiveRangeKm = 5200;
    this.trackingAngularSpeedDeg = 11;
    this.ammoCapacity = 100;
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

module.exports = { ArcEmitterBurstRevolverWeapon };
