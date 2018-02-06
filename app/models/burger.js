var Sequelize = require('sequelize')

var sequelizeConn = require('../config/connection.js')

var Burger = sequelizeConn.define('burger', {
  burger: {
    type: Sequelize.STRING
  },
  devoured: {
    type: Sequelize.BOOLEAN
  }
},
  {
    timestamps: false
  })

//Burger.sync();

module.exports = Burger
