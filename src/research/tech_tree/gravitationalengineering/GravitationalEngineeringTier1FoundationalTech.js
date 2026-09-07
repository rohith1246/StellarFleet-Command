/**
 * GravitationalEngineeringTier1FoundationalTech.js - Science & Tech Tree Research Node: GravitationalEngineering -> Tier1Foundational.
 */

class GravitationalEngineeringTier1FoundationalTech {
  constructor(researchProgress = 0) {
    this.discipline = 'GravitationalEngineering';
    this.tier = 'Tier1Foundational';
    this.tierLevel = 1;
    this.researchPointsRequired = 6000;
    this.currentProgress = researchProgress;
    this.isUnlocked = false;
    this.statBonusPercentage = 11;
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

module.exports = { GravitationalEngineeringTier1FoundationalTech };
