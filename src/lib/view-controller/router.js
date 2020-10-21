// eslint-disable-next-line import/named
import { auth } from '../firebase/auth.js';
import { readUserDB, readAddNotesToDB, readAddNotesToDBP } from '../firebase/firestore.js';
import { components } from '../views/components.js';

// eslint-disable-next-line consistent-return
const changeTemplate = (hash) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  // eslint-disable-next-line no-console
  console.log(hash);
  switch (hash) {
    case '':
    case '#':
    case '#/':
    { return container.appendChild(components.loginTemplateProp()); }
    case '#/login':
    { return container.appendChild(components.loginTemplateProp()); }
    case '#/signup':
    { return container.appendChild(components.signUpTemplateProp()); }
    case '#/profile':
    case '#/edit':
    case '#/home':
    {
      auth().onAuthStateChanged((user) => {
        if (user) {
          readUserDB(user.uid)
            .then((querySnapshot) => {
              querySnapshot.forEach((refDoc) => {
                if (hash === '#/home') {
                  readAddNotesToDB((posts) => {
                    // eslint-disable-next-line no-shadow
                    const user = refDoc.data();
                    container.innerHTML = '';
                    return container.appendChild(components.homeTemplateProp(user, posts));
                  });
                } else {
                  readAddNotesToDBP((posts) => {
                    // eslint-disable-next-line no-shadow
                    const user = refDoc.data();
                    container.innerHTML = '';
                    // eslint-disable-next-line max-len
                    return container.appendChild(components.profileTemplateProp(user, posts, refDoc.id));
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
      return container.appendChild(components.errorPageProp());
  }
};

export { changeTemplate };
