import { RandVarGen } from ".";

describe("bernoulli", () => {
  let rvg: RandVarGen;
  beforeEach(() => {
    rvg = new RandVarGen();
  });
  test("p = .4", () => {
    expect(rvg.bernoulli(0.4)).toBe(0);
  });
  test("p = .9", () => {
    expect(rvg.bernoulli(0.9)).toBe(1);
  });
  test("p = 1.1", () => {
    expect(() => rvg.bernoulli(1.1)).toThrow();
  });
  test("p = -0.1", () => {
    expect(() => rvg.bernoulli(-0.1)).toThrow();
  });
});

describe("binomial", () => {
  let rvg: RandVarGen;
  beforeEach(() => {
    rvg = new RandVarGen();
  });
  test("n = 2, p = .4", () => {
    expect(rvg.binomial(0.4, 2)).toBe(1);
  });
  test("n = 3, p = .9", () => {
    expect(rvg.binomial(0.9, 3)).toBe(3);
  });
  test("n = 4, p = 1.1", () => {
    expect(() => rvg.binomial(1.1, 4)).toThrow();
  });
  test("n = -5, p = 0.1", () => {
    expect(() => rvg.binomial(0.1, -5)).toThrow();
  });
});

describe("chiSquaredGOF", () => {
  let rvg: RandVarGen;
  let data: Array<number>;
  beforeEach(() => {
    rvg = new RandVarGen();
    data = []
    for (var i = 0; i < 1000; i++) {
      if (i<179) {
        data.push(0.1)
      } else if (i < 387) {
        data.push(0.3)
      } else if (i < 609) {
        data.push(0.5)
      } else if (i < 808) {
        data.push(0.7)
      } else if (i < 1000) {
        data.push(0.9)
      }
    }
  });
  test("expected: 0.1~179, 0.3~208, 0.5~222, 0.7~199, 0.9~192, k=5, n=1000", () => {
    expect(rvg.chiSquaredGOF(data, 0.95, 5)).toBe([1, 9.488, 5.27]);
  });
  test("expected: 0.1~179, 0.3~208, 0.5~222, 0.7~199, 0.9~192, k=10, n=1000", () => {
    expect(rvg.chiSquaredGOF(data, 0.90, 10)).toBe([0, 16.919, 1010.54]);
  });
});

describe("exponential", () => {
  let rvg: RandVarGen;
  beforeEach(() => {
    rvg = new RandVarGen();
  });
  test("lambda = 1", () => {
    expect(rvg.exponential(1)).toBe(1.5404234220794728);
  });
  test("lambda = 0", () => {
    expect(() => rvg.exponential(0)).toThrow();
  });
});

describe("erlang", () => {
  let rvg: RandVarGen;
  beforeEach(() => {
    rvg = new RandVarGen();
  });
  test("lambda = 1", () => {
    expect(rvg.erlang(1, 2)).toBe(1.6730119352250947);
  });
  test("lambda = 0, n = 5", () => {
    expect(() => rvg.erlang(0, 3)).toThrow();
  });
});

describe("geometric", () => {
  let rvg: RandVarGen;
  beforeEach(() => {
    rvg = new RandVarGen();
  });
  test("p = .4", () => {
    expect(rvg.geometric(0.4)).toBe(4);
  });
  test("p = 1.1", () => {
    expect(() => rvg.bernoulli(1.1)).toThrow();
  });
  test("p = -0.1", () => {
    expect(() => rvg.bernoulli(-0.1)).toThrow();
  });
});

describe("gamma", () => {
  let rvg: RandVarGen;
  beforeEach(() => {
    rvg = new RandVarGen();
  });
  test("beta = .8, lambda = 4", () => {
    expect(rvg.gamma(0.8, 4)).toBe(0.153993173103836);
  });
  test("beta = 3, lambda = 2", () => {
    expect(rvg.gamma(3, 2)).toBe(1.86514961062751);
  });
});

describe("normal", () => {
  let rvg: RandVarGen;
  beforeEach(() => {
    rvg = new RandVarGen();
  });
  test("mu = 1, sigma = 2", () => {
    expect(rvg.normal(1, 2)).toBe(0.28044276823708003);
  });
});

describe("poisson", () => {
  let rvg: RandVarGen;
  beforeEach(() => {
    rvg = new RandVarGen();
  });
  test("lambda = 1", () => {
    expect(rvg.poisson(1)).toBe(0);
  });
  test("lambda = 5", () => {
    expect(rvg.poisson(5)).toBe(6);
  });
});

describe("runsTest", () => {
  let rvg: RandVarGen;
  let data: Array<number>;
  beforeEach(() => {
    rvg = new RandVarGen();
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
      0.89
    ];
  });
  test("expected: Nor(19.67, 5.01) with Za/2 = 1.96", () => {
    expect(rvg.runsTest(data, 0.95)).toBe([0, 1.96, 3.424]);
  });
});

describe("triangular", () => {
  let rvg: RandVarGen;
  beforeEach(() => {
    rvg = new RandVarGen();
  });
  test("a = 1, b = 2", () => {
    expect(rvg.triangular(0, 1, 2)).toBe(0.6546607471817637);
  });
  test("a = 1, b = 2", () => {
    expect(() => rvg.triangular(2, 1, 0)).toThrow();
  });
});

describe("uniform", () => {
  let rvg: RandVarGen;
  beforeEach(() => {
    rvg = new RandVarGen();
  });
  test("a = 1, b = 2", () => {
    expect(rvg.uniform(1, 2)).toBe(1.2142903469502926);
  });
});

describe("weibull", () => {
  let rvg: RandVarGen;
  beforeEach(() => {
    rvg = new RandVarGen();
  });
  test("lambda = 1, beta = 2", () => {
    expect(rvg.weibull(1, 2)).toBe(1.2411379544915515);
  });
  test("lambda = 0, beta = 2", () => {
    expect(() => rvg.weibull(0, 2)).toThrow();
  });
});
