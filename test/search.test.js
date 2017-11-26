const {equal, ok} = require('assert')
const search = require('../lib/search')

describe('search.js', () => {
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
