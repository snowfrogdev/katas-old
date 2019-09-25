import { StatementPrinter } from "../statement-printer";
const fs = require('fs');

const printer = new StatementPrinter();

test('example statement', () => {
  const invoice = JSON.parse(fs.readFileSync('theatrical-players-refactoring/test/invoice.json', 'utf8'));
  const plays = JSON.parse(
    fs.readFileSync('theatrical-players-refactoring/test/plays.json', 'utf8')
  );
  expect(printer.print(invoice, plays)).toMatchSnapshot();
});

test('statement with new play types', () => {
  const invoice = JSON.parse(
    fs.readFileSync('theatrical-players-refactoring/test/invoice_new_plays.json', 'utf8')
  );
  const plays = JSON.parse(
    fs.readFileSync('theatrical-players-refactoring/test/new_plays.json', 'utf8')
  );
  expect(() => {
    printer.print(invoice, plays);
  }).toThrow(/unknown type/);
});
