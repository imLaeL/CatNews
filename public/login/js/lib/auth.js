function isAuthenticated() {
    if (!getToken()) {
        window.location.href = '/login/signin.html';
    } else {
        return true;
    }
}

function getToken() {
    return localStorage.getItem('@cat-news:token');
}

function signin(token) {
    localStorage.setItem('@cat-news:token', token);

    window.location.href = '/prevencoes-castracao/submeter-clinica/index.html';
}

function signout() {
    localStorage.removeItem('@cat-news:token');

    window.location.href = '/login/signin.html';
}

export default { isAuthenticated, getToken, signin, signout };