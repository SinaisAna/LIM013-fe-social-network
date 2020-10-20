import {
  homeLogOut, createAddNoteToDB, editTextPostToDB, deletePostToDB,
} from '../firebase-controller/home-controller.js';
import {
  addLike, removeLike, uploadImage, readComments, addcommentsToDB,
} from '../firebase/firestore.js';
import { headerTemplate } from './header.js';

let postImage;
const formatDate = (fecha) => {
  const fechaFin = `${fecha.getDate()} - ${fecha.getMonth() + 1} - ${fecha.getFullYear()}  ${fecha.getHours()}:${fecha.getMinutes()}`;
  return fechaFin;
};
const postTemplate = (doc, user) => {
  let divimage = '';
  if (doc.data().images != null) {
    divimage = `<img src="${doc.data().images}" width="100" heigth="150">`;
  }
  const div = document.createElement('div');

  div.classList = 'share-post';
  div.innerHTML = `
  <div class="container-user">
  <span><img class="user-image-post" src="${doc.data().photo}"></span>
  <h4 class="name-user">Publicado por ${doc.data().creatorName}
  <h4 class="name-user">${formatDate(doc.data().date.toDate())}</h4>
  <div id="show-options" class="hidden">
  <label class="ellipsis" id="ellipsis" ><i id="i" class="fas fa-ellipsis-h"></i>
  <select id="options">
  <option value="" disabled selected>Elegir</option>
  <option id="edit" value="edit">Editar</option>
  <option id="delete" value="delete">Borrar</option>
  </select></label></h4>
  </div>
  </div>
  <div id="text-post" class="show"><p>${doc.data().note}</p><p>${divimage}</p></div>
  <div id="edit-option" class="hidden">
  <textarea class="textarea" id="edit-text-post">${doc.data().note}</textarea>
  <button type="button" id="accept"><i class="fas fa-check"></i></button>
  </div>
  <label id="dis-like"><i class="far fa-heart"></i></label>
  <label id="like"><div id="heart-like" class="fas fa-heart"></div></label>
  <div id="num-likes" class="num-likes">${doc.data().likes.length}</div>
  <label id="btnComments"><i class="far fa-comment"></i></label>
  <label id="uncomment" class="hidden"><i class="far fa-comment-dots"></i></label>
  <div id="new-comment" class="coment-conter hidden">
  <img class="user-image-comments" src="${user.photoUrl}">
  <label id="inputCommentid">
  <textarea type="text" id="inputComment" placeholder="Agregar un commentario..." class="inputComment" rows="8" cols="77">
  </textarea></label>
  <label id="square"><i class="far fa-share-square"></i></label>
  </div>
  <div id="all-comments" class="hidden"></div>

 `;
  const btnComments = div.querySelector('#btnComments');
  const allcomments = div.querySelector('#all-comments');
  const comentConter = div.querySelector('#new-comment');
  const inputComment = div.querySelector('#inputComment');
  const uncomment = div.querySelector('#uncomment');
  const square = div.querySelector('#square');

  btnComments.addEventListener('click', () => {
    comentConter.classList.remove('hidden');
    btnComments.classList.add('hidden');
    uncomment.classList.remove('hidden');
    allcomments.classList.remove('hidden');
  });

  uncomment.addEventListener('click', () => {
    comentConter.classList.add('hidden');
    btnComments.classList.remove('hidden');
    uncomment.classList.add('hidden');
    allcomments.classList.add('hidden');
  });
  square.addEventListener('click', () => {
    const inputCommentVal = inputComment.value;
    const inputCommentid = div.querySelector('#inputCommentid');
    const date = new Date();
    inputCommentid.innerHTML = '<textarea type="text" id="inputComment" placeholder="Agregar un commentario..." class="inputComment" rows="8" cols="77"></textarea>';
    addcommentsToDB(user.uid, inputCommentVal, date, user.photoUrl, doc.id, user.name);
  });

  const like = div.querySelector('#like');
  const dislike = div.querySelector('#dis-like');
  if (doc.data().likes.indexOf(user.uid) > -1) {
    dislike.classList.add('hidden');
  } else {
    like.classList.add('hidden');
  }
  like.addEventListener('click', () => {
    like.classList.add('hidden');
    dislike.classList.remove('hidden');
    removeLike(doc.id, user.uid);
  });
  dislike.addEventListener('click', () => {
    like.classList.remove('hidden');
    dislike.classList.add('hidden');
    addLike(doc.id, user.uid);
  });
  // Start grabbing our DOM Element
  const options = div.querySelector('#options');
  const showOptions = div.querySelector('#show-options');
  const textPost = div.querySelector('#text-post');
  const editOption = div.querySelector('#edit-option');
  const accept = div.querySelector('#accept');
  // Edit and delete post
  if (user.uid === doc.data().creatorID) {
    showOptions.classList.remove('hidden');
    showOptions.classList.add('show');
    options.addEventListener('change', (e) => {
      const selectedOption = e.target.value;
      // console.log(selectedOption);
      if (selectedOption === 'edit') {
        // console.log(doc.data().creatorID);
        textPost.classList.add('hidden');
        textPost.classList.remove('show');
        editOption.classList.add('show');
        editOption.classList.remove('hidden');

        accept.addEventListener('click', () => {
          const editTextPostVal = div.querySelector('#edit-text-post').value;

          const newDate = new Date();
          editTextPostToDB(doc.id, editTextPostVal, newDate);
        });
      } else if (selectedOption === 'delete') {
        console.log('Data eliminada');
        deletePostToDB(doc.id);
      }
    });
  }
  // eslint-disable-next-line no-shadow
  const commentTemplate = (doc) => {
    const newComentsUser = document.createElement('div');

    newComentsUser.classList = 'conter-coments';
    newComentsUser.innerHTML = `
  <div><img class="user-image-comments-app" src="${doc.photoUser}">
  <div class="cloud">
  <h4 class="user-app">${doc.userName}</h4>
  <h4 class="document-app">${doc.comment}</h4>
  <h4class="date-app">${formatDate(doc.date.toDate())}</h4>
  </div>`;
    return newComentsUser;
  };
  const readingComment = (comments, idPost) => {
    const container = div.querySelector('#all-comments');

    if (container) {
      container.innerHTML = '';

      comments.forEach((comment) => {
        if (idPost === comment.postID) {
          const divComment = commentTemplate(comment);
          container.appendChild(divComment);
        }
      });
    }

    return container;
  };
  readComments(readingComment, doc.id);

  return div;
};

export const profileTemplate = (user, posts) => {
  const viewProfile = headerTemplate(user);
  // URL PHOTO COMMENTS
  const form = viewProfile.querySelector('#photoPost');
  const imgURL = viewProfile.querySelector('#imgURL');
  const exit = viewProfile.querySelector('#exit');
  const newPhoto = viewProfile.querySelector('#add-new-photo');

  form.addEventListener('change', (e) => {
    postImage = e.target.files[0];
    // console.log(file, "file");
    // localStorage.setItem('img',file);
    const objectURL = URL.createObjectURL(postImage);

    imgURL.innerHTML = `<img src="${objectURL}" width="100" heigth="150">`;
    exit.classList.remove('hidden');
    newPhoto.classList.add('hidden');
  });

  exit.addEventListener('click', () => {
    imgURL.innerHTML = '<img src="">';
    exit.classList.add('hidden');
    newPhoto.classList.remove('hidden');
  });
  // Start grabbing our DOM Element
  const textPost = viewProfile.querySelector('#box-post');

  const post = viewProfile.querySelector('#mode-post');
  const btnShare = viewProfile.querySelector('#btn-share');

  // eslint-disable-next-line no-shadow
  posts.forEach((post) => {
    const messagePost = viewProfile.querySelector('#message-post');
    messagePost.appendChild(postTemplate(post, user));
  });
  // Share post
  btnShare.addEventListener('click', () => {
    const textPostVal = textPost.value;
    const postVal = post.value;

    const date = new Date();

    const datePhoto = new Date().toString();

    if (postImage == null) {
      createAddNoteToDB(user.uid, user.name, textPostVal, date, postVal, user.photoUrl, '');
    } else {
      uploadImage(datePhoto, postImage)
        // eslint-disable-next-line max-len
        .then((url) => console.log(url) || createAddNoteToDB(user.uid, user.name, textPostVal, date, postVal, user.photoUrl, url));
    }
  });

  const btnlogOut = viewProfile.querySelector('#btn-log-out');
  btnlogOut.addEventListener('click', () => {
    homeLogOut();
  });
  return viewProfile;
};
