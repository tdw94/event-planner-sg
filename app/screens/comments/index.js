import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { colors } from '../../constants/colors';
import Header from '../../components/header';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';
import { useGetCommentsById } from '../../hooks/api/useGetCommentsById';
import CommentItem from './commentItem';
import ListLoader from '../../components/listLoader';
import EmptyData from '../../components/emptyData';

const Comments = () => {
  const { t } = useTranslation();
  const { params } = useRoute();
  const { data, isLoading } = useGetCommentsById(params?.postId);

  return (
    <View style={styles.container}>
      <Header
        title={ t('commentsScreen.title')}
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
            renderItem={({ item }) => <CommentItem
              description={item?.body}
              email={item?.email}
              name={item?.name}
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

export default Comments;

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
