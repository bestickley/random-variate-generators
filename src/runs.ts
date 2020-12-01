export function runsTest(
  PRNs: Array<number>,
  confidenceInterval = 0.9
): Array<number> {
  const n = PRNs.length;
  const CIlist = [0.8, 0.8, 0.95, 0.98, 0.99, 0.999];
  const zVal = [1.28, 1.645, 1.96, 2.33, 2.575, 3.29];
  if (CIlist.indexOf(confidenceInterval) < 0)
    throw new Error(
      "Confidence Interval must be one of the following: 0.8, 0.9, 0.95, 0.98, 0.99, 0.999"
    );
  if (n < 20)
    console.warn(
      "Please provide a larger set of PRNs for more accurate results."
    );
  let runs = 1;
  const firstDiff = PRNs[1] - PRNs[0];
  let currRun = Math.sign(firstDiff);
  for (let idx = 1; idx < PRNs.length; idx++) {
    const diff = PRNs[idx] - PRNs[idx - 1];
    if (diff > 0 && currRun === -1) {
      runs += 1;
      currRun = 1;
    } else if (diff < 0 && currRun === 1) {
      runs += 1;
      currRun = -1;
    }
  }
  const mean = (2 * n - 1) / 3;
  const variance = (16 * n - 29) / 90;
  const z0 =
    Math.floor(Math.abs((runs - mean) / Math.sqrt(variance)) * 1000) / 1000;
  const i = CIlist.indexOf(confidenceInterval);
  const zAlpha = zVal[i];
  return [zAlpha > z0 ? 1 : 0, zAlpha, z0];
}
