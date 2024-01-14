import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { useTranslation } from 'react-i18next';
import { fonts } from '../../constants/fonts';
import ProfilePicturePicker from '../../components/profilePicturePicker';
import Button from '../../components/button/Button';
import WhiteArrowIcon from '../../assets/svg/WhiteArrow.svg';
import { uploadProfilePicture } from '../../services/firebase/storage';
import { useNavigation } from '@react-navigation/native';
import { screens } from '../../constants/screens';
import { STATUS } from '../../constants/status';
import { updateUserById } from '../../services/firebase/firestore';
import { useUser } from '../../context/UserContext';
import { getUniqueFileName } from '../../helpers/common';

const Welcome = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const selectedPicture = useRef(null);
  const { navigate } = useNavigation();
  const { user, refreshUser } = useUser();

  const onChangeProfilePicture = (image) => {
    // store the image data in local variable
    selectedPicture.current = image;
  };

  const onPressNext = () => {
    // if the user has selected a photo, upload it
    if (selectedPicture.current?.path) {
      uploadPhoto();
    } else {
      goToNext();
    }
  };

  const uploadPhoto = () => {
    setIsLoading(true);
    uploadProfilePicture(getUniqueFileName(selectedPicture.current.path), selectedPicture.current.path, (status, data) => {
      if (status === STATUS.SUCCESS) {
        updateProfilePicture(data.photoUrl);
      } else {
        goToNext();
        // show a fail message
      }
    });
  };

  const updateProfilePicture = (photoUrl) => {
    updateUserById(user.userId, {
      photoUrl
    }, (status) => {
      if (status === STATUS.SUCCESS) {
        refreshUser();
      }
      goToNext();
    });
  };

  const goToNext = () => {
    setIsLoading(false);
    navigate(screens.personalInfo);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>{t('welcomeScreen.title')}</Text>
        <Text style={styles.description}>{t('welcomeScreen.description')}</Text>
        <ProfilePicturePicker onDone={onChangeProfilePicture} editMode disabled={isLoading} />
      </View>
      <View style={styles.bottomContainer}>
        <Button
          onPress={onPressNext}
          text={t('welcomeScreen.next')}
          RightComponent={() => <WhiteArrowIcon />}
          isLoading={isLoading}
          disabled={isLoading}
        />
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  bottomContainer: {
    width: '100%',
    padding: 20
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  screen: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 32,
    fontFamily: fonts.InterSemiBold,
    color: colors.black,
    paddingBottom: 10
  },
  description: {
    fontSize: 14,
    fontFamily: fonts.NotoSansRegular,
    color: colors.grey,
    paddingBottom: 50,
    textAlign: 'center'
  }
});
