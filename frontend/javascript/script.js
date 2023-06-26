const form = document.getElementById('loginForm');

form.addEventListener('submit', async function(event) {
  localStorage.clear();
  event.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  const userData = {
    email: email,
    password: senha
  };


  await axios.post('http://localhost:3000/signin', userData)
  .then(res => {
    localStorage.setItem('userData', JSON.stringify(res.data.id))
    window.location.href = 'main-page.html'})
  .catch(err => alert('Email ou Senha inválidos'));
  form.reset();
});
