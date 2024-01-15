import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { fonts } from '../../constants/fonts';
import { colors } from '../../constants/colors';
import { useTranslation } from 'react-i18next';
import CommentIcon from '../../assets/svg/Message.svg';
import { useNavigation } from '@react-navigation/native';
import { screens } from '../../constants/screens';

const PostItem = ({ title, description, id }) => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title || t('postsScreen.noTitle')}</Text>
      <Text style={styles.description}>{description || t('postsScreen.noDescription')}</Text>
      <TouchableOpacity style={styles.commentIconContainer} onPress={() => navigate(screens.comments, { postId: id })}>
        <CommentIcon />
      </TouchableOpacity>
    </View>
  );
};

export default PostItem;

PostItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.number
};

const styles = StyleSheet.create({
  commentIconContainer: {
    alignSelf: 'center'
  },
  description: {
    fontFamily: fonts.NotoSansRegular,
    fontSize: 16,
    color: colors.grey
  },
  title: {
    fontFamily: fonts.NotoSansSemiBold,
    fontSize: 18,
    color: colors.black,
    paddingBottom: 10
  },
  container: {
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    borderColor: colors.lightGrey,
    borderWidth: 0.5,
    borderRadius: 2
  }
});
