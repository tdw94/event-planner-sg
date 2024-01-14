import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { fonts } from '../../constants/fonts';
import { colors } from '../../constants/colors';
import Input from '../../components/input/Input';
import MailIcon from '../../assets/svg/Mail.svg';
import LockIcon from '../../assets/svg/Lock.svg';
import WhiteArrowIcon from '../../assets/svg/WhiteArrow.svg';
import { Formik } from 'formik';
import * as Yup from 'yup';
import i18n from '../../../i18n';
import SecureInput from '../../components/input/SecureInput';
import Button from '../../components/button/Button';
import { signUp } from '../../services/firebase/auth';
import { STATUS } from '../../constants/status';
import { ERROR_CODES } from '../../constants/errorCodes';
import { strongPasswordRegExp } from '../../constants/regex';
import { useNavigation } from '@react-navigation/native';
import { screens } from '../../constants/screens';

const signupSchema = Yup.object().shape({
  email: Yup.string().email(i18n.t('yup.invalidEmail')).required(i18n.t('yup.required')),
  password: Yup.string().matches(strongPasswordRegExp, i18n.t('yup.weakPassword')).required(i18n.t('yup.required')),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], i18n.t('yup.passwordNotMatch')).required(i18n.t('yup.required'))
});

const SignUp = () => {
  const { t } = useTranslation();
  const [errorText, setErrorText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { navigate } = useNavigation();

  const onPressLogin = () => {
    navigate(screens.login);
  };

  const onPressSignUp = (values) => {
    setErrorText('');
    setIsLoading(true);
    signUp(values.email, values.password, (status, response) => {
      setIsLoading(false);
      if (status === STATUS.FAIL) {
        if (response === ERROR_CODES.AUTH_INVALID_EMAIL ||
          response === ERROR_CODES.AUTH_ALREADY_IN_USE) {
          setErrorText(t(`errors.${response}`));
        } else {
          setErrorText(t('errors.commonError'));
        }
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        onSubmit={onPressSignUp}
        validationSchema={signupSchema}
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
                <SecureInput
                  title={t('signUpScreen.confirmPassword')}
                  LeftComponent={() => <LockIcon />}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  errorText={(touched.confirmPassword && errors.confirmPassword)}
                  disabled={isLoading}
                  placeholder={t('loginScreen.passwordPlaceholder')}
                />
                {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
              </View>
            </View>
            <View style={styles.bottomContainer}>
              <Button
                onPress={handleSubmit}
                text={t('loginScreen.signUp')}
                RightComponent={() => <WhiteArrowIcon />}
                disabled={isLoading}
                isLoading={isLoading}/>
              <View style={styles.separator} />
              <Button
                onPress={onPressLogin}
                text={t('loginScreen.login')}
                RightComponent={() => <WhiteArrowIcon />}
                disabled={isLoading}
              />
            </View>
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
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
