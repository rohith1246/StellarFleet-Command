/**
 * AntimatterPropulsionTier15ChronoShiftTech.js - Science & Tech Tree Research Node: AntimatterPropulsion -> Tier15ChronoShift.
 */

class AntimatterPropulsionTier15ChronoShiftTech {
  constructor(researchProgress = 0) {
    this.discipline = 'AntimatterPropulsion';
    this.tier = 'Tier15ChronoShift';
    this.tierLevel = 15;
    this.researchPointsRequired = 37500;
    this.currentProgress = researchProgress;
    this.isUnlocked = false;
    this.statBonusPercentage = 47;
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

module.exports = { AntimatterPropulsionTier15ChronoShiftTech };
