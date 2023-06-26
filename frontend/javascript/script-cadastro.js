function criarSeletores(dados){
    const seletor = document.getElementById('main-select')

    dados.forEach(dado => {
        const option = document.createElement('option')
        option.className = option.name
        option.innerHTML = dado.name
        option.value = dado.id

        seletor.appendChild(option)
    })    
}

function carregarDados(){
    axios.get('http://localhost:3000/categories')
    .then(res => criarSeletores(res.data))
}


document.addEventListener('onload', carregarDados())

var userData = localStorage.getItem('userData')

const form = document.getElementById('Form')

form.addEventListener('submit', async function(event){

    event.preventDefault();

    const categoryId = document.getElementById('main-select').value
    const nome = document.getElementById('name').value
    const description = document.getElementById('description').value
    const content = document.getElementById('content').value

    const articleData = {
        name: nome,
        description: description,
        content: content,
        userId: userData,
        categoryId: categoryId,
    }

    await axios.post('http://localhost:3000/articles', articleData)
    .then(res => {
    window.location.href = 'main-page.html'})
    .catch(err => alert('cadastro deu errado'));
    form.reset();
})