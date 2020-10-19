import { userInformation } from '../firebase/firestore.js';

export const headerTemplate = (user) => {
  const viewProfile = document.createElement('section');
  viewProfile.innerHTML = ` 
    <header>
    <nav>
    <div class="title-energy">
    <h4 class="title">Energía Verde💡</h4></div>
    <input type="checkbox" id="check-and-uncheck">
    <label for="check-and-uncheck">
    <i class="fas fa-bars" id="hamburger"></i>
    <i class="fas fa-times" id="cross"></i>
    </label>
    <ul>
    <li>
    <a id="btn-log-out">Salir</a>
    </li>
    <li>
    <a id="btn-home">Inicio</a>
    </li>
    <li>
    <a id="btn-profile">Perfil</a>
    </li>
    </ul>
    </nav>
    </header>
    <section class="container-profile">
    <div><img src="../img/escritorios.png" class="init"</div>
    <img class="user-image" src="${user.photoUrl}">
    <div><p id="edit-user-name">${user.name}</p></div>
    <h3>Email</h3>
     <p>${user.email}</p>
     <label class="editPost" id="editProfile"><i class="far fa-edit"></i></label>
     <label class="editPost hidden" id="loadProfile"><i>💾</i></label>
     <div id="edit-profile-user" class="hidden">
     <form>
     <input type="text" id="add-birthday" class="add-inf" placeholder="fecha de cuplea#os">
     <input type="text" id="occupation-work" class="add-inf" placeholder="ocupacion">
     <input type="text" id="hobbies" class="add-inf" placeholder="hobbies">
     </form>
     <div id="new-user-infor"></div>
     </div>
    </section>
    </section>
    <div id="post-container" class="post general-position">
    <div>
    <textarea id="box-post"class="textarea" placeholder="¿Qué quieres compartir?" maxlength="100" rows="8" cols="77">
    </textarea>
    </div>
    <span class="deletImg hidden" id="exit">❎</span>
    <div id="imgURL" class="imgURL"></div>
    <label id="add-new-photo">
    <i id="btn-photo" class="far fa-images"></i>
    <input type="file" id="photoPost" class="file" accept="image/*">
    </label>
    <select class="space" id="mode-post">
    <option value="" disabled selected>Modo</option>
    <option id="private" value="private">Privado</option>
    <option id="public" value="public">Publico</option>
    </select>
    <label class"plane"><i id="btn-share" class="far fa-paper-plane"></i></label>
    </div>
    <div id="message-post"> 
    </div>
    `;
  const loadProfile = viewProfile.querySelector('#loadProfile');
  const birthdayVal = viewProfile.querySelector('#add-birthday');
  const occupationVal = viewProfile.querySelector('#occupation-work');
  const hobbiesVal = viewProfile.querySelector('#hobbies');
  const profileUser = viewProfile.querySelector('#edit-profile-user');

  const editProfile = viewProfile.querySelector('#editProfile');
  const profile = viewProfile.querySelector('#btn-profile');
  profile.addEventListener('click', () => {
    window.location.hash = '#/profile';
  });
  editProfile.addEventListener('click', () => {
    profileUser.classList.remove('hidden');
    loadProfile.classList.remove('hidden');
    editProfile.classList.add('hidden');
  });

  const home = viewProfile.querySelector('#btn-home');
  home.addEventListener('click', () => {
    editProfile.classList.add('hidden');
    window.location.hash = '#/home';
  });

  loadProfile.addEventListener('click', () => {
    const birthday = birthdayVal.value;
    const occupation = occupationVal.value;
    const hobbies = hobbiesVal.value;
    loadProfile.classList.add('hidden');
    editProfile.classList.remove('hidden');

    // eslint-disable-next-line no-undef
    userInformation(birthday, occupation, hobbies);
  });
/*
  // new-collection-users
  const informationUser = (user) => {
    const newInformations = document.createElement('div');
    newInformations.classList = 'from-user';
    newInformations.innerHTML = `
    <h4 class="infor-birthday">${user.birthday}<h4>
    <h4 class="infor-occupation"><h4>
    <h4 class="infor-hobbies"><h4>`;
    return newInformations;
  };
  const container = viewProfile.querySelector('#all-new-user-infor');
  const divComment = informationUser();
  container.appendChild(divComment);
*/
  return viewProfile;
};
