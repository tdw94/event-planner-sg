import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { fonts } from '../../constants/fonts';
import { colors } from '../../constants/colors';
import { useTranslation } from 'react-i18next';

const CommentItem = ({ description, name, email }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.description}>{description || t('postsScreen.noDescription')}</Text>
      <Text style={styles.name}>{name || t('postsScreen.noName')}</Text>
      <Text style={styles.email}>{email || t('postsScreen.noEmail')}</Text>
    </View>
  );
};

export default CommentItem;

CommentItem.propTypes = {
  description: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string
};

const styles = StyleSheet.create({
  name: {
    fontFamily: fonts.NotoSansRegular,
    fontSize: 14,
    color: colors.black,
    textAlign: 'right'
  },
  email: {
    fontFamily: fonts.NotoSansRegular,
    fontSize: 14,
    color: colors.grey,
    textAlign: 'right'
  },
  description: {
    fontFamily: fonts.NotoSansSemiBold,
    fontSize: 16,
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
