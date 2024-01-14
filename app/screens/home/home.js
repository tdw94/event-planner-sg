import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { useGetPhotos } from '../../hooks/api/useGetPhotos';
import PhotoSlider from '../../components/photoSlider';
import { fonts } from '../../constants/fonts';
import { useGetOrganizers } from '../../hooks/api/useGetOrganizers';
import OrganizerList from '../../components/organizerList';
import PhotoListWithData from '../../components/photoListWithData';
import { useGetPosts } from '../../hooks/api/useGetPosts';
import PostsButton from './postsButton';

const Home = () => {
  const { data: photoData, isLoading: isLoadingPhotos } = useGetPhotos();
  const { data: organizersData, isLoading: isLoadingOrganizers } = useGetOrganizers();
  const { data: postsData, isLoading: isLoadingPosts } = useGetPosts();

  const [photos, setPhotos] = useState([]);

  const event = {
    name: 'Meeting with Alex',
    description: '56 O\'Mally Road, ST LEONARDS, 2065, NSW'
  };

  useEffect(() => {
    if (photoData?.length) {
      setPhotos(photoData.slice(0, 10));
    }
  }, [photoData]);

  return (
    <View style={styles.screen}>
      <FlatList
        data={[1]}
        nestedScrollEnabled
        renderItem={() => (
          <>
            <PhotoSlider photos={photos} isLoading={isLoadingPhotos} />
            <Text style={styles.eventTitle}>{event.name}</Text>
            <Text style={styles.eventDescription}>{event.description}</Text>
            <OrganizerList organizers={organizersData} isLoading={isLoadingOrganizers} />
            <PhotoListWithData photos={photos} isLoading={isLoadingPhotos} />
            <PostsButton isLoading={isLoadingPosts} count={postsData?.length} />
          </>
        )}
      />

    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  eventDescription: {
    color: colors.grey,
    fontSize: 14,
    fontFamily: fonts.NotoSansRegular,
    paddingTop: 20,
    paddingHorizontal: 20
  },
  eventTitle: {
    color: colors.black,
    fontSize: 26,
    fontFamily: fonts.InterSemiBold,
    paddingTop: 30,
    paddingHorizontal: 20
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 30
  },
  screen: {
    flex: 1,
    backgroundColor: colors.white
  }
});
