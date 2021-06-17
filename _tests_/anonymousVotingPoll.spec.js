const IncrementNum = require('../src/anonymousVotingPoll')

describe('Incrementation Test', () => {
  test('can return number + 1', () => {
    let num = 1
    const result = num + 1
    expect(IncrementNum(num)).toEqual(result)
  })
})
