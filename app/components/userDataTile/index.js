import React from 'react';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';

const UserDataTile = ({ name, email, photoUrl }) => {
  return (
    <View style={styles.userInfoContainer}>
      <FastImage source={{ uri: photoUrl }} style={styles.photo} />
      <View style={styles.textContainer}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <Text style={styles.email} numberOfLines={1}>{email}</Text>
      </View>
    </View>
  );
};

export default UserDataTile;

UserDataTile.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  photoUrl: PropTypes.string
};

const styles = StyleSheet.create({
  textContainer: {
    paddingHorizontal: 20,
    flex: 1
  },
  email: {
    color: colors.lightGrey,
    fontSize: 14,
    fontFamily: fonts.NotoSansRegular,
    paddingTop: 5
  },
  name: {
    color: colors.black,
    fontSize: 16,
    fontFamily: fonts.NotoSansRegular
  },
  photo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.lightOrange
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
