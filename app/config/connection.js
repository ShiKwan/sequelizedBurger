var Sequelize = require('sequelize')

var  sequelize = "";
if (process.env.JAWSDB_URL) {
  //connection = mysql.createConnection(process.env.JAWSDB_URL)
  sequelize = new Sequelize('mysql://p2sjt4v151kjy727:p4ux87hb5yru8led@q3vtafztappqbpzn.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/bgi08j8nvrap7qj6');
}else {
  sequelize = new Sequelize('burgers_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql' ,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
}

module.exports = sequelize
