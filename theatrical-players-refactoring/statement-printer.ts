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

interface Statement {
  customer: string;
  performances: Array<{ playName: string; audience: number; amount: string }>;
  totalAmount: string;
  volumeCredits: number;
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

  public calculatePerformanceVolumeCredits(performance: Performance): number {
    let volumeCredits = 0;
    volumeCredits += Math.max(performance.audience - 30, 0);
    if (PlayType.Comedy === this.plays.get(performance.playID)!.type)
      volumeCredits += Math.floor(performance.audience / 5);
    return volumeCredits;
  }
}

export class InvoiceCalculator {
  constructor(private performanceCalculator: PerformanceCalculator) {}
  public calculateTotalAmount(invoice: Invoice): number {
    return invoice.performances.reduce(
      (total, performance) =>
        total + this.performanceCalculator.calculatePerformanceAmount(performance),
      0
    );
  }

  public calculateTotalVolumeCredits(invoice: Invoice): number {
    return invoice.performances.reduce(
      (total, performance) =>
        total + this.performanceCalculator.calculatePerformanceVolumeCredits(performance),
      0
    );
  }
}

export class StatementPrinter {
  constructor(
    private plays: Map<string, Play>,
    private performanceCalculator: PerformanceCalculator,
    private invoiceCalculator: InvoiceCalculator
  ) {}
  print(invoice: Invoice): string {
    const statement = this.generateStatement(invoice);
    return this.produceStatementText(statement);
  }

  private produceStatementText(statement: Statement): string {
    let result = `Statement for ${statement.customer}\n`;
    for (const performance of statement.performances) {
      // print line for this order
      result += ` ${performance.playName}: ${performance.amount} (${
        performance.audience
      } seats)\n`;
    }
    result += `Amount owed is ${statement.totalAmount}\n`;
    result += `You earned ${statement.volumeCredits} credits\n`;
    return result;
  }

  private generateStatement(invoice: Invoice): Statement {
    return {
      customer: invoice.customer,
      performances: invoice.performances.map(performance => ({
        audience: performance.audience,
        playName: this.plays.get(performance.playID)!.name,
        amount: this.formatCentsToUSD(this.performanceCalculator.calculatePerformanceAmount(performance))
      })),
      totalAmount: this.formatCentsToUSD(this.invoiceCalculator.calculateTotalAmount(invoice)),
      volumeCredits: this.invoiceCalculator.calculateTotalVolumeCredits(invoice)
    };
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
