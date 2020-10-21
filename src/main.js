//  Import firebase initialize
import { auth } from './lib/firebase/auth.js';
import { firebaseInit } from './lib/firebase/firebase-init.js';
import { changeTemplate } from './lib/view-controller/router.js';
// Webpage load and reload function
const init = () => {
  firebaseInit();
  auth().onAuthStateChanged(() => {
    changeTemplate(window.location.hash);
    window.addEventListener('hashchange', () => changeTemplate(window.location.hash));
  });
};
window.addEventListener('load', init);
