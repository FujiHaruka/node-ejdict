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
  return unique([
    ...wordCase(word),
    irregularVerbs[word],
    ...wordWithoutD(word),
    ...wordWithoutS(word),
    ...wordWithoutIng(word),
    ...wordWithoutEr(word)
  ].filter(Boolean))
}

function unique (array) {
  return Object.keys(array.reduce((obj, item) => ({...obj, ...{[item]: null}}), {}))
}

function wordCase (word) {
  const [lower, upper] = [word.toLowerCase(), word.toUpperCase()]
  return [lower, upper[0] + lower.slice(1)]
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

function wordWithoutIng (word) {
  const fitSuffix = word.endsWith('ing')
  if (fitSuffix && word.length > 5 && sameChar(word, 4, 5)) {
    return [word.slice(0, -3), word.slice(0, -3) + 'e', word.slice(0, -4)]
  }
  if (fitSuffix) {
    return [word.slice(0, -3), word.slice(0, -3) + 'e']
  }
  return []
}

function wordWithoutEr (word) {
  if (word.length < 4) {
    return []
  }
  const suffixes = ['er', 'or', 'ar']
  const fitSuffix = suffixes.some((suf) => word.endsWith(suf))
  if (fitSuffix && sameChar(word, 3, 4)) {
    return [word.slice(0, -1), word.slice(0, -2), word.slice(0, -2) + 'e', word.slice(0, -3)]
  }
  if (fitSuffix) {
    return [word.slice(0, -1), word.slice(0, -2), word.slice(0, -2) + 'e']
  }
  return []
}

function sameChar (word, at1, at2) {
  return word[word.length - at1] === word[word.length - at2]
}

module.exports = {
  search,
  makeCandidate
}
