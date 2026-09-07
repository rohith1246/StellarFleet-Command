/**
 * SectorKappaWormholeUnstableRiftEvent.js - Galaxy Sector Anomaly & Exploration Event Engine: SectorKappa -> WormholeUnstableRift.
 */

class SectorKappaWormholeUnstableRiftEvent {
  constructor(anomalyId = 'ano_sectorkappa_1') {
    this.anomalyId = anomalyId;
    this.sector = 'SectorKappa';
    this.anomalyType = 'WormholeUnstableRift';
    this.scanningDifficulty = 12;
    this.sciencePointsReward = 1450;
    this.isInvestigated = false;
    this.riskFactor = 0.18;
  }

  scanAnomaly(scienceShip) {
    if (this.isInvestigated) return { success: false, reason: 'Already surveyed' };
    const scanPower = scienceShip.scanSensorStrength || 10;
    if (scanPower < this.scanningDifficulty) {
      return { success: false, reason: 'Sensor power insufficient' };
    }

    const hazardCheck = Math.random();
    const hazardTriggered = hazardCheck < this.riskFactor;

    if (hazardTriggered) {
      const damageTaken = Math.round(scienceShip.hullPoints * 0.2);
      scienceShip.applyDamage(damageTaken);
      return {
        success: true,
        investigated: true,
        hazardousEncounter: true,
        damageTaken,
        scienceGained: Math.round(this.sciencePointsReward * 1.5)
      };
    }

    this.isInvestigated = true;
    return {
      success: true,
      investigated: true,
      hazardousEncounter: false,
      scienceGained: this.sciencePointsReward,
      discoveredArtifact: 'WormholeUnstableRift_Relic'
    };
  }
}

module.exports = { SectorKappaWormholeUnstableRiftEvent };
