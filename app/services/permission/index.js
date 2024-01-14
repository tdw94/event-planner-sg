import { Platform } from 'react-native';
import { PERMISSIONS, checkMultiple, requestMultiple, RESULTS } from 'react-native-permissions';

export const accessGalleryRead = async () => {
  const aPermissions = [];
  if (Platform.OS === 'ios') {
    aPermissions.push(PERMISSIONS.IOS.PHOTO_LIBRARY);
  } else {
    if (Number(Platform.Version) < 33) {
      aPermissions.push(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    } else {
      return true;
    }
  }
  return await checkMultipleCustom(aPermissions);
};

const checkMultipleCustom = async (aPermissions) => {
  await checkMultiplePermissions(aPermissions);
  const results = await requestMultiplePermissions(aPermissions);
  return isPermissionGranted(aPermissions, results);
};

const requestMultiplePermissions = async (aPermissions) => {
  return await requestMultiple(aPermissions);
};

const checkMultiplePermissions = async (aPermissions) => {
  return await checkMultiple(aPermissions);
};

const isPermissionGranted = (aPermissions, results) => {
  let isGranted = true;
  for (let i = 0; i < aPermissions.length; i++) {
    if (!(results[aPermissions[i]] === RESULTS.GRANTED || results[aPermissions[i]] === RESULTS.LIMITED)) {
      isGranted = false;
      break;
    }
  }
  return isGranted;
};
