import React, { useMemo, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { fonts } from '../../constants/fonts';
import { colors } from '../../constants/colors';
import Input from '../../components/input/Input';
import { Formik } from 'formik';
import Button from '../../components/button/Button';
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
import { showErrorToast, showSuccessToast } from '../toast';
import * as Yup from 'yup';
import i18n from '../../../i18n';
import { changeEmail } from '../../services/firebase/auth';
import { cloneDeep, set } from 'lodash';

const formSchema = Yup.object().shape({
  email: Yup.string().email(i18n.t('yup.invalidEmail')).required(i18n.t('yup.required'))
});

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
      address: user?.address || '',
      email: user?.email || ''
    };
  }, [user]);

  const onChangeProfilePicture = (image) => {
    profilePicture.current = image;
  };

  const onPressSave = (values) => {
    processChanges(values);
  };

  const processChanges = async (values) => {
    setIsLoading(true);
    let copyOfValues = cloneDeep(values);
    // if the user has changed the profile picture, upload it
    if (profilePicture.current?.path) {
      try {
        const photoUrl = await uploadProfilePicture(getUniqueFileName(profilePicture.current.path), profilePicture.current.path);
        copyOfValues = set(copyOfValues, 'photoUrl', photoUrl);
      } catch (_error) {
        showErrorToast(t('errors.uploadError'));
        setIsLoading(false);
        return 0;
      }
    }
    // if user has changed, change the email
    if (values?.email !== user?.email) {
      try {
        await changeEmail(values.email);
        showSuccessToast(t('toast.emailChangeRequest'));
      } catch (error) {
        setIsLoading(false);
        showErrorToast(t('errors.saveError'));
        return 0;
      }
    }
    try {
      await updateUserById(user.userId, copyOfValues);
      showSuccessToast(t('toast.saveSuccess'));
      refreshUser();
      goBack();
    } catch (error) {
      showErrorToast(t('errors.saveError'));
    }
    setIsLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
      <Header
        title={editMode ? t('profileScreen.editProfile') : t('profileScreen.profile')}
        disabled={isLoading}
      />
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={onPressSave}
        validationSchema={formSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
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
              {/* ### This input was hidden because the changing email of the user
                  has few different approaches and needs more testing. */}
              {/* <Input
                title={t('contactScreen.email')}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                disabled={isLoading || !editMode}
                errorText={(touched.email && errors.email)}
                placeholder={t('contactScreen.emailPlaceholder')}
                keyboardType='email-address'
              /> */}
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
                text={editMode ? t('profileScreen.save') : t('profileScreen.edit')}
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
