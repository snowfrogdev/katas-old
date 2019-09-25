import { StatementPrinter } from "../statement-printer";
import * as invoice from "./invoice.json";
import * as plays from "./plays.json";
import * as newInvoice from "./invoice_new_plays.json";
import * as newPlays from "./new_plays.json";

const printer = new StatementPrinter();

test('example statement', () => {
  expect(printer.print(invoice, plays)).toMatchSnapshot();
});

test('statement with new play types', () => {
  expect(() => {
    printer.print(newInvoice, newPlays);
  }).toThrow(/unknown type/);
});
