let signInForm = document.querySelector('.sign-in-form');
let registerForm = document.querySelector('.register-form');

signInForm.addEventListener('submit', function(e){
    e.preventDefault();
    let email = document.querySelector('#sign-in-email').value;
    let password = document.querySelector('#sign-in-password').value;
    fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    }).then((response) => {
        if(response.status === '400'){
            return new Error();
        }
        return response.json();
    }).then((data) => {
        window.location.href = data.redirectURL
    }).catch(() => alert('Wrong email or password!'));   
})

registerForm.addEventListener('submit', function(e){
    e.preventDefault();
    let email = document.querySelector('#register-email').value;
    let password = document.querySelector('#register-password').value;
    let rePassword = document.querySelector('#register-re-enter-password').value;
    if(password !== rePassword){
        alert('Passwords do not match!')
        return;
    }
    fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    }).then((response) => response.text())
    .then((data) => alert(data));   
})