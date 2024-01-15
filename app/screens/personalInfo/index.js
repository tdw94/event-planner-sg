import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { fonts } from '../../constants/fonts';
import { colors } from '../../constants/colors';
import Input from '../../components/input/Input';
import WhiteArrowIcon from '../../assets/svg/WhiteArrow.svg';
import BlackArrowIcon from '../../assets/svg/BlackArrow.svg';
import { Formik } from 'formik';
import Button from '../../components/button/Button';
import { useNavigation } from '@react-navigation/native';
import { updateUserById } from '../../services/firebase/firestore';
import { useUser } from '../../context/UserContext';
import { showErrorToast } from '../../components/toast';

const PersonalInfo = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { goBack } = useNavigation();
  const { user, refreshUser, setFreshUser } = useUser();

  const onPressNext = (values) => {
    processForm();
  };

  const processForm = async (values) => {
    setIsLoading(true);
    try {
      await updateUserById(user.userId, values);
      setIsLoading(false);
      setFreshUser(false);
      refreshUser();
    } catch (error) {
      showErrorToast(t('errors.saveError'));
    }
  };

  const onPressBack = () => {
    goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
      <Formik
        initialValues={{ firstName: '', lastName: '', phoneNumber: '', address: '' }}
        onSubmit={onPressNext}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <>
            <View style={styles.topContainer}>
              <View style={styles.formContainer}>
                <Text style={styles.title}>{t('contactScreen.title')}</Text>
                <Text style={styles.description}>{t('contactScreen.description')}</Text>
                <Input
                  title={t('contactScreen.firstName')}
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                  disabled={isLoading}
                  placeholder={t('contactScreen.firstNamePlaceholder')}
                />
                <Input
                  title={t('contactScreen.lastName')}
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                  disabled={isLoading}
                  placeholder={t('contactScreen.lastNamePlaceholder')}
                />
                <Input
                  title={t('contactScreen.phoneNumber')}
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  value={values.phoneNumber}
                  disabled={isLoading}
                  placeholder={t('contactScreen.phoneNumberPlaceholder')}
                  keyboardType='phone-pad'
                />
                <Input
                  title={t('contactScreen.address')}
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  value={values.address}
                  disabled={isLoading}
                  placeholder={t('contactScreen.addressPlaceholder')}
                />
              </View>
            </View>
            <View style={styles.bottomContainer}>
              <Button
                onPress={onPressBack}
                text={t('contactScreen.back')}
                LeftComponent={() => <BlackArrowIcon />}
                disabled={isLoading}
                style={[styles.backButton, styles.buttonStyle]}
                textStyle={styles.backButtonText}
              />
              <View style={styles.separator} />
              <Button
                onPress={handleSubmit}
                text={t('contactScreen.next')}
                RightComponent={() => <WhiteArrowIcon />}
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

export default PersonalInfo;

const styles = StyleSheet.create({
  buttonStyle: {
    flex: 1
  },
  backButtonText: {
    color: colors.black
  },
  backButton: {
    backgroundColor: colors.lightOrange
  },
  errorText: {
    color: colors.orange,
    fontFamily: fonts.NotoSansRegular,
    fontSize: 14
  },
  separator: {
    paddingHorizontal: 10
  },
  bottomContainer: {
    padding: 20,
    flexDirection: 'row'
  },
  formContainer: {
    paddingHorizontal: 20
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.InterSemiBold,
    color: colors.black,
    paddingBottom: 5
  },
  description: {
    fontSize: 14,
    fontFamily: fonts.NotoSansRegular,
    color: colors.grey,
    paddingBottom: 40
  },
  topContainer: {
    flex: 6,
    paddingTop: 30
  },
  scrollViewContentContainer: {
    flexGrow: 1
  }
});
