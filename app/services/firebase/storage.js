import storage from '@react-native-firebase/storage';
import { STATUS } from '../../constants/status';

export const uploadProfilePicture = (fileName, filePath, onDone) => {
  const reference = storage().ref(`/profile-pictures/${fileName}`);
  reference.putFile(filePath).then(() => {
    reference.getDownloadURL().then((photoUrl) => {
      onDone(STATUS.SUCCESS, { photoUrl });
    }).catch(() => {
      onDone(STATUS.FAIL);
    });
  }).catch(() => {
    onDone(STATUS.FAIL);
  });
};
