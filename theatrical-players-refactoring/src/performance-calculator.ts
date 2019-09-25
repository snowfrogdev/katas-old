export abstract class PerformanceCalculator {
  constructor(protected performance: Performance) {}
  abstract calculateAmount(): number;

  public calculateVolumeCredits(): number {
    let volumeCredits = 0;
    volumeCredits += Math.max(this.performance.audience - 30, 0);
    return volumeCredits;
  }
}

export class ComedyPerformanceCalculator extends PerformanceCalculator {
  constructor(performance: Performance) {
    super(performance);
  }
  calculateAmount(): number {
    let amount = 300_00;
    if (this.performance.audience > 20) {
      amount += 100_00 + 5_00 * (this.performance.audience - 20);
    }
    amount += 3_00 * this.performance.audience;
    return amount;
  }

  calculateVolumeCredits() {
    return super.calculateVolumeCredits() + Math.floor(this.performance.audience / 5);
  }
}

export class TragedyPerformanceCalculator extends PerformanceCalculator {
  constructor(performance: Performance) {
    super(performance);
  }
  calculateAmount(): number {
    let amount = 400_00;
    if (this.performance.audience > 30) {
      amount += 10_00 * (this.performance.audience - 30);
    }
    return amount;
  }
}

export class MysteryPerformanceCalculator extends PerformanceCalculator {
  constructor(performance: Performance) {
    super(performance);
  }
  calculateAmount(): number {
    let amount = 250_00;
    if (this.performance.audience > 15) {
      amount += 15_00 * (this.performance.audience - 15);
    }
    return amount;
  }
}

export class HorrorPerformanceCalculator extends PerformanceCalculator {
  constructor(performance: Performance) {
    super(performance);
  }
  calculateAmount(): number {
    let amount = 600_00;
    if (this.performance.audience > 20) {
      amount += 5_00 * (this.performance.audience - 20);
    }
    return amount;
  }
}
