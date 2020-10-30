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
