import { FizzBuzz } from "./fizz-buzz";

const loggerMock = jest.fn();
const fizzBuzz = new FizzBuzz(loggerMock);

test('fizzBuzz method calls logger with proper parameter', () => {
    fizzBuzz.fizzBuzz();
    const results: string[] = loggerMock.mock.calls;
    const lineBreaks = results[0][0].match(/\n/g);
    expect(lineBreaks).toHaveLength(99);
})

test('generateSequentialNumbers works', () => {
    const expected = [1, 2, 3, 4, 5];
    const result = fizzBuzz.generateSequentialNumbers(5);
    expect(result).toEqual(expected);
})

test.each`
a       | expected
${1}    | ${1}
${2}    | ${2}
${3}    | ${3}
${5}    | ${5}
${15}   | ${'FizzBuzz'}
${30}   | ${'FizzBuzz'}
`('convertDivisibleBy3And5ToFizzBuzz outputs $expected when passed $a', ({a, expected}) => {
    expect(fizzBuzz.convertDivisibleBy3And5ToFizzBuzz(a)).toBe(expected);
})

test.each`
a               | expected
${1}            | ${1}
${2}            | ${2}
${3}            | ${'Fizz'}
${6}            | ${'Fizz'}
${'FizzBuzz'}   | ${'FizzBuzz'}
${'Buzz'}       | ${'Buzz'}
`('convertDivisibleBy3ToFizz outputs $expected when passed $a', ({ a, expected }) => {
    expect(fizzBuzz.convertDivisibleBy3ToFizz(a)).toBe(expected);
})

test.each`
a               | expected
${1}            | ${1}
${2}            | ${2}
${'Fizz'}       | ${'Fizz'}
${5}            | ${'Buzz'}
${'FizzBuzz'}   | ${'FizzBuzz'}
`('convertDivisibleBy5ToBuzz outputs $expected when passed $a', ({ a, expected }) => {
    expect(fizzBuzz.convertDivisibleBy5ToBuzz(a)).toBe(expected);
})

test.each`
a               | expected
${1}            | ${1}
${2}            | ${2}
${31}           | ${31}
${57}           | ${57}
${'FizzBuzz'}   | ${'FizzBuzz'}
${'Buzz'}       | ${'Buzz'}
${35}           | ${'FizzBuzz'}
${53}           | ${'FizzBuzz'}
`('convertContains3And5ToFizzBuzz outputs $expected when passed $a', ({ a, expected }) => {
    expect(fizzBuzz.convertContains3And5ToFizzBuzz(a)).toBe(expected);
})

test.each`
a               | expected
${1}            | ${1}
${2}            | ${2}
${31}           | ${'Fizz'}
${57}           | ${57}
${'FizzBuzz'}   | ${'FizzBuzz'}
${'Buzz'}       | ${'Buzz'}
${'Fizz'}       | ${'Fizz'}
${53}           | ${'Fizz'}
`('convertContains3ToFizz outputs $expected when passed $a', ({ a, expected }) => {
    expect(fizzBuzz.convertContains3ToFizz(a)).toBe(expected);
})

test.each`
a               | expected
${1}            | ${1}
${2}            | ${2}
${31}           | ${31}
${57}           | ${'Buzz'}
${'FizzBuzz'}   | ${'FizzBuzz'}
${'Buzz'}       | ${'Buzz'}
${'Fizz'}       | ${'Fizz'}
${95}           | ${'Buzz'}
`('convertContains5ToBuzz outputs $expected when passed $a', ({ a, expected }) => {
    expect(fizzBuzz.convertContains5ToBuzz(a)).toBe(expected);
})