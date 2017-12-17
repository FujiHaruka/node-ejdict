#!/usr/bin/env node
const search = require('../lib')

const word = process.argv[2]

if (!word) {
  console.log(`
Usage:
  ejdict [word]
`)
  process.exit()
}

ejdict(word)

function ejdict (word) {
  const results = search(word)
  if (results.length === 0) {
    console.log('Not found')
    return
  }
  const view = results.map(
    (result) => [
      result.word,
      new Array(result.word.length).fill('-').join(''),
      result.mean.split('/').join('\n')
    ].join('\n')
  ).join('\n\n')
  console.log(view)
}
