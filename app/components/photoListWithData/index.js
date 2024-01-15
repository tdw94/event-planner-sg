import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
import ListLoader from '../listLoader';
import RightArrow from '../../assets/svg/OrangeArrow.svg';
import EmptyData from '../emptyData';
import TextButton from '../button/TextButton';

const PHOTO_WIDTH = 244;

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
            <View style={styles.titleContainer}>
              <Text style={styles.photosText}>{t('homeScreen.photos')}</Text>
              <TextButton
                text={t('homeScreen.allPhotos')}
                RightComponent={() => <RightArrow />}
              />
            </View>
            <FlatList
              data={photos}
              horizontal
              keyExtractor={(u) => u?.id}
              renderItem={PhotoWithData}
              showsHorizontalScrollIndicator={false}
              getItemLayout={(_data, index) => (
                { length: PHOTO_WIDTH, offset: PHOTO_WIDTH * index, index }
              )}
              ListEmptyComponent={
                <>
                  {!isLoading
                    ? (
                      <EmptyData style={styles.listLoader} />
                    )
                    : null}
                </>
              }
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
  allPhotosButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  allPhotosText: {
    color: colors.orange,
    fontSize: 14,
    fontFamily: fonts.InterSemiBold,
    paddingRight: 10
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20
  },
  listLoader: {
    height: 300,
    width: Dimensions.get('screen').width - 40
  },
  photoTile: {
    width: PHOTO_WIDTH,
    maxHeight: 300,
    borderColor: colors.lightGrey,
    borderWidth: 0.5
  },
  photo: {
    width: PHOTO_WIDTH,
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
  photosText: {
    color: colors.black,
    fontSize: 22,
    fontFamily: fonts.InterSemiBold
  }
});
