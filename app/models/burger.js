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
      allowNull: false,
      validate: {
        len: [1, 100]
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