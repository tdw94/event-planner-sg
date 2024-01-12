import React, { useState } from 'react';
import Input from './Input';
import { TouchableOpacity } from 'react-native';
import EyeIcon from '../../assets/svg/Eye.svg';

const SecureInput = (props) => {
  const [secure, setSecure] = useState(true);

  return (
    <Input
      {...props}
      isSecure={secure}
      RightComponent={() => (
        <TouchableOpacity onPress={() => setSecure(!secure)}>
          <EyeIcon />
        </TouchableOpacity>
      )}
    />
  );
};

export default SecureInput;
