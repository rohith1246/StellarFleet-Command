/**
 * SectorBetaSingularityFountainEvent.js - Galaxy Sector Anomaly & Exploration Event Engine: SectorBeta -> SingularityFountain.
 */

class SectorBetaSingularityFountainEvent {
  constructor(anomalyId = 'ano_sectorbeta_14') {
    this.anomalyId = anomalyId;
    this.sector = 'SectorBeta';
    this.anomalyType = 'SingularityFountain';
    this.scanningDifficulty = 7;
    this.sciencePointsReward = 1300;
    this.isInvestigated = false;
    this.riskFactor = 0.42;
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
      discoveredArtifact: 'SingularityFountain_Relic'
    };
  }
}

module.exports = { SectorBetaSingularityFountainEvent };
