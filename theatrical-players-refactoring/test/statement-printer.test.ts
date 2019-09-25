import { StatementPrinter, convertObjectToMap } from "../statement-printer";
import * as invoice from "./invoice.json";
import * as plays from "./plays.json";
import * as newInvoice from "./invoice_new_plays.json";
import * as newPlays from "./new_plays.json";

test('example statement', () => {
  const printer = new StatementPrinter(convertObjectToMap(plays));
  expect(printer.print(invoice)).toMatchSnapshot();
});

test('statement with new play types', () => {
  expect(() => {
    const printer = new StatementPrinter(convertObjectToMap(newPlays));
    printer.print(newInvoice);
  }).toThrow(/unknown type/);
});
