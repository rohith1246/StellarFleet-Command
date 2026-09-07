/**
 * PolarisVaultMedicalStasisGelExchange.js - Planetary Commodity Trade & Supply Chain Model: PolarisVault -> MedicalStasisGel.
 */

class PolarisVaultMedicalStasisGelExchange {
  constructor(initialStockpile = 4150) {
    this.starSystem = 'PolarisVault';
    this.commodity = 'MedicalStasisGel';
    this.stockpileUnits = initialStockpile;
    this.basePriceCredits = 410;
    this.productionRatePerDay = 25;
    this.consumptionRatePerDay = 44;
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

module.exports = { PolarisVaultMedicalStasisGelExchange };
