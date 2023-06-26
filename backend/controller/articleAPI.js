const articleServices = require('../services/articleServices')

module.exports = app => {
    const {ValidaNaoNulo, getPaginacao} = app.config.validation

    const save = (req, res) => {
        const artigo = { ...req.body }
        if(req.params.id) {
            artigo.id = req.params.id
        }

        try{

            ValidaNaoNulo(artigo.name, "Nome não informado")

            ValidaNaoNulo(artigo.description, "Descrição não informada")
            
            ValidaNaoNulo(artigo.categoryId, "Categoria não informada")

            ValidaNaoNulo(artigo.userId, "Autor do artigo não informado")

            ValidaNaoNulo(artigo.content, "Conteudo do artigo não informado")

        } catch (msg){
            res.status(400).send(msg)
        }

        if(artigo.id){
            articleServices.update(artigo.id, artigo.name, artigo.description, artigo.categoryId, artigo.userId, artigo.content).then(_ => res.status(204).send()).catch(err => res.status(500).send(err))
        } else {
            articleServices.save(artigo.name, artigo.description, artigo.categoryId, artigo.userId, artigo.content).then(_ => res.status(204).send()).catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
         try{
            const ArtigoApagado = await articleServices.delete(req.params.id)
            try{
                ValidaNaoNulo(ArtigoApagado, "O artigo não foi encontrado")
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

    const getById = async (req, res) => {
        await articleServices.getById(req.params.id).then(artigos => {return res.json(artigos)}).catch(err => res.status(500).send(err))
    }

    const getByCategoryId = async (req, res) => {
        await articleServices.getByCategoryId(req.params.id).then(artigos => {return res.json(artigos)}).catch(err => res.status(500).send(err))
    }

    const getByUserId = async(req, res) => {
        await articleServices.getByUserId(req.params.id).then(artigos => {return res.json(artigos)}).catch(err => res.status(500).send(err))
    }

    return { save, get, remove, getById, getByCategoryId, getByUserId }
}