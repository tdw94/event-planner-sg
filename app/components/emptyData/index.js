import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { fonts } from '../../constants/fonts';

const EmptyData = ({ style }) => {
  const { t } = useTranslation();
  return (
    <View style={[styles.container, style]} >
      <Text style={styles.text}>{t('errors.emptyData')}</Text>
    </View>
  );
};

export default EmptyData;

EmptyData.propTypes = {
  isLoading: PropTypes.bool,
  style: PropTypes.any
};

const styles = StyleSheet.create({
  text: {
    color: colors.black,
    textAlign: 'center',
    fontFamily: fonts.NotoSansRegular,
    fontSize: 16
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightOrange
  }
});
