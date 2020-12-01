import { lcg } from "./lcg";
import { chiSquareGOF } from "./gof";
import {runsTest } from "./runs";

interface RandVarGenConstructorParams {
  customRandNumGen?: Generator<number, void, unknown>;
  lcgParams?: [number, number, number, number];
  lcgSeed?: number;
  uniform?: number;
  uniforms?: number[];
}

function* simpleNumberGenerator(uniforms: number[]) {
  for (const u of uniforms) {
    yield u;
  }
}
export class RandVarGen {
  constructor(params?: RandVarGenConstructorParams) {
    this.configurePrnGenerator(params);
  }

  // Default Pseudo Random Number Generator is a Linear Congruential Generator
  prnGenerator: Generator<number, void, unknown> = lcg(
    1664525,
    123456789,
    1013904223,
    2 ** 32
  );

  configurePrnGenerator(params?: RandVarGenConstructorParams): void {
    if (params?.customRandNumGen) {
      this.prnGenerator = params.customRandNumGen;
    } else if (params?.lcgParams) {
      this.prnGenerator = lcg(...params.lcgParams);
    } else if (params?.lcgSeed) {
      this.prnGenerator = lcg(1664525, params.lcgSeed, 1013904223, 2 ** 32);
    } else if (params?.uniform) {
      this.prnGenerator = simpleNumberGenerator([params.uniform]);
    } else if (params?.uniforms) {
      this.prnGenerator = simpleNumberGenerator(params.uniforms);
    }
  }

  get u(): number {
    const iterResult = this.prnGenerator.next();
    if (!iterResult.done) {
      return iterResult.value;
    } else {
      throw new Error(
        "Pseudo-Random Number Generator failed to yield a random number"
      );
    }
  }
  /**
   * Random Bernoulli Generator by Inverse Transform Method
   * @param p
   * @param uniform - specified uniform to use
   */
  bernoulli(p: number, uniform?: number): number {
    if (uniform) this.configurePrnGenerator({ uniform });
    if (p < 0 || p > 1) throw new Error("0 <= p <= 1");
    return this.u <= 1 - p ? 0 : 1;
  }
  /**
   * Random Binomial Generator by Convolution Method
   * @param p
   * @param n
   * @param uniform - specified uniform to use
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
   * Random Erlang Generator by Convolution Method
   * @param lambda
   * @param n
   * @param uniform - specified uniform to use
   */
  erlang(lambda: number, n: number, uniform?: number): number {
    if (uniform) this.configurePrnGenerator({ uniform });
    if (lambda <= 0) throw new Error("lambda > 0");
    const product = Array.from(Array(n).keys())
      .map((n) => n + 1)
      .reduce((prev) => prev * this.u, 1);
    return (-1 / lambda) * Math.log(product);
  }
  /**
   * Random Exponential Generator by Inverse Transform Method
   * @param lambda
   * @param uniform - specified uniform to use
   */
  exponential(lambda: number, uniform?: number): number {
    if (uniform) this.configurePrnGenerator({ uniform });
    if (lambda <= 0) throw new Error("lambda > 0");
    return (-1 / lambda) * Math.log(this.u);
  }
  /**
   * Random Gamma Generator by X
   * @param lambda
   */
  gamma(beta: number, lambda: number, uniforms?: number[]): number {
    if (uniforms) this.configurePrnGenerator({ uniforms });
    if (beta < 1) {
      const b = (Math.E + beta) / Math.E;
      while (true) {
        const w = b * this.u;
        const v = this.u;
        if (w < 1) {
          const y = w ** (1 / beta);
          if (v <= Math.E ** -y) return y / lambda;
        } else {
          const y = -1 * Math.log((b - w) / beta);
          if (v <= y ** (beta - 1)) return y / lambda;
        }
      }
    } else {
      const a = (2 * beta - 1) ** (1 / 2);
      const b = beta - Math.log(4);
      const c = beta + a ** -1;
      const d = 1 + Math.log(4.5);
      while (true) {
        const u1 = this.u;
        const u2 = this.u;
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
   * @param uniform - specified uniform to use
   */
  geometric(p: number, uniform?: number): number {
    if (uniform) this.configurePrnGenerator({ uniform });
    const u = this.u;
    if (p < 0 || p > 1) throw new Error("0 <= p <= 1");
    return Math.ceil(Math.log(u) / Math.log(1 - p));
  }
  /**
   * Random Normal Generator by X
   * @param mu mean
   * @param sigma standard deviation
   * @param uniform - specified uniform to use
   */
  normal(mu: number, sigmaSquared: number, uniform?: number): number {
    if (uniform) this.configurePrnGenerator({ uniform });
    const u = this.u;
    let sign = 0;
    if (u - 0.5 > 0) {
      sign = 1;
    } else if (u - 0.5 < 0) {
      sign = -1;
    }
    const t = Math.sqrt(Math.log(Math.min(u, 1 - u)) ** 2);
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
   * @param uniform - specified uniform to use
   */
  poisson(lambda: number, uniform?: number): number {
    if (uniform) this.configurePrnGenerator({ uniform });
    const a = Math.E ** (-1 * lambda);
    let p = 1;
    let x = -1;
    while (p >= a) {
      p *= this.u;
      x += 1;
    }
    return x;
  }
  /**
   * Random Triangular Generator by Inverse Transform Method
   * @param a minimum
   * @param c mode
   * @param b maximum
   */
  triangular(a: number, c: number, b: number, uniform?: number): number {
    if (uniform) this.configurePrnGenerator({ uniform });
    if (b <= a) throw new Error("a > b");
    const cutOff = (c - a) / (b - a);
    const u = this.u;
    if (u < cutOff) {
      return a + Math.sqrt((b - a) * (c - a) * u);
    } else {
      return b - Math.sqrt((b - a) * (b - c) * (1 - u));
    }
  }
  /**
   * Random Uniform Generator by Inverse Transform Method
   * @param a min
   * @param b max
   */
  uniform(a: number, b: number, uniform?: number): number {
    if (uniform) this.configurePrnGenerator({ uniform });
    return a + (b - a) * this.u;
  }
  /**
   * Random Weibul Generator by Inverse Transform Method
   * @param lambda
   * @param beta
   */
  weibull(lambda: number, beta: number, uniform?: number): number {
    if (uniform) this.configurePrnGenerator({ uniform });
    if (lambda <= 0) throw new Error("lambda > 0");
    return (1 / lambda) * (-1 * Math.log(this.u)) ** (1 / beta);
  }
}

export {chiSquareGOF, runsTest};