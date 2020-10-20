import { logOut } from '../firebase/auth.js';
import { createUser } from '../firebase-controller/signup-controller.js';

export default () => {
  const viewSignUp = document.createElement('section');
  viewSignUp.classList = 'registerPhoto';
  viewSignUp.innerHTML = `
    <form id="signup-form">
    <img src="img/cuy.png" class="cuyo">
    <h1 class="register">Regístrate</h1>
      <input type="text" id="signup-name" class="signup-form" placeholder="Nombre" >
      <input type="text" id="signup-last-name" class="signup-form" placeholder="Apellidos" >
      <input type="email" id="signup-email" class="signup-form" placeholder="Email" required>
      <input type="text" id="signup-user-name" class="signup-form" placeholder="Nombre de usuario">
      <input type="password" id="signup-password" class="signup-form" placeholder="Contraseña">
      <input type="password" id="signup-confirm-password" class="signup-form" placeholder="Confirmar contraseña" required>
      <button type="submit" id="signup-submit" class="submit-form">Enviar</button>
      <button type="button" id="btn-logout">Volver</button>
    </form>
    `;

  // Start grabbing our DOM Element
  const signUpEmail = viewSignUp.querySelector('#signup-email');
  const signupConfirmPassword = viewSignUp.querySelector('#signup-confirm-password');
  const signUpForm = viewSignUp.querySelector('#signup-form');
  const sigOut = viewSignUp.querySelector('#btn-logout');
  const userName = viewSignUp.querySelector('#signup-user-name');
  const lastName = viewSignUp.querySelector('#signup-last-name');
  const name = viewSignUp.querySelector('#signup-name');
  // Event submit to create a user account
  signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const signUpEmailVal = signUpEmail.value;
    const signupConfirmPasswordVal = signupConfirmPassword.value;
    const userNameVal = userName.value;
    const lastNameVal = lastName.value;
    const nameVal = name.value;

    createUser(signUpEmailVal, signupConfirmPasswordVal, userNameVal, lastNameVal, nameVal);

    // Clear the form
    signUpForm.reset();
  });

  sigOut.addEventListener('click', () => {
    logOut()
      .then(() => {
        window.location.hash = '#/login';
      })
      .catch((error) => {
        if (error) throw error;
      });
  });
  return viewSignUp;
};
