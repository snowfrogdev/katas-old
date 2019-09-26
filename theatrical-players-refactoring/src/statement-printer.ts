import { StatementGenerator } from './statement-generator';

export class StatementPrinter {
  constructor(private printStrategy: PrintStrategy) {}
  print(invoice: Invoice): string {
    return this.printStrategy.print(invoice);
  }

  setPrintStrategy(printStrategy: PrintStrategy) {
    this.printStrategy = printStrategy;
  }
}

export class PrintHtmlStrategy implements PrintStrategy {
  constructor(private generator: StatementGenerator) {}
  print(invoice: Invoice): string {
    const statement = this.generator.generateStatement(invoice);
    return this.produceStatementHtml(statement);
  }

  private produceStatementHtml(statement: Statement): string {
    let result = `<h1>Statement for ${statement.customer}</h1>\n`;
    for (const performance of statement.performances) {
      // print line for this order
      result += ` <p>${performance.playName}: ${performance.amount} (${performance.audience} seats)</p>\n`;
    }
    result += `<p>Amount owed is <strong>${statement.totalAmount}</strong></p>\n`;
    result += `<p>You earned <strong>${statement.volumeCredits}</strong> credits</p>\n`;
    return result;
  }
}

export class PrintTextStrategy implements PrintStrategy {
  constructor(private generator: StatementGenerator) {}
  print(invoice: Invoice): string {
    const statement = this.generator.generateStatement(invoice);
    return this.produceStatementText(statement);
  }

  private produceStatementText(statement: Statement): string {
    let result = `Statement for ${statement.customer}\n`;
    for (const performance of statement.performances) {
      // print line for this order
      result += ` ${performance.playName}: ${performance.amount} (${performance.audience} seats)\n`;
    }
    result += `Amount owed is ${statement.totalAmount}\n`;
    result += `You earned ${statement.volumeCredits} credits\n`;
    return result;
  }
}

export function convertObjectToMap<T>(object: { [key: string]: T }): Map<string, T> {
  return new Map(Object.entries(object));
}
