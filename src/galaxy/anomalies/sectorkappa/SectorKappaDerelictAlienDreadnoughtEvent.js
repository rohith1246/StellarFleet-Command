/**
 * SectorKappaDerelictAlienDreadnoughtEvent.js - Galaxy Sector Anomaly & Exploration Event Engine: SectorKappa -> DerelictAlienDreadnought.
 */

class SectorKappaDerelictAlienDreadnoughtEvent {
  constructor(anomalyId = 'ano_sectorkappa_0') {
    this.anomalyId = anomalyId;
    this.sector = 'SectorKappa';
    this.anomalyType = 'DerelictAlienDreadnought';
    this.scanningDifficulty = 11;
    this.sciencePointsReward = 1400;
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
      discoveredArtifact: 'DerelictAlienDreadnought_Relic'
    };
  }
}

module.exports = { SectorKappaDerelictAlienDreadnoughtEvent };
