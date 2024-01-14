import React, { useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';
import ListLoader from '../listLoader';
import EmptyData from '../emptyData';

const PHOTO_WIDTH = Dimensions.get('screen').width;

const Photo = ({ item }) => {
  return (
    <FastImage source={{ uri: item.thumbnailUrl }} style={styles.photo} />
  );
};

const PhotoSlider = ({ photos = [], isLoading }) => {
  const [count, setCount] = useState(0);

  //   change the counter when swiping the images
  const onScroll = ({ nativeEvent }) => {
    const slideNumber = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    setCount(slideNumber);
  };

  return (
    <>
      {isLoading
        ? (
          <ListLoader isLoading={isLoading} style={styles.listLoader} />
        )
        : (
          <View>
            <FlatList
              data={photos}
              keyExtractor={(p) => p?.id}
              horizontal
              renderItem={Photo}
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              getItemLayout={(_data, index) => (
                { length: PHOTO_WIDTH, offset: PHOTO_WIDTH * index, index }
              )}
              onScrollEndDrag={onScroll}
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
            <View style={styles.counterContainer}>
              <Text style={styles.counterText}>{`${count + 1} / ${photos.length}`}</Text>
            </View>
          </View>
        )}
    </>
  );
};

export default PhotoSlider;

PhotoSlider.propTypes = {
  photos: PropTypes.array,
  isLoading: PropTypes.bool
};

Photo.propTypes = {
  item: PropTypes.object
};

const styles = StyleSheet.create({
  listLoader: {
    height: 220,
    width: PHOTO_WIDTH
  },
  counterText: {
    color: colors.black,
    fontSize: 14,
    fontFamily: fonts.NotoSansRegular,
    padding: 5
  },
  counterContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    borderRadius: 2,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  photo: {
    width: PHOTO_WIDTH,
    height: 220
  }
});
