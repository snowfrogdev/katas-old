import { StatementPrinter, convertObjectToMap } from '../statement-printer';
import { PerformanceCalculator, StatementGenerator, InvoiceCalculator } from '../statement-generator';
import * as invoice from './invoice.json';
import * as plays from './plays.json';
import * as newInvoice from './invoice_new_plays.json';
import * as newPlays from './new_plays.json';

test('example statement', () => {
  const playsMap = convertObjectToMap(plays);
  const performanceCalculator = new PerformanceCalculator(playsMap);
  const generator = new StatementGenerator(
    playsMap,
    performanceCalculator,
    new InvoiceCalculator(performanceCalculator)
  );
  const printer = new StatementPrinter(generator);
  expect(printer.print(invoice)).toMatchSnapshot();
});

test('statement with new play types', () => {
  expect(() => {
    const newPlaysMap = convertObjectToMap(newPlays);
    const performanceCalculator = new PerformanceCalculator(newPlaysMap);
    const generator = new StatementGenerator(
      newPlaysMap,
      performanceCalculator,
      new InvoiceCalculator(performanceCalculator)
    );
    const printer = new StatementPrinter(generator);
    printer.print(newInvoice);
  }).toThrow(/unknown type/);
});
