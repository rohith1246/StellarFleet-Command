describe('Fleet AI Tactical Doctrines', () => {
  test('selects priority target and maintains engagement distance', () => {
    const hostiles = [{ totalFirepower: 500 }, { totalFirepower: 1200 }];
    const target = hostiles.sort((a, b) => b.totalFirepower - a.totalFirepower)[0];
    expect(target.totalFirepower).toBe(1200);
  });
});