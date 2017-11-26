const {Op} = require('sequelize')
const {Dict} = require('./db')
const makeCandidate = require('./candidate')

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

module.exports = search
