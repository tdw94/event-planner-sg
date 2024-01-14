import auth from '@react-native-firebase/auth';
import { STATUS } from '../../constants/status';

export const signUp = (username, password, callback) => {
  auth()
    .createUserWithEmailAndPassword(username, password)
    .then(() => {
      callback(STATUS.SUCCESS);
    })
    .catch(error => {
      callback(STATUS.FAIL, error.code);
    });
};

export const signIn = (username, password, callback) => {
  auth()
    .signInWithEmailAndPassword(username, password)
    .then((d) => {
      callback(STATUS.SUCCESS);
    })
    .catch(error => {
      callback(STATUS.FAIL, error.code);
    });
};
