export const headerTemplate = (user) => {
  const viewProfile = document.createElement('section');
  viewProfile.innerHTML = ` 
    <header>
    <nav>
    <div class="title-dota">
    <h4 class="title">Comunidad Dota</h4><img src="img/pegn.png" width="50px" heigth="50px" class="icon-prin"></div>
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
    <div><img src="../img/tusk.jpeg" class="init"></div>
    <img class="user-image" src="${user.photoUrl}">
    <div><p id="edit-user-name">${user.name}</p></div>
    <div id="edit-profile-user" class="hidden">
     <form>
     <input type="text" id="lastname" class="add-inf" placeholder="${user.lastname}">
     <input type="text" id="firstname" class="add-inf" placeholder="${user.firstname}">
     <input type="text" id="email" class="add-inf" placeholder="${user.email}">
     <input type="text" id="hobbies" class="add-inf" placeholder="${user.hobbies}">
     <input type="text" id="occupation-work" class="add-inf" placeholder="${user.occupation}">
     <input type="text" id="add-birthday" class="add-inf" placeholder="${user.birthday}">
     </form>
     <div id="new-user-infor"></div>
     </div>
     <div id="profile-user-eddit-new">
     <form>
     <p>Name:${user.lastname}</p>
     <p>Apellido:${user.firstname}</p>
     <p>Email: ${user.email}</p>
     <p>hobbies:${user.hobbies}</p>
     <p>Ocupacion:${user.occupation}</p>
     <p>Fecha de nacimiento:${user.birthday}</p>
     </form>
     </div>
     <label class="editPost hidden" id="editProfile"><i class="far fa-edit"></i></label>
     <label class="editPost hidden" id="loadProfile"><i>💾</i></label>
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
  const profile = viewProfile.querySelector('#btn-profile');
  profile.addEventListener('click', () => {
    window.location.hash = '#/profile';
  });
  const home = viewProfile.querySelector('#btn-home');
  home.addEventListener('click', () => {
    window.location.hash = '#/home';
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
