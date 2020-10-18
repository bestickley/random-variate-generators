import { RandVarGen } from ".";

describe("exponential", () => {
  test("correct value", () => {
    const rvg = new RandVarGen();
    expect(rvg.exponential(5)).toBe(-4.128057271167756);
  })
});