/**
 * GravitonProjectorProwChamberWeapon.js - Naval Weapon Battery Simulation: GravitonProjector mounted in ProwChamber.
 */

class GravitonProjectorProwChamberWeapon {
  constructor(firingMount = 'ProwChamber', options = {}) {
    this.weaponName = 'GravitonProjector';
    this.batteryMount = firingMount;
    this.baseDamagePerShot = 675;
    this.rateOfFireRpm = 42;
    this.muzzleVelocityKmS = 80;
    this.energyDrainMj = 85;
    this.heatGeneratedKj = 23;
    this.effectiveRangeKm = 4000;
    this.trackingAngularSpeedDeg = 15;
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

module.exports = { GravitonProjectorProwChamberWeapon };
