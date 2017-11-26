const {Op} = require('sequelize')
const irregularVerbs = require('./irregular_verbs')
const {Dict} = require('./db')

function search (word) {
  const candidates = makeCandidate(word)
  return Dict.findAll({
    where: {
      word: {
        [Op.or]: candidates
      }
    }
  })
}

function makeCandidate (word) {
  return [
    word,
    irregularVerbs[word],
    ...wordWithoutD(word),
    ...wordWithoutS(word)
  ].filter(Boolean)
}

function wordWithoutD (word) {
  if (word.endsWith('ied')) {
    return [word.slice(0, -3) + 'y']
  }
  if (word.endsWith('ed') && word.length > 4 && word[word.length - 3] === word[word.length - 4]) {
    return [word.slice(0, -1), word.slice(0, -2), word.slice(0, -3)]
  }
  if (word.endsWith('ed')) {
    return [word.slice(0, -1), word.slice(0, -2)]
  }

  return []
}

function wordWithoutS (word) {
  if (word.endsWith('ies')) {
    return [word.slice(0, -3) + 'y']
  }
  if (word.endsWith('es')) {
    return [word.slice(0, -1), word.slice(0, -2)]
  }
  if (word.endsWith('s')) {
    return [word.slice(0, -1)]
  }
  return []
}

module.exports = {
  search,
  makeCandidate
}
