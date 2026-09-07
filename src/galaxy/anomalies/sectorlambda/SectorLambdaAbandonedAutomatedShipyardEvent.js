/**
 * SectorLambdaAbandonedAutomatedShipyardEvent.js - Galaxy Sector Anomaly & Exploration Event Engine: SectorLambda -> AbandonedAutomatedShipyard.
 */

class SectorLambdaAbandonedAutomatedShipyardEvent {
  constructor(anomalyId = 'ano_sectorlambda_10') {
    this.anomalyId = anomalyId;
    this.sector = 'SectorLambda';
    this.anomalyType = 'AbandonedAutomatedShipyard';
    this.scanningDifficulty = 5;
    this.sciencePointsReward = 2000;
    this.isInvestigated = false;
    this.riskFactor = 0.10;
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
      discoveredArtifact: 'AbandonedAutomatedShipyard_Relic'
    };
  }
}

module.exports = { SectorLambdaAbandonedAutomatedShipyardEvent };
