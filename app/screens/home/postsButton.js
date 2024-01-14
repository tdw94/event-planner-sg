import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const PostsButton = ({ isLoading, count }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.postsContainer}>
      {isLoading
        ? (
          <ActivityIndicator animating={isLoading} size='large' color={colors.orange} />
        )
        : (
          <TouchableOpacity>
            <Text style={styles.postsCount}>{count || 0}</Text>
            <Text style={styles.postsText}>{t('home.posts')}</Text>
          </TouchableOpacity>
        )}
    </View>
  );
};

export default PostsButton;

PostsButton.propTypes = {
  isLoading: PropTypes.bool,
  count: PropTypes.number
};

const styles = StyleSheet.create({
  postsCount: {
    fontFamily: fonts.InterSemiBold,
    fontSize: 19,
    color: colors.orange
  },
  postsText: {
    fontFamily: fonts.NotoSansMedium,
    fontSize: 13,
    color: colors.grey
  },
  postsContainer: {
    borderTopColor: colors.lightGrey,
    borderBottomColor: colors.lightGrey,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  }
});
