import MockFirebase from '../_mocks_/firebase-mock.js'
global.firebase = MockFirebase();
//import MockFirebase from 'mock-cloud-firestore';
//import { getUser } from '../src/lib/firebase/auth.js';
//global.firebase = new MockFirebase(fixtureData,{ isNaiveSnapshotListenerEnabled: true});

/*const fixtureData = {
    _collection_: {
        users: {
            _doc_: {
                user_a: {
                    date: 12,
                    username: 'user_a'
                },
            }
        }
    }
}
import { createUserDB } from '../src/lib/firebase/firestore.js';

describe( 'createUserDB', () => {
    it('Deberia cargar informacion de usuario', (done) => {
        return createUserDB('usuario').then((data) => {
            const callback =(user) => {
                console.log(user);
                done()
            }
            getUser(callback)
       });
    }); 
});

import { createUserDB } from '../src/lib/firebase/firestore.js'
describe('createUserDB', () => {
	it('Debería ser una función', () => {
		expect(typeof createUserDB).toBe('function');
	})
	
    it('Debería obtener null si ningún usuario se ha logueado', () => {
		const user = createUserDB();
		expect(user).toEqual(null);
    })

    it('Debería obtener abc@mail.com si usuario se inicia sesión con email abc@mail.com', () => {
    	return emailLogIn('abc@mail.com', '123456').then(() => {
    		const user = createUserDB();
    		expect(user.isAnonymous).toEqual(false);
    		expect(user.email).toEqual('abc@mail.com')
    	})
    })
})

//import MockFirebase from 'mock-cloud-firestore';

const fixtureData = {
  __collection__: {
    users: {
      __doc__: {
        GJR4GH4f:
        {
        name: 'username',
            email: 'emailUser',
            uid: 'useruid',
            photoUrl: 'userPhotoUrl',
            },
         }
     }
     }

}


global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });


import{ readCreateUserDB } from '../src/lib/firebase-controller/login-controller.js';

describe('createUserDB', () => {
    it('debería ser una función', () => {
      expect(typeof createUserDB).toBe('function');
    })
  
    it('deberia agregar un usuario', (done) => {
      return createUserDB('9URN4KSD9kw9HKNlo47B', 'user-a', 'photoUrl', 'userAbc', 'privacy')
        .then(() => readCreateUserDB(
          (data) => {
            const result = data.find((data) => data.content === 'userAbc');
            expect(result.content).toBe('userAbc');
            done();
          }
        ));
    })
  });
  */
 import { createUserDB } from '../src/lib/firebase/firestore.js';

 describe('create new user', () => {
    it('Debería crear un nuevo usuario', () => createUserDB('prueba@test.com', 'pruebatest')
      .then((user) => {
        expect(user.email).toBe('prueba@test.com');
        expect(user.password).toBe('pruebatest');
      }));
  });