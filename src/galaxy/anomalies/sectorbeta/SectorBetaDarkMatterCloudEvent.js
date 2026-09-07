/**
 * SectorBetaDarkMatterCloudEvent.js - Galaxy Sector Anomaly & Exploration Event Engine: SectorBeta -> DarkMatterCloud.
 */

class SectorBetaDarkMatterCloudEvent {
  constructor(anomalyId = 'ano_sectorbeta_4') {
    this.anomalyId = anomalyId;
    this.sector = 'SectorBeta';
    this.anomalyType = 'DarkMatterCloud';
    this.scanningDifficulty = 5;
    this.sciencePointsReward = 800;
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
      discoveredArtifact: 'DarkMatterCloud_Relic'
    };
  }
}

module.exports = { SectorBetaDarkMatterCloudEvent };
