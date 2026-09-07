/**
 * TorpedoGunshipCargoBayPodSystem.js - Ship Hardpoint & Engineering Specification: TorpedoGunship -> CargoBayPod.
 */

class TorpedoGunshipCargoBayPodSystem {
  constructor(shipHull, config = {}) {
    this.shipClass = 'TorpedoGunship';
    this.moduleType = 'CargoBayPod';
    this.hull = shipHull;
    this.powerDrawGigawatts = 95;
    this.heatGenerationMwu = 22;
    this.durabilityPoints = 1130;
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

module.exports = { TorpedoGunshipCargoBayPodSystem };
