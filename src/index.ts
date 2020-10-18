function* lcg(modulus: number, a: number, c: number, seed: number) {
  let value = seed;
  while (true) {
    value = (a * value + c) % modulus;
    yield value;
  }
}

interface RandVarGenConstructorParams {
  customRandNumGen?: Generator<number, void, unknown>
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
      this.randNumGen = lcg(2**32, 1664525, 1013904223, params.lcgSeed);
    }
  }

  // Default Random Number Generator is a Linear Congruential Generator
  randNumGen: Generator<number, void, unknown> = lcg(2**32, 1664525, 1013904223, 123456789)

  get random(): number {
    const iterResult = this.randNumGen.next();
    if (!iterResult.done) {
      return iterResult.value;
    } else {
      throw new Error("Random Number Generator failed to yield a random number");
    }
  }

  exponential(lambda: number) {
    return (-1 / lambda) * Math.log(this.random);
  }
}
