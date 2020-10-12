import MockFirebase from 'mock-cloud-firestore';

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
};

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

import { createUserDB, getUserInformation, readUserDB, } from '../src/lib/firebase/firestore';

describe('lista de usuarios', () => {
  it('Debería porder agregar un usuario', (done) => {
    return createUserDB('123', 'example@gmail.com', 'testimail.png', 'ana')
      .then(() => getUserInformation(
        (data) => {
          const result = data.find((users) => users.name === 'ana');
          expect(result.name).toBe('ana');
          
          done()
        }
      ))
  });
  
});

describe('readUserDB', () => {
  it('debería ser una función', () => {
    expect(typeof readUserDB).toBe('function');
  });
  it('Debería poder autenticar el email para ingresar a la pagina al iniciar sesion', () => {
     return readUserDB('pE6kjzWNn2ULhM3NWsljAP7BV662')
    .then(() => getUserInformation(
      (data) => {
        const result = data.find((users) => users.uid === 'pE6kjzWNn2ULhM3NWsljAP7BV662');
        expect(result.name).toBe('pE6kjzWNn2ULhM3NWsljAP7BV662');
        
        done()
      }
    ))
    });
  });
/*
it('Deberia poder dar reacción de me gusta en la publicación', (done) => {
  return addLike('pE6kjzWNn2ULhM3NWsljAP7BV662')
    .then(() => readAddNotesToDB(
      (data) => {
        const result = data.find((post) => post.likes === 1);
        expect(result.likes).toBe(1);
        done();
      }, 'userCual'
    ));
});


describe('addLike', () => {
  it('debería ser una función', () => {
    expect(typeof addLike).toBe('function');
  });
  it('Debería poder dar like con mi usuario logueado', (done) => {
    return addLike('pE6kjzWNn2ULhM3NWsljAP7BV662', 'anaguanda20@gmail.com')
      .then((data) => {
        getAllLikesPost(data._data.postId,
          (likes) => {
            const userLikes = likes.find((user) => user.userName === 'anaguanda20@gmail.com');
            expect(userLikes.postId).toBe('pE6kjzWNn2ULhM3NWsljAP7BV662')
            done()
          })
      })
  })
})

describe('removeLike', () => {
  it('debería ser una función', () => {
    expect(typeof removeLike).toBe('function');
  });
  it('Debería poder dar like con mi usuario logueado', (done) => {
    return removeLike('pE6kjzWNn2ULhM3NWsljAP7BV662', 'anaguanda20@gmail.com')
      .then((data) => {
        expect(data).toBe(undefined);
        done()
      })
  })
})

describe('uploadImage', () => {
	it('Debería ser una función', () => {
		expect(typeof uploadImage).toBe('function');
	});
	it('Debería', (done) => {
		const image = new File([], 'test-image.jpg')
		return uploadImage('17-05-2019', image).then((data) => {
			expect(data.path).toBe('images/17-05-2019-test-image.jpg')
			done()
		})
	})
})
*/