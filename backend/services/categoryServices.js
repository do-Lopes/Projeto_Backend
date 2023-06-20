const { Category } = require('../model/Category')

module.exports = {

    list: async function() {
        const categories = await Category.findAll()
        return categories
    },
    
    save: async function(name, categoryId) {
        return await Category.create({
            name: name,
            categoryId: categoryId
        })
    },

    update: async function(id, name, categoryId) {
        await Category.update({
            name: name, 
            categoryId: categoryId
        }, {
            where: { id: id }
        })
    },

    delete: async function(id) {
        return await Category.destroy({where: { codigo: id }})
    },

    getById: async function(id) {
        return await Category.findOne({where: {id: id} })
    }

    
}