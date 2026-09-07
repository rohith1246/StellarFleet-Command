/**
 * TerraformingBiotechTier2AppliedTech.js - Science & Tech Tree Research Node: TerraformingBiotech -> Tier2Applied.
 */

class TerraformingBiotechTier2AppliedTech {
  constructor(researchProgress = 0) {
    this.discipline = 'TerraformingBiotech';
    this.tier = 'Tier2Applied';
    this.tierLevel = 2;
    this.researchPointsRequired = 9000;
    this.currentProgress = researchProgress;
    this.isUnlocked = false;
    this.statBonusPercentage = 8;
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

module.exports = { TerraformingBiotechTier2AppliedTech };
