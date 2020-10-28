// eslint-disable-next-line import/named
import { auth } from '../firebase/auth.js';
import { readUserDB, readAddNotesToDB, readAddNotesToDBP } from '../firebase/firestore.js';
import { components } from '../views/components.js';

// eslint-disable-next-line consistent-return
export const changeTemplate = (route) => {
  window.location.hash = route;
  const container = document.getElementById('container');
  container.innerHTML = '';
  let routeSelected = '';
  // eslint-disable-next-line no-console
  console.log(route);
  switch (route) {
    case '':
    case '#':
    case '#/':
      routeSelected = container.appendChild(components.loginTemplateProp());
      break;
    case '#/login':
      routeSelected = container.appendChild(components.loginTemplateProp());
      break;
    case '#/signup':
      // eslint-disable-next-line no-unused-vars
      routeSelected = container.appendChild(components.signUpTemplateProp());
      break;
    case '#/profile':
    case '#/edit':
    case '#/home':
    {
      auth().onAuthStateChanged((user) => {
        if (user) {
          readUserDB(user.uid)
            .then((querySnapshot) => {
              querySnapshot.forEach((refDoc) => {
                if (route === '#/home') {
                  readAddNotesToDB((posts) => {
                    // eslint-disable-next-line no-shadow
                    const user = refDoc.data();
                    container.innerHTML = '';
                    routeSelected = container.appendChild(components.homeTemplateProp(user, posts));
                  });
                } else {
                  readAddNotesToDBP((posts) => {
                    // eslint-disable-next-line no-shadow
                    const user = refDoc.data();
                    container.innerHTML = '';
                    // eslint-disable-next-line max-len
                    routeSelected = container.appendChild(components.profileTemplateProp(user, posts, refDoc.id));
                  }, user.uid);
                }
              });
            });
        } else {
          window.location.hash = '#/login';
        }
      });
      break;
    }
    // eslint-disable-next-line no-fallthrough
    default:
      routeSelected = container.appendChild(components.errorPageProp());
  }
  return routeSelected;
};
