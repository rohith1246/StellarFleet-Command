/**
 * AntimatterPropulsionTier5PrototypeTech.js - Science & Tech Tree Research Node: AntimatterPropulsion -> Tier5Prototype.
 */

class AntimatterPropulsionTier5PrototypeTech {
  constructor(researchProgress = 0) {
    this.discipline = 'AntimatterPropulsion';
    this.tier = 'Tier5Prototype';
    this.tierLevel = 5;
    this.researchPointsRequired = 12500;
    this.currentProgress = researchProgress;
    this.isUnlocked = false;
    this.statBonusPercentage = 17;
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

module.exports = { AntimatterPropulsionTier5PrototypeTech };
