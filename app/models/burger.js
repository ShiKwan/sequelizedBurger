module.exports = function (sequelize, DataTypes) {
  var Burger = sequelize.define('Burger', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    burger: {
      type: DataTypes.STRING,
      allowNull: {
        args : false,
        msg : 'Burger field cannot be null'
      },
      validate: {
        len: {
          args : [1, 100],
         msg: 'Burger field must be between length of 1 and 100'
        }
      }
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    timestamps: false
  })

  Burger.associate = function(models){
    Burger.belongsTo(models.Customer,{
      foreignKey: {
        allowNull : true
      }
    })
  }
  return Burger
}