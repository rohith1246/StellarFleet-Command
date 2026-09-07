/**
 * SectorOmicronLivingSpaceLeviathanEvent.js - Galaxy Sector Anomaly & Exploration Event Engine: SectorOmicron -> LivingSpaceLeviathan.
 */

class SectorOmicronLivingSpaceLeviathanEvent {
  constructor(anomalyId = 'ano_sectoromicron_7') {
    this.anomalyId = anomalyId;
    this.sector = 'SectorOmicron';
    this.anomalyType = 'LivingSpaceLeviathan';
    this.scanningDifficulty = 14;
    this.sciencePointsReward = 2250;
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

module.exports = { SectorOmicronLivingSpaceLeviathanEvent };
