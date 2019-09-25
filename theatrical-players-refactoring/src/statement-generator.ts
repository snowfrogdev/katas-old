import { PerformanceCalculator, ComedyPerformanceCalculator, TragedyPerformanceCalculator } from "./performance-calculator";

export enum PlayType {
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
