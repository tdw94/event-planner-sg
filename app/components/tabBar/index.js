import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors } from '../../constants/colors';
import HomeIcon from '../../assets/svg/Home.svg';
import ProfileIcon from '../../assets/svg/Profile.svg';
import { fonts } from '../../constants/fonts';
import i18n from '../../../i18n';
import { useNavigation } from '@react-navigation/native';
import { screens } from '../../constants/screens';

const TabBar = () => {
  const { navigate } = useNavigation();
  return (
    <View style={styles.tabBar}>
      <TouchableOpacity style={styles.iconButton} onPress={() => navigate(screens.home)}>
        <HomeIcon />
        <Text style={styles.text}>{i18n.t('homeScreen.home')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={() => navigate(screens.profile)}>
        <ProfileIcon />
        <Text style={styles.text}>{i18n.t('homeScreen.profile')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  text: {
    color: colors.lightGrey,
    fontFamily: fonts.NotoSansMedium,
    fontSize: 12
  },
  iconButton: {
    alignItems: 'center'
  },
  tabBar: {
    backgroundColor: colors.black,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 20,
    paddingTop: 10
  }
});
