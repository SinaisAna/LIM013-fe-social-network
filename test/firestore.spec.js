import MockFirebase from 'mock-cloud-firestore';

const fixtureData = {
  __collection__: {
    add: {
      __doc__: {
        abc1d: {
          title: 'terminar la pildora',
          complete: false
        },
      }
    }
  }
}

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

import { createUserDB, getUser, readUserDB } from '../src/lib/firebase/firestore';

describe('lista de usuarios', () => {
  it('Debería porder agregar un usuario', (done) => {
    return createUserDB('123', 'example@gmail.com', 'testimail.png', 'ana')
      .then(() => getUser(
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
    readUserDB('anaguanda10@gmail.com', '1234567').then(() => {
      return readUserDB('7clxo0xsYUpptPcqc5PG');
    });
  });
});
