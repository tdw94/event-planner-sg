import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { fonts } from '../../constants/fonts';
import { colors } from '../../constants/colors';

const Button = ({ text, RightComponent, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text} numberOfLines={1}>{text}</Text>
      {RightComponent ? <RightComponent /> : null}
    </TouchableOpacity>
  );
};

export default Button;

Button.propTypes = {
  text: PropTypes.string,
  RightComponent: PropTypes.any,
  onPress: PropTypes.func
};

const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.NotoSansSemiBold,
    color: colors.white,
    fontSize: 14,
    paddingHorizontal: 10
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    backgroundColor: colors.orange,
    paddingVertical: 15
  }
});
