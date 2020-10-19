export const createUserDB = (useruid, emailUser, userPhotoUrl, username) => firebase.firestore()
  .collection('users').add({
    name: username,
    email: emailUser,
    uid: useruid,
    photoUrl: userPhotoUrl,
    birthday: birthdayVal,
    occupation: occupationVal,
    hobbies: hobbiesVal,

  });

// ADD INF
export const userInformation = (birthdayVal, occupationVal, hobbiesVal) => firebase.firestore().collection('users')
  .doc().update({ birthday: birthdayVal, occupation: occupationVal, hobbies: hobbiesVal });

/*
  export const getUserInformation = (callback) =>
  firebase.firestore().collection('users')
    .onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() })
      });
      callback(data);
    });

*/
export const readUserDB = (uid) => firebase.firestore().collection('users')
  .where('uid', '==', uid)
  .get();

// Posts
// eslint-disable-next-line max-len
export const addNotesToDB = (userID, name, createNote, datePost, userMode, photoUser, image) => firebase.firestore()
  .collection('pruebas').add({
    creatorID: userID,
    creatorName: name,
    note: createNote,
    date: datePost,
    mode: userMode,
    photo: photoUser,
    likes: [],
    images: image,

  });

// callbackfn es un funcion como parametro lo mando
export const readAddNotesToDB = (callbackfn) => firebase.firestore()
  .collection('pruebas').where('mode', '==', 'public').orderBy('date', 'desc')
  .onSnapshot((data) => {
    // console.log("data",data);
    callbackfn(data);
  });
export const readAddNotesToDBP = (callbackfn, uid) => firebase.firestore()
  .collection('pruebas')
  .where('creatorID', '==', uid)

  .orderBy('date', 'desc')
  .onSnapshot((data) => {
    // console.log("data",data);
    callbackfn(data);
  });

// Update post
export const editTextPost = (docID, changeNote, newDate) => firebase.firestore().collection('pruebas')
  .doc(docID).update({
    note: changeNote,
    date: newDate,
  });

// Delete post
export const deletePost = (docID) => firebase.firestore().collection('pruebas')
  .doc(docID).delete();

// ADD LIKE
export const addLike = (idPost, uid) => firebase.firestore().collection('pruebas')
  .doc(idPost).update({ likes: firebase.firestore.FieldValue.arrayUnion(uid) });

// REMOVE LIKE
export const removeLike = (idPost, uid) => firebase.firestore().collection('pruebas')
  .doc(idPost).update({ likes: firebase.firestore.FieldValue.arrayRemove(uid) });

// PHOTO
export const uploadImage = (date, image) => {
  const postImageRef = firebase.storage().ref().child(`images/${date}-${image.name}`);
  const metadata = { contentType: image.type };
  return postImageRef.put(image, metadata)
    .then((snapshot) => snapshot.ref.getDownloadURL());
};
// Posts
// eslint-disable-next-line max-len
export const addcommentsToDB = (userID, comment, datePost, photoUser, postID, name) => firebase.firestore()
  .collection('comments').add({

    creatorID: userID,
    photoUsers: photoUser,
    comments: comment,
    date: datePost,
    postsID: postID,
    userName: name,

  });

export const readComments = (callback, idPost) => {
  firebase.firestore().collection('comments')
    .orderBy('date', 'desc')
    .onSnapshot((querySanpshot) => {
      const comment = [];
      querySanpshot.forEach((doc) => {
        comment.push({ id: doc.id, ...doc.data() });
      });
      // console.log('data',comment);
      callback(comment, idPost);
    });
};
