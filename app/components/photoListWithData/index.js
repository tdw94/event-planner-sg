import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
import ListLoader from '../listLoader';

const PhotoWithData = ({ item }) => {
  return (
    <View style={styles.photoTile}>
      <FastImage source={{ uri: item?.thumbnailUrl }} style={styles.photo}/>
      <Text style={styles.photoDescription}>{item?.title || ''}</Text>
    </View>
  );
};

const PhotoListWithData = ({ photos = [], isLoading }) => {
  const { t } = useTranslation();
  return (
    <>
      {isLoading
        ? (
          <ListLoader isLoading={isLoading} style={styles.listLoader} />
        )
        : (
          <View style={styles.container}>
            <Text style={styles.organizersText}>{t('home.photos')}</Text>
            <FlatList
              data={photos}
              horizontal
              keyExtractor={(u) => u?.id}
              renderItem={PhotoWithData}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}
    </>

  );
};

export default PhotoListWithData;

PhotoListWithData.propTypes = {
  photos: PropTypes.array,
  isLoading: PropTypes.bool
};

PhotoWithData.propTypes = {
  item: PropTypes.object
};

const styles = StyleSheet.create({
  listLoader: {
    height: 300
  },
  photoTile: {
    width: 244,
    maxHeight: 300,
    borderColor: colors.lightGrey,
    borderWidth: 0.5
  },
  photo: {
    width: 244,
    height: 130
  },
  photoDescription: {
    color: colors.grey,
    fontSize: 14,
    fontFamily: fonts.NotoSansRegular,
    padding: 20
  },
  container: {
    paddingTop: 30,
    paddingHorizontal: 20
  },
  organizersText: {
    color: colors.black,
    fontSize: 22,
    fontFamily: fonts.InterSemiBold,
    paddingBottom: 20
  }
});
