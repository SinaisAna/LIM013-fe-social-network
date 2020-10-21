import { readUserDB, createUserDB } from '../firebase/firestore.js';
import { singInGoogle, singInFacebook, loginUser } from '../firebase/auth.js';

const readCreateUserDB = (useruid, emailUser, userPhotoUrl, username) => {
  readUserDB(useruid)
    .then((res) => {
      console.log('res', res);
      if (res.empty) {
        createUserDB(useruid, emailUser, userPhotoUrl, username);
      } else {
        res.forEach(() => {
        });
      }
    });
};

export const loginWithEmailAndPassword = (txtEmailVal, txtpasswordVal) => {
  loginUser(txtEmailVal, txtpasswordVal)
    .then((res) => {
      console.log('res');
      readUserDB(res.user.uid)
        .then((querySnapshot) => {
          querySnapshot.forEach((refDoc) => {
            // eslint-disable-next-line no-unused-vars
            const user = refDoc.data();
            // Open home template
            window.location.hash = '#/home';
          });
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/invalid-email' || errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
        throw errorMessage;
      }
    });
};

export const loginGoogle = () => {
  singInGoogle()
    .then((res) => {
      /*
      localStorage.setItem('userID', res.user.uid);
      localStorage.setItem('userName', res.user.displayName);
      localStorage.setItem('userEmail', res.user.email);
      localStorage.setItem('userPhoto', res.user.photoURL);
      */
      console.log('entro aqui');
      window.location.hash = '#/home';
      readCreateUserDB(res.user.uid, res.user.email, res.user.photoURL, res.user.displayName);
    })
    .catch((error) => {
      if (error) throw error;
    });
};

export const loginFacebook = () => {
  singInFacebook()
    .then((res) => {
      window.location.hash = '#/home';
      readCreateUserDB(res.user.uid, res.user.email, res.user.photoURL, res.user.displayName);
    })
    .catch((error) => {
      if (error) throw error;
    });
};
