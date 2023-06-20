const app = require('express')()
const consign = require('consign')

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./config/validation.js')
    .then('./controller')
    .then('./config/routes.js')
    .into(app)

app.listen(3000, () => {
    console.log('Backend ativo..')
})