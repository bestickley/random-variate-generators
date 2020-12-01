import { chiSquareGOF } from "./gof";

describe("chiSquareGOF", () => {
  let data: Array<number>;
  beforeEach(() => {
    data = [];
    for (let i = 0; i < 1000; i++) {
      if (i < 179) {
        data.push(0.1);
      } else if (i < 387) {
        data.push(0.3);
      } else if (i < 609) {
        data.push(0.5);
      } else if (i < 808) {
        data.push(0.7);
      } else if (i < 1000) {
        data.push(0.9);
      }
    }
  });
  test("expected: 0.1~179, 0.3~208, 0.5~222, 0.7~199, 0.9~192, k=5, n=1000", () => {
    expect(chiSquareGOF(data, 0.95, 5)).toStrictEqual([1, 9.488, 5.27]);
  });
  test("expected: 0.1~179, 0.3~208, 0.5~222, 0.7~199, 0.9~192, k=10, n=1000", () => {
    expect(chiSquareGOF(data, 0.9, 10)).toStrictEqual([0, 14.684, 1010.54]);
  });
});
