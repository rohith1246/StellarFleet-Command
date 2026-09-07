/**
 * SectorDeltaAncientMegastructureRuinsEvent.js - Galaxy Sector Anomaly & Exploration Event Engine: SectorDelta -> AncientMegastructureRuins.
 */

class SectorDeltaAncientMegastructureRuinsEvent {
  constructor(anomalyId = 'ano_sectordelta_3') {
    this.anomalyId = anomalyId;
    this.sector = 'SectorDelta';
    this.anomalyType = 'AncientMegastructureRuins';
    this.scanningDifficulty = 12;
    this.sciencePointsReward = 950;
    this.isInvestigated = false;
    this.riskFactor = 0.34;
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
      discoveredArtifact: 'AncientMegastructureRuins_Relic'
    };
  }
}

module.exports = { SectorDeltaAncientMegastructureRuinsEvent };
