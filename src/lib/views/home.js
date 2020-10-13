import {
  homeLogOut,
  createAddNoteToDB,
  editTextPostToDB,
  deletePostToDB,
} from '../firebase-controller/home-controller.js';
import { addLike,removeLike} from '../firebase/firestore.js';

const formatoFecha = (fecha) => {
  const fechaFin = (fecha.getDate()) + ' - ' + (fecha.getMonth() + 1) + ' - ' + fecha.getFullYear() + '  ' + fecha.getHours() + ':' + fecha.getMinutes();
  return fechaFin;
};

const postTemplate = (doc) => {
  // const user=readUser(doc.data().creatorID);
  // console.log("userHome",user);
  const div = document.createElement('div');
  console.log('id', doc.data());
  div.classList = 'share-post';
  div.innerHTML = `
  <div class="container-user">
  <span><img class="user-image-post" src="${doc.data().photo}"></span>
  <h4 class="name-user">Publicado por ${doc.data().creatorName}
  <h4 class="name-user">${formatoFecha(doc.data().date.toDate())}</h4>
  <div id="show-options" class="hidden">
  <label class="ellipsis" id="ellipsis" ><i id="i" class="fas fa-ellipsis-h"></i>
  <select id="options">
  <option value="" disabled selected>Elegir</option>
  <option id="edit" value="edit">Editar</option>
  <option id="delete" value="delete">Borrar</option>
  </select></label></h4>
  </div>
  </div>
  <div id="text-post" class="show"><p>${doc.data().note}</p></div>
  <div id="edit-option" class="hidden">
  <textarea class="textarea" id="edit-text-post">${doc.data().note}</textarea>
  <button type="button" id="accept"><i class="fas fa-check"></i></button>
  </div>
  <label id="dis-like"><i class="far fa-heart"></i></label>
  <label id="like"><i class="fas fa-heart"></i></label>
  <div id="num-likes" class="num-likes">${doc.data().likes.length}</div>
  <label><i id="i" class="far fa-comment"></i></label>

 `;
const like = div.querySelector('#like');
const dislike = div.querySelector('#dis-like');
if(doc.data().likes.indexOf(localStorage.getItem('userID'))>-1){
  dislike.classList.add('hidden');
}else{
  like.classList.add('hidden');
}
like.addEventListener( 'click', () => {
like.classList.add('hidden');
dislike.classList.remove('hidden');
removeLike(doc.id, localStorage.getItem('userID'));
});
dislike.addEventListener( 'click', () => {
like.classList.remove('hidden');
dislike.classList.add('hidden');
addLike(doc.id, localStorage.getItem('userID'));

});
  // Start grabbing our DOM Element
  const options = div.querySelector('#options');
  const showOptions = div.querySelector('#show-options');
  const textPost = div.querySelector('#text-post');
  const editOption = div.querySelector('#edit-option');
  const accept = div.querySelector('#accept');
  // Edit and delete post
  if (localStorage.getItem('userID') === doc.data().creatorID) {
    showOptions.classList.remove('hidden');
    showOptions.classList.add('show');
    options.addEventListener('change', (e) => {
      const selectedOption = e.target.value;
      // console.log(selectedOption);
      if (selectedOption === 'edit') {
        console.log('Aquí puede editar');
        console.log(doc.id);
        // console.log(doc.data().creatorID);
        textPost.classList.add('hidden');
        textPost.classList.remove('show');
        editOption.classList.add('show');
        editOption.classList.remove('hidden');

        accept.addEventListener('click', () => {
          const editTextPostVal = div.querySelector('#edit-text-post').value;
          console.log(editTextPostVal);
          const newDate = new Date();
          editTextPostToDB(doc.id, editTextPostVal, newDate);
        });
      } else if (selectedOption === 'delete') {
        console.log('Data eliminada');
        deletePostToDB(doc.id);
      }
    });
  }
  return div;
};
//const options = postTemplate.querySelector('#options').value;
//options.addEventListener( 'click', () =>/* 

export const profileTemplate = (posts) => {
  // console.log('user', user);
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
      </ul>
    </nav>
    </header>
    <section class="container-profile">
      <h2>Perfil</h2>
      <img class="user-image" src="${localStorage.getItem('userPhoto')}">
      <p>${localStorage.getItem('userName')}</p>
      <h3>Email</h3>
      <p>${localStorage.getItem('userEmail')}</p>
      </section>
    </section>
    <div id="post-container" class="post general-position">
    <div >
      <textarea id="box-post"class="textarea" placeholder="¿Qué quieres compartir?" maxlength="100" rows="8" cols="77">
        </textarea>
    </div>
    <label><i id="i" class="far fa-images"></i>
      <input class="file" type="file"></label>
    <select class="space hidden" id="mode-post">
      <option value="" disabled selected>Modo</option>
      <option id="private" value="private">Privado</option>
      <option id="public" value="public">Publico</option>
    </select>
    <label class"plane"><i id="btn-share" class="far fa-paper-plane"></i></label>
  </div>
  <div id="message-post"> 
  </div>
  `;


  // Start grabbing our DOM Element
  const textPost = viewProfile.querySelector('#box-post');

  const post = viewProfile.querySelector('#mode-post');
  const btnShare = viewProfile.querySelector('#btn-share');
  const modePost = viewProfile.querySelector('#mode-post');

  modePost.addEventListener('change', (e) => {
    const selectedMode = e.target.value;
    // Share post
    btnShare.addEventListener('click', () => {
      const textPostVal = textPost.value;
      const date = new Date();
      createAddNoteToDB(localStorage.getItem('userID'), localStorage.getItem('userName'), textPostVal, date, selectedMode);

      // Clear text content
      // listPublication();
    });
  });

  posts.forEach((post) => {
    const messagePost = viewProfile.querySelector('#message-post');
    messagePost.appendChild(postTemplate(post));
  });
  // Share post
  btnShare.addEventListener('click', () => {
    const textPostVal = textPost.value;
    const postVal = post.value;
    console.log(postVal, 'provando valor');
    const date = new Date();
    createAddNoteToDB(localStorage.getItem('userID'), localStorage.getItem('userName'), textPostVal, date, postVal, localStorage.getItem('userPhoto'));
  });

  const btnlogOut = viewProfile.querySelector('#btn-log-out');
  btnlogOut.addEventListener('click', () => {
    homeLogOut();
  });
  return viewProfile;
};
