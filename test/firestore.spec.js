import MockFirebase from 'mock-cloud-firestore';

import {
  createUserDB,
  // eslint-disable-next-line import/named
  getUserInformation,
  readUserDB,
  addLike,
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
    _Coleccion_: {
      posts: {
        __doc__: {
          GJR4GH4f: {
            content: 'este es un post',
            likes: [],
            state: 'private',
            creatorName: 'user-a',
            creatorID: '9URN4KSD9kw9HKNlo47B',
            photo: 'photo.jpg',
            image: 'myImagen1.jpg',
          },
        },
      },
    },
  },
};

global.firebase = new MockFirebase(fixtureData, {
  isNaiveSnapshotListenerEnabled: true,
});

describe('lista de usuarios', () => {
  it('Debería porder agregar un usuario', (done) => createUserDB('123', 'example@gmail.com', 'testimail.png', 'ana')
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
describe('addLike', () => {
  it('debería ser una función', () => {
    expect(typeof addLike).toBe('function');
  });
  it('Debería poder dar like con mi usuario logueado', (done) => addLike('9URN4KSD9kw9HKNlo47B', 'pE6kjzWNn2ULhM3NWsljAP7BV662')
    .then((data) => {
      // eslint-disable-next-line no-undef
      readComments(data.doc.idPost,
        (likes) => {
          const userLikes = likes.find((pruebas) => pruebas.uid === 'pE6kjzWNn2ULhM3NWsljAP7BV662');
          expect(userLikes.idPost).toBe('9URN4KSD9kw9HKNlo47B');
          done();
        });
    }));
});
