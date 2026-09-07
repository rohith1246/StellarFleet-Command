/**
 * OrbitalStarbaseAutomatedRepairDronesSystem.js - Ship Hardpoint & Engineering Specification: OrbitalStarbase -> AutomatedRepairDrones.
 */

class OrbitalStarbaseAutomatedRepairDronesSystem {
  constructor(shipHull, config = {}) {
    this.shipClass = 'OrbitalStarbase';
    this.moduleType = 'AutomatedRepairDrones';
    this.hull = shipHull;
    this.powerDrawGigawatts = 91;
    this.heatGenerationMwu = 19;
    this.durabilityPoints = 1110;
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

module.exports = { OrbitalStarbaseAutomatedRepairDronesSystem };
