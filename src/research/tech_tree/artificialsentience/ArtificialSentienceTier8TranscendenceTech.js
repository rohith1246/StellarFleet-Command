/**
 * ArtificialSentienceTier8TranscendenceTech.js - Science & Tech Tree Research Node: ArtificialSentience -> Tier8Transcendence.
 */

class ArtificialSentienceTier8TranscendenceTech {
  constructor(researchProgress = 0) {
    this.discipline = 'ArtificialSentience';
    this.tier = 'Tier8Transcendence';
    this.tierLevel = 8;
    this.researchPointsRequired = 22000;
    this.currentProgress = researchProgress;
    this.isUnlocked = false;
    this.statBonusPercentage = 26;
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

module.exports = { ArtificialSentienceTier8TranscendenceTech };
