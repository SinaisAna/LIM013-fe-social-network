import MockFirebase from 'mock-cloud-firestore';

import {
  addNotesToDB, allPosts, deletePost, editTextPost, addcommentsToDB, readComments,
} from '../src/lib/firebase/firestore.js';

const fixtureData = {
  __collection__: {
    publications: {
      __doc__: {
        a01: {
          creatorID: '46643',
          creatorName: 'ana',
          note: 'hola gamers',
          date: '',
          mode: '',
          photo: '',
          likes: ['user01', 'user02'],
          images: '',
        },
        a02: {
          creatorID: '77755',
          creatorName: 'sora',
          note: 'hola stream',
          date: '',
          mode: '',
          photo: '',
          likes: ['user01', 'user02'],
          images: '',
        },
      },
    },
    comments: {
      __doc__: {
        comments001: {
          creatorID: '77755',
          photoUsers: '',
          comment: 'grito de guerra',
          date: '',
          postsID: '',
          userName: 'ana',
        },
      },
    },
  },
};
global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

describe('create note', () => {
  it('Deberia de poder agregar  note', (done) => addNotesToDB('', '', 'Hola Comuinidad', '', '', '', '[]', '').then(() => {
    const callback = (note) => {
      console.log(note);
      const result = note.find(
        (element) => element.note === 'Hola Comuinidad',
      );
      expect(result.note).toEqual('Hola Comuinidad');
      done();
    };
    allPosts(callback);
  }));
});
describe('update note', () => {
  it('Deberia de poder actualizar note ', (done) => editTextPost('a02', 'hola stream').then(() => {
    const callback = (note) => {
      console.log(note);
      const result = note.find((element) => element.id === 'a02');
      expect(result.note).toBe('hola stream');
      done();
    };
    allPosts(callback);
  }));
});
describe('delete note', () => {
  it('Deberia de poder eliminar un note', (done) => deletePost('a02').then(() => {
    const callback = (note) => {
      console.log(note);
      const result = note.find((element) => element.id === 'a02');
      expect(result).toBe(undefined);
      done();
    };
    allPosts(callback);
  }));
});
describe('create comments', () => {
  it('Deberia de poder agregar comentarios según post', (done) => addcommentsToDB('', 'grito de guerra', '', 'a01', '', 'ana').then(() => {
    const callback = (comment) => {
      console.log(comment);
      const result = comment.find(
        (element) => element.comment === ('grito de guerra'),
      );
      expect(result.comment).toBe('grito de guerra');
      done();
    };
    readComments(callback, 'a01');
  }));
});
