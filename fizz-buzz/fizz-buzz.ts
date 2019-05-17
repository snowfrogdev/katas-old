export class FizzBuzz {
    constructor(private logger_: (input: any) => void) {}

    fizzBuzz(): void {
        const fizzBuzzString = this.convertNumbersArrayToFizzBuzzString();
        this.logger_(fizzBuzzString);
    }

    convertNumbersArrayToFizzBuzzString(): string {
        return this.generateSequentialNumbers(100)
            .map(this.convertDivisibleBy3And5ToFizzBuzz, this)
            .map(this.convertDivisibleBy3ToFizz, this)
            .map(this.convertDivisibleBy5ToBuzz, this)
            .map(this.convertContains3And5ToFizzBuzz, this)
            .map(this.convertContains3ToFizz, this)
            .map(this.convertContains5ToBuzz, this)
            .join('\n');
    }

    generateSequentialNumbers(num: number): number[] {
        return Array.from(Array(num), (v, i: number) => i + 1);
    }

    convertDivisibleBy3And5ToFizzBuzz(input: number): number | string {
        if (this.inputIsDivisibleBy(input, 3) && this.inputIsDivisibleBy(input, 5)) return 'FizzBuzz'
        return input;
    }

    convertDivisibleBy3ToFizz(input: number | string): number | string {
        if (this.inputIsDivisibleBy(input, 3)) return 'Fizz'
        return input;
    }

    convertDivisibleBy5ToBuzz(input: number | string): number | string {
        if (this.inputIsDivisibleBy(input, 5)) return 'Buzz'
        return input;
    }

    inputIsDivisibleBy(input: number | string, divider: number): boolean {
        if (typeof input === 'number' && input % divider === 0) return true;
        return false;
    }

    convertContains3And5ToFizzBuzz(input: number | string): number | string {
        if (this.inputContainsNumber(input, 5) && this.inputContainsNumber(input, 3)) return 'FizzBuzz';
        return input;
    }

    convertContains3ToFizz(input: number | string): number | string {
        if (this.inputContainsNumber(input, 3)) return 'Fizz';
        return input;
    }

    convertContains5ToBuzz(input: number | string): number | string {
        if (this.inputContainsNumber(input, 5)) return 'Buzz';
        return input;
    }

    inputContainsNumber(input: number | string, num: number): boolean {
        const str = input.toString();
        if (str.indexOf(`${num}`) > -1) return true;
        return false;
    }
}




/*
const fizzBuzz = new FizzBuzz(console.log);

fizzBuzz.fizzBuzz();
*/