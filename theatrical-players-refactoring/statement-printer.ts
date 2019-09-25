interface Play {
  name: string;
  type: string;
}

interface Performance {
  playID: string;
  audience: number;
}

interface Invoice {
  customer: string;
  performances: Performance[];
}

export class StatementPrinter {
  constructor(private plays: { [index: string]: Play }) {}
  print(invoice: Invoice) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;

    for (const performance of invoice.performances) {
      const thisAmount = this.calculateAmount(performance);
      volumeCredits += this.calculateVolumeCredits(performance);
      // print line for this order
      result += ` ${this.getPlayById(performance.playID).name}: ${this.format(thisAmount / 100)} (${
        performance.audience
      } seats)\n`;
      totalAmount += thisAmount;
    }
    result += `Amount owed is ${this.format(totalAmount / 100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;
  }

  private format(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  }

  private calculateAmount(performance: Performance) {
    let amount = 0;
    const playType = this.getPlayById(performance.playID).type;
    switch (playType) {
      case 'tragedy':
        amount = 400_00;
        if (performance.audience > 30) {
          amount += 10_00 * (performance.audience - 30);
        }
        break;
      case 'comedy':
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

  private calculateVolumeCredits(performance: Performance) {
    let volumeCredits = 0;
    volumeCredits += Math.max(performance.audience - 30, 0);
    if ('comedy' === this.getPlayById(performance.playID).type)
      volumeCredits += Math.floor(performance.audience / 5);
    return volumeCredits;
  }

  private getPlayById(playId: string): Play {
    return this.plays[playId];
  }
}
