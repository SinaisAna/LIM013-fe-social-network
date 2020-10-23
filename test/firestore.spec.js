import MockFirebase from 'mock-cloud-firestore';

import {
  createUserDB,
  // eslint-disable-next-line import/named
  getUserInformation,
  readUserDB,
  addLike,
  editTextPost,
  readAddNotesToDB,
} from '../src/lib/firebase/firestore';

const fixtureData = {
  __collection__: {
    users: {
      __doc__: {
        abc1d: {
          uid: 'pE6kjzWNn2ULhM3NWsljAP7BV662',
          date: '',
        },

        abc2d: {
          uid: '4sUOueVaQqWcfMkzw0q4FInVkOJ3',
          date: '',
        },

      },
    },
  },
  publications: {
    __doc__: {
      abc1d: {
        note: 'Hello World',
        date: '',
      },

      abc2d: {
        note: 'Good morning',
        date: '',
      },

    },
  },
};

global.firebase = new MockFirebase(fixtureData, {
  isNaiveSnapshotListenerEnabled: true,
});

describe('lista de usuarios', () => {
  it('Debería porder agregar un usuario', (done) => createUserDB('123', 'example24@gmail.com', 'testimail.png', 'ana', 'sinais', 'guandad')
    .then(() => getUserInformation(
      (data) => {
        const result = data.find((users) => users.name === 'ana');
        expect(result.name).toBe('ana');

        done();
      },
    )));
});

describe('readUserDB', () => {
  it('debería ser una función', () => {
    expect(typeof readUserDB).toBe('function');
  });
  it('You should be able to authenticate the email to enter the page at login', () => readUserDB('pE6kjzWNn2ULhM3NWsljAP7BV662')
    .then(() => getUserInformation(
      (data) => {
        const result = data.find((users) => users.uid === 'pE6kjzWNn2ULhM3NWsljAP7BV662');
        expect(result.name).toBe('pE6kjzWNn2ULhM3NWsljAP7BV662');

        // eslint-disable-next-line no-undef
        done();
      },
    )));
});
/*
describe('addLike', () => {
  it('debería ser una función', () => {
    expect(typeof addLike).toBe('function');
  });
  // eslint-disable-next-line max-len
  it('Debería poder dar like con mi usuario logueado', (done) => addLike('9URN4KSD9kw9HKNlo47B',
    'pE6kjzWNn2ULhM3NWsljAP7BV662')
    .then((data) => {
      // eslint-disable-next-line no-undef
      readComments(data.doc.idPost,
        (likes) => {
          const userLikes = likes.find((post) => post.uid === 'pE6kjzWNn2ULhM3NWsljAP7BV662');
          expect(userLikes.idPost).toBe('9URN4KSD9kw9HKNlo47B');
          done();
        });
    }));
});

describe('Edit a post', () => {
  it('Should be able to edit a post', (done) => editTextPost('GJR4GH4f', 'este es un post', '')
  // eslint-disable-next-line no-undef
    .then(() => readAddNotesToDB(
      (data) => {
        const result = data.find((post) => post.content === 'este es un post');
        expect(result.content).toBe('este es un post');
        done();
      },
    )));
});

describe('Delete a post', () => {
  // eslint-disable-next-line no-undef
  it('Should be able to delete a post', (done) => deletePost('GJR4GH4f')
    .then(() => readAddNotesToDB(
      (data) => {
        const result = data.find((post) => post.id === 'GJR4GH4f');
        expect(result).toBe(undefined);
        done();
      },
    )));
});
*/
