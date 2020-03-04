import firebase from 'react-native-firebase';

export const registerUser = (email, password) => firebase.auth()
  .createUserWithEmailAndPassword(email, password)
  .then(results => results).catch(error => (error));

export const loginUser = (email, password) => firebase.auth()
  .signInWithEmailAndPassword(email, password)
  .then(results => results).catch(error => error);
