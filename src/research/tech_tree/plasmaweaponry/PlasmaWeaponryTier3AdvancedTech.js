/**
 * PlasmaWeaponryTier3AdvancedTech.js - Science & Tech Tree Research Node: PlasmaWeaponry -> Tier3Advanced.
 */

class PlasmaWeaponryTier3AdvancedTech {
  constructor(researchProgress = 0) {
    this.discipline = 'PlasmaWeaponry';
    this.tier = 'Tier3Advanced';
    this.tierLevel = 3;
    this.researchPointsRequired = 10500;
    this.currentProgress = researchProgress;
    this.isUnlocked = false;
    this.statBonusPercentage = 15;
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

module.exports = { PlasmaWeaponryTier3AdvancedTech };
