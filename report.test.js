const { sortPages } = require('./report.js')
const {test, expect} = require('@jest/globals')

test('sortPages 2 pages', () => {
    const input = {
        'https://washlane.dev/path' : 1,
        'https://washlane.dev' : 3
    }
    const actual = sortPages(input)
    const expected = [
        ['https://washlane.dev', 3],
        ['https://washlane.dev/path', 1]
    ]
    expect(actual).toEqual(expected) // using expect function from jest
})

test('sortPages 5 pages', () => {
    const input = {
        'https://washlane.dev/path1' : 1,
        'https://washlane.dev' : 3,
        'https://washlane.dev/path2' : 5,
        'https://washlane.dev/path3' : 2,
        'https://washlane.dev/path4' : 9,

    }
    const actual = sortPages(input)
    const expected = [
        ['https://washlane.dev/path4', 9],
        ['https://washlane.dev/path2', 5],
        ['https://washlane.dev', 3],
        ['https://washlane.dev/path3', 2],
        ['https://washlane.dev/path1', 1]
    ]
    expect(actual).toEqual(expected) // using expect function from jest
})