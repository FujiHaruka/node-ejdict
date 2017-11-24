const {join} = require('path')
const Sequelize = require('sequelize')
const sequelize = new Sequelize('main', null, null, {
  dialect: 'sqlite',
  storage: join(__dirname, '../db/ejdic-hand-sqlite/ejdict.sqlite3'),
  logging: false,
  operatorsAliases: false
})

const Dict = sequelize.define('items', {
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

module.exports = Dict
