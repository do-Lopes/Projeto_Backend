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

function carregarArtigos(){
    axios.get('http://localhost:3000/user/' + userData + '/articles')
    .then(res => criarSeletores(res.data))
}

function cardCreator(dado){
    const main = document.getElementById('main-content')
    if(main.hasChildNodes()){
      while (main.firstChild) {
        main.removeChild(main.firstChild);
      }
    }

      const article = document.createElement('div')
      article.className = 'Article'

      const title = document.createElement('h1')
      title.className = 'titulo'
      title.innerHTML = dado.name
      
      const description = document.createElement('h2')
      description.className = 'description'
      description.innerHTML = dado.description

      const content = document.createElement('p')
      content.className = 'content'
      content.innerHTML = dado.content

      article.appendChild(title)
      article.appendChild(description)
      article.appendChild(content)
      main.appendChild(article)
}

var userData = localStorage.getItem('userData')

document.addEventListener('onload', carregarArtigos())

const button = document.getElementById('confirmar')


button.addEventListener('click', async function(event){
    event.preventDefault();
    var id = document.getElementById('main-select').value
    await axios.get('http://localhost:3000/articles/' + id)
        .then(sucesso => cardCreator(sucesso.data))
})


const form = document.getElementById('Form')

form.addEventListener('submit', async function(event){

    event.preventDefault();
    var id = document.getElementById('main-select').value

    const articleData = {
        id: id
    }

    await axios.delete('http://localhost:3000/articles/' + id)
    .then(res => {
    window.location.href = 'main-page.html'})
    .catch(err => alert('remoção deu errado'));
})