const sequelize = require("../config/db")
const userService = require('../services/userServices')
const categoryService = require('../services/categoryServices')
const articleService = require('../services/articleServices')

module.exports = app => {
    const inic = async(req, res) => {
        const {EncryptSenha} = app.config.validation
        
        await sequelize.sync({force: true})

        await userService.save("admin","admin@app.com", EncryptSenha("123456"), "true")
        await userService.save("Marcos","marcos@app.com", EncryptSenha("654321"), "false")
        await userService.save("Roberta","roberta@app.com", EncryptSenha("13579"), "false")
        await userService.save("Suelen","suelen@app.com", EncryptSenha("097531"), "false")
        await userService.save("Lopes","lopes@app.com", EncryptSenha("91735"), "false")

        await categoryService.save("VueJS")
        await categoryService.save("React", '2')
        await categoryService.save("Fundamentos do VueJS", '1')
        await categoryService.save("Usabilidade de Blockchain")
        await categoryService.save("Como instalar o React", '2')

        await articleService.save("Artigo de VueJS", "breve descrição do projeto", "1", "1", "Os porques do Vuejs ser utilizado")
        await articleService.save("Artigo de React", "React e suas aplicações", "2", "2", "Como o React é utilizado hoje")
        await articleService.save("Como utilizar o VueJS", "Tutorial de instalação", "3", "3", "Primeiro conecte-se a internet")
        await articleService.save("Artigo de BLockchain", "Sobre a blockchain", "4", "4", "A segurança por trás da blockchain")
        await articleService.save("Como utilizar o VueJS", "Tutorial de intalação", "5", "5", "Entre do site..")
        
        res.status(204).send("Cadastro finalizado")
    }
return { inic }
}
