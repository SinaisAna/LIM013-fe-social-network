import { createUserDB } from '../firebase/firestore.js';

export const userInformationDB = (birthday, occupation, hobbies) => {
  createUserDB(birthday, occupation, hobbies)
    .then(() => {
      console.log('information new');
    });
};
