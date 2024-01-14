import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { colors } from '../../constants/colors';
import PropTypes from 'prop-types';

const ListLoader = ({ isLoading, style }) => {
  return (
    <View style={[styles.container, style]} >
      <ActivityIndicator animating={isLoading} size='large' color={colors.orange} />
    </View>
  );
};

export default ListLoader;

ListLoader.propTypes = {
  isLoading: PropTypes.bool,
  style: PropTypes.any
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightOrange
  }
});
