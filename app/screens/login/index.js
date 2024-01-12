import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { screenStyles } from '../../styles/screen-styles';
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
import { strongPasswordRegExp } from '../../constants/regex';
import SecureInput from '../../components/input/SecureInput';
import Button from '../../components/button/Button';
import { signUp } from '../../services/firebase/auth';

const loginSchema = Yup.object().shape({
  email: Yup.string().email(i18n.t('yup.invalidEmail')).required(i18n.t('yup.required')),
  password: Yup.string().matches(strongPasswordRegExp, i18n.t('yup.weakPassword')).required(i18n.t('yup.required'))
});

const Login = () => {
  const { t } = useTranslation();

  const onPressSignUp = () => {};

  const onPressSignIn = (values) => {
    signUp(values.email, values.password, (res) => {
      console.log(res);
    });
  };

  return (
    <View style={[screenStyles.screen, styles.screen]}>
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
                />
                <SecureInput
                  title={t('loginScreen.password')}
                  LeftComponent={() => <LockIcon />}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  errorText={(touched.password && errors.password)}
                />
              </View>
            </View>
            <View style={styles.bottomContainer}>
              <Button onPress={handleSubmit} text={t('loginScreen.login')} RightComponent={() => <WhiteArrowIcon />} />
              <View style={styles.separator} />
              <Button onPress={onPressSignUp} text={t('loginScreen.signUp')} RightComponent={() => <WhiteArrowIcon />} />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
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
  screen: {
    // justifyContent: 'space-around',
  }
});
