export const generateHintField = (input: string): string => {
    const linesFromInput: string[] = input.split('\n')
    const lineLength: number = parseInt(linesFromInput[0].split(' ')[1])

    const stringArrayToCharArray = createFlatMapReducerFunc(stringToCharArray)
    const squareToHint = createSquareToHintMapperFunc(lineLength)
    const arrayToLines = creatArrayToLinesReducerFunc(lineLength)
    
    return linesFromInput
        .slice(1)
        .reduce(stringArrayToCharArray, [])
        .map(squareToHint)
        .reduce(arrayToLines)
}

function createFlatMapReducerFunc<T>(mappingFunction: (x: T) => T[]) {
    return (previous: T[], current: T) => {
        return previous.concat(mappingFunction(current))
    }
}

function stringToCharArray(str: string): string[] {
    return Array.from(str)
}

function createSquareToHintMapperFunc(lineWidth: number) {
    return (square: string, index: number, field: string[]): string => {
        if (square === '*') {
            return '*'
        }
        
        /** WRONG FORMULAS
        let count: number =
            (field[index - lineWidth]       === '*' ? 1 : 0) +
            (field[index - lineWidth + 1]   === '*' ? 1 : 0) +
            (field[index + 1]               === '*' ? 1 : 0) +
            (field[index + lineWidth - 1]   === '*' ? 1 : 0) +
            (field[index + lineWidth]       === '*' ? 1 : 0) +
            (field[index + lineWidth - 1]   === '*' ? 1 : 0) +
            (field[index - 1]               === '*' ? 1 : 0) +
            (field[index - lineWidth - 1]   === '*' ? 1 : 0)
        return count.toString()
        */
    }
}

function creatArrayToLinesReducerFunc(lineWidth: number) {
    return (output: string, square: string, index: number): string => {
        if (index % lineWidth === 0) {
            return output + '\n' + square;
        }
        return output + square;
    };
}

generateHintField(
`3 4
*...
..*.
....`
) //?