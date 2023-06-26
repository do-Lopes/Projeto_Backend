require('dotenv').config();
const userServices = require('../services/userServices')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async ( req, res) => {
        if(!req.body.email || !req.body.password){
            return res.status(400).send('Informe o usuário e a senha')
        }

        const user = await userServices.getByEmail(req.body.email)

        if(!user){
            return res.status(400).send('Usuário não encontrado')
        }

        const validarSenha = bcrypt.compareSync(req.body.password, user.password)
        if(!validarSenha){
            return res.status(401).send("Email ou Senha Inválidos")
        }
        const instancia = Math.floor(Date.now()/1000)

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            iat: instancia,
            exp: instancia + (60 * 60 * 24 * 3)
        }

        res.json({
            ...payload,
            token: jwt.encode(payload, process.env.ACESS_TOKEN_SECRET)
        })
    }    

    const validateToken = async (req, res) => {
        const userData = req.body || null
        try{
            if(userData){
                const token = jwt.decode(userData, process.env.ACESS_TOKEN_SECRET)
                if(new Date(token.exp * 1000) > new Date()){
                    return res.send(true)
                }
            }
        }catch(e){

        }
        res.send(false)
    }    
    return { signin, validateToken }
}