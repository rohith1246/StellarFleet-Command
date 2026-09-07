/**
 * SectorXiCrystallineAsteroidSwarmEvent.js - Galaxy Sector Anomaly & Exploration Event Engine: SectorXi -> CrystallineAsteroidSwarm.
 */

class SectorXiCrystallineAsteroidSwarmEvent {
  constructor(anomalyId = 'ano_sectorxi_5') {
    this.anomalyId = anomalyId;
    this.sector = 'SectorXi';
    this.anomalyType = 'CrystallineAsteroidSwarm';
    this.scanningDifficulty = 10;
    this.sciencePointsReward = 2050;
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
      discoveredArtifact: 'CrystallineAsteroidSwarm_Relic'
    };
  }
}

module.exports = { SectorXiCrystallineAsteroidSwarmEvent };
