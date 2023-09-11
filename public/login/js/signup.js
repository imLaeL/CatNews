window.handleSubmit = handleSubmit;

const form = document.querySelector('form');

async function handleSubmit(event) {
  event.preventDefault();

  const user = Object.fromEntries(new FormData(form));
  if (
    user.username &&
    user.email &&
    user.password &&
    user.confirmationPassword
  ) {
    const config = {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch('/users', config);

    if (response.ok) {
      location.href = './signin.html';
    } else {
      console.log('Erro no cadastro');
    }
  }
}