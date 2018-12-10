const Sequelize = require('sequelize')

const mysql = new Sequelize({
  database: 'blog',
  username: 'root',
  password: 'root',
  port: 3306,
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = mysql
