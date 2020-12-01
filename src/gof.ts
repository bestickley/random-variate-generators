import { chiSquareTable } from "./chiSquareTable";

const acceptedCI = [0.995, 0.99, 0.975, 0.95, 0.9];

export function chiSquareGOF(
  PRNs: Array<number>,
  confidenceInterval = 0.9,
  k = 10
): Array<number> {
  const CI = Math.round(confidenceInterval * 100) / 100;
  if (acceptedCI.indexOf(CI) < 0)
    throw new Error(
      `confidence interval can only be: 0.995	0.99	0.975	0.95	0.90,	your CI is ${confidenceInterval}`
    );
  if (k > 30 || k < 1) throw new Error(`k can only be between 1-30`);
  const table: { [name: number]: number[] } = {};
  for (let idx = 0; idx < k; idx++) {
    table[idx] = [];
  }
  const bucketSize = 1 / k;
  const n = PRNs.length;
  PRNs.forEach((PRN) => {
    const key = Math.floor(PRN / bucketSize);
    table[key].push(PRN);
  });
  const expected = n / k;
  let chiSquareSum = 0;
  Object.keys(table).forEach((key) => {
    const observed = table[Number(key)].length;
    chiSquareSum += (observed - expected) ** 2 / expected;
  });
  chiSquareSum = Math.floor(chiSquareSum * 1000) / 1000;
  return chiSquareThreshold(CI, k, chiSquareSum);
}
function chiSquareThreshold(
  CI: number,
  k: number,
  chiVal: number
): Array<number> {
  const column = chiSquareTable[0].length - 1 - acceptedCI.indexOf(CI);
  const row = k - 2; // -1 for degrees of freedom, -1 for for zero-indexed
  const chiThreshold = chiSquareTable[row][column];
  return [chiThreshold >= chiVal ? 1 : 0, chiThreshold, chiVal];
}
