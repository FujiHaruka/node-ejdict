const makeCandidate = require('./candidate')

function search (word) {
  const candidates = makeCandidate(word)
  if (candidates.length === 0) {
    return []
  }
  const alphabet = candidates[0][0].toLowerCase()
  const dataPath = `./data/dictionary/${alphabet}.json`
  const meanings = candidates
    .map((candidate) => {
      const data = require(dataPath)
      return data[candidate] && {
        word: candidate,
        mean: data[candidate]
      }
    })
    .filter(Boolean)
  delete require.cache[dataPath]
  return meanings
}

module.exports = search
