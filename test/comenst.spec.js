import MockFirebase from 'mock-cloud-firestore';

import {
  readAddNotesToDB, addNotesToDB,
} from '../src/lib/firebase/firestore.js';

const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        a01: {
          uid: 'user1',
          user: 'Mariana',
          url: '',
          privacy: '0',
          photo: '',
          likes: [],
          email: '',
          datetime: '202051919282',
          date: '19/5/2020',
          content: 'Probando post',
        },
        a02: {
          uid: 'user2',
          user: 'Edward',
          url: '',
          privacy: '1',
          photo: '',
          likes: [],
          email: '',
          datetime: '202051919282',
          date: '19/5/2020',
          content: 'Probando post',
        },
      },
    },
  },
};
global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

describe('Publicar post', () => {
  // eslint-disable-next-line no-unused-vars
  it('Debería poder publicar un post', (done) => addNotesToDB('user3', 'Mirella', '', '0', '', 'prueba hola', '', '', '', [])
    .then(() => {
      const callback = (posts) => {
        const result = posts.find((element) => element.content === 'prueba hola');
        // eslint-disable-next-line no-console
        console.log(result);
        expect(result.user).toBe('user3');
        done();
      };
      readAddNotesToDB(callback);
    }));
});
