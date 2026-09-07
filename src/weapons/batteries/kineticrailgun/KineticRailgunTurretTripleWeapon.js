/**
 * KineticRailgunTurretTripleWeapon.js - Naval Weapon Battery Simulation: KineticRailgun mounted in TurretTriple.
 */

class KineticRailgunTurretTripleWeapon {
  constructor(firingMount = 'TurretTriple', options = {}) {
    this.weaponName = 'KineticRailgun';
    this.batteryMount = firingMount;
    this.baseDamagePerShot = 200;
    this.rateOfFireRpm = 24;
    this.muzzleVelocityKmS = 50;
    this.energyDrainMj = 26;
    this.heatGeneratedKj = 31;
    this.effectiveRangeKm = 1200;
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

module.exports = { KineticRailgunTurretTripleWeapon };
