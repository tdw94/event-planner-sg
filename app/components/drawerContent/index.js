import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors } from '../../constants/colors';
import { useUser } from '../../context/UserContext';
import { fonts } from '../../constants/fonts';
import LogoutIcon from '../../assets/svg/Logout.svg';
import { useTranslation } from 'react-i18next';
import { signOut } from '../../services/firebase/auth';
import DeviceInfo from 'react-native-device-info';
import UserDataTile from '../userDataTile';

const DrawerContent = () => {
  const { user } = useUser();
  const { t } = useTranslation();

  return (
    <View style={styles.drawer}>
      <View>
        <View style={styles.userDataContainer}>
          {/* user details */}
          <UserDataTile
            name={`${user?.firstName || t('drawer.fNamePlaceholder')} ${user?.lastName || t('drawer.lNamePlaceholder')}`}
            email={`${user?.email || ''}`}
            photoUrl={user?.photoUrl}
          />
        </View>
        <TouchableOpacity style={styles.logoutContainer} onPress={signOut}>
          <LogoutIcon />
          <Text style={styles.logoutText} numberOfLines={1}>{t('drawer.logout')}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.versionInfo} numberOfLines={1}>{`${t('drawer.version')} ${DeviceInfo.getVersion()}`}</Text>
    </View>);
};

export default DrawerContent;

const styles = StyleSheet.create({
  userDataContainer: {
    paddingTop: 40,
    paddingBottom: 10,
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 0.5,
    paddingLeft: 20
  },
  versionInfo: {
    color: colors.grey,
    fontSize: 14,
    fontFamily: fonts.NotoSansRegular,
    textAlign: 'center',
    paddingBottom: 40
  },
  logoutText: {
    color: colors.red,
    fontSize: 14,
    fontFamily: fonts.NotoSansSemiBold,
    paddingLeft: 15
  },
  logoutContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  drawer: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'space-between'
  }
});
