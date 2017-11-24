#!/usr/bin/env node
const {Dict} = require('../lib')

const word = process.argv[2]

if (!word) {
  console.log(`
Usage:
  ejdict [word]
`)
  process.exit()
}

Dict.findOne({
  where: {
    word
  }
}).then((result) => {
  if (!result) {
    console.log('Not found')
    return
  }
  const {word, mean} = result
  console.log(word)
  console.log(new Array(word.length).fill('-').join(''))
  console.log(mean.split('/').join('\n'))
}).catch(console.error)
