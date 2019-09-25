import { StatementPrinter, convertObjectToMap, PerformanceCalculator } from "../statement-printer";
import * as invoice from "./invoice.json";
import * as plays from "./plays.json";
import * as newInvoice from "./invoice_new_plays.json";
import * as newPlays from "./new_plays.json";

test('example statement', () => {
  const playsMap = convertObjectToMap(plays);
  const printer = new StatementPrinter(playsMap, new PerformanceCalculator(playsMap));
  expect(printer.print(invoice)).toMatchSnapshot();
});

test('statement with new play types', () => {
  expect(() => {
    const newPlaysMap = convertObjectToMap(newPlays);
    const printer = new StatementPrinter(newPlaysMap, new PerformanceCalculator(newPlaysMap));
    printer.print(newInvoice);
  }).toThrow(/unknown type/);
});
