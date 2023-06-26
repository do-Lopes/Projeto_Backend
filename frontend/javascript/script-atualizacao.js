function criarCategorias(dados){
    const CategorySelector = document.getElementById('category-select')

    dados.forEach(dado => {
        const option = document.createElement('option')
        option.className = dado.name
        option.innerHTML = dado.name
        option.value = dado.id

        CategorySelector.appendChild(option)
    })    
}

function criarSeletores(dados){
    const ArticleSeletor = document.getElementById('main-select')

    dados.forEach(dado => {
        const option = document.createElement('option')
        option.className = dado.name
        option.innerHTML = dado.name
        option.value = dado.id

        ArticleSeletor.appendChild(option)
    })    
}

function carregarCategorias(){
    axios.get('http://localhost:3000/categories')
    .then(res => criarCategorias(res.data))
}

function carregarArtigos(){
    axios.get('http://localhost:3000/user/' + userData + '/articles')
    .then(res => criarSeletores(res.data))
}

var userData = localStorage.getItem('userData')

document.addEventListener('onload', carregarCategorias(), carregarArtigos())

const form = document.getElementById('Form')

form.addEventListener('submit', async function(event){


    event.preventDefault();
    const oldArticle = document.getElementById('main-select').value
    const categoryId = document.getElementById('category-select').value
    const nome = document.getElementById('name').value
    const description = document.getElementById('description').value
    const content = document.getElementById('content').value

    const articleData = {
        id: oldArticle,
        name: nome,
        description: description,
        content: content,
        userId: userData,
        categoryId: categoryId,
    }

    await axios.put('http://localhost:3000/articles/' + oldArticle + '', articleData)
    .then(res => {
    window.location.href = 'main-page.html'})
    .catch(err => alert('cadastro deu errado'));
    form.reset();

})