// ROW
// degrees of freedom, 1...30

// COLUMN
// The areas given across the top are the areas to the right of the critical value.
// To look up an area on the left, subtract it from one, and then look it up (ie: 0.05 on the left is 0.95 on the right)
// columns represent: 0.995	0.99	0.975	0.95	0.90	0.10	0.05	0.025	0.01	0.005

// table from: https://people.richland.edu/james/lecture/m170/tbl-chi.html

const acceptedAlphas = [0.995, 0.99, 0.975, 0.95, 0.90, 0.10, 0.05, 0.025, 0.01, 0.005]

const chiTable = [
  [0, 0, 0.001, 0.004, 0.016, 2.706, 3.841, 5.024, 6.635, 7.879],
  [0.01, 0.02, 0.051, 0.103, 0.211, 4.605, 5.991, 7.378, 9.21, 10.597],
  [0.072, 0.115, 0.216, 0.352, 0.584, 6.251, 7.815, 9.348, 11.345, 12.838],
  [0.207, 0.297, 0.484, 0.711, 1.064, 7.779, 9.488, 11.143, 13.277, 14.86],
  [0.412, 0.554, 0.831, 1.145, 1.61, 9.236, 11.07, 12.833, 15.086, 16.75],
  [0.676, 0.872, 1.237, 1.635, 2.204, 10.645, 12.592, 14.449, 16.812, 18.548],
  [0.989, 1.239, 1.69, 2.167, 2.833, 12.017, 14.067, 16.013, 18.475, 20.278],
  [1.344, 1.646, 2.18, 2.733, 3.49, 13.362, 15.507, 17.535, 20.09, 21.955],
  [1.735, 2.088, 2.7, 3.325, 4.168, 14.684, 16.919, 19.023, 21.666, 23.589],
  [2.156, 2.558, 3.247, 3.94, 4.865, 15.987, 18.307, 20.483, 23.209, 25.188],
  [2.603, 3.053, 3.816, 4.575, 5.578, 17.275, 19.675, 21.92, 24.725, 26.757],
  [3.074, 3.571, 4.404, 5.226, 6.304, 18.549, 21.026, 23.337, 26.217, 28.3],
  [3.565, 4.107, 5.009, 5.892, 7.042, 19.812, 22.362, 24.736, 27.688, 29.819],
  [4.075, 4.66, 5.629, 6.571, 7.79, 21.064, 23.685, 26.119, 29.141, 31.319],
  [4.601, 5.229, 6.262, 7.261, 8.547, 22.307, 24.996, 27.488, 30.578, 32.801],
  [5.142, 5.812, 6.908, 7.962, 9.312, 23.542, 26.296, 28.845, 32, 34.267],
  [5.697, 6.408, 7.564, 8.672, 10.085, 24.769, 27.587, 30.191, 33.409, 35.718],
  [6.265, 7.015, 8.231, 9.39, 10.865, 25.989, 28.869, 31.526, 34.805, 37.156],
  [6.844, 7.633, 8.907, 10.117, 11.651, 27.204, 30.144, 32.852, 36.191, 38.582],
  [7.434, 8.26, 9.591, 10.851, 12.443, 28.412, 31.41, 34.17, 37.566, 39.997],
  [8.034, 8.897, 10.283, 11.591, 13.24, 29.615, 32.671, 35.479, 38.932, 41.401],
  [8.643, 9.542, 10.982, 12.338, 14.041, 30.813, 33.924, 36.781, 40.289, 42.796],
  [9.26, 10.196, 11.689, 13.091, 14.848, 32.007, 35.172, 38.076, 41.638, 44.181],
  [9.886, 10.856, 12.401, 13.848, 15.659, 33.196, 36.415, 39.364, 42.98, 45.559],
  [10.52, 11.524, 13.12, 14.611, 16.473, 34.382, 37.652, 40.646, 44.314, 46.928],
  [11.16, 12.198, 13.844, 15.379, 17.292, 35.563, 38.885, 41.923, 45.642, 48.29],
  [11.808, 12.879, 14.573, 16.151, 18.114, 36.741, 40.113, 43.195, 46.963, 49.645],
  [12.461, 13.565, 15.308, 16.928, 18.939, 37.916, 41.337, 44.461, 48.278, 50.993],
  [13.121, 14.256, 16.047, 17.708, 19.768, 39.087, 42.557, 45.722, 49.588, 52.336],
  [13.787, 14.953, 16.791, 18.493, 20.599, 40.256, 43.773, 46.979, 50.892, 53.672]
];

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

  genUniform(): number {
    const iterResult = this.randNumGen.next();
    if (!iterResult.done) {
      return iterResult.value;
    } else {
      throw new Error(
        "Random Number Generator failed to yield a random number"
      );
    }
  }
  /**
   * Random Bernoulli Generator by Inverse Transform Method
   * @param p
   */
  bernoulli(p: number, uniform: number=this.genUniform()): number {
    if (p < 0 || p > 1) throw new Error("0 <= p <= 1");
    return uniform <= 1 - p ? 0 : 1;
  }
  /**
   * Random Binomial Generator by Convolution Method
   * @param p
   * @param n
   */
  binomial(p: number, n: number): number {
    if (p < 0 || p > 1) throw new Error("0 <= p <= 1");
    if (n <= 0) throw new Error("n > 0");
    let sum = 0;
    Array.from(Array(n).keys()).forEach(() => {
      sum += this.bernoulli(p);
    });
    return sum;
  }

  /**
   * Chi-Squared GOF Test
   * @param uniforms list
   * @param confidenceInterval is the confidence interval, accepted values: 0.995	0.99	0.975	0.95	0.90	0.10	0.05	0.025	0.01	0.005 (single tail test)
   */

  chiSquaredGOF(uniforms: Array<number>, confidenceInterval: number=0.9, k: number=10): boolean {
    const alpha = Math.round((1-confidenceInterval)*100)/100
    if (acceptedAlphas.indexOf(alpha) < 0) throw new Error(`alpha can only be: 0.995	0.99	0.975	0.95	0.90	0.10	0.05	0.025	0.01	0.005 your alpha is ${alpha}`);
    if (k>30 || k<1) throw new Error(`k can only be between 1-30`)
    let table: { [name: number]: number[] } = {};

    for (var idx = 0; idx < k; idx++) {
      table[idx] = []
    }

    const bucketSize = 1/k;

    const n = uniforms.length

    uniforms.forEach(unif => {
      const key = Math.floor(unif/bucketSize)
      table[key].push(unif)
    })

    const expected = n/k
    let chiSquareSum = 0;

    Object.keys(table).forEach(key => {
      const observed = table[Number(key)].length
      chiSquareSum+=((observed - expected)**2)/expected
    });
    return this.chiThreshold(alpha, k, chiSquareSum);
  }

  chiThreshold(alpha: number, k: number, chiVal: number): boolean {

    const column = acceptedAlphas.indexOf(alpha)
    const row = k-2 // -1 for degrees of freedom, -1 for for zero-indexed

    let chiThreshold = chiTable[row][column]

    return chiThreshold >= chiVal
  }

  /**
   * Random Erlang Generator by Convolution Method
   * @param lambda
   * @param n
   */
  erlang(lambda: number, n: number, uniform: number=this.genUniform()): number {
    if (lambda <= 0) throw new Error("lambda > 0");
    const product = Array.from(Array(n).keys())
      .map((n) => n + 1)
      .reduce((prev) => prev * uniform, 1);
    return (-1 / lambda) * Math.log(product);
  }
  /**
   * Random Exponential Generator by Inverse Transform Method
   * @param lambda
   */
  exponential(lambda: number, uniform: number=this.genUniform()): number {
    if (lambda <= 0) throw new Error("lambda > 0");
    return (-1 / lambda) * Math.log(uniform);
  }
  /**
   * Random Gamma Generator by X
   * @param lambda
   */
  gamma(beta: number, lambda: number, u1: number=this.genUniform(), u2: number=this.genUniform()): number {
    if (beta < 1) {
      const b = (Math.E + beta) / Math.E;
      while (true) {
        const w = b * u1;
        if (w < 1) {
          const y = w ** (1 / beta);
          if (u2 <= Math.E ** -y) return y / lambda;
        } else {
          const y = -1 * Math.log((b - w) / beta);
          if (u2 <= y ** (beta - 1)) return y / lambda;
        }
      }
    } else {
      const a = (2 * beta - 1) ** (1 / 2);
      const b = beta - Math.log(4);
      const c = beta + a ** -1;
      const d = 1 + Math.log(4.5);
      while (true) {
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
  /**
   * Random Geometric Generator by Inverse Transform Method
   * @param p
   */
  geometric(p: number, uniform: number=this.genUniform()): number {
    if (p < 0 || p > 1) throw new Error("0 <= p <= 1");
    return Math.ceil(Math.log(uniform) / Math.log(1 - p));
  }
  /**
   * Random Normal Generator by X
   * @param mu mean
   * @param sigma standard deviation
   */
  normal(mu: number, sigmaSquared: number, uniform: number=this.genUniform()): number {
    let sign = 0;
    if (uniform - 0.5 > 0) {
      sign = 1;
    } else if (uniform - 0.5 < 0) {
      sign = -1;
    }
    const t = Math.sqrt(Math.log(Math.min(uniform, 1 - uniform)) ** 2);
    const c0 = 2.515517,
      c1 = 0.802853,
      c2 = 0.010328,
      d1 = 1.432788,
      d2 = 0.189269,
      d3 = 0.001308;
    const z =
      sign *
      (t -
        (c0 + c1 * t + c2 * t ** 2) / (1 + d1 * t + d2 * t ** 2 + d3 * t ** 3));
    return mu + Math.sqrt(sigmaSquared) * z;
  }
  /**
   * Random Poisson Generator by X
   * @param lambda
   */
  poisson(lambda: number, uniform: number=this.genUniform()): number {
    const a = Math.E ** (-1 * lambda);
    let p = 1;
    let x = -1;
    while (p >= a) {
      p *= uniform;
      x += 1;
    }
    return x;
  }

  /**
   * Random Triangular Generator by Inverse Transform Method
   * @param uniforms list of uniforms
   * @param confidenceInterval for two-sided tail test, accepted values are: 0.
   */
  runTest(uniforms: Array<number>, confidenceInterval: number=0.9): boolean {
    let n = uniforms.length
    const CIlist = [0.8, 0.8, 0.95, 0.98, 0.99, 0.999]
    const zVal = [1.28, 1.645, 1.96, 2.33, 2.575, 3.29]

    if (CIlist.indexOf(confidenceInterval) < 0) throw new Error("Confidence Interval must be one of the following: 0.8, 0.9, 0.95, 0.98, 0.99, 0.999")
    if (n < 20) console.warn("Please provide a larger set of uniforms for more accurate results.")

    let runs = 0
    let firstDiff = uniforms[1]-uniforms[0]
    let currRun = Math.sign(firstDiff)

    for (var idx = 1; idx < uniforms.length; idx++) {
      let diff = uniforms[idx]-uniforms[idx-1]
      if (diff > 0 && currRun===-1) {
        runs+=1
        currRun=1
      } else if (diff < 0 && currRun===1) {
        runs+=1
        currRun=-1
      }
    }
    const mean = ((2*n)-1)/3
    const variance = ((16*n)-29)/90

    let z0 = Math.abs((runs-mean)/Math.sqrt(variance))
    let i = CIlist.indexOf(confidenceInterval)
    let zAlpha = zVal[i]

    return zAlpha > z0
  }

  /**
   * Random Triangular Generator by Inverse Transform Method
   * @param a minimum
   * @param c mode
   * @param b maximum
   */
  triangular(a: number, c: number, b: number, uniform: number=this.genUniform()): number {
    if (b <= a) throw new Error("a > b");
    const cutOff = (c - a) / (b - a);
    if (uniform < cutOff) {
      return a + Math.sqrt((b - a) * (c - a) * uniform);
    } else {
      return b - Math.sqrt((b - a) * (b - c) * (1 - uniform));
    }
  }
  /**
   * Random Uniform Generator by Inverse Transform Method
   * @param a min
   * @param b max
   */
  uniform(a: number, b: number, uniform: number=this.genUniform()): number {
    return a + (b - a) * uniform;
  }
  /**
   * Random Weibul Generator by Inverse Transform Method
   * @param lambda
   * @param beta
   */
  weibull(lambda: number, beta: number, uniform: number=this.genUniform()): number {
    if (lambda <= 0) throw new Error("lambda > 0");
    return (1 / lambda) * (-1 * Math.log(uniform)) ** (1 / beta);
  }
}