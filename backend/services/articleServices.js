const { Article } = require('../model/Article')

module.exports = {

    listLimit: async function(limit, offset) {
        return await Article.findAll({
            limit: limit,
            offset: offset
          });
    },

    list: async function() {
        const articles = await Article.findAll()
        return articles        
    },
    
    
    save: async function(name, description, categoryId, userId, content) {
        return await Article.create({
            name: name,
            description: description,
            content: content,
            categoryId: categoryId,
            userId: userId            
        })
    },

    update: async function(id, name, description, categoryId, userId, content) {
        await Article.update({
            name: name,
            description: description,
            content: content,
            categoryId: categoryId,
            userId: userId
        }, {
            where: { id: id }
        })
    },

    delete: async function(id) {
        return await Article.destroy({where: { id: id }})
    },

    getByUserId: async function(id){
        return await Article.findAll({where: {userId: id} })
    },

    getById: async function(id) {
        return await Article.findOne({where: {id: id} })
    },

    getByCategoryId: async function(id){
        return await Article.findAll({where: {categoryId: id} })
    }
}