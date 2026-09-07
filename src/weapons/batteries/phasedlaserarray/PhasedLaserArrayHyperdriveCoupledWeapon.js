/**
 * PhasedLaserArrayHyperdriveCoupledWeapon.js - Naval Weapon Battery Simulation: PhasedLaserArray mounted in HyperdriveCoupled.
 */

class PhasedLaserArrayHyperdriveCoupledWeapon {
  constructor(firingMount = 'HyperdriveCoupled', options = {}) {
    this.weaponName = 'PhasedLaserArray';
    this.batteryMount = firingMount;
    this.baseDamagePerShot = 725;
    this.rateOfFireRpm = 30;
    this.muzzleVelocityKmS = 125;
    this.energyDrainMj = 90;
    this.heatGeneratedKj = 39;
    this.effectiveRangeKm = 3750;
    this.trackingAngularSpeedDeg = 15;
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

module.exports = { PhasedLaserArrayHyperdriveCoupledWeapon };
