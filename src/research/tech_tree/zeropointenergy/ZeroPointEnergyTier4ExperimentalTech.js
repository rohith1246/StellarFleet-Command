/**
 * ZeroPointEnergyTier4ExperimentalTech.js - Science & Tech Tree Research Node: ZeroPointEnergy -> Tier4Experimental.
 */

class ZeroPointEnergyTier4ExperimentalTech {
  constructor(researchProgress = 0) {
    this.discipline = 'ZeroPointEnergy';
    this.tier = 'Tier4Experimental';
    this.tierLevel = 4;
    this.researchPointsRequired = 15500;
    this.currentProgress = researchProgress;
    this.isUnlocked = false;
    this.statBonusPercentage = 20;
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

module.exports = { ZeroPointEnergyTier4ExperimentalTech };
