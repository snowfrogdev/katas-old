import {
  StatementPrinter,
  convertObjectToMap,
  PerformanceCalculator,
  InvoiceCalculator
} from '../statement-printer';
import * as invoice from './invoice.json';
import * as plays from './plays.json';
import * as newInvoice from './invoice_new_plays.json';
import * as newPlays from './new_plays.json';

test('example statement', () => {
  const playsMap = convertObjectToMap(plays);
  const performanceCalculator = new PerformanceCalculator(playsMap);
  const printer = new StatementPrinter(
    playsMap,
    performanceCalculator,
    new InvoiceCalculator(performanceCalculator)
  );
  expect(printer.print(invoice)).toMatchSnapshot();
});

test('statement with new play types', () => {
  expect(() => {
    const newPlaysMap = convertObjectToMap(newPlays);
    const performanceCalculator = new PerformanceCalculator(newPlaysMap);
    const printer = new StatementPrinter(
      newPlaysMap,
      performanceCalculator,
      new InvoiceCalculator(performanceCalculator)
    );
    printer.print(newInvoice);
  }).toThrow(/unknown type/);
});
