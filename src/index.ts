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

  get random(): number {
    const iterResult = this.randNumGen.next();
    if (!iterResult.done) {
      return iterResult.value;
    } else {
      throw new Error(
        "Random Number Generator failed to yield a random number"
      );
    }
  }

  exponential(lambda: number): number {
    if (lambda <= 0) throw new Error("lambda > 0");
    return (-1 / lambda) * Math.log(this.random);
  }
  normal(mu: number, sigma: number): number {
    const rand = this.random;
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
  uniform(a: number, b: number): number {
    return a + (b - a) * this.random;
  }
  weibull(lambda: number, beta: number): number {
    if (lambda <= 0) throw new Error("lambda > 0");
    return (1 / lambda) * (-1 * Math.log(this.random)) ** (1 / beta);
  }
}
