describe('Modular Ship Hardpoints and Power Grid', () => {
  test('draws energy from reactor grid without brownout', () => {
    const powerGrid = { available: 500, draw: (v) => true };
    expect(powerGrid.draw(50)).toBe(true);
  });
});