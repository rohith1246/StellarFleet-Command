/**
 * SectorLambdaHyperlaneCollapseZoneEvent.js - Galaxy Sector Anomaly & Exploration Event Engine: SectorLambda -> HyperlaneCollapseZone.
 */

class SectorLambdaHyperlaneCollapseZoneEvent {
  constructor(anomalyId = 'ano_sectorlambda_9') {
    this.anomalyId = anomalyId;
    this.sector = 'SectorLambda';
    this.anomalyType = 'HyperlaneCollapseZone';
    this.scanningDifficulty = 4;
    this.sciencePointsReward = 1950;
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
      discoveredArtifact: 'HyperlaneCollapseZone_Relic'
    };
  }
}

module.exports = { SectorLambdaHyperlaneCollapseZoneEvent };
