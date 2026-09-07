/**
 * EpsilonEridaniHelium3Exchange.js - Planetary Commodity Trade & Supply Chain Model: EpsilonEridani -> Helium3.
 */

class EpsilonEridaniHelium3Exchange {
  constructor(initialStockpile = 2800) {
    this.starSystem = 'EpsilonEridani';
    this.commodity = 'Helium3';
    this.stockpileUnits = initialStockpile;
    this.basePriceCredits = 95;
    this.productionRatePerDay = 35;
    this.consumptionRatePerDay = 20;
  }

  calculateMarketPrice() {
    const supplyDemandRatio = this.stockpileUnits / (this.consumptionRatePerDay * 30 + 1);
    const dynamicPrice = Math.max(5, Math.round(this.basePriceCredits / Math.sqrt(supplyDemandRatio)));
    return dynamicPrice;
  }

  simulateDailyCycle() {
    this.stockpileUnits += this.productionRatePerDay - this.consumptionRatePerDay;
    return {
      system: this.starSystem,
      commodity: this.commodity,
      currentStockpile: this.stockpileUnits,
      marketPrice: this.calculateMarketPrice()
    };
  }

  executeTrade(volumeUnits, tradeType = 'BUY') {
    const price = this.calculateMarketPrice();
    if (tradeType === 'BUY') {
      if (this.stockpileUnits < volumeUnits) return { success: false, reason: 'Insufficient local supply' };
      this.stockpileUnits -= volumeUnits;
      return { success: true, totalCredits: price * volumeUnits, volume: volumeUnits };
    } else {
      this.stockpileUnits += volumeUnits;
      return { success: true, totalCredits: price * volumeUnits, volume: volumeUnits };
    }
  }
}

module.exports = { EpsilonEridaniHelium3Exchange };
