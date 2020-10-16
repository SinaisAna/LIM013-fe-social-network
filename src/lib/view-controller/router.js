import { readUserDB,readAddNotesToDB ,readAddNotesToDBP} from '../firebase/firestore.js';
import { components } from '../views/components.js';


const changeTemplate = (hash) => {
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
    case '#/profile':
    case '#/home':
    {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          readUserDB(user.uid)
          .then((querySnapshot) => {
            querySnapshot.forEach((refDoc) => {
              if(hash=='#/home'){
                readAddNotesToDB((posts) => {
                  const user = refDoc.data();               
                  container.innerHTML = '';
                  return container.appendChild(components.profileTemplateProp(user,posts));
                });
              }else{
                readAddNotesToDBP((posts) => {
                  const user = refDoc.data();               
                  container.innerHTML = '';
                  return container.appendChild(components.profileTemplateProp(user,posts));
                },user.uid);
              }
              
            });
        });
          
          
          
        } else {
          window.location.hash='#/login';
        }
      });
      
    }
    default:
      return container.appendChild(components.errorPageProp());
  }
};

export { changeTemplate };
