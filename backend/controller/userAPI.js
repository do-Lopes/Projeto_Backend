const userService = require('../services/userServices')
const articleServices = require('../services/articleServices')

module.exports = app => {

    const {ValidaTamanho, ValidaRepetição, ValidaIgualdade, EncryptSenha} = app.config.validation

    const save = async(req, res) => {
        const usuario = { ...req.body }

        if(req.params.id) {
            usuario.id = req.params.id
        }

        if(!req.originalUrl.startsWith('/users')){
            usuario.admin = false
        }
        if(!req.usuario || !req.usuario.admin){
            usuario.admin = false
        }

        try{
            ValidaTamanho(usuario.name, "Nome não informado")
            ValidaTamanho(usuario.email, "Email não informado")
            ValidaTamanho(usuario.password, "Senha não informada")
            ValidaTamanho(usuario.confirmPassword, "Confirmação de senha inválida")
            ValidaIgualdade(usuario.password, usuario.confirmPassword, "Senhas incompatíveis")

            const usuarioResgatado = await userService.getByEmail(usuario.email)
            
            if(!usuario.id){
                ValidaRepetição(usuarioResgatado, 'Usuario ja cadastrado')
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }
        
        usuario.password = EncryptSenha(usuario.password)
        delete usuario.confirmPassword    
                
        if(usuario.id){
            userService.update(usuario.id, usuario.name, usuario.email, usuario.password, usuario.admin ).then(_ => res.status(204).send()).catch(err => res.status(500).send(err))
        }else{
            userService.save(usuario.name, usuario.email, usuario.password, usuario.admin ).then(_ => res.status(204).send()).catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        userService.list().then(users => res.json(users)).catch(err => res.status(500).send(err))
    }

    const remove = async(req, res) => {
        try {
            const artigos = await articleServices.getByUserId(req.params.id)
            ValidaRepetição(artigos, 'Usuário possui artigos.')

            const usuario = await userService.delete(req.params.id)
            ValidaTamanho(usuario, 'Usuário não foi encontrado.')

            if(usuario.admin) res.status(400).send("Usuario administador não pode ser removido")
                
            res.status(204).send()
            
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    const getById = (req, res) => {
        userService.getById(req.params.id).then(user => res.json(user)).catch(err => res.status(500).send(err))
    }

    return { save, get, remove, getById }
}