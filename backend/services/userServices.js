const { User } = require('../model/User')

module.exports = {

    list: async function() {
        const users = await User.findAll()
        return users
    },
    
    save: async function(name, email, password, admin) {
        return await User.create({
            name: name,
            email: email,
            password: password,
            admin: admin
        })
    },

    update: async function(id, name, email, password) {
        await User.update({
            name: name, 
            email: email, 
            password: password
        }, {
            where: { id: id }
        })
    },

    delete: async function(id) {
        return await User.destroy({where: { id: id }})
    },

    getById: async function(id) {
        return await User.findByPk(id)
    },

    getByEmail: async function(email) {
        return await User.findOne({where: {email: email} })
    }
}