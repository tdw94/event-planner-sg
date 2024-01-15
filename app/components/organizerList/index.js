import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';
import UserDataTile from '../userDataTile';
import MessageIcon from '../../assets/svg/Message.svg';
import ListLoader from '../listLoader';
import EmptyData from '../emptyData';

const OrganizerTile = ({ item, lastItem }) => {
  return (
    <TouchableOpacity disabled style={[styles.organizerTile, lastItem && styles.noBottomBorder]}>
      <View style={styles.organizerTileData}>
        <UserDataTile
          name={item?.name}
          email={item?.email}
        />
      </View>
      <MessageIcon />
    </TouchableOpacity>
  );
};

const OrganizerList = ({ organizers = [], isLoading }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.organizersText}>{t('homeScreen.organizers')}</Text>
      <ScrollView style={styles.listView} nestedScrollEnabled removeClippedSubviews>
        {isLoading
          ? (
            <ListLoader isLoading={isLoading} style={styles.listLoader} />)
          : (<>
            {organizers?.length
              ? (
                <>
                  {organizers?.map((o, i) => (
                    <OrganizerTile key={o?.id} item={o} lastItem={i === organizers.length - 1} />
                  ))}
                </>
              )
              : (
                <EmptyData style={styles.listLoader} />
              )}

          </>)}
      </ScrollView>
    </View>
  );
};

export default OrganizerList;

OrganizerList.propTypes = {
  organizers: PropTypes.array,
  isLoading: PropTypes.bool
};

OrganizerTile.propTypes = {
  item: PropTypes.object,
  lastItem: PropTypes.bool
};

const styles = StyleSheet.create({
  listLoader: {
    backgroundColor: colors.white,
    height: 300
  },
  listView: { height: 300 },
  organizerTileData: {
    flex: 1
  },
  noBottomBorder: {
    borderBottomWidth: 0
  },
  organizerTile: {
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 0.5
  },
  container: {
    paddingTop: 30,
    paddingHorizontal: 20,
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 0.5
  },
  organizersText: {
    color: colors.black,
    fontSize: 22,
    fontFamily: fonts.InterSemiBold,
    paddingBottom: 20
  }
});
