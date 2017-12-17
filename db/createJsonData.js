const {join} = require('path')
const Sequelize = require('sequelize')
const {Op} = Sequelize
const fs = require('fs')
const {promisify} = require('util')
const writeFileAsync = promisify(fs.writeFile)
const sequelize = new Sequelize('main', null, null, {
  dialect: 'sqlite',
  storage: join(__dirname, 'db/ejdic-hand-sqlite/ejdict.sqlite3'),
  logging: false,
  operatorsAliases: false
})

const Dict = sequelize.define('words', {
  item_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  word: {
    type: Sequelize.TEXT
  },
  mean: {
    type: Sequelize.TEXT
  },
  level: {
    type: Sequelize.INTEGER
  }
}, {
  timestamps: false
})

const alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('')
;(async () => {
  for (let char of alphabets) {
    const searchResults = await Dict.findAll({
      where: {
        word: {
          [Op.like]: char + '%'
        }
      }
    })
    const wordMeans = searchResults
      .map(({word, mean}) => ({[word]: mean}))
      .reduce((obj, kv) => Object.assign(obj, kv), {})
    await writeFileAsync(join(__dirname, `../lib/data/${char}.json`), JSON.stringify(wordMeans))
  }
})()
