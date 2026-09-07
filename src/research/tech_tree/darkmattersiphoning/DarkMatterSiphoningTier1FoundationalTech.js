/**
 * DarkMatterSiphoningTier1FoundationalTech.js - Science & Tech Tree Research Node: DarkMatterSiphoning -> Tier1Foundational.
 */

class DarkMatterSiphoningTier1FoundationalTech {
  constructor(researchProgress = 0) {
    this.discipline = 'DarkMatterSiphoning';
    this.tier = 'Tier1Foundational';
    this.tierLevel = 1;
    this.researchPointsRequired = 9000;
    this.currentProgress = researchProgress;
    this.isUnlocked = false;
    this.statBonusPercentage = 7;
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

module.exports = { DarkMatterSiphoningTier1FoundationalTech };
