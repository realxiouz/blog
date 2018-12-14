const Sequelize = require('sequelize')

const mysql = new Sequelize({
  database: 'blog',
  username: 'root',
  password: 'root',
  port: 3306,
  host: 'localhost',
  dialect: 'mysql'
})

// const AK = 'cF5slgPBN4Ejbie7irffilrjrNw3WPD80Q1wqAMu'
// const SK = '5CkJK7SI1Eu6kD70eqgjeprYN0wxzvfPs9PGekdx'

module.exports = mysql
