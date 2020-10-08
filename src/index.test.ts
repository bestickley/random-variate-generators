import { getRandomNumber } from ".";

describe("getRandomNumber", () => {
  test("gets value of type number", () => {
    const num = getRandomNumber();
    expect(typeof num).toBe("number");
  })
  
  test("gets value greater than 0", () => {
    const num = getRandomNumber();
    expect(num).toBeGreaterThan(0)
  })
  
  test("gets value less than 1", () => {
    const num = getRandomNumber();
    expect(num).toBeLessThan(1)
  })

});