import auth from '@react-native-firebase/auth';

export const signUp = async (username, password) => {
  return await auth().createUserWithEmailAndPassword(username, password);
};

export const signIn = async (username, password) => {
  return await auth().signInWithEmailAndPassword(username, password);
};

export const requestEmailVerification = async () => {
  await auth().currentUser.sendEmailVerification();
};

export const signOut = () => {
  auth()
    .signOut()
    .catch(console.error);
};

export const changeEmail = async (email) => {
  return await auth().currentUser.verifyBeforeUpdateEmail(email);
};
