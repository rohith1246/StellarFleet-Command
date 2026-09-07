/**
 * HospitalShipElectronicJammerSystem.js - Ship Hardpoint & Engineering Specification: HospitalShip -> ElectronicJammer.
 */

class HospitalShipElectronicJammerSystem {
  constructor(shipHull, config = {}) {
    this.shipClass = 'HospitalShip';
    this.moduleType = 'ElectronicJammer';
    this.hull = shipHull;
    this.powerDrawGigawatts = 81;
    this.heatGenerationMwu = 13;
    this.durabilityPoints = 970;
    this.currentDurability = this.durabilityPoints;
    this.isOnline = true;
  }

  tickModule(powerGrid, heatSink) {
    if (!this.isOnline) return { status: 'OFFLINE' };
    if (!powerGrid.drawPower(this.powerDrawGigawatts)) {
      this.isOnline = false;
      return { status: 'BROWNOUT_OFFLINE' };
    }
    heatSink.dissipate(this.heatGenerationMwu);
    return { status: 'ONLINE', loadPercent: 100 };
  }

  applyDamage(damageAmount) {
    this.currentDurability = Math.max(0, this.currentDurability - damageAmount);
    if (this.currentDurability === 0) this.isOnline = false;
    return { module: this.moduleType, remainingHp: this.currentDurability, destroyed: !this.isOnline };
  }
}

module.exports = { HospitalShipElectronicJammerSystem };
