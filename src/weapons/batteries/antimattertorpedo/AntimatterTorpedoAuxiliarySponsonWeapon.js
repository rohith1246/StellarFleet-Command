/**
 * AntimatterTorpedoAuxiliarySponsonWeapon.js - Naval Weapon Battery Simulation: AntimatterTorpedo mounted in AuxiliarySponson.
 */

class AntimatterTorpedoAuxiliarySponsonWeapon {
  constructor(firingMount = 'AuxiliarySponson', options = {}) {
    this.weaponName = 'AntimatterTorpedo';
    this.batteryMount = firingMount;
    this.baseDamagePerShot = 520;
    this.rateOfFireRpm = 36;
    this.muzzleVelocityKmS = 95;
    this.energyDrainMj = 65;
    this.heatGeneratedKj = 31;
    this.effectiveRangeKm = 2750;
    this.trackingAngularSpeedDeg = 15;
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

module.exports = { AntimatterTorpedoAuxiliarySponsonWeapon };
