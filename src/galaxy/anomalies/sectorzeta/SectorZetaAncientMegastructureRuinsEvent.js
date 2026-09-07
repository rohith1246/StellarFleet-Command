/**
 * SectorZetaAncientMegastructureRuinsEvent.js - Galaxy Sector Anomaly & Exploration Event Engine: SectorZeta -> AncientMegastructureRuins.
 */

class SectorZetaAncientMegastructureRuinsEvent {
  constructor(anomalyId = 'ano_sectorzeta_3') {
    this.anomalyId = anomalyId;
    this.sector = 'SectorZeta';
    this.anomalyType = 'AncientMegastructureRuins';
    this.scanningDifficulty = 6;
    this.sciencePointsReward = 1150;
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

module.exports = { SectorZetaAncientMegastructureRuinsEvent };
