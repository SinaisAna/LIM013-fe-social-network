import { readUsercurrentDB } from '../firebase/firestore.js';
import { components } from '../views/components.js';

// Change Template

const changeTemplate = (hash) => {
  // const id = hash.split('/')[1];
  const container = document.getElementById('container');
  container.innerHTML = '';

  switch (hash) {
    case '':
    case '#':
    case '#/':
    { return container.appendChild(components.loginTemplateProp()); }
    case '#/login':
    { return container.appendChild(components.loginTemplateProp()); }
    case '#/signup':
    { return container.appendChild(components.signUpTemplateProp()); }
    case '#/home':
    { const user = firebase.auth().currentUser;
      return readUsercurrentDB()
        .then((querySnapshot) => {
          querySnapshot.forEach((refDoc) => {
            const user = refDoc.data();
            container.innerHTML = '';
            container.appendChild(components.profileTemplateProp(user));
  // aqui no puedo poner esa importacion debo llevarla a otro lado genial        
          });
      });
      //return readUserDB(user.uid)
      //return readAddNotesToDB((data) => {
      // console.log(data);
        //container.innerHTML = '';
        //container.appendChild(components.profileTemplateProp(data));
      //});
    }
    default:
      return container.appendChild(components.errorPageProp());
  }
};

export { changeTemplate };
