const {equal, ok} = require('assert')
const {search, makeCandidate} = require('../lib/search')

describe('search.js', () => {
  it('makeCandidate', () => {
    const test = (targetWord, originalWord) => {
      const candidates = makeCandidate(targetWord)
      ok(candidates.includes(originalWord))
    }

    test('known', 'known')

    test('known', 'know')
    test('brought', 'bring')
    test('broke', 'break')
    test('broken', 'break')

    test('apples', 'apple')
    test('runs', 'run')
    test('likes', 'like')
    test('studies', 'study')

    test('loved', 'love')
    test('studied', 'study')
    test('played', 'play')

    test('stopped', 'stop')
    test('runned', 'runned')
    test('hoped', 'hope')
  })

  it('search', async () => {
    equal(
      (await search('noteixitword')).length,
      0
    )
    equal(
      (await search('apple')).length,
      1
    )
    equal(
      (await search('stopped')).length,
      1
    )
    equal(
      (await search('known')).length,
      2
    )
    equal(
      (await search('studies')).length,
      1
    )
  })
})

/* global describe it */
