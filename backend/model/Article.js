const { DataTypes } = require("sequelize")
const sequelize = require('../config/db')
const { User } = require('./User')
const { Category } = require('./Category')

const Article = sequelize.define('Article', {
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
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content:{
        type: DataTypes.TEXT,
        allowNull: false
    },
}, 
{
    timestamps: false
},

)

Article.belongsTo(User, {
    constraint: true,
    foreignKey: "userId"
})

Article.belongsTo(Category, {
    constraint: true,
    foreignKey: "categoryId"
})

User.hasMany(Article, {foreignKey: "userId"})

Category.hasMany(Article, {foreignKey: "categoryId"})

module.exports = { Article }