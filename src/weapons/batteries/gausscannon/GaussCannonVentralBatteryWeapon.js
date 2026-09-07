/**
 * GaussCannonVentralBatteryWeapon.js - Naval Weapon Battery Simulation: GaussCannon mounted in VentralBattery.
 */

class GaussCannonVentralBatteryWeapon {
  constructor(firingMount = 'VentralBattery', options = {}) {
    this.weaponName = 'GaussCannon';
    this.batteryMount = firingMount;
    this.baseDamagePerShot = 605;
    this.rateOfFireRpm = 18;
    this.muzzleVelocityKmS = 155;
    this.energyDrainMj = 76;
    this.heatGeneratedKj = 39;
    this.effectiveRangeKm = 3450;
    this.trackingAngularSpeedDeg = 11;
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

module.exports = { GaussCannonVentralBatteryWeapon };
