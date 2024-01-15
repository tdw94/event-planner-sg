import storage from '@react-native-firebase/storage';

export const uploadProfilePicture = async (fileName, filePath) => {
  const reference = storage().ref(`/profile-pictures/${fileName}`);
  await reference.putFile(filePath);
  return await reference.getDownloadURL();
};
