import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors } from '../../constants/colors';
import CameraOrange from '../../assets/svg/CameraOrange.svg';
import { accessGalleryRead } from '../../services/permission';
import ImagePicker from 'react-native-image-crop-picker';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';

const ProfilePicturePicker = ({ onDone, imageUri, Icon, editMode, disabled }) => {
  const [profileImage, setProfileImage] = useState();

  const openGallery = (returnObject) => {
    ImagePicker.openPicker({
      width: 480,
      height: 480,
      cropping: true,
      useFrontCamera: true,
      showCropGuidelines: true,
      showCropFrame: true,
      forceJpg: true,
      compressImageQuality: 0.8,
      mediaType: 'photo',
      avoidEmptySpaceAroundImage: true,
      freeStyleCropEnabled: true,
      includeExif: true
    })
      .then((image) => {
        returnObject(image);
      })
      .catch(() => {
        returnObject(null);
      });
  };
  const onPressPicker = () => {
    accessGalleryRead()
      .then((granted) => {
        if (granted) {
          openGallery((image) => {
            setProfileImage(image);
            onDone?.(image);
          });
        }
      })
      .catch(() => {
        //  this is intentional
      });
  };
  return (
    <View style={styles.container}>
      <FastImage source={{ uri: profileImage?.path || imageUri }} style={[styles.container, styles.profileImage]} resizeMode='center' />
      {editMode
        ? (
          <TouchableOpacity
            style={[styles.container, styles.profilePictureButton]}
            onPress={onPressPicker}
            disabled={disabled}
          >
            {Icon ? <Icon /> : <CameraOrange />}
          </TouchableOpacity>
        )
        : null}
    </View>
  );
};

export default ProfilePicturePicker;

const styles = StyleSheet.create({
  container: {
    width: 116,
    height: 116
  },
  profileImage: {
    borderRadius: 58,
    backgroundColor: colors.lightOrange
  },
  profilePictureButton: {
    backgroundColor: colors.lightOrange,
    borderRadius: 58,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  }
});

ProfilePicturePicker.propTypes = {
  onDone: PropTypes.func,
  imageUri: PropTypes.string,
  Icon: PropTypes.any,
  editMode: PropTypes.bool,
  disabled: PropTypes.bool
};
