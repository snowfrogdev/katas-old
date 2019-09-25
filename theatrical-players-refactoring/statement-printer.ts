import { StatementGenerator } from "./statement-generator";

export class StatementPrinter {
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
