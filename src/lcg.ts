export function* lcg(
  a: number,
  seed: number,
  c: number,
  modulus: number
): Generator<number, void, unknown> {
  let value = seed;
  while (true) {
    value = (a * value + c) % modulus;
    yield value / modulus;
  }
}
