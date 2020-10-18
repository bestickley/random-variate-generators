import { RandVarGen } from ".";

describe("exponential", () => {
  test("lambda = 1", () => {
    const rvg = new RandVarGen();
    expect(rvg.exponential(1)).toBe(1.5404234220794728);
  });
  test("lambda = 0", () => {
    const rvg = new RandVarGen();
    expect(() => rvg.exponential(0)).toThrow();
  });
});

describe("normal", () => {
  test("mu = 1, sigma = 2", () => {
    const rvg = new RandVarGen();
    expect(rvg.normal(1, 2)).toBe(2.0176075960627617);
  });
});

describe("uniform", () => {
  test("a = 1, b = 2", () => {
    const rvg = new RandVarGen();
    expect(rvg.uniform(1, 2)).toBe(1.2142903469502926);
  });
});

describe("weibull", () => {
  test("lambda = 1, beta = 2", () => {
    const rvg = new RandVarGen();
    expect(rvg.weibull(1, 2)).toBe(1.2411379544915515);
  });
  test("lambda = 0, beta = 2", () => {
    const rvg = new RandVarGen();
    expect(() => rvg.weibull(0, 2)).toThrow();
  });
});
