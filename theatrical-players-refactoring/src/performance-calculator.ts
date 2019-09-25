export abstract class PerformanceCalculator {
  abstract calculatePerformanceAmount(performance: Performance): number;

  public calculatePerformanceVolumeCredits(performance: Performance): number {
    let volumeCredits = 0;
    volumeCredits += Math.max(performance.audience - 30, 0);
    return volumeCredits;
  }
}

export class ComedyPerformanceCalculator extends PerformanceCalculator {
  calculatePerformanceAmount(performance: Performance): number {
    let amount = 300_00;
    if (performance.audience > 20) {
      amount += 100_00 + 5_00 * (performance.audience - 20);
    }
    amount += 3_00 * performance.audience;
    return amount;
  }

  calculatePerformanceVolumeCredits(performance: Performance) {
    return (
      super.calculatePerformanceVolumeCredits(performance) + Math.floor(performance.audience / 5)
    );
  }
}

export class TragedyPerformanceCalculator extends PerformanceCalculator {
  calculatePerformanceAmount(performance: Performance): number {
    let amount = 400_00;
    if (performance.audience > 30) {
      amount += 10_00 * (performance.audience - 30);
    }
    return amount;
  }
}
