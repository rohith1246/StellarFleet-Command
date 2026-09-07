/**
 * TachyonLanceWingtipPylonWeapon.js - Naval Weapon Battery Simulation: TachyonLance mounted in WingtipPylon.
 */

class TachyonLanceWingtipPylonWeapon {
  constructor(firingMount = 'WingtipPylon', options = {}) {
    this.weaponName = 'TachyonLance';
    this.batteryMount = firingMount;
    this.baseDamagePerShot = 430;
    this.rateOfFireRpm = 24;
    this.muzzleVelocityKmS = 80;
    this.energyDrainMj = 54;
    this.heatGeneratedKj = 15;
    this.effectiveRangeKm = 2300;
    this.trackingAngularSpeedDeg = 9;
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

module.exports = { TachyonLanceWingtipPylonWeapon };
