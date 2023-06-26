function criarBotoes(dados) {
  const buttons = document.getElementById('buttons');

  dados.forEach(dado => {
  const botao = document.createElement('button');

  botao.innerText = dado.name;
  botao.value = dado.id;
  botao.className = "article-buttons";
  botao.setAttribute('onclick', 'redireciona("'+ botao.value +'")')
  buttons.appendChild(botao);
  });
}

function carregarDados() {
  axios.get('http://localhost:3000/categories')
    .then(res => criarBotoes(res.data))
    .catch(error => console.error(error));
}

function redireciona(id){
    axios.get('http://localhost:3000/categories/' + id + '/articles')
    .then(sucesso => cardCreator(sucesso.data))
}

function cardCreator(dados){
    const main = document.getElementById('main-content')
    if(main.hasChildNodes()){
      while (main.firstChild) {
        main.removeChild(main.firstChild);
      }
    }

    dados.forEach(dado => {
      axios.get('http://localhost:3000/users/' + dado.userId)
      .then(user => {
      user = user.data
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

      const autor = document.createElement('p')
      autor.className = 'autor'
      autor.innerHTML = "Autor: " + user.name

      article.appendChild(title)
      article.appendChild(description)
      article.appendChild(content)
      article.appendChild(autor)

      main.appendChild(article)
      })
    })
}

document.addEventListener('onload', carregarDados())

