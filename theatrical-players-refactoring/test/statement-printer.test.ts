import { StatementPrinter, convertObjectToMap, PrintTextStrategy, PrintHtmlStrategy } from '../src/statement-printer';
import { StatementGenerator } from '../src/statement-generator';
import * as invoice from './invoice.json';
import * as plays from './plays.json';
import * as newInvoice from './invoice_new_plays.json';
import * as newPlays from './new_plays.json';

xtest('example text statement', () => {
  const playsMap = convertObjectToMap(plays);
  const generator = new StatementGenerator(playsMap);
  const printer = new StatementPrinter(new PrintTextStrategy(generator));
  expect(printer.print(invoice)).toMatchSnapshot();
});

xtest('example html statement', () => {
  const playsMap = convertObjectToMap(plays);
  const generator = new StatementGenerator(playsMap);
  const printer = new StatementPrinter(new PrintHtmlStrategy(generator));
  expect(printer.print(invoice)).toMatchSnapshot();
})

xtest('statement with new play types', () => {
  expect(() => {
    const newPlaysMap = convertObjectToMap(newPlays);
    const generator = new StatementGenerator(newPlaysMap);
    const printer = new StatementPrinter(new PrintTextStrategy(generator));
    printer.print(newInvoice);
  }).toThrow(/unknown type/);
});
