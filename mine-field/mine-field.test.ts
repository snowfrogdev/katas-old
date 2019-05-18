import { generateHintField } from "./mine-field";

describe('mine-field kata', () => {

    test('generateHintField with 3 X 4 input', () => {
        const input =
`3 4
*...
..*.
....`

        const actual = generateHintField(input)

        const expected = 
`*211
12*1
0111`

        expect(actual).toEqual(expected)
    })

    test('convert input 6 X 4 to 2D array', () => {
        const input =
`6 4
*...
..*.
....
.*..
...*`

        const actual = generateHintField(input)

        const expected = 
`*211
12*1
1221
1*21
111*`
        

        expect(actual).toEqual(expected)
    })

    /*
    test('convert 3 X 4 input to 2D array', () => {
        const input = 
`3 4
*...
..*.
....`
        const actual = MineFieldHinter.convertInputTo2DArray(input)

        const expected = [
            ['*', '.', '.', '.'],
            ['.', '.', '*', '.'],
            ['.', '.', '.', '.']
        ]

        expect(actual).toEqual(expected)
    })

    test('convert input 6 X 4 to 2D array', () => {
        const input = 
`6 4
*...
..*.
....
.*..
...*`
        const actual = MineFieldHinter.convertInputTo2DArray(input)

        const expected = [
            ['*', '.', '.', '.'],
            ['.', '.', '*', '.'],
            ['.', '.', '.', '.'],
            ['.', '*', '.', '.'],
            ['.', '.', '.', '*']
        ]

        expect(actual).toEqual(expected)
    })

    test('outputs correct 3 X 4 mine field hinter ', () => {
        const input = [
            ['*', '.', '.', '.'],
            ['.', '.', '*', '.'],
            ['.', '.', '.', '.']
        ]

        const actual = MineFieldHinter.generateHintFieldFrom2DArray(input)

        const expected = [
            ['*', '2', '1', '1'],
            ['1', '2', '*', '1'],
            ['0', '1', '1', '1']
        ]

        expect(actual).toEqual(expected)
    })

    test('outputs correct 6 X 4mine field hinter', () => {
        const input = [
            ['*', '.', '.', '.'],
            ['.', '.', '*', '.'],
            ['.', '.', '.', '.'],
            ['.', '*', '.', '.'],
            ['.', '.', '.', '*']
        ]

        const actual = MineFieldHinter.generateHintFieldFrom2DArray(input)

        const expected = [
            ['*', '2', '1', '1'],
            ['1', '2', '*', '1'],
            ['1', '2', '2', '1'],
            ['1', '*', '2', '1'],
            ['1', '1', '1', '*']
        ]

        expect(actual).toEqual(expected)
    })
    */

})