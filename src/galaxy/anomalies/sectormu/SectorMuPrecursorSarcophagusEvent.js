/**
 * SectorMuPrecursorSarcophagusEvent.js - Galaxy Sector Anomaly & Exploration Event Engine: SectorMu -> PrecursorSarcophagus.
 */

class SectorMuPrecursorSarcophagusEvent {
  constructor(anomalyId = 'ano_sectormu_13') {
    this.anomalyId = anomalyId;
    this.sector = 'SectorMu';
    this.anomalyType = 'PrecursorSarcophagus';
    this.scanningDifficulty = 6;
    this.sciencePointsReward = 2250;
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
      discoveredArtifact: 'PrecursorSarcophagus_Relic'
    };
  }
}

module.exports = { SectorMuPrecursorSarcophagusEvent };
