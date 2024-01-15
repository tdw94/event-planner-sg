import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { fonts } from '../../constants/fonts';
import { colors } from '../../constants/colors';

const TextButton = ({ text, RightComponent, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
      {RightComponent ? <RightComponent/> : null}
    </TouchableOpacity>
  );
};

export default TextButton;

TextButton.propTypes = {
  text: PropTypes.string,
  RightComponent: PropTypes.any,
  onPress: PropTypes.func
};

const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.NotoSansSemiBold,
    color: colors.orange,
    fontSize: 14,
    paddingRight: 10
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
