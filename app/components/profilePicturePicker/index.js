import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../constants/colors';
import CameraOrange from '../../assets/svg/CameraOrange.svg';
import { accessGalleryRead } from '../../services/permission';
import ImagePicker from 'react-native-image-crop-picker';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';

const ProfilePicturePicker = ({ onDone, imageUri }) => {
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
    <>
      {profileImage?.path
        ? (
          <FastImage source={{ uri: profileImage.path || imageUri }} style={styles.profileImage} resizeMode='center' />
        )
        : (
          <TouchableOpacity style={styles.profilePictureButton} onPress={onPressPicker}>
            <CameraOrange />
          </TouchableOpacity>
        )}
    </>
  );
};

export default ProfilePicturePicker;

const styles = StyleSheet.create({
  profileImage: {
    width: 116,
    height: 116,
    borderRadius: 58
  },
  profilePictureButton: {
    width: 116,
    height: 116,
    backgroundColor: colors.lightOrange,
    borderRadius: 58,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

ProfilePicturePicker.propTypes = {
  onDone: PropTypes.func,
  imageUri: PropTypes.string
};
