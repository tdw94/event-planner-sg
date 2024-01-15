import React from 'react';
import { StyleSheet } from 'react-native';
import Toast, { BaseToast } from 'react-native-toast-message';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';

export const showSuccessToast = (text) => {
  Toast.show({
    type: 'success',
    text1: text
  });
};

export const showInfoToast = (text) => {
  Toast.show({
    type: 'info',
    text1: text
  });
};

export const showErrorToast = (text) => {
  Toast.show({
    type: 'error',
    text1: text
  });
};

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={styles.successToast}
      text1Style={styles.text}
    />
  ),
  error: (props) => (
    <BaseToast
      {...props}
      style={styles.errorToast}
      text1Style={styles.text}
    />
  ),
  info: (props) => (
    <BaseToast
      {...props}
      style={styles.infoToast}
      text1Style={styles.text}
    />
  )
};

const styles = StyleSheet.create({
  successToast: {
    backgroundColor: colors.success,
    borderLeftColor: colors.success
  },
  errorToast: {
    backgroundColor: colors.error,
    borderLeftColor: colors.error
  },
  infoToast: {
    backgroundColor: colors.info,
    borderLeftColor: colors.info
  },
  text: {
    fontFamily: fonts.NotoSansSemiBold,
    fontSize: 14,
    color: colors.white
  }
});
