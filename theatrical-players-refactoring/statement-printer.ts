interface Play {
  name: string;
  type: string;
}

enum PlayType {
  Tragedy = 'tragedy',
  Comedy = 'comedy'
}

interface Performance {
  playID: string;
  audience: number;
}

interface Invoice {
  customer: string;
  performances: Performance[];
}

export class PerformanceCalculator {
  constructor(private plays: Map<string, Play>) {}

  public calculatePerformanceAmount(performance: Performance): number {
    let amount = 0;
    const playType = this.plays.get(performance.playID)!.type;
    switch (playType) {
      case PlayType.Tragedy:
        amount = 400_00;
        if (performance.audience > 30) {
          amount += 10_00 * (performance.audience - 30);
        }
        break;
      case PlayType.Comedy:
        amount = 300_00;
        if (performance.audience > 20) {
          amount += 100_00 + 5_00 * (performance.audience - 20);
        }
        amount += 3_00 * performance.audience;
        break;
      default:
        throw new Error(`unknown type: ${playType}`);
    }
    return amount;
  }
}

export class StatementPrinter {
  constructor(private plays: Map<string, Play>, private calculator: PerformanceCalculator) {}
  print(invoice: Invoice) {
    let totalAmount = this.calculateTotalAmount(invoice);
    const volumeCredits = this.calculateTotalVolumeCredits(invoice);
    let result = `Statement for ${invoice.customer}\n`;

    for (const performance of invoice.performances) {
      // print line for this order
      result += ` ${this.plays.get(performance.playID)!.name}: ${this.formatCentsToUSD(
        this.calculator.calculatePerformanceAmount(performance)
      )} (${performance.audience} seats)\n`;
    }
    result += `Amount owed is ${this.formatCentsToUSD(totalAmount)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;
  }

  private calculateTotalAmount(invoice: Invoice): number {
    return invoice.performances.reduce(
      (total, performance) => total + this.calculator.calculatePerformanceAmount(performance),
      0
    );
  }

  private calculateTotalVolumeCredits(invoice: Invoice): number {
    return invoice.performances.reduce(
      (total, performance) => total + this.calculatePerformanceVolumeCredits(performance),
      0
    );
  }

  private calculatePerformanceVolumeCredits(performance: Performance): number {
    let volumeCredits = 0;
    volumeCredits += Math.max(performance.audience - 30, 0);
    if (PlayType.Comedy === this.plays.get(performance.playID)!.type)
      volumeCredits += Math.floor(performance.audience / 5);
    return volumeCredits;
  }

  private formatCentsToUSD(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value / 100);
  }
}

export function convertObjectToMap<T>(object: { [key: string]: T }): Map<string, T> {
  return new Map(Object.entries(object));
}
