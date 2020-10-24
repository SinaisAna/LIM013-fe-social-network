// eslint-disable-next-line import/named
import { createUserDB } from '../firebase/firestore.js';
import { createUserAccount } from '../firebase/auth.js';

const imgProfileUserDefault = '../img/userProfile.png';

export const createUser = (email, password, name, lastname, firstname) => {
  createUserAccount(email, password)
    .then((res) => {
      window.location.hash = '#/home';
      createUserDB(res.user.uid, email, imgProfileUserDefault, name, lastname, firstname);
    })
    .catch((error) => {
      const errorCode = error.code;
      const alertSignup = document.querySelector('#alertSignup');
      switch (errorCode) {
        case 'auth/email-already-in-use':
          alertSignup.innerHTML = 'Ya existe una cuenta con este correo';
          break;
        case 'auth/invalid-email':
          alertSignup.innerHTML = 'Ingrese un correo válido (por ejemplo alguien@example.com)';
          break;
        case 'auth/operation-not-allowed':
          alertSignup.innerHTML = 'Comuníquese con el Administrador';
          break;
        case 'auth/weak-password':
          alertSignup.innerHTML = 'La clave debe ser de mínimo 6 dígitos';
          break;
        default:
          alertSignup.innerHTML = 'Ha ocurrido un error inesperado';
          break;
      }
    });
};
