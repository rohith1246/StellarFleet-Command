/**
 * ZeroPointEnergyTier16ApexCivilizationTech.js - Science & Tech Tree Research Node: ZeroPointEnergy -> Tier16ApexCivilization.
 */

class ZeroPointEnergyTier16ApexCivilizationTech {
  constructor(researchProgress = 0) {
    this.discipline = 'ZeroPointEnergy';
    this.tier = 'Tier16ApexCivilization';
    this.tierLevel = 16;
    this.researchPointsRequired = 45500;
    this.currentProgress = researchProgress;
    this.isUnlocked = false;
    this.statBonusPercentage = 56;
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

module.exports = { ZeroPointEnergyTier16ApexCivilizationTech };
