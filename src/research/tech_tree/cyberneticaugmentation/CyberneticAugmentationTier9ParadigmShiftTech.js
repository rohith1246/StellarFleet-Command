/**
 * CyberneticAugmentationTier9ParadigmShiftTech.js - Science & Tech Tree Research Node: CyberneticAugmentation -> Tier9ParadigmShift.
 */

class CyberneticAugmentationTier9ParadigmShiftTech {
  constructor(researchProgress = 0) {
    this.discipline = 'CyberneticAugmentation';
    this.tier = 'Tier9ParadigmShift';
    this.tierLevel = 9;
    this.researchPointsRequired = 27000;
    this.currentProgress = researchProgress;
    this.isUnlocked = false;
    this.statBonusPercentage = 31;
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

module.exports = { CyberneticAugmentationTier9ParadigmShiftTech };
