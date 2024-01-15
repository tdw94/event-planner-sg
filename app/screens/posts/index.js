import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { colors } from '../../constants/colors';
import Header from '../../components/header';
import { useTranslation } from 'react-i18next';
import { useGetPosts } from '../../hooks/api/useGetPosts';
import PostItem from './postItem';
import ListLoader from '../../components/listLoader';
import EmptyData from '../../components/emptyData';

const Posts = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetPosts();

  return (
    <View style={styles.container}>
      <Header
        title={ t('postsScreen.title')}
        disabled={isLoading}
      />
      {isLoading
        ? (
          <ListLoader isLoading={isLoading} style={styles.listLoader} />
        )
        : (
          <FlatList
            data={data}
            keyExtractor={(d) => d?.id}
            renderItem={({ item }) => <PostItem
              title={item?.title}
              description={item?.body}
              id={item?.id}
            />}
            style={styles.list}
            contentContainerStyle={styles.listContentContainer}
            ListEmptyComponent={<>
              {!isLoading
                ? (
                  <EmptyData style={styles.listLoader}/>
                )
                : null}
            </>}
          />
        )}
    </View>
  );
};

export default Posts;

const styles = StyleSheet.create({
  listContentContainer: {
    flexGrow: 1
  },
  listLoader: {
    flex: 1,
    backgroundColor: colors.white
  },
  list: {
    paddingHorizontal: 20
  },
  container: {
    flex: 1,
    backgroundColor: colors.white
  }
});
