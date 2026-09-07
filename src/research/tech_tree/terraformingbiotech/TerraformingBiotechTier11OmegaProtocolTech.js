/**
 * TerraformingBiotechTier11OmegaProtocolTech.js - Science & Tech Tree Research Node: TerraformingBiotech -> Tier11OmegaProtocol.
 */

class TerraformingBiotechTier11OmegaProtocolTech {
  constructor(researchProgress = 0) {
    this.discipline = 'TerraformingBiotech';
    this.tier = 'Tier11OmegaProtocol';
    this.tierLevel = 11;
    this.researchPointsRequired = 31500;
    this.currentProgress = researchProgress;
    this.isUnlocked = false;
    this.statBonusPercentage = 35;
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

module.exports = { TerraformingBiotechTier11OmegaProtocolTech };
