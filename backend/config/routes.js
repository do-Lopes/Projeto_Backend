const { getById } = require('../services/articleServices')
const admin = require('./admin')

module.exports = app => {

    app.post('/signup', app.controller.userAPI.save)
    app.post('/signin', app.controller.auth.signin)
    app.post('/validateToken', app.controller.auth.validateToken)

    app.route('/install')
        .get(app.controller.instaladorAPI.inic)
    
    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(admin(app.controller.userAPI.save))
        .get(admin(app.controller.userAPI.get))

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .get(admin(app.controller.userAPI.getById))
        .put(admin(app.controller.userAPI.save))
        .delete(admin(app.controller.userAPI.remove))

    app.route('/categories')
        .all(app.config.passport.authenticate())
        .post(admin(app.controller.categoryAPI.save))
        .get(admin(app.controller.categoryAPI.get))

    app.route('/categories/:id')
        .all(app.config.passport.authenticate())
        .get(app.controller.categoryAPI.getById)
        .put(admin(app.controller.categoryAPI.save))
        .delete(admin(app.controller.categoryAPI.remove)) 
    
    app.route('/articles')
        .all(app.config.passport.authenticate())
        .get(admin(app.controller.articleAPI.get))
        .post(admin(app.controller.articleAPI.save) )       

    app.route('/articles/:id')
        .all(app.config.passport.authenticate())
        .get(app.controller.articleAPI.getById)
        .put(admin(app.controller.articleAPI.save))        
        .delete(admin(app.controller.articleAPI.remove))

    app.route('/categories/:id/articles')
        .all(app.config.passport.authenticate())
        .get(app.controller.articleAPI.getByCategoryId)
    
}