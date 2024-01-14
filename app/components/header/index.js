import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../../constants/colors';
import BackArrowIcon from '../../assets/svg/BlackArrow.svg';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../../constants/fonts';

const Header = ({ title, disabled }) => {
  const { goBack } = useNavigation();

  const onPressBack = () => {
    goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressBack} disabled={disabled}>
        <BackArrowIcon />
      </TouchableOpacity>
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      <View style={styles.empty} />
    </View>
  );
};

export default Header;

Header.propTypes = {
  title: PropTypes.string,
  disabled: PropTypes.bool
};

const styles = StyleSheet.create({
  empty: {
    opacity: 0,
    height: 10,
    width: 10
  },
  title: {
    fontFamily: fonts.InterSemiBold,
    fontSize: 17,
    color: colors.black,
    textAlign: 'center'
  },
  container: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 40,
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 0.5
  }
});
