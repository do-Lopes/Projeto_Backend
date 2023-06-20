const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    function ValidaTamanho(valor, msg) {
        if(!valor || (Array.isArray(valor) && valor.lenght === 0) || typeof valor === 'string' && !valor.trim()){
            throw msg
        }
    }

    function ValidaRepetição(valor, msg){
        try{
            ValidaTamanho(valor, msg)
        } catch(msg){
            return
        }
        throw msg
    }

    function ValidaIgualdade(valorA, valorB, msg){
        if(valorA !== valorB){
            throw msg       
        }        
    }

    function getPaginacao(page, size){
        const limit = size ? +size : 10
        const offset = page ? page * limit : 0
        return { limit, offset }
    }

    function EncryptSenha (password){
        const nonce = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, nonce)
      }

    return {ValidaTamanho, ValidaRepetição, ValidaIgualdade, getPaginacao, EncryptSenha}
}