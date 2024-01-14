import firestore from '@react-native-firebase/firestore';
import { STATUS } from '../../constants/status';

export const addUserToDb = (userId, email, onDone) => {
  firestore()
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
    })
    .then(() => {
      onDone(STATUS.SUCCESS);
    }).catch(() => {
      onDone(STATUS.FAIL);
    });
};

export const getUserById = (id, onDone) => {
  firestore().collection('users').doc(id).get().then((doc) => {
    onDone(STATUS.SUCCESS, doc);
  }).catch(() => {
    onDone(STATUS.FAIL);
  });
};

export const updateUserById = (id, data, onDone) => {
  firestore().collection('users').doc(id).update(data).then(() => {
    onDone(STATUS.SUCCESS);
  }).catch(() => {
    onDone(STATUS.FAIL);
  });
};
