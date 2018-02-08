var Sequelize = require('sequelize')

var  sequelize = "";
if (process.env.JAWSDB_URL) {
  //connection = mysql.createConnection(process.env.JAWSDB_URL)
  sequelize = new Sequelize('mysql://shxcatyo68mr3sb4:n93t7adn6qa6swgo@ffn96u87j5ogvehy.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/b33txv3cgfz5y1ja');
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
