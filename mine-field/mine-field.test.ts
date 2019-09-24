import { generateHintField } from "./mine-field";

xdescribe('mine-field kata', () => {

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
112*`
        

        expect(actual).toEqual(expected)
    })
})