import {
  PerformanceCalculator,
  ComedyPerformanceCalculator,
  TragedyPerformanceCalculator
} from './performance-calculator';

export enum PlayType {
  Tragedy = 'tragedy',
  Comedy = 'comedy'
}

export class StatementGenerator {
  constructor(private plays: Map<string, Play>) {}

  generateStatement(invoice: Invoice): Statement {
    return {
      customer: invoice.customer,
      performances: invoice.performances.map(this.mapPerformance, this),
      totalAmount: this.formatCentsToUSD(this.calculateTotalAmount(invoice)),
      volumeCredits: this.calculateTotalVolumeCredits(invoice)
    };
  }

  private mapPerformance(performance: Performance) {
    const performanceCalculator = this.createPerformanceCalculator(performance);
    return {
      audience: performance.audience,
      playName: this.plays.get(performance.playID)!.name,
      amount: this.formatCentsToUSD(performanceCalculator.calculatePerformanceAmount())
    };
  }

  private formatCentsToUSD(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value / 100);
  }

  private calculateTotalAmount(invoice: Invoice): number {
    return invoice.performances.reduce((total, performance) => {
      const performanceCalculator = this.createPerformanceCalculator(performance);
      return total + performanceCalculator.calculatePerformanceAmount();
    }, 0);
  }

  private calculateTotalVolumeCredits(invoice: Invoice): number {
    return invoice.performances.reduce((total, performance) => {
      const performanceCalculator = this.createPerformanceCalculator(performance);
      return total + performanceCalculator.calculatePerformanceVolumeCredits();
    }, 0);
  }

  private createPerformanceCalculator(performance: Performance): PerformanceCalculator {
    const playType = this.plays.get(performance.playID)!.type;
    switch (playType) {
      case PlayType.Comedy:
        return new ComedyPerformanceCalculator(performance);
      case PlayType.Tragedy:
        return new TragedyPerformanceCalculator(performance);
      default:
        throw new Error(`unknown type: ${playType}`);
    }
  }
}
