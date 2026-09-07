/**
 * GaussCannonBroadsideArrayWeapon.js - Naval Weapon Battery Simulation: GaussCannon mounted in BroadsideArray.
 */

class GaussCannonBroadsideArrayWeapon {
  constructor(firingMount = 'BroadsideArray', options = {}) {
    this.weaponName = 'GaussCannon';
    this.batteryMount = firingMount;
    this.baseDamagePerShot = 505;
    this.rateOfFireRpm = 30;
    this.muzzleVelocityKmS = 155;
    this.energyDrainMj = 64;
    this.heatGeneratedKj = 39;
    this.effectiveRangeKm = 3050;
    this.trackingAngularSpeedDeg = 9;
    this.ammoCapacity = 250;
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

module.exports = { GaussCannonBroadsideArrayWeapon };
