const articleServices = require('../services/articleServices')

module.exports = app => {
    const {ValidaTamanho, ValidaRepetição, ValidaIgualdade, getPaginacao} = app.config.validation

    const save = (req, res) => {
        const artigo = { ...req.body }
        if(req.params.id) {
            artigo.id = req.params.id
        }

        try{
            ValidaTamanho(artigo.name, "Nome não informado")
            ValidaTamanho(artigo.description, "Descrição não informada")
            ValidaTamanho(artigo.categoryId, "Categoria não informada")
            ValidaTamanho(artigo.userId, "Autor não informado")
            ValidaTamanho(artigo.content, "Conteudo não informado")
        } catch (msg){
            res.status(400).send(msg)
        }
        if(artigo.id){
            articleServices.update(artigo.id, artigo.name, artigo.description,artigo.categoryId, artigo.userId, artigo.content).then(_ => res.status(204).send()).catch(err => res.status(500).send(err))
        } else {
            articleServices.save(artigo.name, artigo.description, artigo.categoryId, artigo.userId, artigo.content).then(_ => res.status(204).send()).catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
         try{
            const ArtigoApagado = await articleServices.remove(req.params.id)     
            try{
                ValidaTamanho(ArtigoApagado, "O artigo não foi encontrado")
            } catch (msg) {
                return res.status(400).send(msg)
            }
            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    const get = async (req, res) => {
        const { page, size } = req.query
        const { limit, offset } = getPaginacao(page, size)
        articleServices.listLimit(limit, offset).then(artigos => res.json({ data: artigos, limit })).catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        articleServices.getById(req.params.id).then(artigo => {
            artigo.content = artigo.content.toString()
            return res.json(artigo)})
            .catch(err => res.status(500).send(err))
    }

    const getByCategoryId = (req, res) => {
        articleServices.getByCategoryId(req.params.categoryId).then(artigo => {
            artigo.content = artigo.content.toString()
            return res.json(artigo)})
            .catch(err => res.status(500).send(err))
    }

    return { save, get, remove, getById, getByCategoryId }
}