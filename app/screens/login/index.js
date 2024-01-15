import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { fonts } from '../../constants/fonts';
import { colors } from '../../constants/colors';
import Input from '../../components/input/Input';
import MailIcon from '../../assets/svg/Mail.svg';
import LockIcon from '../../assets/svg/Lock.svg';
import WhiteArrowIcon from '../../assets/svg/WhiteArrow.svg';
import PulledArrowIcon from '../../assets/svg/PulledArrow.svg';
import { Formik } from 'formik';
import * as Yup from 'yup';
import i18n from '../../../i18n';
import SecureInput from '../../components/input/SecureInput';
import Button from '../../components/button/Button';
import { signIn } from '../../services/firebase/auth';
import { ERROR_CODES } from '../../constants/errorCodes';
import { useNavigation } from '@react-navigation/native';
import { screens } from '../../constants/screens';
import TextButton from '../../components/button/TextButton';

const loginSchema = Yup.object().shape({
  email: Yup.string().email(i18n.t('yup.invalidEmail')).required(i18n.t('yup.required')),
  password: Yup.string().required(i18n.t('yup.required'))
});

const Login = () => {
  const { t } = useTranslation();
  const [errorText, setErrorText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { navigate } = useNavigation();

  const onPressSignUp = () => {
    navigate(screens.signup);
  };

  const onPressSignIn = (values) => {
    setErrorText('');
    userSignIn(values);
  };

  const userSignIn = async (values) => {
    setIsLoading(true);
    try {
      await signIn(values.email, values.password);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error?.code === ERROR_CODES.AUTH_INVALID_EMAIL ||
        error?.code === ERROR_CODES.AUTH_ACC_DISABLED ||
        error?.code === ERROR_CODES.AUTH_USER_NOT_FOUND ||
        error?.code === ERROR_CODES.AUTH_INVALID_CREDENTIALS ||
        error?.code === ERROR_CODES.AUTH_WRONG_PW) {
        setErrorText(t(`errors.${error.code}`));
      } else {
        setErrorText(t('errors.commonError'));
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={onPressSignIn}
        validationSchema={loginSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <View style={styles.topContainer}>
              <Text style={styles.title}>{t('loginScreen.title')}</Text>
              <Text style={styles.description}>{t('loginScreen.description')}</Text>
              <View style={styles.formContainer}>
                <Input
                  title={t('loginScreen.email')}
                  LeftComponent={() => <MailIcon />}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  errorText={(touched.email && errors.email)}
                  keyboardType='email-address'
                  disabled={isLoading}
                  placeholder={t('loginScreen.emailPlaceholder')}
                />
                <SecureInput
                  title={t('loginScreen.password')}
                  LeftComponent={() => <LockIcon />}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  errorText={(touched.password && errors.password)}
                  disabled={isLoading}
                  placeholder={t('loginScreen.passwordPlaceholder')}
                />
                <View style={styles.resetPwContainer}>
                  <TextButton text={t('loginScreen.resetPassword')} RightComponent={() => <PulledArrowIcon />} />
                </View>
                {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
              </View>
            </View>
            <View style={styles.bottomContainer}>
              <Button
                onPress={handleSubmit}
                text={t('loginScreen.login')}
                RightComponent={() => <WhiteArrowIcon />}
                isLoading={isLoading}
                disabled={isLoading}
              />
              <View style={styles.separator} />
              <Button
                onPress={onPressSignUp}
                text={t('loginScreen.signUp')}
                RightComponent={() => <WhiteArrowIcon />}
                disabled={isLoading} />
            </View>
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  resetPwContainer: {
    alignSelf: 'flex-end'
  },
  errorText: {
    color: colors.orange,
    fontFamily: fonts.NotoSansRegular,
    fontSize: 14
  },
  separator: {
    paddingVertical: 10
  },
  bottomContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20
  },
  formContainer: {
    paddingHorizontal: 20,
    width: '100%'
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
    paddingBottom: 50
  },
  topContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollViewContentContainer: {
    flexGrow: 1
  }
});
