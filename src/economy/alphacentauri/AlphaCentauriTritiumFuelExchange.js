/**
 * AlphaCentauriTritiumFuelExchange.js - Planetary Commodity Trade & Supply Chain Model: AlphaCentauri -> TritiumFuel.
 */

class AlphaCentauriTritiumFuelExchange {
  constructor(initialStockpile = 1250) {
    this.starSystem = 'AlphaCentauri';
    this.commodity = 'TritiumFuel';
    this.stockpileUnits = initialStockpile;
    this.basePriceCredits = 75;
    this.productionRatePerDay = 35;
    this.consumptionRatePerDay = 28;
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

module.exports = { AlphaCentauriTritiumFuelExchange };
