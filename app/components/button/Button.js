import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { fonts } from '../../constants/fonts';
import { colors } from '../../constants/colors';

const Button = ({ text, RightComponent, LeftComponent, onPress, disabled, isLoading, style, textStyle }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} disabled={disabled}>
      {LeftComponent ? <LeftComponent /> : null}
      <Text style={[styles.text, textStyle]} numberOfLines={1}>{text}</Text>
      {isLoading
        ? <ActivityIndicator animating={isLoading} color={colors.white} size="small" />
        : <>
          {RightComponent ? <RightComponent /> : null}
        </>
      }
    </TouchableOpacity>
  );
};

export default Button;

Button.propTypes = {
  text: PropTypes.string,
  RightComponent: PropTypes.any,
  LeftComponent: PropTypes.any,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  style: PropTypes.any,
  textStyle: PropTypes.any
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
