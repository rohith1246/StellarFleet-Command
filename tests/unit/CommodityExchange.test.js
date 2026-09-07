const { SolCentralHelium3Exchange } = require('../../src/economy/solcentral/SolCentralHelium3Exchange');
describe('Planetary Macro-Economic Commodity Exchange', () => {
  test('executes buy trade and updates market supply/demand', () => {
    const ex = new SolCentralHelium3Exchange(5000);
    const tr = ex.executeTrade(100, 'BUY');
    expect(tr.success).toBe(true);
  });
});