import firestore from '@react-native-firebase/firestore';

export const addUserToDb = async (userId, email) => {
  await firestore()
    .collection('users')
    .doc(userId)
    .set({
      userId,
      email,
      firstName: '',
      lastName: '',
      photoUrl: '',
      phoneNumber: '',
      address: ''
    });
};

export const getUserById = async (id) => {
  return await firestore().collection('users').doc(id).get();
};

export const updateUserById = async (id, data) => {
  await firestore().collection('users').doc(id).update(data);
};
