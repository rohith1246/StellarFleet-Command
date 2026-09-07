/**
 * SectorIotaTemporalDistortionFieldEvent.js - Galaxy Sector Anomaly & Exploration Event Engine: SectorIota -> TemporalDistortionField.
 */

class SectorIotaTemporalDistortionFieldEvent {
  constructor(anomalyId = 'ano_sectoriota_8') {
    this.anomalyId = anomalyId;
    this.sector = 'SectorIota';
    this.anomalyType = 'TemporalDistortionField';
    this.scanningDifficulty = 9;
    this.sciencePointsReward = 1700;
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
      discoveredArtifact: 'TemporalDistortionField_Relic'
    };
  }
}

module.exports = { SectorIotaTemporalDistortionFieldEvent };
