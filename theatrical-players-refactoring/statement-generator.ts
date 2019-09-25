enum PlayType {
  Tragedy = 'tragedy',
  Comedy = 'comedy'
}

export class StatementGenerator {
  constructor(private plays: Map<string, Play>) {}

  generateStatement(invoice: Invoice): Statement {
    return {
      customer: invoice.customer,
      performances: invoice.performances.map(performance => {
        const performanceCalculator = this.createPerformanceCalculator(performance);
        return {
          audience: performance.audience,
          playName: this.plays.get(performance.playID)!.name,
          amount: this.formatCentsToUSD(
            performanceCalculator.calculatePerformanceAmount(performance)
          )
        };
      }),
      totalAmount: this.formatCentsToUSD(this.calculateTotalAmount(invoice)),
      volumeCredits: this.calculateTotalVolumeCredits(invoice)
    };
  }

  private formatCentsToUSD(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value / 100);
  }

  public calculateTotalAmount(invoice: Invoice): number {
    return invoice.performances.reduce((total, performance) => {
      const performanceCalculator = this.createPerformanceCalculator(performance);
      return total + performanceCalculator.calculatePerformanceAmount(performance);
    }, 0);
  }

  public calculateTotalVolumeCredits(invoice: Invoice): number {
    return invoice.performances.reduce((total, performance) => {
      const performanceCalculator = this.createPerformanceCalculator(performance);
      return total + performanceCalculator.calculatePerformanceVolumeCredits(performance);
    }, 0);
  }

  private createPerformanceCalculator(performance: Performance): PerformanceCalculator {
    const playType = this.plays.get(performance.playID)!.type;
    switch (playType) {
      case PlayType.Comedy:
        return new ComedyPerformanceCalculator(this.plays);
      case PlayType.Tragedy:
        return new TragedyPerformanceCalculator(this.plays);
      default:
        throw new Error(`unknown type: ${playType}`);
    }
  }
}

export abstract class PerformanceCalculator {
  constructor(private plays: Map<string, Play>) {}

  abstract calculatePerformanceAmount(performance: Performance): number

  public calculatePerformanceVolumeCredits(performance: Performance): number {
    let volumeCredits = 0;
    volumeCredits += Math.max(performance.audience - 30, 0);
    if (PlayType.Comedy === this.plays.get(performance.playID)!.type)
      volumeCredits += Math.floor(performance.audience / 5);
    return volumeCredits;
  }
}

class ComedyPerformanceCalculator extends PerformanceCalculator {
  calculatePerformanceAmount(performance: Performance): number {
    let amount = 300_00;
    if (performance.audience > 20) {
      amount += 100_00 + 5_00 * (performance.audience - 20);
    }
    amount += 3_00 * performance.audience;
    return amount;
  }
}

class TragedyPerformanceCalculator extends PerformanceCalculator {
  calculatePerformanceAmount(performance: Performance): number {
    let amount = 400_00;
    if (performance.audience > 30) {
      amount += 10_00 * (performance.audience - 30);
    }
    return amount;
  }
}
