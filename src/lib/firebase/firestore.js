export const createUserDB = (useruid, emailUser, userPhotoUrl, username) => firebase.firestore()
  .collection('users').add({
    name: username,
    email: emailUser,
    uid: useruid,
    photoUrl: userPhotoUrl,

  });

export const readUserDB = (uid) => firebase.firestore().collection('users')
  .where('uid', '==', uid)
  .get();

  //Posts
export const addNotesToDB = (userID, name, createNote,datePost, userMode, photoUser ,image) => firebase.firestore()
  .collection('publications').add({
    creatorID: userID,
    creatorName: name,
    note: createNote,
    date: datePost,
    mode: userMode,
    photo: photoUser,
    likes:[],
    image:image,
    
  });

// callbackfn es un funcion como parametro lo mando
export const readAddNotesToDB = callbackfn => firebase.firestore()
  .collection('publications').orderBy("date","desc").onSnapshot((data) => {
    //console.log("data",data);
    callbackfn(data);
  });

// Update post
export const editTextPost = (docID, changeNote, newDate) => firebase.firestore().collection('publications')
  .doc(docID).update({
    note: changeNote,
    date: newDate,
  });

// Delete post
export const deletePost = (docID) => firebase.firestore().collection('publications')
  .doc(docID).delete();

// ADD LIKE
export const addLike = (idPost, uid) => firebase.firestore().collection('publications')
.doc(idPost).update({ likes: firebase.firestore.FieldValue.arrayUnion(uid) });


// REMOVE LIKE
export const removeLike = (idPost, uid) => firebase.firestore().collection('publications')
.doc(idPost).update({ likes: firebase.firestore.FieldValue.arrayRemove(uid) });

// PHOTO 
export const uploadImage = (date, image) => {
  const postImageRef = firebase.storage().ref().child(`images/${date}-${image.name}`);
  const metadata = { contentType: image.type };
  return postImageRef.put(image, metadata)
  .then(snapshot => snapshot.ref.getDownloadURL());
}