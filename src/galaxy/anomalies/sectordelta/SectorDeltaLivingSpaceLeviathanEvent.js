/**
 * SectorDeltaLivingSpaceLeviathanEvent.js - Galaxy Sector Anomaly & Exploration Event Engine: SectorDelta -> LivingSpaceLeviathan.
 */

class SectorDeltaLivingSpaceLeviathanEvent {
  constructor(anomalyId = 'ano_sectordelta_7') {
    this.anomalyId = anomalyId;
    this.sector = 'SectorDelta';
    this.anomalyType = 'LivingSpaceLeviathan';
    this.scanningDifficulty = 12;
    this.sciencePointsReward = 1150;
    this.isInvestigated = false;
    this.riskFactor = 0.26;
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
      discoveredArtifact: 'LivingSpaceLeviathan_Relic'
    };
  }
}

module.exports = { SectorDeltaLivingSpaceLeviathanEvent };
