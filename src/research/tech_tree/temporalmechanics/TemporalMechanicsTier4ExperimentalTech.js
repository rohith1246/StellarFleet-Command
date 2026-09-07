/**
 * TemporalMechanicsTier4ExperimentalTech.js - Science & Tech Tree Research Node: TemporalMechanics -> Tier4Experimental.
 */

class TemporalMechanicsTier4ExperimentalTech {
  constructor(researchProgress = 0) {
    this.discipline = 'TemporalMechanics';
    this.tier = 'Tier4Experimental';
    this.tierLevel = 4;
    this.researchPointsRequired = 15000;
    this.currentProgress = researchProgress;
    this.isUnlocked = false;
    this.statBonusPercentage = 18;
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

module.exports = { TemporalMechanicsTier4ExperimentalTech };
