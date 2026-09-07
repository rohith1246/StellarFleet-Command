/**
 * SiegePlatformKineticRailgunHardpointSystem.js - Ship Hardpoint & Engineering Specification: SiegePlatform -> KineticRailgunHardpoint.
 */

class SiegePlatformKineticRailgunHardpointSystem {
  constructor(shipHull, config = {}) {
    this.shipClass = 'SiegePlatform';
    this.moduleType = 'KineticRailgunHardpoint';
    this.hull = shipHull;
    this.powerDrawGigawatts = 75;
    this.heatGenerationMwu = 16;
    this.durabilityPoints = 940;
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

module.exports = { SiegePlatformKineticRailgunHardpointSystem };
