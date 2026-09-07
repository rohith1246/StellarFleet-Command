/**
 * TemporalMechanicsTier15ChronoShiftTech.js - Science & Tech Tree Research Node: TemporalMechanics -> Tier15ChronoShift.
 */

class TemporalMechanicsTier15ChronoShiftTech {
  constructor(researchProgress = 0) {
    this.discipline = 'TemporalMechanics';
    this.tier = 'Tier15ChronoShift';
    this.tierLevel = 15;
    this.researchPointsRequired = 42500;
    this.currentProgress = researchProgress;
    this.isUnlocked = false;
    this.statBonusPercentage = 51;
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

module.exports = { TemporalMechanicsTier15ChronoShiftTech };
