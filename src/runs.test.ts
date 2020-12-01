import { runsTest } from "./runs";

describe("runsTest", () => {
  let data: Array<number>;
  beforeEach(() => {
    data = [
      0.79,
      0.68,
      0.46,
      0.69,
      0.9,
      0.93,
      0.99,
      0.86,
      0.33,
      0.22,
      0.6,
      0.18,
      0.59,
      0.38,
      0.69,
      0.76,
      0.91,
      0.62,
      0.22,
      0.19,
      0.11,
      0.45,
      0.72,
      0.88,
      0.65,
      0.55,
      0.31,
      0.27,
      0.46,
      0.89,
    ];
  });
  test("expected: Nor(19.67, 5.01) with Za/2 = 1.96", () => {
    expect(runsTest(data, 0.95)).toStrictEqual([0, 1.96, 3.424]);
  });
});
