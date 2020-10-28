//  Import firebase initialize
// import { auth } from './lib/firebase/auth.js';
import { firebaseInit } from './lib/firebase/firebase-init.js';
import { changeTemplate } from './lib/view-controller/router.js';
// Webpage load and reload function
// TODO onAuthStagedChange
const onAuth = () => {
  firebaseInit();
  firebase.auth().onAuthStateChanged((user) => {
    let route = null;
    if (user) {
      // console.log(user);
      // console.log('usuario logeado');
      if (user.emailVerified !== false) {
        if (window.location.hash !== '#/login') {
          route = window.location.hash;
        } else {
          route = '#/home';
        }
      }
      if (user.emailVerified === false) {
        // console.log('usuario logeado pero email no verificado');
      }
      // User is signed in.
    } else {
      // No user is signed in.
      route = '#/login';
      // console.log(route);
      // console.log('usuario no logeado');
    }
    // window.location.hash = route;
    changeTemplate(route);
  });
};

const init = () => {
  onAuth();

  changeTemplate(window.location.hash);
  window.addEventListener('hashchange', () => changeTemplate(window.location.hash));

};
window.addEventListener('load', init);
