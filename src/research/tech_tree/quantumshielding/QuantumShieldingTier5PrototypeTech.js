/**
 * QuantumShieldingTier5PrototypeTech.js - Science & Tech Tree Research Node: QuantumShielding -> Tier5Prototype.
 */

class QuantumShieldingTier5PrototypeTech {
  constructor(researchProgress = 0) {
    this.discipline = 'QuantumShielding';
    this.tier = 'Tier5Prototype';
    this.tierLevel = 5;
    this.researchPointsRequired = 13500;
    this.currentProgress = researchProgress;
    this.isUnlocked = false;
    this.statBonusPercentage = 21;
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

module.exports = { QuantumShieldingTier5PrototypeTech };
