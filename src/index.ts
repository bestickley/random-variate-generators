function* lcg(a: number, seed: number, c: number, modulus: number) {
  let value = seed;
  while (true) {
    value = (a * value + c) % modulus;
    yield value / modulus;
  }
}

interface RandVarGenConstructorParams {
  customRandNumGen?: Generator<number, void, unknown>;
  lcgParams?: [number, number, number, number];
  lcgSeed?: number;
}

export class RandVarGen {
  constructor(params?: RandVarGenConstructorParams) {
    if (params?.customRandNumGen) {
      this.randNumGen = params.customRandNumGen;
    } else if (params?.lcgParams) {
      this.randNumGen = lcg(...params.lcgParams);
    } else if (params?.lcgSeed) {
      this.randNumGen = lcg(1664525, params.lcgSeed, 1013904223, 2 ** 32);
    }
  }

  // Default Random Number Generator is a Linear Congruential Generator
  randNumGen: Generator<number, void, unknown> = lcg(
    1664525,
    123456789,
    1013904223,
    2 ** 32
  );

  genRandNum(): number {
    const iterResult = this.randNumGen.next();
    if (!iterResult.done) {
      return iterResult.value;
    } else {
      throw new Error(
        "Random Number Generator failed to yield a random number"
      );
    }
  }

  bernoulli(p: number): number {
    if (p < 0 || p > 1) throw new Error("0 <= p <= 1");
    return this.genRandNum() <= 1 - p ? 0 : 1;
  }
  binomial(p: number, n: number): number {
    if (p < 0 || p > 1) throw new Error("0 <= p <= 1");
    if (n <= 0) throw new Error("n > 0");
    let sum = 0;
    Array.from(Array(n).keys()).forEach(() => {
      sum += this.bernoulli(p);
    });
    return sum;
  }
  exponential(lambda: number): number {
    if (lambda <= 0) throw new Error("lambda > 0");
    return (-1 / lambda) * Math.log(this.genRandNum());
  }
  gamma(beta: number, lambda: number): number {
    if (beta < 1) {
      const b = (Math.E + beta) / Math.E;
      while (true) {
        const w = b * this.genRandNum();
        if (w < 1) {
          const y = w ** (1 / beta);
          const v = this.genRandNum();
          if (v <= Math.E ** -y) return y / lambda;
        } else {
          const y = -1 * Math.log((b - w) / beta);
          const v = this.genRandNum();
          if (v <= y ** (beta - 1)) return y / lambda;
        }
      }
    } else {
      const a = (2 * beta - 1) ** (1 / 2);
      const b = beta - Math.log(4);
      const c = beta + a ** -1;
      const d = 1 + Math.log(4.5);
      while (true) {
        const u1 = this.genRandNum();
        const u2 = this.genRandNum();
        const v = a * Math.log(u1 / (1 - u1));
        const y = beta * Math.E ** v;
        const z = u1 ** 2 * u2;
        const w = b + c * v - y;
        if (w + d - 4.5 * z >= 0) {
          return y / lambda;
        } else {
          if (w >= Math.log(z)) return y / lambda;
        }
      }
    }
  }
  geometric(p: number): number {
    if (p < 0 || p > 1) throw new Error("0 <= p <= 1");
    return Math.log(this.genRandNum()) / Math.log(1 - p);
  }
  normal(mu: number, sigma: number): number {
    const rand = this.genRandNum();
    let sign = 0;
    if (1 - rand > 0) {
      sign = 1;
    } else if (1 - rand < 0) {
      sign = -1;
    }
    const t = (Math.log(rand < 1 - rand ? rand : 1 - rand) ** 2) ** (1 / 2);
    const c0 = 2.515517;
    const c1 = 0.802853;
    const c2 = 0.010328;
    const d1 = 1.432788;
    const d2 = 0.189269;
    const d3 = 0.001308;
    const z =
      sign *
      (t -
        (c0 + c1 * t + c2 * t ** 2) / (1 + d1 * t + d2 * t ** 2 + d3 * t ** 3));
    return mu + sigma * z;
  }
  poisson(lambda: number): number {
    const a = Math.E ** (-1 * lambda);
    let p = 1;
    let x = -1;
    while (p >= a) {
      p *= this.genRandNum();
      x += 1;
    }
    return x;
  }
  uniform(a: number, b: number): number {
    return a + (b - a) * this.genRandNum();
  }
  weibull(lambda: number, beta: number): number {
    if (lambda <= 0) throw new Error("lambda > 0");
    return (1 / lambda) * (-1 * Math.log(this.genRandNum())) ** (1 / beta);
  }
}
