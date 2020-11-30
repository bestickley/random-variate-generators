# Random Variate Generators

[![npm version](https://badge.fury.io/js/random-variate-generators.svg)](https://badge.fury.io/js/random-variate-generators) [![ci Actions Status](https://github.com/bestickley/random-variate-generators/workflows/ci/badge.svg)](https://github.com/bestickley/random-variate-generators/actions) [![Codecov Coverage](https://img.shields.io/codecov/c/github/bestickley/random-variate-generators/main.svg?style=flat-square)](https://codecov.io/gh/bestickley/random-variate-generators/) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

## Install

`npm install random-variate-generators`

## Use

```ts
import { RandVarGen } from "random-variate-generators";
const rvg = new RandVarGen();
// Bernoulli(p)
rvg.bernoulli(0.4);
// Binomial(p, n)
rvg.binomial(0.4, 3);
// Exponential(λ)
rvg.exponential(1);
// Erlang(λ, n)
rvg.erlang(1, 2);
// Gamma(β, λ)
rvg.gamma(0.8, 4);
// Geometric(p)
rvg.geometric(0.4);
// Normal(μ, σ^2)
rvg.normal(1, 2);
// Poisson(λ)
rvg.poisson(1);
// Triangular(min, mode, max)
rvg.triangular(0, 1, 2);
// Uniform(min, max)
rvg.uniform(1, 2);
// Weibull(λ, β)
rvg.weibull(1, 2);

// If you already have a uniform you want to use, you can pass it as a parameter to most of the functions above, like so:
const PRN = 0.523;
rvg.normal(1, 2, 0.523);
// You may want to do this if you have your own list of uniforms you have already tested to be uniform & independent according to the GOF and runs test below.
// Otherwise, a PRN is generated on the fly.
```

## Customize Random Uniform Generator

Each random variate generator depends on an internal random Uniform(0,1) generator. By default, a [linear congruential generator](https://en.wikipedia.org/wiki/Linear_congruential_generator) is used with the parameters: a=1664525 (multiplier), x0=123456789 (seed), c=1013904223 (increment), m=2^32 (modulus). You can customize the random uniform generator as shown below:

```ts
import { RandVarGen } from "random-variate-generators";
// Option 1: customize lcg seed
const rvgCustomLcgSeed = new RandVarGen({ lcgSeed: 987654321 });
// Option 2: customize lcg params
const rvgCustomLcgParams = new RandVarGen(22695477, 987654321, 1, 2 ** 32);
// Option 3: customize generator
function* customGenerator() {
  yield Math.random();
}
const customGen = customGenerator();
const rvgCustomGenerator = new RandVarGen(customGen);
```

## Test PRNs for Uniformity and Independence

You can test any list of PRNs (using the LCG, a custom generator, or even Math.random()) for uniformity (chi squared goodness of fit test) and independence (runs test). If they pass both tests, you can use them as uniforms with the Confidence Interval you specify.

### Chi Squared Goodness of Fit Test

Accepts three parameters: data // confidence interval (0.995 0.99 0.975 0.95 0.90) // k (number of "buckets")
Returns three values: fail to reject ("accept")/reject (1 or 0) // chi squared value at alpha (1 - confidence interval), k-1 from table // actual chi value

### Runs Test

Accepts two parameters: data // confidence interval (0.8, 0.9, 0.95, 0.98, 0.99, 0.999)
Returns three values: fail to reject ("accept")/reject (1 or 0) // z score at given confidence interval // absolute value of actual z score

```ts
import { RandVarGen } from "random-variate-generators";
const rvg = new RandVarGen();

let PRN_chi = [];
for (var i = 0; i < 1000; i++) {
  if (i < 179) {
    PRN_chi.push(0.1);
  } else if (i < 387) {
    PRN_chi.push(0.3);
  } else if (i < 609) {
    PRN_chi.push(0.5);
  } else if (i < 808) {
    PRN_chi.push(0.7);
  } else if (i < 1000) {
    PRN_chi.push(0.9);
  }
}
rvg.chiSquaredGOF(PRN_chi, 0.95, 5); // returns [1, 9.488, 5.27]

PRN_runs = [
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
rvg.runsTest(PRN_runs, 0.95); // returns [0, 1.96, 3.424]
```

## Learn The Math

Credit goes to Dr. Goldsman's [Random Variate Generation Slides](https://www2.isye.gatech.edu/~sman/courses/6644/Module07-RandomVariateGenerationSlides_171116.pdf) for the math behind `random-variate-generators`
