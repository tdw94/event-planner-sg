import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import { fonts } from '../../constants/fonts';
import { colors } from '../../constants/colors';

const Input = ({
  title,
  RightComponent,
  LeftComponent,
  onChangeText,
  value,
  onBlur,
  isSecure,
  errorText,
  keyboardType
}) => {
  return (
    <View style={styles.container}>
      {title
        ? <Text style={styles.title}>{title}</Text>
        : null}
      <View style={styles.textInputContainer}>
        {LeftComponent ? <LeftComponent /> : null}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          secureTextEntry={isSecure}
          keyboardType={keyboardType || 'default'}
        />
        {RightComponent ? <RightComponent /> : null}
      </View>
      {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
    </View>
  );
};

export default Input;

Input.propTypes = {
  title: PropTypes.string,
  RightComponent: PropTypes.any,
  LeftComponent: PropTypes.any,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  onBlur: PropTypes.func,
  isSecure: PropTypes.bool,
  errorText: PropTypes.string,
  keyboardType: PropTypes.string
};

const styles = StyleSheet.create({
  errorText: {
    color: colors.orange,
    fontSize: 12,
    fontFamily: fonts.NotoSansRegular
  },
  textInputContainer: {
    backgroundColor: colors.lightOrange,
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    color: colors.black
  },
  container: {
    paddingBottom: 20
  },
  title: {
    fontFamily: fonts.NotoSansMedium,
    fontSize: 13,
    color: colors.grey,
    paddingBottom: 10
  }
});
