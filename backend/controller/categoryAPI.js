const categoryServices = require('../services/categoryServices')
const articleServices = require('../services/articleServices')

module.exports = app => {
    const {ValidaTamanho, ValidaRepetição, ValidaIgualdade} = app.config.validation

    const save = (req, res) => {
        const categoria = { ...req.body }

        if(req.params.id){
            categoria.id = req.params.id
        }

        try{
            ValidaTamanho(categoria.name, "Nome não informado")
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
            ValidaTamanho(req.params.id, "codigo de categoria não informado")

            const subcategoria = await categoryServices.getById(req.params.categoryId)

            ValidaRepetição(subcategoria, 'Categoria possui subcategorias')

            const articles = await articleServices.getById(req.params.id)

            ValidaRepetição(articles, "Categoria possui artigos")

            const catApagada = await categoryServices.remove(req.params.id)

            ValidaTamanho(catApagada, "Categoria nao encontrada")

            res.status(204).send()
        } catch {
            res.status(400).send(msg)
        }
    }
    
//verificar aki
    const ComCaminho = categories => {
        const getParente = (categories, categoryId) => {
            const parente = categories.filter(parente => parente.id === categoryId)
            return parente.length ? parente[0] : null
        }

        const categoriasComCaminho = categories.map(categoria => {
            let caminho = categoria.name
            let parente = getParente(categories, categories.categoryId)

            while(parente){
                caminho = `${parente.name} > ${path}`
                parente = getParente(categories, parente.categoryId)
            }

            return { ...categoria, caminho }
        })

        categoriasComCaminho.sort((a, b) => {
            if(a.caminho < b.caminho) return -1
            if(a.caminho > b.caminho) return 1
            return 0
        })

        return categoriasComCaminho
    }

    // const get = (req, res) => {
    //     categoryServices.list().then(categories => res.json(ComCaminho(categories))).catch(err => res.status(500).send(err))
    // }

    const get = (req, res) => {
        categoryServices.list().then(categories => res.json(categories)).catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        categoryServices.getById(req.params.id).then(categoria => res.json(categoria)).catch(err => res.status(500).send(err))
    }

    // const toTree = (categories, tree) => {
    //     if(!tree){
    //         tree = categories.filter(c => !c.parentId)
    //     }
    //         tree = tree.map(parentNode => {
    //             const filho = node => node.parentId == parentNode.id
    //             parentNode.children = filho(categories, categories.filter(filho))
    //             return parentNode
    //         })
    //         return tree      
    // }

    // const getTree = (req, res) => {
    //     app.db('categories')
    //         .then(categories => res.json(toTree(categories)))
    //         .catch(err => res.status(500).send(err))
    // }


    


    // return {save, remove, get, getById, getTree}

    return {save, get, getById,remove}

}