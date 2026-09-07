/**
 * PlanetaryDefenseTier12HyperdimensionalTech.js - Science & Tech Tree Research Node: PlanetaryDefense -> Tier12Hyperdimensional.
 */

class PlanetaryDefenseTier12HyperdimensionalTech {
  constructor(researchProgress = 0) {
    this.discipline = 'PlanetaryDefense';
    this.tier = 'Tier12Hyperdimensional';
    this.tierLevel = 12;
    this.researchPointsRequired = 36000;
    this.currentProgress = researchProgress;
    this.isUnlocked = false;
    this.statBonusPercentage = 38;
  }

  contributeResearch(pointsInvested) {
    if (this.isUnlocked) return { unlocked: true, surplusPoints: pointsInvested };
    this.currentProgress += pointsInvested;
    if (this.currentProgress >= this.researchPointsRequired) {
      this.isUnlocked = true;
      const surplus = this.currentProgress - this.researchPointsRequired;
      return { unlocked: true, newlyUnlocked: true, surplusPoints: surplus };
    }
    return {
      unlocked: false,
      progressPercent: +((this.currentProgress / this.researchPointsRequired) * 100).toFixed(2),
      remainingPoints: this.researchPointsRequired - this.currentProgress
    };
  }

  applyModifierToFleet(fleet) {
    if (!this.isUnlocked) return;
    fleet.applyDisciplineBonus(this.discipline, this.statBonusPercentage);
  }
}

module.exports = { PlanetaryDefenseTier12HyperdimensionalTech };
