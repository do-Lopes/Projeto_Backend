const categoryServices = require('../services/categoryServices')
const articleServices = require('../services/articleServices')

module.exports = app => {
    const {ValidaNaoNulo, ValidaVazio, ValidaIgualdade} = app.config.validation

    const save = (req, res) => {
        const categoria = { ...req.body }

        if(req.params.id){
            categoria.id = req.params.id
        }

        try{
            ValidaNaoNulo(categoria.name, "Nome não informado")
        }catch(msg){
            return res.status(400).send(msg)
        }

        if(categoria.id){
            categoryServices.update(categoria.id, categoria.name, categoria.categoryId).then(_ => res.status(204).send()).catch(err => res.status(500).send(err))
        } else {
            categoryServices.save(categoria.name, categoria.categoryId).then(_ => res.status(204).send()).catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try{
            ValidaNaoNulo(req.params.id, "codigo de categoria não informado")

            const subcategoria = await categoryServices.getById(req.params.categoryId)

            ValidaVazio(subcategoria, 'Categoria possui subcategorias')

            const articles = await articleServices.getById(req.params.id)

            ValidaVazio(articles, "Categoria possui artigos")

            const catApagada = await categoryServices.delete(req.params.id)

            ValidaNaoNulo(catApagada, "Categoria nao encontrada")

            res.status(204).send()
        } catch {
            res.status(400).send(msg)
        }
    }
    
    const get = (req, res) => {
        categoryServices.list().then(categories => res.json(categories)).catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        categoryServices.getById(req.params.id).then(categoria => res.json(categoria)).catch(err => res.status(500).send(err))
    }

    return {save, get, getById, remove}

}