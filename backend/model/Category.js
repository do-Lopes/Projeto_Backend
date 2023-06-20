const { DataTypes } = require("sequelize")
const sequelize = require('../config/db')

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },       
}, 
{
    timestamps: false
},
)

Category.belongsTo(Category, {
    constraint: true,
    foreignKey: "categoryId"
})

Category.hasMany(Category, {
    foreignKey: "categoryId"
})

module.exports = { Category }