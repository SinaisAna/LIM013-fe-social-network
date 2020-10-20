import loginTemplate from './login.js';
import signUpTemplate from './signup.js';
// eslint-disable-next-line import/named
import { homeTemplate } from './home.js';
import { profileTemplate } from './profile.js';
import errorPage from './404.js';

// Create object

const components = {
  loginTemplateProp: loginTemplate,
  signUpTemplateProp: signUpTemplate,
  homeTemplateProp: homeTemplate,
  profileTemplateProp: profileTemplate,
  errorPageProp: errorPage,
};

export { components };
