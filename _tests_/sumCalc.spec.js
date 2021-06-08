const calculateSum = require('../src/sumCalc')

describe('Summation Test', () => {
  test('can return sum of 2 numbers', () => {
    const A = 52
    const B = 41
    const output = A + B
    expect(calculateSum(A, B)).toEqual(output)
  })
  test('return sum numbers', () => {
    const A = 52
    const B = 41
    const output = A + B
    expect(calculateSum(A, B)).toEqual(output)
  })
})
