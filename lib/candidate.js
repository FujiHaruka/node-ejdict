const irregularVerbs = require('./irregular_verbs')

function makeCandidate (word) {
  return unique([
    ...wordOfCases(word),
    irregularVerbs[word],
    ...wordWithoutD(word),
    ...wordWithoutS(word),
    ...wordWithoutIng(word),
    ...wordWithoutEr(word)
  ].filter(Boolean))
}

module.exports = makeCandidate

function unique (array) {
  return Object.keys(array.reduce((obj, item) => ({...obj, ...{[item]: null}}), {}))
}

function wordOfCases (word) {
  const [lower, upper] = [word.toLowerCase(), word.toUpperCase()]
  return [lower, upper[0] + lower.slice(1)]
}

function wordWithoutD (word) {
  if (word.length < 5) {
    return []
  }
  const backSlice = backSlicer(word)
  const candidates = [backSlice(1), backSlice(2)]
  // ex. "study"
  if (word.endsWith('ied')) {
    return candidates.concat(backSlice(3) + 'y')
  }
  // ex. "stopped"
  if (word.endsWith('ed') && doubledLetter(word, 3, 4)) {
    return candidates.concat(backSlice(3))
  }
  if (word.endsWith('ed')) {
    return candidates
  }
  return []
}

function wordWithoutS (word) {
  const backSlice = backSlicer(word)
  const candidates = [backSlice(1)]
  // ex. "studies"
  if (word.endsWith('ies')) {
    return candidates.concat(backSlice(3) + 'y')
  }
  // ex. "boxes"
  if (word.endsWith('es')) {
    return candidates.concat(backSlice(2))
  }
  if (word.endsWith('s')) {
    return candidates
  }
  return []
}

function wordWithoutIng (word) {
  const backSlice = backSlicer(word)
  const candidates = [backSlice(3), backSlice(3) + 'e']
  // ex. "shopping"
  if (word.endsWith('ing') && word.length > 5 && doubledLetter(word, 4, 5)) {
    return candidates.concat(backSlice(4))
  }
  if (word.endsWith('ing')) {
    return candidates
  }
  return []
}

function wordWithoutEr (word) {
  if (word.length < 4) {
    return []
  }
  const suffixes = ['er', 'or', 'ar']
  const fitSuffix = suffixes.some((suf) => word.endsWith(suf))
  const backSlice = backSlicer(word)
  // ex. "lover", "teacher", "liar"
  const candidates = [backSlice(1), backSlice(2), backSlice(2) + 'e']
  // ex. stopper
  if (fitSuffix && doubledLetter(word, 3, 4)) {
    return candidates.concat(backSlice(3))
  }
  if (fitSuffix) {
    return candidates
  }
  return []
}

function backSlicer (word) {
  return function backSlice (number) {
    return word.slice(0, -1 * number)
  }
}

function doubledLetter (word, at1, at2) {
  return word[word.length - at1] === word[word.length - at2]
}
