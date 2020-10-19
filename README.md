# Random Variate Generators
[![npm version](https://badge.fury.io/js/random-variate-generators.svg)](https://badge.fury.io/js/random-variate-generators) [![ci Actions Status](https://github.com/bestickley/random-variate-generators/workflows/ci/badge.svg)](https://github.com/bestickley/random-variate-generators/actions) [![Codecov Coverage](https://img.shields.io/codecov/c/github/bestickley/random-variate-generators/main.svg?style=flat-square)](https://codecov.io/gh/bestickley/random-variate-generators/) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

## Install
`npm install random-variate-generators`

## Use
```ts
import { RandVarGen } from "random-variate-generators";
const rvg = RandVarGen();
rvg.bernoulli(.4);
rvg.binomial(.4, 3);
rvg.exponential(1);
rvg.geometric(.4);
rvg.gamma(.8, 4);
rvg.normal(1, 2);
rvg.poisson(1);
rvg.triangular(0, 1, 2);
rvg.uniform(1, 2);
rvg.weibull(1, 2);
```

## Customize Random Uniform Generator
Each random variate generator depends on an internal random Uniform(0,1) generator. By default, a [linear congruential generator](https://en.wikipedia.org/wiki/Linear_congruential_generator) is used with the parameters: a=1664525 (multiplier), x0=123456789 (seed), c=1013904223 (increment), m=2^32 (modulus). You can customize the random uniform generator as shown below:
```ts
import { RandVarGen } from "random-variate-generators";
// customize lcg seed
const rvgCustomLcgSeed = new RandVarGen(987654321);
// customize lcg params
const rvgCustomLcgParams = new RandVarGen(22695477, 987654321, 1, 2**32);
// customize generator
function* customGenerator() {
  yield Math.random();
}
const customGen = customGenerator();
const rvgCustomGenerator = new RandVarGen(customGen);
```

## Learn The Math
Credit goes to Dr. Goldsman's [Random Variate Generation Slides](https://www2.isye.gatech.edu/~sman/courses/6644/Module07-RandomVariateGenerationSlides_171116.pdf) for the math behind `random-variate-generators`