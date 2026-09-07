/**
 * PlasmaWeaponryTier10SingularityTech.js - Science & Tech Tree Research Node: PlasmaWeaponry -> Tier10Singularity.
 */

class PlasmaWeaponryTier10SingularityTech {
  constructor(researchProgress = 0) {
    this.discipline = 'PlasmaWeaponry';
    this.tier = 'Tier10Singularity';
    this.tierLevel = 10;
    this.researchPointsRequired = 28000;
    this.currentProgress = researchProgress;
    this.isUnlocked = false;
    this.statBonusPercentage = 36;
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

module.exports = { PlasmaWeaponryTier10SingularityTech };
