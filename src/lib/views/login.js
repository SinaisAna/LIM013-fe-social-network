// import { loginUser } from '../firebase/auth.js';
import { loginGoogle, loginFacebook, loginWithEmailAndPassword } from '../firebase-controller/login-controller.js';
// import { readUserDB } from '../firebase/firestore.js';

export default () => {
  const viewLogin = document.createElement('main');
  viewLogin.innerHTML = `
    <figure>
    <img src="img/Queen.gif" class="light-bulb" alt="icono">
    </figure>
    <section class="login-style">
    <img src="img/cuy.png" class="cuye" width="50px" heigth="50px">
    <img src="img/mirana.png" class="mirana">
      <h1 class="fonts">Comunidad Dota</h1>
      <h3 class="welcome">¡Bienvenid@, Doteros!</h3>
      <form id="login-form">
        <input type="text" id="txt-email" class="input" placeholder="Nombre de usuario o Email">
        <p id="alert-txt-email"></p>
        <input type="password" id="txt-password" class="input" placeholder="Contraseña">
        <p id="alert-txt-password"></p>
        <button type="submit" class="btn-login" id="btn-login" >Iniciar Sesión</button>
      </form>
      <div class="container-login">
      <p class="alternative">O bien ingresa con..</p>
    <section class="btn-google-facebook">
      <button id="btn-google" class="btn-image"><img src="./img/icon-google.png" width="50px" heigth="50px"></button>
      <button id ="btn-facebook"class="btn-image"><img src="./img/icon-facebook.png" width="50px" heigth="50px"></button>
    </section>
    <div class="registerUser">
    <p>¿No tienes una cuenta?<a href="#/signup" id = "btn-register" class="btn-register">Regístrate</a></p>
    </div>
    </section>
    </div>
    `;

  // Start grabbing our DOM Element
  const txtEmail = viewLogin.querySelector('#txt-email');
  const txtpassword = viewLogin.querySelector('#txt-password');
  const loginForm = viewLogin.querySelector('#login-form');

  // Event submit to user login
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const txtEmailVal = txtEmail.value;
    const txtpasswordVal = txtpassword.value;
    console.log('paso');

    loginWithEmailAndPassword(txtEmailVal, txtpasswordVal);
    // Clear the login form
    loginForm.reset();
  });

  // Sign in with google
  viewLogin.querySelector('#btn-google').addEventListener('click', () => {
    // event.preventDefault();
    // console.log('hola entre aqui');
    loginGoogle();
  });

  // Sign in with facebook
  viewLogin.querySelector('#btn-facebook').addEventListener('click', (event) => {
    event.preventDefault();
    // console.log("Hola ingresaste a Facebook");
    loginFacebook();
  });
  return viewLogin;
};
