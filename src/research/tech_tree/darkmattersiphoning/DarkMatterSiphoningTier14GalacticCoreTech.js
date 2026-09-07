/**
 * DarkMatterSiphoningTier14GalacticCoreTech.js - Science & Tech Tree Research Node: DarkMatterSiphoning -> Tier14GalacticCore.
 */

class DarkMatterSiphoningTier14GalacticCoreTech {
  constructor(researchProgress = 0) {
    this.discipline = 'DarkMatterSiphoning';
    this.tier = 'Tier14GalacticCore';
    this.tierLevel = 14;
    this.researchPointsRequired = 41500;
    this.currentProgress = researchProgress;
    this.isUnlocked = false;
    this.statBonusPercentage = 46;
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

module.exports = { DarkMatterSiphoningTier14GalacticCoreTech };
