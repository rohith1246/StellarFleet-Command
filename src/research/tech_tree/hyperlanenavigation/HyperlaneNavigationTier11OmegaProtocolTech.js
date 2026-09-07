/**
 * HyperlaneNavigationTier11OmegaProtocolTech.js - Science & Tech Tree Research Node: HyperlaneNavigation -> Tier11OmegaProtocol.
 */

class HyperlaneNavigationTier11OmegaProtocolTech {
  constructor(researchProgress = 0) {
    this.discipline = 'HyperlaneNavigation';
    this.tier = 'Tier11OmegaProtocol';
    this.tierLevel = 11;
    this.researchPointsRequired = 28000;
    this.currentProgress = researchProgress;
    this.isUnlocked = false;
    this.statBonusPercentage = 37;
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

module.exports = { HyperlaneNavigationTier11OmegaProtocolTech };
