module.exports = function (sequelize, DataTypes) {
  var Customer = sequelize.define('Customer', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    customer: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:  true
      }
    },
    burger_id: {
      type: DataTypes.INTEGER
    },
    lastVisit: {
      type: DataTypes.DATE
    }
  },
    {
      timestamps: false
    })

    Customer.associate = function(models){
      Customer.hasMany(models.Burger, {
        onDelete: "cascade"
      })
    }
  return Customer
}
