import auth from '@react-native-firebase/auth';
import { STATUS } from '../../constants/status';

export const signUp = (username, password, callback) => {
  auth()
    .createUserWithEmailAndPassword(username, password)
    .then((d) => {
      console.log(JSON.stringify(d));
      console.log('User account created & signed in!');
      callback(STATUS.SUCCESS);
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
      callback(STATUS.FAIL);
    });
};
