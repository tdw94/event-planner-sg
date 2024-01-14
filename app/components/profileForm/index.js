import React, { useMemo, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { fonts } from '../../constants/fonts';
import { colors } from '../../constants/colors';
import Input from '../../components/input/Input';
import { Formik } from 'formik';
import Button from '../../components/button/Button';
import { STATUS } from '../../constants/status';
import { updateUserById } from '../../services/firebase/firestore';
import { useUser } from '../../context/UserContext';
import Header from '../../components/header';
import ProfilePicturePicker from '../../components/profilePicturePicker';
import WhiteCameraIcon from '../../assets/svg/CameraWhite.svg';
import { uploadProfilePicture } from '../../services/firebase/storage';
import { getUniqueFileName } from '../../helpers/common';
import { useNavigation } from '@react-navigation/native';
import { screens } from '../../constants/screens';
import PropTypes from 'prop-types';

const ProfileForm = ({ editMode }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { user, refreshUser } = useUser();
  const profilePicture = useRef(null);
  const { navigate, goBack } = useNavigation();

  const initialValues = useMemo(() => {
    return {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phoneNumber: user?.phoneNumber || '',
      address: user?.address || ''
    };
  }, [user]);

  const onChangeProfilePicture = (image) => {
    profilePicture.current = image;
  };

  const uploadPhoto = (values) => {
    // upload profile picture
    uploadProfilePicture(getUniqueFileName(profilePicture.current.path), profilePicture.current.path, (status, data) => {
      if (status === STATUS.SUCCESS) {
        updateUser({
          ...values,
          photoUrl: data.photoUrl
        });
        profilePicture.current = null;
      } else {
        // if upload fails, show error and save rest of the form data
        updateUser(values);
        // show a fail message
      }
    });
  };

  const updateUser = (values) => {
    updateUserById(user.userId, values, (status) => {
      if (status === STATUS.SUCCESS) {
        refreshUser();
      } else {
        // show error
      }
      setIsLoading(false);
      goBack();
    });
  };

  const onPressSave = (values) => {
    setIsLoading(true);
    // if the user has changed the profile picture, upload it and save form data, else, save form data
    if (profilePicture.current?.path) {
      uploadPhoto(values);
    } else {
      updateUser(values);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
      <Header
        title={editMode ? t('profile.editProfile') : t('profile.profile')}
        disabled={isLoading}
      />
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={onPressSave}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <>
            <View style={styles.formContainer}>
              <View style={styles.profilePictureContainer}>
                <ProfilePicturePicker
                  editMode={editMode}
                  Icon={() => <WhiteCameraIcon />}
                  imageUri={user?.photoUrl}
                  onDone={onChangeProfilePicture}
                  disabled={isLoading}
                />
              </View>
              <Input
                title={t('contactScreen.firstName')}
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                value={values.firstName}
                disabled={isLoading || !editMode}
                placeholder={t('contactScreen.firstNamePlaceholder')}
              />
              <Input
                title={t('contactScreen.lastName')}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                value={values.lastName}
                disabled={isLoading || !editMode}
                placeholder={t('contactScreen.lastNamePlaceholder')}
              />
              <Input
                title={t('contactScreen.phoneNumber')}
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                value={values.phoneNumber}
                disabled={isLoading || !editMode}
                placeholder={t('contactScreen.phoneNumberPlaceholder')}
                keyboardType='phone-pad'
              />
              <Input
                title={t('contactScreen.address')}
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                value={values.address}
                disabled={isLoading || !editMode}
                placeholder={t('contactScreen.addressPlaceholder')}
              />
            </View>
            <View style={styles.bottomContainer}>
              <Button
                onPress={editMode ? () => handleSubmit() : () => navigate(screens.editProfile)}
                text={editMode ? t('profile.save') : t('profile.edit')}
                style={styles.buttonStyle}
                disabled={isLoading}
                isLoading={isLoading}
              />
            </View>
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

export default ProfileForm;

ProfileForm.propTypes = {
  editMode: PropTypes.bool
};

const styles = StyleSheet.create({
  profilePictureContainer: {
    alignItems: 'center',
    paddingBottom: 20
  },
  buttonStyle: {
    flex: 1
  },
  bottomContainer: {
    padding: 20,
    position: 'absolute',
    width: '100%',
    bottom: 0
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 60
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.InterSemiBold,
    color: colors.black,
    paddingBottom: 5
  },
  scrollViewContentContainer: {
    flexGrow: 1,
    backgroundColor: colors.white
  }
});
