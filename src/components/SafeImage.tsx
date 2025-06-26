import React, { useState } from 'react';
import {
  View,
  Image,
  StyleProp,
  ImageStyle,
  ImageResizeMode,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

type Props = {
  source: string;
  style?: StyleProp<ImageStyle>;
  resizeMode?: ImageResizeMode;
};

const SafeImage = ({ source, style, resizeMode = 'contain' }: Props) => {
  const [hasError, setHasError] = useState(false);

  const handleError = () => setHasError(true);

  return hasError ? (
    <View
      style={[
        style,
        {
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#eee',
        },
      ]}
    >
      <Ionicons name="business-outline" size={hp('5%')} color="#999" />
    </View>
  ) : (
      <Image
        source={{ uri: source }}
        style={style}
        resizeMode={resizeMode}
        onError={handleError}
      />

  );
};

export default SafeImage;
