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
    ({word, mean}) => [
      word,
      new Array(word.length).fill('-').join(''),
      mean.split('/').join('\n')
    ].join('\n')
  ).join('\n\n')
  console.log(view)
}
