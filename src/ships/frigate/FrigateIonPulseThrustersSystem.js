/**
 * FrigateIonPulseThrustersSystem.js - Ship Hardpoint & Engineering Specification: Frigate -> IonPulseThrusters.
 */

class FrigateIonPulseThrustersSystem {
  constructor(shipHull, config = {}) {
    this.shipClass = 'Frigate';
    this.moduleType = 'IonPulseThrusters';
    this.hull = shipHull;
    this.powerDrawGigawatts = 25;
    this.heatGenerationMwu = 10;
    this.durabilityPoints = 300;
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

module.exports = { FrigateIonPulseThrustersSystem };
