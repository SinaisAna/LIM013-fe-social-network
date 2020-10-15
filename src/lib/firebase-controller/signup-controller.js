import { createUserDB } from '../firebase/firestore.js';
import { createUserAccount } from '../firebase/auth.js';

const imgProfileUserDefault = '../img/userProfile.png';

export const createUser = (email, password, name) => {
  createUserAccount(email, password)
    .then((res) => {
      window.location.hash = '#/home';
      createUserDB(res.user.uid, email, imgProfileUserDefault, name);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/invalid-email' || errorCode === 'auth/weak-password') {
        throw errorMessage;
      }
    });
};
