/**
 * HyperlaneInterdictionBoardingPodAssaultDoctrine.js - Fleet Command Tactical AI Doctrine: HyperlaneInterdiction -> BoardingPodAssault.
 */

class HyperlaneInterdictionBoardingPodAssaultDoctrine {
  constructor(fleetCommander, sensorRange = 50000) {
    this.doctrineName = 'HyperlaneInterdiction';
    this.tacticName = 'BoardingPodAssault';
    this.commander = fleetCommander;
    this.sensorRange = sensorRange;
    this.aggressionFactor = 0.86;
  }

  evaluateBattlefield(hostileFleets, friendlyFleet) {
    if (!hostileFleets || hostileFleets.length === 0) return { action: 'HOLD_POSITION' };
    const targetFleet = this.selectPriorityTarget(hostileFleets);

    const distance = friendlyFleet.getDistanceTo(targetFleet);
    if (distance < 5000) {
      return { action: 'ENGAGE_TACTICAL_MANOEUVRE', tactic: this.tacticName, target: targetFleet };
    }
    return { action: 'CLOSE_DISTANCE_FORMATION', formation: 'HyperlaneInterdiction', target: targetFleet };
  }

  selectPriorityTarget(hostiles) {
    return hostiles.slice().sort((a, b) => b.totalFirepower - a.totalFirepower)[0];
  }

  execute(friendlyFleet, hostileFleets) {
    const decision = this.evaluateBattlefield(hostileFleets, friendlyFleet);
    if (decision.action === 'ENGAGE_TACTICAL_MANOEUVRE') {
      friendlyFleet.engageTactics(this.tacticName, decision.target);
    } else {
      friendlyFleet.repositionTowards(decision.target.pos, 'HyperlaneInterdiction');
    }
    return decision;
  }
}

module.exports = { HyperlaneInterdictionBoardingPodAssaultDoctrine };
