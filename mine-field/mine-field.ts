export const generateHintField = (input: string): string => {
    return input
        .split('\n')
        .slice(1)
        .map(stringToCharArray)
        .map(mineFieldRowToHintFieldRow)
        .reduce(hintFieldArrayToHintFieldString, '')
}

function stringToCharArray(str: string): string[] {
    return Array.from(str)
}

function mineFieldRowToHintFieldRow(row: string[], rowIndex: number, mineField: string[][]) {
    const squareToHint = createSquareToHintMappingFunction(mineField, rowIndex)
    return row.map(squareToHint)
}

function hintFieldArrayToHintFieldString(hintString: string, row: string[], rowIndex: number, hintField: string[][]) {
    let line = hintString + row.join('')
    if (rowIndex < hintField.length - 1) {
        line += '\n'
    }
    return line
}

function createSquareToHintMappingFunction(mineField: string[][], rowIndex: number) {
    return (square: string, columnIndex: number) => {
        return square === '*' ? '*' : getNumberOfAdjacentMineSquares(mineField, rowIndex, columnIndex)
    };
}

function getNumberOfAdjacentMineSquares(mineField: string[][], rowIndex: number, columnIndex: number) {
    const squareHasMine = (rowIndex: number, columnIndex: number): boolean => {
        return mineField[rowIndex] != undefined && mineField[rowIndex][columnIndex] === '*';
    }

    let count: number = 
        +squareHasMine(rowIndex - 1, columnIndex) +
        +squareHasMine(rowIndex - 1, columnIndex + 1) +
        +squareHasMine(rowIndex, columnIndex + 1) +
        +squareHasMine(rowIndex + 1, columnIndex + 1) +
        +squareHasMine(rowIndex + 1, columnIndex) +
        +squareHasMine(rowIndex + 1, columnIndex - 1) +
        +squareHasMine(rowIndex, columnIndex - 1) +
        +squareHasMine(rowIndex - 1, columnIndex - 1);
    return count.toString();
}

